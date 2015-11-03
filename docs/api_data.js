define({ "api": [  {    "type": "post",    "url": "/api/efforts",    "title": "Save new effort",    "name": "Create_Effort",    "group": "Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>true, if module was saved</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID if effort</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>Student ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "moduleid",            "description": "<p>Module for the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "studentid",            "description": "<p>Creator of the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "efftypeid",            "description": "<p>Type of the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "performancedate",            "description": "<p>Date on which the effort was done</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set</p> "          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"amount\":\"20\",\n    \"moduleid\":\"b7423cd5bee2b26c685d84d1ef5868174dfdefb2\",\n    \"studentid\":\"1234567\",\n    \"efforttypeid\":\"56257c4c1f7b6687091d2c06\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts"      }    ]  },  {    "type": "get",    "url": "/api/efforts/module/:moduleid/:studentid",    "title": "Get efforts by module and student",    "name": "Get_Efforts_By_Module",    "group": "Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>true, if module was saved</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID if effort</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>Student ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "moduleid",            "description": "<p>Module of the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "studentid",            "description": "<p>Creator of the effort</p> "          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"moduleid\":\"b7423cd5bee2b26c685d84d1ef5868174dfdefb2\",\n    \"studentid\":\"1234567\",\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/efforts/module/:moduleid/:studentid"      }    ]  },  {    "type": "put",    "url": "/api/updateEffort/:effortid",    "title": "Update existing effort",    "name": "Update_Effort",    "group": "Efforts",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>true, if module was saved</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ID if effort</p> "          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "optional": false,            "field": "x-session",            "description": "<p>Session ID</p> "          },          {            "group": "Header",            "optional": false,            "field": "x-key",            "description": "<p>Student ID (NOT Matricular-#!)</p> "          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>Integer</p> ",            "optional": false,            "field": "amount",            "description": "<p>Booked time in Minutes</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "moduleid",            "description": "<p>Module for the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "studentid",            "description": "<p>Creator of the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "efftypeid",            "description": "<p>Type of the effort</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "performancedate",            "description": "<p>Date on which the effort was done</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "place",            "description": "<p>Place of the effort, empty if not set</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": true,            "field": "material",            "description": "<p>Material of the effort, empty if not set</p> "          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"amount\":\"20\",\n    \"moduleid\":\"b7423cd5bee2b26c685d84d1ef5868174dfdefb2\",\n    \"studentid\":\"1234567\",\n    \"efforttypeid\":\"56257c4c1f7b6687091d2c06\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "Efforts",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/updateEffort/:effortid"      }    ]  },  {    "type": "post",    "url": "/login",    "title": "Login",    "name": "Login",    "group": "General",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "optional": false,            "field": "username",            "description": "<p>FSCampus Username</p> "          },          {            "group": "Parameter",            "optional": false,            "field": "password",            "description": "<p>FSCampus Password</p> "          },          {            "group": "Parameter",            "optional": false,            "field": "syncdata",            "description": "<p>If &quot;true&quot;, modules will be fetched from efiport</p> "          }        ]      },      "examples": [        {          "title": "Example",          "content": "{\n  \"username\": \"user\",\n  \"password\": \"pass\",\n  \"syncdata\": true\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>SessionID</p> "          },          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "success",            "description": "<p>True if login worked</p> "          },          {            "group": "Success 200",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "privacy",            "description": "<p>True if the User has previously accepted privacy statement</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "General",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/login"      }    ]  },  {    "type": "get",    "url": "/api/modules/student/",    "title": "Get all Modules available in Database",    "name": "GetModules",    "group": "Modules",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "id",            "description": "<p>ModuleID</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "name",            "description": "<p>Module Name</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "Modules",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/api/modules/student/"      }    ]  },  {    "type": "post",    "url": "/logout",    "title": "Logut",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "x-session",            "description": "<p>SessionID</p> "          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "group": "_Users_Kevin_WebstormProjects_fsyourtime_backend_routes_index_js",    "groupTitle": "_Users_Kevin_WebstormProjects_fsyourtime_backend_routes_index_js",    "name": "PostLogout",    "sampleRequest": [      {        "url": "http://backend-dev.kevinott.de/logout"      }    ]  }] });