var express = require('express');
var router = express.Router();


//Routes
var students = require('./students.js');
var modules = require('./modules.js');
var efforts = require('./efforts.js');
var efftypes = require('./efftypes.js');
var sample = require('./sample.js');
var login = require('./auth.js');
var compare = require('./compare.js');


/*####### student ########*/
router.get('/', function(req, res, next) {
    res.status(200).send('<h1>Server is up and running</h1>');
    //next();
});

router.get('/loaderio-e2fcf49d2f9e042b5ae0b63c35d9241e', function(req, res) {
    res.send('loaderio-e2fcf49d2f9e042b5ae0b63c35d9241e');
});
/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup 01 General
 *
 * @apiParam {String} username FSCampus Username
 * @apiParam {String} password FSCampus Password
 *
 * @apiParamExample {json} Example
 *    {
 *      "username": "user",
 *      "password": "pass"
 *    }
 *
 * @apiSuccess {String} token Session ID
 * @apiSuccess {Boolean} loginSuccess True if login worked
 * @apiSuccess {Boolean} privacyFlag True if the User has previously accepted privacy statement
 * @apiSuccess {String} implicitSync True if the data were synced with efiport
 * @apiSuccess {String} campusUsername Username used for login
 * @apiSuccess {String} userid User ID for future requests
 * @apiSuccess {String} matricularnr Matrikular # of the student
 *
 */
router.post('/login', login.login);
/**
 * @api {post} /logout Logut
 * @apiName Logout
 * @apiGroup 01 General
 *
 * @apiHeader x-session SessionID
 *
 */
router.post('/logout', login.logout);
// no Apidoc
router.get('/api/students/', students.checkStudent);
// no Apidoc
router.get('/sample/create/:sets', sample.createSampleEfforts);
/**
 * @api {get} /api/compare/module/:moduleid Compare a Student in a Module
 * @apiName Compare By Module
 * @apiGroup 05 Compare
 *
 * @apiSuccess {Object[]} topthree Array of best three students: {_id (String, DO NOT USE!), sum (Integer, sum of amounts)} // if less than 3 students found: "Not enough participants"
 * @apiSuccess {Object[]} bottomthree Array of worst three students: {_id (String, DO NOT USE!), sum (Integer, sum of amounts)} // if less than 3 students found: "Not enough participants"
 * @apiSuccess {Object} module Information about the module
 * @apiSuccess {Object[]} me Array of 1 length: {_id (null), sum (Integer, sum of amounts)} // [] if student did not book any efforts in this module yet
 * @apiSuccess {Object[]} average Array of 1 length: {_id (null), sum (Integer, sum of amounts)} // [] if no one booked any efforts in this module yet
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 * @apiParam {String} moduleid ID of module
 *
 */
router.get('/api/compare/module/:moduleid', compare.compareByModule);
/**
 * @api {get} /api/modules/student/ Get all Modules per Student
 * @apiName GetModules
 * @apiGroup 02 Modules
 *
 * @apiSuccess {String} id ModuleID
 * @apiSuccess {String} name Module Name
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.get('/api/modules/student/', modules.getModulesByStudent);
/**
 * @api {get} /api/efforts/student/ Get efforts by student
 * @apiName Get Efforts (Array) By Student
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {String} _id ID of effort
 * @apiSuccess {Integer} amount Booked time in Minutes
 * @apiSuccess {String} module Module for the effort
 * @apiSuccess {String} createdBy Creator of the effort (Matricularnr)
 * @apiSuccess {String} type ID of Type of the effort
 * @apiSuccess {String} bookingDate Date on which the effort was booked
 * @apiSuccess {String} performanceDate Date on which the effort was done
 * @apiSuccess {String} [place] Place of the effort, empty if not set
 * @apiSuccess {String} [material] Material of the effort, empty if not set
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.get('/api/efforts/student/', efforts.getEffortsByStudent);
/**
 * @api {get} /api/efforts/:effortid Get effort by ID
 * @apiName Get Effort By ID
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {String} _id ID of effort
 * @apiSuccess {Integer} amount Booked time in Minutes
 * @apiSuccess {String} module Module for the effort
 * @apiSuccess {String} createdBy Creator of the effort (Matricularnr)
 * @apiSuccess {String} type ID of Type of the effort
 * @apiSuccess {String} bookingDate Date on which the effort was booked
 * @apiSuccess {String} performanceDate Date on which the effort was done
 * @apiSuccess {String} [place] Place of the effort, empty if not set
 * @apiSuccess {String} [material] Material of the effort, empty if not set
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.get('/api/efforts/:effortid', efforts.getEffortById);
/**
 * @api {get} /api/efforts/module/:moduleid/ Get efforts by module and student
 * @apiName Get Efforts (Array) By Module
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {String} _id ID of effort
 * @apiSuccess {Integer} amount Booked time in Minutes
 * @apiSuccess {String} module Module for the effort
 * @apiSuccess {String} createdBy Creator of the effort (Matricularnr)
 * @apiSuccess {String} type ID of Type of the effort
 * @apiSuccess {String} bookingDate Date on which the effort was booked
 * @apiSuccess {String} performanceDate Date on which the effort was done
 * @apiSuccess {String} [place] Place of the effort, empty if not set
 * @apiSuccess {String} [material] Material of the effort, empty if not set
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.get('/api/efforts/module/:moduleid/', efforts.getEffortsByModule);

/**
 * @api {get} /api/efforttypes Get all Effort types
 * @apiName Get Effort Types
 * @apiGroup 03 Efforts
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.get('/api/efforttypes', efftypes.getAllTypes);

/**
 * @api {post} /api/efforts Save new effort
 * @apiName Create Effort
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {Boolean} success true, if module was saved
 * @apiSuccess {String} id ID of effort
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 * @apiParam {Integer} amount Booked time in Minutes, in Body
 * @apiParam {String} moduleid Module for the effort, in Body
 * @apiParam {String} efforttypeid Type of the effort, in Body
 * @apiParam {String} performancedate Date on which the effort was done (YYY-MM-DD), in Body
 * @apiParam {String} [place] Place of the effort, empty if not set, in Body
 * @apiParam {String} [material] Material of the effort, empty if not set, in Body
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "amount":"20",
 *      "moduleid":"b7423cd5bee2b26c685d84d1ef5868174dfdefb2",
 *      "efforttypeid":"56257c4c1f7b6687091d2c06",
 *      "performanceDate":"2014-10-05",
 *      "place":"Bibliothek",
 *      "material":"Buch"
 *  }
 *
 */

router.post('/api/efforts/', efforts.createEffort);
/**
 * @api {put} /api/efforts/:effortid Update existing effort
 * @apiName Update Effort
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {Boolean} success true, if module was saved
 * @apiSuccess {String} id ID of effort
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 * @apiParam {Integer} amount Booked time in Minutes, in Body
 * @apiParam {String} efforttypeid Type of the effort, in Body
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "amount":"20",
 *      "efforttypeid":"56257c4c1f7b6687091d2c06",
 *      "performanceDate":"2014-10-05"
 *  }
 *
 */

router.put('/api/efforts/:effortid', efforts.updateEffort);
/**
 * @api {put} /api/students/:studentid Update existing student (privacy)
 * @apiName Update Student
 * @apiGroup 04 Students
 *
 * @apiSuccess {Boolean} success true, if student was updated
 * @apiSuccess {String} id ID of student
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 * @apiParam {Integer} studentid ID of Student (not Matricular-#!)
 * @apiParam {Boolean} privacyflag True or False, in Body 
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "privacyflag":true
 *  }
 *
 */
router.put('/api/students/:studentid', students.updateStudent);
/**
 * @api {delete} /api/efforts/:effortid Delete existing effort
 * @apiName Delete Effort
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {Boolean} success True if module was deleted
 * @apiSuccess {String} id ID if Effort was deleted
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */

router.delete('/api/efforts/:effortid', efforts.deleteEffort);

/**
 * @api {delete} /api/efforts Delete all efforts
 * @apiName Delete all efforts
 * @apiGroup 03 Efforts
 *
 * @apiSuccess {Boolean} success True if all modules were deleted
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.delete('/api/efforts', efforts.deleteAllEfforts);

/**
 * @api {delete} /api/students/ Delete Student
 * @apiName Delete Student
 * @apiGroup 04 Students
 *
 * @apiSuccess {Boolean} success True if successfully deleted
 * @apiSuccess {String} ID ID of deleted Student
 *
 * @apiHeader x-session Session ID
 * @apiHeader x-key User ID (NOT Matricular-#!)
 *
 */
router.delete('/api/students', students.deleteStudent);

module.exports = router;
