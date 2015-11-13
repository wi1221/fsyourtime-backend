define({ "api": [  {    "type": "post",    "url": "/login",    "title": "Login",    "name": "Login",    "group": "01_General",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "optional": false,            "field": "username",            "description": "<p>FSCampus Username</p> "          },          {            "group": "Parameter",            "optional": false,            "field": "password",            "description": "<p>FSCampus Password</p> "          },          {            "group": "Parameter",            "optional": false,            "field": "syncdata",            "description": "<p>If &quot;true&quot;, modules will be fetched from efiport</p> "          }        ]      },      "examples": [        {          "title": "Example",          "content": "{\n  \"username\": \"user\",\n  \"password\": \"pass\",\n  \"syncdata\": true\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>SessionID</p> "          },          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>True if login worked</p> "          },          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "privacy",            "description": "<p>True if the User has previously accepted privacy statement</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "01_General",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/login"      }    ]  },  {    "type": "post",    "url": "/logout",    "title": "Logut",    "name": "Logout",    "group": "01_General",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>SessionID</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "01_General",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/logout"      }    ]  },  {    "type": "get",    "url": "/api/modules/student/",    "title": "Get all Modules per Student",    "name": "GetModules",    "group": "02_Modules",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ModuleID</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "name",            "description": "<p>Module Name</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "02_Modules",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/modules/student/"      }    ]  },  {    "type": "post",    "url": "/api/efforts",    "title": "Save new effort",    "name": "Create_Effort",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>true, if module was saved</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID of effort</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "moduleid",            "description": "<p>Module for the effort, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "studentid",            "description": "<p>Creator of the effort, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "efforttypeid",            "description": "<p>Type of the effort, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "performancedate",            "description": "<p>Date on which the effort was done (YYY-MM-DD), in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set, in Body</p> "          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"amount\":\"20\",\n    \"moduleid\":\"b7423cd5bee2b26c685d84d1ef5868174dfdefb2\",\n    \"studentid\":\"1234567\",\n    \"efforttypeid\":\"56257c4c1f7b6687091d2c06\",\n    \"performanceDate\":\"2014-10-05\",\n    \"place\":\"Bibliothek\",\n    \"material\":\"Buch\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts"      }    ]  },  {    "type": "delete",    "url": "/api/efforts/:effortid",    "title": "Delete existing effort",    "name": "Delete_Effort",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>True if module was saved</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID if Effort was deleted</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts/:effortid"      }    ]  },  {    "type": "delete",    "url": "/api/efforts",    "title": "",    "name": "Delete_all_efforts",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>True if all modules were deleted</p> "          },          {            "group": "Success 200",            "type": "<p>Number</p> ",            "optional": false,            "field": "count",            "description": "<p>Number of deleted efforts</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts"      }    ]  },  {    "type": "get",    "url": "/api/efforts/:effortid",    "title": "Get effort by ID",    "name": "Get_Effort_By_ID",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "_id",            "description": "<p>ID of effort</p> "          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "module",            "description": "<p>Module for the effort</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "createdBy",            "description": "<p>Creator of the effort (Matricularnr)</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "type",            "description": "<p>ID of Type of the effort</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "bookingDate",            "description": "<p>Date on which the effort was booked</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "performanceDate",            "description": "<p>Date on which the effort was done</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts/:effortid"      }    ]  },  {    "type": "get",    "url": "/api/efforttypes",    "title": "Get all Effort types",    "name": "Get_Effort_Types",    "group": "03_Efforts",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforttypes"      }    ]  },  {    "type": "get",    "url": "/api/efforts/module/:moduleid/",    "title": "Get efforts by module and student",    "name": "Get_Efforts__Array__By_Module",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "_id",            "description": "<p>ID of effort</p> "          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "module",            "description": "<p>Module for the effort</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "createdBy",            "description": "<p>Creator of the effort (Matricularnr)</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "type",            "description": "<p>ID of Type of the effort</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "bookingDate",            "description": "<p>Date on which the effort was booked</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "performanceDate",            "description": "<p>Date on which the effort was done</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts/module/:moduleid/"      }    ]  },  {    "type": "get",    "url": "/api/efforts/student/",    "title": "Get efforts by student",    "name": "Get_Efforts__Array__By_Student",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "_id",            "description": "<p>ID of effort</p> "          },          {            "group": "Success 200",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "module",            "description": "<p>Module for the effort</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "createdBy",            "description": "<p>Creator of the effort (Matricularnr)</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "type",            "description": "<p>ID of Type of the effort</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "bookingDate",            "description": "<p>Date on which the effort was booked</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "performanceDate",            "description": "<p>Date on which the effort was done</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "matricularnr",            "description": "<p>Creator of the effort (Matricularnr)</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts/student/"      }    ]  },  {    "type": "put",    "url": "/api/updateEffort/:effortid",    "title": "Update existing effort",    "name": "Update_Effort",    "group": "03_Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>true, if module was saved</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID of effort</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "moduleid",            "description": "<p>Module for the effort, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "efforttypeid",            "description": "<p>Type of the effort, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "performancedate",            "description": "<p>Date on which the effort was done (YYY-MM-DD), in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set, in Body</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set, in Body</p> "          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"amount\":\"20\",\n    \"moduleid\":\"b7423cd5bee2b26c685d84d1ef5868174dfdefb2\",\n    \"efforttypeid\":\"56257c4c1f7b6687091d2c06\",\n    \"performanceDate\":\"2014-10-05\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "03_Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/updateEffort/:effortid"      }    ]  },  {    "type": "put",    "url": "/api/students/:studentid",    "title": "Update existing student (privacy)",    "name": "Update_Student",    "group": "04_Students",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>true, if student was updated</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID of student</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>User ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Integer</p> ",            "optional": false,            "field": "studentid",            "description": "<p>ID of Student (not Matricular-#!)</p> "          },          {            "group": "Parameter",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "privacyflag",            "description": "<p>True or False, in Body</p> "          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"privacyflag\":true\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "04_Students",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/students/:studentid"      }    ]  }] });