/**
 * Created by Kevin on 10/12/15.
 */

var identdb = require('../models/Identification.js');
var studentdb = require('../models/Student.js');
var moduledb = require('../models/Module');
var request = require('request');
var async = require('async');
var crypto = require('crypto');
var logger = require('../lib/logger').getLogger({'module': 'auth'});
//var reqLogger = require('../lib/logger').requestLogger();


//TODO: Implement logging and replace "console.log" with logger

exports.login = function (req, res) {
    //console.log(req.flowid);
    //console.log(req);
    var user = req.body.username;
    var pass = req.body.password;
    var sync = req.body.syncdata;
    res.setTimeout(20*60*1000);

    //res.setTimeout(5000);
    async.waterfall([
        /*
        *
        * Errorcodes:
        *
        *   E0000       Login failed
        *   E0001       Login Successfull, Sync not required
        *   E0002       Failed to reach getStudentData
        *   E0003       Efiport not reachable
        *
         */
        function(callback) {

            require('request-debug')(request, function(type, data, r) {
                //console.log(type, data, r);
                if(type=='request') {
                    var uri = data.uri.replace(/password=(.*)/g, 'password=**************');
                    logger.info("Sending request. uri=" + uri + " headers=" + JSON.stringify(data.headers) + " method=" + data.method, {flowid: req.flowid});
                }
            });
            logger.info("Requesting login from " + user + " - Sync?: " + sync, {flowid:req.flowid});
            request({
                'uri':'https://campus.frankfurt-school.de/clicnetclm/loginService.do?xaction=login&username=' + user + '&password=' + encodeURIComponent(pass),
                'timeout':10000, //10 seconds timeout on login
                'headers': {
                    'apiKey': 'd299ef13-a197-4c36-8948-e0112da3bdf2'
                }
            } , function(err, response, body) {
                try {

                    var userInfo = JSON.parse(body);
                    if(userInfo.success) {
                        userInfo.sync = sync;
                        userInfo.campusUsername = user;
                        var userid = new Buffer(userInfo.fullname);
                        var hashedUserid = crypto.createHash('md5').update(userid).digest('hex').toUpperCase();
                        userInfo.userid = hashedUserid;
                        return callback(null, userInfo);
                    } else {
                        return callback("E0000", userInfo);
                    }

                } catch (e) {
                    return callback("E0003", e);
                }
                //console.log(userInfo);
            });
        },
        function(userinfo ,callback) {
            var sessionBuffer = new Buffer(user+pass+userinfo.sessionid);
            var hashedSessionBuffer = crypto.createHash('sha256').update(sessionBuffer).digest('hex').toUpperCase();
            userinfo.mySessionId = hashedSessionBuffer;
            return callback(null, userinfo);
        },
        function(userInfo, callback) {
            if(!userInfo.sync) {
                logger.info("Syncdata was not checked. Skipping request for modules", {flowid: req.flowid});
                return callback(null, userInfo, null);
            }

            //console.log('Backend Session ID: ' + userInfo.mySessionId);
            //console.log('Efiport Session ID: ' + userInfo.sessionid);
            logger.info('Requesting Student Data for ' + userInfo.userid + "[" + userInfo.campusUsername + "]", {flowid: req.flowid});


            var cookie = "JSESSIONID="+userInfo.sessionid + "; SERVERID=fs-bl-02";
            //console.log(cookie);
            request({
                uri: 'https://campus.frankfurt-school.de/clicnetclm/campusAppStudentX.do?xaction=getStudentData',
                headers: {
                    "Cookie": cookie,
                    "apiKey": "d299ef13-a197-4c36-8948-e0112da3bdf2"
                }
            }, function(err, response, body) {
                if(err) {
                    logger.error("Jesus christ I fucked up what the fuck is going on :O");
                    return callback("E0002");
                }
                var studentInfo = JSON.parse(body);
                if(!studentInfo.success) {
                    return callback("E0002", body);
                }
                logger.info("Student data for " + userInfo.userid + "[" + userInfo.campusUsername + "] arrived", {flowid: req.flowid});
                userInfo.matricularnr = studentInfo.matrikelnummer;
                return callback(null, userInfo, studentInfo);

            });
        },
        //TODO hier funktion für ident table
        function(userInfo, studentInfo, callback) {
            var identEntry = new identdb.identificationModel();
            identEntry.jsession = userInfo.mySessionId;
            identEntry.studentid = userInfo.userid;
            identEntry.save(function (err, result) {
                if (err) {
                    console.log(err);
                    return callback("Fucked UP!");
                } else {
                    //console.log(result);
                    //console.log(userInfo.sync);
                    if(!userInfo.sync) {
                        logger.info("Created session for user " + userInfo.userid + " in database - " + userInfo.mySessionId, {flowid: req.flowid});
                        return callback("E0001", userInfo);
                    } else {
                        logger.info("Created session for user " + userInfo.userid + " in database - " + userInfo.mySessionId, {flowid: req.flowid});
                        return callback(null, userInfo, studentInfo);
                    }
                }
            });
        },
        function(userInfo, studentInfo, callback) {
            //console.log(err);

            var modules = {};

            //console.log("in final function\n" + userInfo);
            logger.info('Parsing student data for ' + userInfo.userid, {flowid: req.flowid});
            studentInfo.items.forEach(function(item) {
                item.children.forEach(function(topLevelModule) {
                    if(topLevelModule.hasOwnProperty('children')) {
                        topLevelModule.children.forEach(function(module){
                            var curYear = new Date();
                            curYear = curYear.getFullYear();
                            if(curYear - module.year < 3) {
                                var idBuffer = new Buffer(module.title);
                                var hashedIdBuffer = crypto.createHash('sha1').update(idBuffer).digest('hex');
                                modules[module.title] = {
                                    'm_id': hashedIdBuffer,
                                    'm_name':module.title,
                                    'm_year': module.year,
                                    'm_effort_assignment': module.assignments,
                                    'm_effort_idependent': module.independenthours,
                                    'm_effort_contact': module.contacthours,
                                    'm_effort_total':module.workload
                                };
                            }
                        });
                    }
                });
            });

            userInfo.modules = modules;
            return callback(null, userInfo);
        },
        function(userInfo, callback) {
            async.series([
                function(callback) {
                    studentdb.studentModel.count({_id: userInfo.userid}, function(err, count) {
                        if(count > 0) {
                            logger.warn('Student + ' + userInfo.userid + ' already exists in database', {flowid: req.flowid});
                            return callback("Student already exists");
                        } else {
                            return callback()
                        }
                    });
                },
                function (callback) {
                    //console.log(userInfo);
                    var studentEntry = new studentdb.studentModel();
                    studentEntry._id = userInfo.userid;
                    studentEntry.matricularnr = userInfo.matricularnr;
                    var module_ids = [];
                    for(var module_item in userInfo.modules) {
                        module_ids.push(userInfo.modules[module_item].m_id);
                    }
                    studentEntry.modules = module_ids;
                    studentEntry.save(function (err, result) {
                        if (err) {
                            logger.error("Failed to save student " + userInfo.userid + "[" + userInfo.campusUsername + "]", {flowid: req.flowid});
                            return callback("Failed to save student " + userInfo.userid + "[" + userInfo.campusUsername + "]");
                        } else {
                            userInfo.privacyFlag = result.privacyFlag;
                            return callback(null, userInfo);
                        }
                    });
                }
            ], function(err, result) {
                if(err) {
                    //console.log(err);
                    return callback(null, userInfo);
                }
                else {
                    logger.info("Added Student "  + userInfo.userid + "[" + userInfo.campusUsername + "]", {flowid: req.flowid});
                    return callback(null, result);
                }
            });

        },
        function(userinfo, callback) {
            //console.log(userinfo);
            async.each(userinfo.modules, function(moduleinfo, callback) {
                //here goes calls to save all modules in the database...
                //console.log(JSON.stringify(moduleinfo, null, 3));
                async.series([
                    function(callback) {
                        moduledb.moduleModel.count({_id:moduleinfo.m_id}, function(err, count) {
                            if (count > 0) {
                                return callback("Module already exists...");
                            } else {
                                return callback();
                            }
                        });
                    },
                    function(callback) {
                        var mod = new moduledb.moduleModel();
                        mod._id = moduleinfo.m_id;
                        mod.assignmentHours = moduleinfo.m_effort_assignment;
                        mod.contactHours = moduleinfo.m_effort_contact;
                        mod.independentHours = moduleinfo.m_effort_idependent;
                        mod.workloadHours = moduleinfo.m_effort_total;
                        mod.name = moduleinfo.m_name;
                        mod.save(function (err) {
                            if (err) {
                                //console.log(err);
                                return callback("Fucked UP!");
                            } else {
                                var res = {'worked':true, 'added_module':mod._id};
                                return callback(null, res);
                            }
                        });
                    }
                ], function(err, result) {
                    if(err) logger.warn(err, {flowid: req.flowid});
                    else if(result[1]['worked']) logger.info("Added Module " + result[1]['added_module'], {flowid: req.flowid});
                    return callback();
                });
            }, function(err) {
                if(err) {
                    logger.error(err);
                } else {
                    return callback(null, userinfo)
                }
            });

        }
    ], function(err, result) {
        //console.log("----[ ERR ]----");
        //console.log(err);
        //console.log("----[ RESULT ]----");
        //console.log(result);
        if(err) {
            if(err == "E0000") {
                logger.error("Wrong username or password", {flowid: req.flowid});
                res.status(403).send("Wrong Username or Password. Please try again.");
            }
            if(err == "E0001") {
                studentdb.studentModel.findOne({_id: result.userid}, function(err, student) {
                    if(!student) {
                        logger.error("Modules for user " + result.userid + " have not been synced yet.", {flowid: req.flowid});
                        res.status(500).send("Modules have not been synced yet. Please login again and check the 'syncdata' button");
                    }
                    if(student) {
                        //console.log(student);
                        result.privacy = student.privacyFlag;
                        result.matricularnr = student.matricularnr;
                        //console.log(result);
                        //console.log(result);
                        res.status(200).send(result);
                    }
                });
            }
            if(err == "E0002")
            {
                logger.error("Efiport call failed. Response: " + result["message"], {flowid: req.flowid});
                res.status(500).send("Failed to fetch Modules. Please login again. If the error persists, contact you Systemadministrator");
            }
            if(err == "E0003") res.status(500).send("Failed validate login against efiport.");

        } else if (result) {
            if (result.length > 1) result = result[1];
            //console.log("I'm here");
            delete result.modules;
            delete result.sessionid;

            //console.log(result.length);

            studentdb.studentModel.findOne({_id: result.userid}, function (err, student) {
                if(err) res.status(500).send("Something went wrong. Please try again!");
                if (!student) res.status(400).send("Student " + result.userid + " was not found in database!");
                if (student) {
                    if(!result.privacyFlag) result.privacyFlag = student.privacyFlag;
                    res.status(200).send(result);
                }
            });
        }
    });
}

exports.logout = function (req, res) {
    //console.log(req);
    var session = req.headers['x-session'];
    logger.info("Received logout request for " + session.slice(0, 10) + "[...]")
    identdb.identificationModel.findOneAndRemove({jsession: session}, function(err, result){
        if(err) {
            logger.error("Database connection failed", {flowid: req.flowid});
            res.status(500).send("Database connection failed");
        }
        if(!result) {
            logger.error("Session " + session.slice(0, 10) + "[...] not found in database", {flowid: req.flowid})
            res.status(404).send("Session " + session.slice(0, 10) + "[...] not found in database");
        }
        if(result) {
            logger.info("User " + result.studentid + " successfully logged out", {flowid: req.flowid});
            return res.status(200).send('User ' + result.studentid + ' successfully logged out ');
        }
    });

}

