console.log('USERS.JS');

var bcrypt = require('bcrypt-nodejs');

/* The UsersDAO must be constructed with a connected database object */
function UsersDAO(db) {
	"use strict";

	/* If this constructor is called without the "new" operator, "this" points
	* to the global object. Log a warning and call it correctly. */
	if (false === (this instanceof UsersDAO)) {
		console.log('Warning: UsersDAO constructor called without "new" operator');
		return new UsersDAO(db);
	}

	var users = db.collection("users");

	this.addUser = function(username, password, email, callback) {
		"use strict";

		/// Generate password hash.")
		var salt = bcrypt.genSaltSync();
		var password_hash = bcrypt.hashSync(password, salt);

		/// Create user document.")
		var user = {
			'_id': username, 
			'password': password_hash, 
			'score':0,
			'ans':1,
			'rem':1,
			'teacher':[]
		};

		/// Add email if set.)
		if (email != "") {
			user['email'] = email;
		}

		users.insert(user, function (err, result) {
			"use strict";
			if (!err) {
				console.log("Inserted new user");
				return callback(null, result[0]);
			}
			return callback(err, null);
		});
	}	

	this.validateLogin = function(username, password, callback) {
		"use strict";

		///Callback to pass to MongoDB that validates a user document.")
		function validateUserDoc(err, user) {
			"use strict";
			if (err) return callback(err, null);
			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					callback(null, user);
				}
				else {
				var invalid_password_error = new Error("Invalid password");

				///Set an extra field so we can distinguish this from a db error.")
				invalid_password_error.invalid_password = true;
				callback(invalid_password_error, null);
				}
			} else {
			var no_such_user_error = new Error("User: " + user + " does not exist");
		
			///Set an extra field so we can distinguish this from a db error.")
			no_such_user_error.no_such_user = true;
			callback(no_such_user_error, null);
			}
		}
		users.findOne({ '_id' : username }, validateUserDoc);
	}	


	this.findAllSubjectNames = function(title, user, callback){
		"use strict"
		users.find({},{"teacher.subject":1}).toArray( function(err, result) {
			"use strict"
			if(err) return callback(err, null);

			for(var r=0; r<result.length; r++){	
				for(var t=0; t<result[r].teacher.length; t++){
					if(result[r].teacher[t].subject == title && result[r]._id != user){
						console.log('INVALID!');
						return callback(err, null);					
 				       		//return res.render("newpost_template", {subject:title, username:req.username, body:req.body, tags:req.tags, errors:errors});
					}
				}
			}
			console.log('should NOT show in invalid');				
			return callback(err, result);	
		});
	}


	this.getTitles = function(username, callback){ 
		"use strict"
		if(username){	//PROBLEM WITH NO USERS
			users.findOne({ '_id':username }, function (err, dude){
				"use strict";
				if (err) return callback(err, null);
			
				//var titles = dude.owner;
				var titles = dude.teacher;

				console.log('users.js got title '+titles);

				return callback(err, dude);
			});
		}
		
	}

	


	this.createSubject = function(username, title, callback){ ///Adds subject to user document.")
		"use strict"
		var subjects = {
			'subject':title,
			'number_of_classes':1,
			'students':[username],
		}
		users.update({ '_id':username }, { '$addToSet':{ 'teacher':subjects}}, function (err, results){
			if (err) return callback(err, null);
			return callback(err, results);		
		});
	}








	this.incrementClassNumber = function(title, username, class_number, callback){


		console.log('in incrementClassNumber') 
		console.log('class_number '+class_number);
		console.log('');	

		users.update( { 'teacher.subject':title, '_id':username}, {'$set' : {'teacher.$.number_of_classes' : class_number} },// { '$set':{ 'number_of_classes':class_number } }, 
			function(err, doINeedThis){
				"use strict"
				if(err) return callback(err, null);
				callback(err, doINeedThis); 
		});
	}









	this.findClassNumber = function(title, username, callback){
		"use strict"
		users.findOne({ 'teacher.subject':title, '_id':username}, function(err, dok){
			"use strict"
			if(err) return callback(err, null);
			callback(err, dok); 
		});
	}



	this.decrementNumberOfClasses = function(title, username, callback){ ///Reduce number_of_classes by 1.")
		"use strict"
		users.findAndModify(
			{ 'teacher.subject':title, '_id':username}, 
			[['_id','asc']],
			{ '$inc': { 'teacher.$.number_of_classes':-1 } }, 
			{ new: true },
			function(err, dox){
				"use strict"				
				if (err) return callback(err, null); 
				if(dox){
					for(var z=0; z<dox.teacher.length; z++){ 
						if(dox.teacher[z].number_of_classes <= 0){ ///If number_of_classes <= 0 pull it.")
							users.update({'teacher.subject':title, '_id':username},{ '$pull': {'teacher':dox.teacher[z] } }, 
								function(err, results){
									if (err) return callback(err, null);
									return callback(err, results);		
							});   		
						}
					}
				}
				callback(err, dox);
		});
	
	}






	this.addStudent = function(title, username, callback){
		"use strict"

		users.findAndModify(	///Add user to the followers array.")
			{ 'teacher.subject':title}, 
			[['_id','asc']],
			{ "$addToSet": { "teacher.$.students":username } },
			{ new: true }, 
			function(err, doc){
				console.log(' ');
				console.log(' find & modify ');
				callback(err, doc);
			});
		
	}




	this.removeSubject = function(title, username, callback){	
		users.update(
                   { 'teacher.subject':title, '_id':username},
	           { $pull: { 'teacher':{'subject':title}} },
                   { multi: true },
                 function(err, doINeedThis){
				"use strict"
				if(err) return callback(err, null);
				callback(err, doINeedThis); 
		});
	}



	this.getScore = function(username, callback){	
		"use strict"
		if(username){	//PROBLEM WITH NO USERS
			users.findOne({ '_id':username }, function (err, dude){
				"use strict";
				if (err) return callback(err, null);
				var score = dude.score;	
				return callback(err, score);
			}); 
		}
	}

/*	this.updateScore = function(username, obj, callback){
		"use strict"
		var score = parseInt(obj.score);
		var ans = parseInt(obj.ans);
		var rem = parseInt(obj.rem);

		console.log('updateScore');
		console.log(obj);

		users.update({ '_id':username }, { '$set':{ 'score':score }, '$inc':{ 'ans':ans, 'rem': rem } }, function (err, results){
        		if (err) return callback(err, null);
           	        return callback(err, results);		
		});
	}
*/



}

module.exports.UsersDAO = UsersDAO;
