/**
 * Created by Kevin on 10/5/15.
 */

var effortdb = require('../models/Effort.js');
var studdb = require('../models/Student.js');
var identdb = require('../models/Identification.js');
var moduledb = require('../models/Module.js');
var efforttypedb = require('../models/EffType.js');
var async = require('async');

exports.getEffortsByStudent = function (req, res) {
    // Student can view a list of his efforts
    // Result contains all information about the efforts, however, not all must be used
    var studentId = req.params.studentid;
    async.series([
        function(callback) {
            console.log("Checking for student: " + studentId);
            studdb.studentModel.count({ _id: studentId }, function(err, count) {
                //console.log("Found: " + count);
                if(count > 0) {
                    console.log("Student found. Searching database for efforts.");
                    callback()
                } else {
                    callback("Student not in Database!");
                }
            });
        },
        function(callback) {
            effortdb.effortModel.find( { createdBy: studentId }, function(err, result) {
                if(err) console.log(err);
                else callback(result);
            });
        }
    ], function (err, result) {
        console.log("Done. Sending results.");
        if(err) res.status(500).send(err);
        else if(result) res.status(200).send(result);
    });
};

exports.getEffortById = function (req, res) {
    // Get an Effort by ID
    var effortid = req.params.effortid;
    effortdb.effortModel.findById(effortid, function (err, effort) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(effort);
        }
    });
};

exports.getEffortsByModule = function (req, res) {
    // Student can view a list of his efforts for one selected module
    // Result contains all information about the efforts, however, not all must be used
	var moduleId = req.params.moduleid;
	var studentId = req.params.studentid;
    async.series([
        function(callback) {
            console.log("Checking for student: " + studentId);
            studdb.studentModel.count({ _id: studentId }, function(err, count) {
                //console.log("Found: " + count);
                if(count > 0) {
                    console.log("Student found. Searching database for module.");
                    callback()
                } else {
                    callback("Student not in Database!");
                }
            });
        },
		function(callback) {
            console.log("Checking for module: " + moduleId);
            moduledb.moduleModel.count({ _id: moduleId }, function(err, count) {
                //console.log("Found: " + count);
                if(count > 0) {
                    console.log("Module found. Searching database for efforts.");
                    callback()
                } else {
                    callback("Module not in Database!");
                }
            });
        },
        function(callback) {
            effortdb.effortModel.find( { createdBy: studentId, module: moduleId }, function(err, result) {
                if(err) console.log(err);
                else callback(result);
            });
        }
    ], function (err, result) {
        console.log("Done. Sending results.");
        if(err) res.status(500).send(err);
        else if(result) res.status(200).send(result);
    });
};
  
  

exports.createEffort = function(req, res) {
    //console.log(req.body);
    var modId = req.body.moduleid;
    var studId = req.body.studentid;
	var efftypeId = req.body.efforttypeid;
    var amount = req.body.amount;

    if(!modId || !studId || !efftypeId) {
        return res.status(400).send("One of the parameters was undefined");
    }
    console.log("I'm here");
    if(!amount || amount < 1) {
        return res.status(400).send("Amount has to be greater or equal to 1");
    }

    async.parallel([
        function(callback) {

            console.log(modId + " " + studId + " " + efftypeId);
            moduledb.moduleModel.findById(modId, function(err, result) {
                if (err) {
                    return callback(err);
                }
                if (result == undefined) {
                    return callback("Module not found");
                } else {
                    return callback(null, result);
                }
            });
        },
        function(callback) {
            studdb.studentModel.findById(studId, function(err, result) {
                if (err) {
                    return callback(err);
                }
                if (!result) {
                    return callback("Student not found");

                } else {
                    return callback(null, result);
                }
            });

        },
		function(callback) {
            efforttypedb.effTypeModel.findById(efftypeId, function(err, result) {
                if (err) {
                    return callback(err);
                }
                if (result == undefined) {
                    return callback("Effort Type not found");
                } else {
                    return callback(null, result);
                }
            });

        }
    ], function(err, results) {
        if(err) {
            console.log('We have an error: ' + err);
            res.status(500).send('I fucked this up :(');
        }
        if(results.length == 3) {
            //result[0] = Module, result[1] = Student, result[2] = EffortType
            var newEffort = new effortdb.effortModel();
            newEffort.amount = req.body.amount;
            newEffort.module = results[0]["_id"];
            newEffort.createdBy = results[1]["_id"];
			newEffort.type = results[2]["_id"];
			newEffort.performanceDate = new Date(req.body.performancedate); 
			// "<YYYY-mm-dd>" Format
			if(req.body.material) {
                newEffort.material = req.body.material;
            }
            if(req.body.place) {
                newEffort.place = req.body.place;
            } 
            newEffort.save(function(err, result) {
                if(err) {
					console.log(err);
					res.status(500).send("Failed to create effort");}
                else if(result) {
                    var message = {};
                    message.success = true;
                    message.id = result._id;
                    res.status(201).send(message);
                }
            })
            //console.log(newEffort);
            //res.status(200).send(newEffort);
        } else {
            res.status(400).send("User, module or effort type not in database");
        }
    });
};


exports.updateEffort = function(req, res) {
    //console.log(req.body);
    var modId = req.body.moduleid;
    var effId = req.params.effortid;
	var efftypeId = req.body.efforttypeid;
	var studId = req.body.studentid;

    async.parallel([
        function(callback) {

            console.log(modId + " " + effId + " " + efftypeId);
            moduledb.moduleModel.findById(modId, function(err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                if (result == undefined) {
                    callback("Module not found");
                } else {
                    callback(null, result);
                }
            });
        },
		function(callback) {
            efforttypedb.effTypeModel.findById(efftypeId, function(err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                if (result == undefined) {
                    callback("Effort Type not found");
                    return;
                } else {
                    callback(null, result);
                }
            });

        }
    ], function(err, results) {
        if(results.length == 2) {
            //result[0] = Module, result[1] = EffortType
			
			effortdb.effortModel.findById(effId, function(err, eff) {
  
			if (err){
                res.send(err);
                return;
			}
			if (eff.createdBy !== studId){
				res.status(403).send("This is not your effort. Get lost.");
				return;
			}
			else {
            eff.module = results[0]["_id"];
            eff.type = results[1]["_id"];
			eff.amount = req.body.amount;
			eff.performanceDate = new Date(req.body.performanceDate); 
			// "<YYYY-mm-dd>" Format
			if(req.body.material !== undefined) {
                eff.material = req.body.material;
            }
            if(req.body.place !== undefined) {
                eff.place = req.body.place;
            } 
            // save the effort
            eff.save(function(err, result) {
                if(err) res.status(500).send("Failed to update effort");
                else if(result) {
                    var message = {};
                    message.success = true;
                    message.id = result._id;
                    res.status(200).send(message);
                }
            })
			}
			});
            //console.log(eff);
            //res.status(200).send(eff);
        } else {
            res.status(400).send("Module or effort not in database");
        }
    });
    return;	
	
   
};


exports.deleteEffort = function(req, res) {
	var effId = req.params.effortid;
	var studId = req.body.studentid;
	console.log(effId + "  " + studId);
            // delete the effort
            effortdb.effortModel.remove({_id: effId, createdBy: studId}, function(err, eff) {
            if (err)
                res.send(err);
            res.status(200).send("Successfully deleted!");;
			});	
};


/**
exports.deleteAllMyEfforts = function(req, res) {
    effortdb.remove({matricularnr: req.params.matricularnr}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        else { return res.sendStatus(200)}
    });


};
//TODO: Validate Effort (update/enter) --> Date of effort not more than 2 weeks in past!
*/

