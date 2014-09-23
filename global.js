console.log('GLOBAL.JS');


var crypto = require('crypto');

/* The SessionsDAO must be constructed with a connected database object */
function GlobalDAO(db) {
	"use strict";


	/* If this constructor is called without the "new" operator, "this" points
	* to the global object. Log a warning and call it correctly. */
	if (false === (this instanceof GlobalDAO)) {
	console.log('Warning: GlobalDAO constructor called without "new" operator');
	return new GlobalDAO(db);
	}

	var global = db.collection("global");

	this.updateAnsRem = function(obj, callback) {
		"use strict";

		var rem = parseInt(obj.rem);
		var ans = parseInt(obj.ans); 


		if(rem > 0){
			var operator = { '$inc':{ "total_reminded":rem } }
		} else if (ans > 0){
			var operator = { '$inc':{ "total_answered":ans } }
		} else { throw err };
		global.update({"_id": "GLOBAL"}, operator, function(err, numModified){

			callback(err, numModified);
		});		
	}
}


module.exports.GlobalDAO = GlobalDAO;

