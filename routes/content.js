console.log('yo from routes/content.js');

var PostsDAO = require('../posts').PostsDAO
  , sanitize = require('validator').sanitize; // Helper to sanitize form input

var UsersDAO = require('../users').UsersDAO;
var GlobalDAO = require('../global').GlobalDAO;


/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
	"use strict";

	var posts = new PostsDAO(db);
	var users = new UsersDAO(db);
	var global = new GlobalDAO(db);


	var newScore; //updated global score 
	var ownedPosts ='hi';//updated global owned projects 




	this.displayMainPage = function(req, res, next) {
		"use strict";

		posts.getAll(200, req.username, req.route.path, function(err, results) {
			"use strict";
			if (err) return next(err);

			posts.makePercentages(req.username, results, function(err, post) {
				"use strict";

				if (err) return next(err);

				//if (!post) return res.redirect("/profile"); 
			});
	

			return res.render('blog_template', {
				title: 'blog homepage',
				username: req.username,
				myposts: results,
				users: users,//
				score: newScore
			});
		});
	}
	
	this.displayMainPageBySearchWords = function(req, res, next){
		"use strict"

		console.log('displayMainPageBySearchWords');
	
		var search = req.url; 

		var search = search.split('=')[1];
		var search = search.split('+');

		console.log(search);
		
		posts.getPostBySearchWords(search, 20, function(err, results) {
			"use strict";

			if (err) return next(err);
		
			return res.render('blog_template', {
				title: 'blog homepage',
				username: req.username,
				myposts: results
			});
		});
    	}		

	this.displayProfilePage = function(req, res, next) {
		"use strict";

		posts.getPosts(20, req.username, req.route.path, function(err, results) {
		"use strict";

			posts.makePercentages(req.username, results, function(err, post) {
                	"use strict";

				//console.log('make% called');
				if (err) return next(err);

                	});

			if (err) return next(err);
			return res.render('profile', {
				title: 'profile',
				username: req.username,
				myposts: results,
			});
		});
	}


 
	this.displayStudentsPage = function(req, res, next){
		"use strict"
		console.log(req);
		var title = req.params.title;
		console.log(req.params);
		console.log(title);
		console.log(req.route.path)
		
		posts.getStudents(20,  title, req.route.path, function(err, results) {
			"use strict";
			if (err) return next(err);
			return res.render('students', {
				title: title,
				username: req.username,
				myposts: results
			});
		});
	}


	this.displayEditPage = function(req, res, next){
		"use strict"
		var title = req.params.title;

		console.log('title '+title);

		users.getTitles(req.username, function (err, titles){
				"use strict";
				if(err) return next(err);
				ownedPosts = titles;
				console.log("content.js newScore "+ titles);		


			posts.getSubject(20, req.username, title, req.route.path, function(err, results) {
				"use strict";
				if (err) return next(err);

				return res.render('edit', {
					title: title,
					username: req.username,
					myposts: results,
					owner: JSON.stringify(titles)
				});
			});
		});
	}


	this.updateWords = function(req, res, next) {
		"use strict" 

		console.log('updateWords');
		console.log(req.body);
		console.log(req.params.permalink);
		console.log(req.params); 

		var permalink = req.params.permalink;
		var class_number = parseInt(req.params.class_number); 
		var obj = req.body;
		//var score = req.body.score;
		//var content = req.body.content;
		//var title = req.body.title;

		posts.wordsStrength(permalink, class_number, obj, function(err, post) {
			"use strict" 
			if (err) return next(err);
			if (!post) return res.redirect("/post_has_not_been_found");
		});

		/*users.updateScore(req.username, obj, function(err, post) {
			"use strict"
			if (err) return next(err);
			if (!post) return res.redirect("/post_has_not_been_found");
		});*/
		global.updateAnsRem(obj, function(err, post) {
			"use strict"
			if (err) return next(err);
			if (!post) return res.redirect("/post_has_not_been_found");
		});
		
	}	



	this.updateImage = function(req, res, next){
		"use strict"

		console.log('updateImage');
		console.log(req.body);

		var permalink = req.params.permalink; 
		var class_number = parseInt(req.params.class_number); 
		var obj = req.body;
		//var score = req.body.score;

		posts.imageStrength(permalink, class_number, obj, function(err, post) {  ///Set image strength, ans, rem, and Date.now().")
		       "use strict" 
        	    if (err) return next(err);
	            if (!post) return res.redirect("/post_has_not_been_found");
		});

		/*users.updateScore(req.username, obj, function(err, post) { ///Updates user's stats.")
			"use strict"
			if (err) return next(err);
			if (!post) return res.redirect("/post_has_not_been_found");
		});*/

		global.updateAnsRem(obj, function(err, post) { ///Updates the global total answers and reminders.") 
			"use strict"
			if (err) return next(err);
			if (!post) return res.redirect("/post_has_not_been_found");
		});


	}




/*
	this.findNextPost = function(req, res, next){
		"use strict" 

		var permalink = req.params.permalink;

         	posts.findThisPermalink(permalink, function(err, post) {
                	"use strict";

                	if (err) return next(err);
	                if (!post) return res.redirect("/post_not_found");

			if(post.student == req.username){
				var query = {'_id': {'$gt': post._id}, 'student':req.username}; 
			} else {
				var query = {'_id': {'$gt': post._id}, 'student': {'$ne' : req.username } }; 

			}

			posts.findNextPermalink(query, function(err, post) {
                	"use strict";

				if (err) return next(err);
				if (!post) return res.redirect("/post/"+permalink); //if no more posts stay on last post
				return res.redirect("/post/"+post.permalink); 

                	});
                 });


	}




	this.findPreviousPost = function(req, res, next){
		"use strict" 
		var permalink = req.params.permalink;


         	posts.findThisPermalink(permalink, function(err, post) {
                	"use strict";

                	if (err) return next(err);
	                if (!post) return res.redirect("/post_not_found");

			if(post.student == req.username){
				var query = {'_id': {'$lt': post._id}, 'student':req.username}; 
			} else {
				var query = {'_id': {'$lt': post._id}, 'student': {'$ne' : req.username } }; 
			}

			posts.findPreviousPermalink(query, function(err, post) {
                	"use strict";

				if (err) return next(err);
				if (!post) return res.redirect("/post/"+permalink); //if no more posts stay on first post 
				return res.redirect("/post/"+post.permalink); 
                	});
                 });


	}

*/



	

    this.displayPostByPermalink = function(req, res, next) {
        "use strict";
	console.log('');
	console.log('displayPostByPermalink');

        //var permalink = req.params.permalink;
	console.log(req.params)
	console.log(req.url)
	
		var w = req.cookies.width * .8;// - 90;
		var h = req.cookies.height * .8;// - 90;


        posts.getPostByPermalink(req, function(err, post, p) {
            "use strict";


		console.log('getPostByPermalink');
		console.log(post);
		console.log('');


		
		if(post){	

			if('image_path' in post){ ///It is an image.)"
				var url_parts = post.image_path.replace(/\/\s*$/,'').split('/');

				var temp_pic = url_parts[2];

				var fs = require('fs');
				var gm = require('gm').subClass({ imageMagick: true });
					
				console.log(" Resize images to the dimensions the browser window;")
				console.log(req.cookies.width + " " + req.cookies.height);
				console.log(w + " " + h);

				gm('public/images/'+temp_pic)
				.scale(w, h) //.resize
				.stream(function (err, stdout, stderr) {
				  var writeStream = fs.createWriteStream('public/temp_pics/'+temp_pic); ///Sends image to public/temp_pics;.")
				  stdout.pipe(writeStream);
					 if (err) console.log(err);
				});
			};
		}

       		if (err) return next(err);
	        if (!post) return res.redirect("/post_has_not_been_found");

            	// init comment form fields for additional comment
 	        var comment = {'name': req.username, 'body': "", 'email': ""}
	


			var oneOfTheStudents;	

			if(p === null){ 
				oneOfTheStudents = 'no'
			}else{  oneOfTheStudents = 'yes'}

	
			return res.render('entry_template', {
				title: 'nikos post',
				username: req.username,
				post: post,
				comment: comment,
				errors: "",
				follower: post.student,
				isStudent: oneOfTheStudents
			});

        });

    }


   this.displayPostNotFound = function(req, res, next) {
        "use strict";
        return res.send('Sorry, post not found', 404);
    }


    this.displayNewPostPage = function(req, res, next) {
        "use strict";

        if (!req.username) return res.redirect("/login");
	
	users.getTitles(req.username, function (err, titles){
			"use strict";
			if(err) return next(err);
			ownedPosts = titles;
			console.log("content.js newScore "+ titles);		
		

		return res.render('newpost_template', {
		    subject: "",
		    body: "",
		    errors: "",
		    tags: "",
		    username: req.username,
		    score: newScore,
		    owner: JSON.stringify(titles)
		});
	});

    }

    function extract_tags(tags) {
        "use strict";

        var cleaned = [];
        var tags_array = tags.split(',');

        for (var i = 0; i < tags_array.length; i++) {
            if ((cleaned.indexOf(tags_array[i]) == -1) && tags_array[i] != "") {
                cleaned.push(tags_array[i].replace(/\s/g,''));
            }
        }
        return cleaned
    }



	this.displayTagsPage = function(req, res, next){
		"use strict"

		console.log('displayTagsPage');
		posts.getTags(req, function(err, tagNames){
			"use strict"
			if(err) return next(err);

			console.log('tagNames');			
			console.log(tagNames);

			return res.render('tags_template', {
			    subject: "",
			    body: "",
			    errors: "",
			    allTags: JSON.stringify(tagNames),
			    username: req.username,
			    score: newScore
			});
		});
	}




    this.handleNewPost = function(req, res, next) {
        "use strict";

        if (!req.username) return res.redirect("/signup");

        var title = req.body.subject.trim();

        if (!title) {
            var errors = "Post must contain a title";
            return res.render("newpost_template", {subject:title, username:req.username, body:req.body, tags:req.tags, errors:errors});
        }

		///Validiate user's subject name availability.")
		
		users.findAllSubjectNames(title, req.username, function(err, doc){
			"use strict"
			if(err) return next(err);

			//return res.redirect("/newpost") //res.render("newpost_template", {subject:title, username:req.username, body:req.body, tags:req.tags, errors:errors});
			if(doc === null){
				var errors = "Subject name already taken! Choose another!";

				return res.render("newpost_template", {subject:title, username:req.username, body:req.body.body, tags:req.tags, errors:errors});
			} else {
				classNumber(title, req, res, next);
				return res.redirect("/profile");	
			}
		}); 
	
	}


	function classNumber(title, req, res, next) {		
		users.findClassNumber(title, req.username, function(err, dok){
			"use strict";
			if(err) return next(err)
			if(dok === null){ ///Very first post with this title.")
				var first = 'yes';
				var students = [req.username];
				var number_of_classes = 0;
				var class_number = 0; 
				//var permalink = title.replace( /\s/g, '_' );

				users.createSubject(req.username, title, function(err, own){ ///Adds title to user.")
					"use strict";
					if (err) return next(err);
				});


			} else { ///Not first post with this title. Find students.")
				for(var t=0; t<dok.teacher.length; t++){
					if(dok.teacher[t].subject == title){

						var students = dok.teacher[t].students;
						var number_of_classes = dok.teacher[t].number_of_classes;
						var class_number = dok.teacher[t].number_of_classes;
						//var permalink = title.replace( /\s/g, '_' );
						//permalink = permalink.replace( /\W/g, '' )+'_'+dok.teacher[t].student;///Adds username to permalink.");
						
						console.log('in classNumber');
						console.log(dok.teacher[t]);
						console.log(class_number);	
						//console.log(permalink);
						console.log('');

					}	
				}
			}
			newPost(req, res, next, title, first, students, number_of_classes, class_number);
		});

    	}



	function newPost(req, res, next, title, first, students, number_of_classes, class_number) { 	

		console.log('newPost ');
		console.log(class_number);
		console.log('');
		console.log('');
		console.log('');
		console.log('');
		console.log('');



		console.log(req.body);

 		console.log('');
		console.log('');
		console.log('');
		console.log('');
		console.log('');
		console.log('');
		console.log('');
		console.log('');
		console.log('');

		//var c = 0;
		var tags = req.body.tags
		var tags_array = extract_tags(tags)

		var permalink = title.replace( /\s/g, '_' );
		//permalink = permalink.replace( /\W/g, '' )+'_'+Math.floor(Math.random() * 100)*Date.now();







		///IMAGES//////////////////////")
		var fs = require('fs');///We need the fs module for moving the uploaded files.")

		for(var i=0; i<req.files.image.length; i++){ ///Uploads multiple images.")

			if(req.files.image[i].size != 0){
				
				var tmp_path = req.files.image[i].path;// get the temporary location of the file
				var target_path = './public/images/'+req.files.image[i].name;// set where the file should actually exists - in this case it is in the "images" directory
				var image_path = '../images/'+req.files.image[i].name;
				
				for(var f=0; f<students.length; f++){ 
						
					posts.insertImage(title, image_path, tags_array, req.username, students[f], class_number, 'yes', permalink, function(err, permalink) {
						"use strict";
						if (err) return next(err);
					});
					//class_number++;			
				}
				class_number++;			

				fs.rename(tmp_path, target_path, function(err) {// move the file from the temporary location to the intended location
					if (err) throw err;

					fs.unlink(tmp_path, function() {// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
					    if (err) throw err;
					   // res.send('File uploaded to: ' + target_path + ' - ' + req.files.image[i].size + ' bytes');
					});
				});




				var gm = require('gm').subClass({ imageMagick: true });	
				gm(target_path).size(function (err, size) {//shrinks and replaces large images
				  if (size.width > 700 || size.height > 700) {  
					gm(target_path).scale(700, 700).autoOrient().write(target_path, function (err) {
					  if (!err) console.log('shrunk! ');
					});
				  }
				});

			} else {
				var tmp_path = req.files.image[i].path;
				fs.unlink(tmp_path, function (err) {
					if (err) throw err;
					console.log('successfully deleted /tmp/hello');
				});
			}

		}
			

		///TEXT/////////////////")
		var post = req.body.body;

		if(post){///Run if post isn't empty.) 



			var sentences_Arr = post.match(/[^\s.!?]+[^.!?\r\n]+[.!?]*/g);///Turns body into sentences array.")
		
				
			var total_Arr = []; 

			for( var s=0; s<sentences_Arr.length; s++){ ///Splits up big sentences into smaller ones.") 
				var short_Arr = sentences_Arr[s].match(/.{1,200}/g);
				for(var r=0; r<short_Arr.length; r++){
					total_Arr.push(short_Arr[r]); 
				}
			}
			
			
			var numberOfSentences = req.body.numberOfSentences; ///How many sentences are displayed.)"

			while(total_Arr.length > 0){
				var posting = total_Arr.splice(0, numberOfSentences).join(' ');				

				for( var b=0; b<students.length; b++){
					posts.insertEntry(title, posting, tags_array, req.username, students[b], class_number, 'yes', permalink, function(err, permalink) {
						"use strict";
						if (err) return next(err);
					});
				}
			class_number++;			
			}
			
			

/*
			for( var t=0; t<total_Arr.length; t++){ ///Upload sentence posts.")
				for( var b=0; b<students.length; b++){
					posts.insertEntry(title, total_Arr[t], tags_array, req.username, students[b], class_number, 'yes', permalink, function(err, permalink) {
						"use strict";
						if (err) return next(err);
					});
				//class_number++;			
				}
			class_number++;			
			}
*/
			
		}
	
		users.incrementClassNumber(title, req.username, class_number, 
			function(err) {
				"use strict";
				if (err) return next(err);
		}); 

		console.log('end of newPost ');
		console.log(class_number);
		console.log('');

		//return res.redirect("/"); 
	}





	this.forgetSubject = function(req, res, next){ ///Forget All Button.")
		"use strict"
		console.log('in here');
		var title = req.params.title; 
		var username = req.username; 
		posts.deleteSubject(title, username, function(err, post) {
	       		"use strict" 
			if (err) return next(err);
		});
		users.removeSubject(title,  username, function(err, post) {
	       		"use strict" 
			if (err) return next(err);
 		       	return res.redirect('/profile');
		});

	}




	this.forgetPost = function(req, res, next) {  ///Forget Button.")
		"use strict";
		var permalink = req.params.permalink; 
		var class_number = req.params.class_number;
		class_number = parseInt(class_number);
		var title = req.params.title;
		var username = req.username; 

		posts.deletePost(title, class_number, function(err, post) {
       			"use strict" 
			if (err) return next(err);
			forgetOwnMemry(title, username, post, class_number);
 		        return res.redirect('/profile');
		});

	
	}

		
	function forgetOwnMemry(title, username, doc, class_number) {

		users.decrementNumberOfClasses(title, username, function(err, doc){
			"use strict"
			if (err) return next(err);					
		}); 

		posts.decrementClassNumber(title, username, class_number, function(err, dox){  ///Descreases classnumber by 1.");
			"use strict"
			if (err) return next(err);
		}); 


	}



	this.rememberText = function(req, res, next){
		var permalink = decodeURIComponent(req.params.permalink);

		posts.copyEntry(permalink, req.username, function(err, new_permalink) {
			"use strict";
			if (err) return next(err); 
		});
		return res.redirect("/profile");	
	}


	this.rememberImg = function(req, res, next){
		var permalink = decodeURIComponent(req.params.permalink);

		posts.copyImage(permalink, req.username, function(err, new_permalink) {
			"use strict";	
			if (err) return next(err); 
		});
		return res.redirect("/profile");
	}






	this.followSubject = function(req, res, next){	///Enroll button.");

		console.log('in follow');

		console.log(req.params);

	//	if(req.params has the word "join" then do some shit 


		var title = decodeURIComponent(req.params.title);
		var permalink = title.replace( /\s/g, '_' );
		//permalink = permalink.replace( /\W/g, '' )+'_'+req.username;///Adds username to permalink.");

		users.addStudent(title, req.username, function(err, doc) {  ///Adds username to students array.");
			"use strict"
			if(err) return next(err);
			console.log(doc);
			var author = doc._id;	


			posts.newStudent(title, req.username, author, function(err, old) {  ///Find old memries that belong to the original author.");
				"use strict"
				console.log('in followSubject');
				console.log(old);
				console.log('');

				//grab parameter and decide if i'm going to make copies or insert new.  student or audit? 
				if(err) return next(err);				
				for(var m=0; m<old.length; m++){  ///Adds memries to new students profile.") 
					if(old[m].image_path){
						posts.insertImage(old[m].title, old[m].image_path, old[m].tags, old[m].author, req.username, old[m].class_number, 'no', permalink,
							function(err, whyDoI) {
								"use strict";
								if (err) return next(err);
						});
					} else if (old[m].body){
						posts.insertEntry(old[m].title, old[m].body, old[m].tags, old[m].author, req.username, old[m].class_number, 'no', permalink,
							function(err, needThis) {
								"use strict";
								if (err) return next(err);
						});
					} else {console.log("SOMETHIN IS FUKKED!")}
				}
			});


		});
		return res.redirect("/profile");
	}



	
	this.saveEdits = function(req, res, next){
		"use strict" 

		console.log('saved editing');
		console.log(req.body);
		console.log(req.username);
		console.log(req.params.title);

		var title = req.params.title;

		posts.getStudentNames(req.username, title, function (err, allNames){
			"use strict"
			var arr = req.body.order.split(',');
			console.log(arr);
			console.log('allNames');
			console.log(allNames);
			console.log(allNames.length);
			var names = []; 
			for(var a=0; a<allNames.length; a++){
				if(allNames[a].students.length > names.length){
					names = allNames[a].students;
					console.log(names);
				} 
			}
			
			for(var n=0; n<names.length; n++){
				var student = names[n];
				var b = 0;	
				for(var a=0; a<arr.length; a++){
					if(arr[a] != ''){
						posts.updateEdits(title, arr[a], b, student, function(err, whateva){
							"use strict"
							if(err) return('scream!');	
						});				
						b++;
					}	
				}				
			}
		});
	};
	






    this.handleNewComment = function(req, res, next) {	//CLEAN THIS SHIT UP
        "use strict";
        var name = req.body.commentName;
        var email = req.body.commentEmail;
        var body = req.body.commentBody;
        var permalink = req.body.permalink;

        // Override the comment with our actual user name if found
        if (req.username) {
            name = req.username;
        }

        if (!name || !body) {
            // user did not fill in enough information

            posts.getPostByPermalink(permalink, function(err, post) {
                "use strict";

                if (err) return next(err);

                if (!post) return res.redirect("/post_not_found");

                // init comment form fields for additional comment
                var comment = {'name': name, 'body': "", 'email': ""}

                var errors = "Post must contain your name and an actual comment."


                return res.render('entry_template', {
                    title: 'blog post',
                    username: req.username,
                    post: post,
                    comment: comment,
                    errors: errors
                });
            });

            return;
        }

       /* // even if there is no logged in user, we can still post a comment
        posts.addComment(permalink, name, email, body, function(err, updated) {
            "use strict";
            if (err) return next(err);
            if (updated == 0) return res.redirect("/post_not_found");
            return res.redirect("/post/" + permalink);
        });*/
    }


	this.displayMainPageByTag = function(req, res, next) {
		"use strict";

		var tag = req.params.tag;

		posts.getPostsByTag(tag, 20, function(err, results) {
			"use strict";
			if (err) return next(err);

			return res.render('blog_template', {
				title: 'blog homepage',
				username: req.username,
				myposts: results
			});
		});
	}



}

module.exports = ContentHandler;


/*
	this.displayMainPageByRemembered = function(req, res, next) {
		"use strict";

		posts.getPostsByRemembered(20, function(err, results) {
			"use strict";

			if (err) return next(err);
			return res.render('blog_template', {
				title: 'blog homepage',
				username: req.username,
				myposts: results,
				score:  newScore
			});
		});
    	} 


//getTopRemembered

	this.displayProfilePageByRemembered = function(req, res, next) { 
		"use strict";

		posts.getProfilePostsByRemembered(20, req.username, function(err, results) {
			"use strict";

			if (err) return next(err);
			return res.render('profile', {
				title: 'blog homepage',
				username: req.username,
				myposts: results,
				score:  newScore
			});
		});
    	}

*/



/*
	this.displayMainPageByTop = function(req, res, next) {
		"use strict";
		posts.getTopRemembered(20, req, "main", function(err, results) {
			"use strict";
			if (err) return next(err);
			return res.render('blog_template', {
				title: 'blog homepage',
				username: req.username,
				myposts: results,
			});
		});
    	} 
	this.displayProfilePageByTop = function(req, res, next) { 
		"use strict";
		posts.getTopRemembered(20, req, "profile", function(err, results) {
			"use strict";
			if (err) return next(err);
			return res.render('profile', {
				title: 'profile_page',
				username: req.username,
				myposts: results,
			});
		});
    	}
	this.displayEditPageByTop = function(req, res, next) { 
		"use strict";
		posts.getTopRemembered(20, req, "edit", function(err, results) {
			"use strict";
			if (err) return next(err);
			return res.render('edit', {
				title: 'edit_page',
				username: req.username,
				myposts: results,
			});
		});
    	}
	this.displayStudentsPageByTop = function(req, res, next) { 
		"use strict";
		posts.getTopRemembered(20, req, "students", function(err, results) {
			"use strict";
			if (err) return next(err);
			return res.render('students', {
				title: 'students_page',
				username: req.username,
				myposts: results,
			});
		});
    	}

*/






//TRASH








/*

	function forgetOwnMemry(title, username, doc) {

		/*posts.deleteAllClassNumber(title, username, doc, function(err, doc){ ///This allows creator to delete all similar classes regardless of who owns them.");
			"use strict"
			if (err) return next(err);			
		});*/ 

/*		posts.decrementClassNumber(title, username, doc, function(err, dox){  ///Descreases classnumber by 1.");
			"use strict"
			if (err) return next(err);

			posts.decrementPerms(title, username, doc, dox, function(err, dok){  ///Descreases permalinks by 1.");
				"use strict"
				if (err) return next(err);
	
			});			
		}); 
*/

/*
		posts.decrementPermsAndClassNumber(title, username, doc, function(err, dox){  ///Descreases permalinks & classnumber by 1.");
			"use strict"
			if (err) return next(err);
		});
	
*/








/*
	this.saveEdits = function(req, res, next){
		"use strict"
		console.log('saved editing');
		console.log(req.body);
		console.log(req.username);

		console.log('');


		var arr = req.body.order.split(',');
		
		console.log(req.params.title);
		var title = req.params.title;




 		users.getTitles(req.username, function (err, obj){
		posts.getStudents(10000, title, 'blah', function (err, obj){
			"use strict";
			if(err) return next(err);
			console.log("show me this "+ obj);	
			console.log(obj);
			
			console.log(obj.teacher);
			for(var sub=0; sub<obj.teacher.length; sub++){
				console.log(obj.teacher[sub].students);
				for(var stu = 0; stu<obj.teacher[sub].students.length; stu++){
					console.log(obj.teacher[sub].students[stu]);
					var student = obj.teacher[sub].students[stu];

					var b = 0;	
					for(var a=0; a<arr.length; a++){
						if(arr[a] != ''){
							posts.updateEdits(title, arr[a], b, student, function(err, whateva){
								"use strict"
								if(err) return('scream!');	
							});				
							b++;
						}	
					}





				}
				console.log(''); 
			}
	
		});

	}
*/

/*
		for(var a=0; a<arr.length; a++){
			if(arr[a] != ''){
				posts.updateEdits(title, arr[a], b, function(err, whateva){
					"use strict"
					if(err) return('scream!');	
				});				
				b++;
			}	
		}
*/


	
//	}

/*	this.follow = function(req, res, next){	///Follow button")
		var title = decodeURIComponent(req.params.title);

		var newTitle = title.split('_');
		console.log(newTitle[0]);
		console.log('newTitle');


		var copyLinks = [];
		posts.becomeFollower(title, req.username, function(err, doc){ ///Adds username to students array in roster")
			"use strict"
			if(err) return next(err);
			if(doc[0] && doc[0].old_permalink){
				for(var c=0; c<doc.length; c++){
					copyLinks.push(doc[c].old_permalink);
				}
				console.log('copies');
				console.log(copyLinks);
				console.log(doc);
			}
				console.log('copyLinks');
				console.log(copyLinks);

			console.log('  ');
		});
		copyOlder(title, copyLinks, req.username); ///Pass older memries to copyOlder()")
		return res.redirect("/profile");
	}	

	function copyOlder(title, copyLinks, username){  
		posts.copyMemries(title, username, function(err, doc){ 
			"use strict"		
			if(doc[0] && doc[0].permalink){		
				for(var o=0; o<doc.length; o++){							
					if(copyLinks.indexOf(doc[o].permalink) == -1){ ///If user doesn't already own memry copy it")
						if(doc[o].image_path){
							posts.copyImage( doc[o].permalink, username, function(err, permalink) { 
								"use strict";
								if (err) return next(err); 
							});
						} else {
							posts.copyEntry( doc[o].permalink, username, function(err, permalink) {
								"use strict";
								if (err) return next(err); 
							});
							
						}
					}
				}
				console.log('original');
				console.log(doc);
			}
		});
	}






			/*
			if(follow == 2){ ///Finds memries with title that user already owns") 
				var some = all;
				for(var p=0; p<some.length; p++){
					someLinks.push(some[p].permalink);
				}	
			}
			if(follow == 3){
				for(var q=0; q<all.length; q++){
					if(someLinks.indexOf(all[q].permalink) == -1 ){	///If user doesn't already own memry copy it")
						console.log(all[q].image_path);
						console.log('image path above');
						if(all[q].image_path){
							posts.copyImage( all[q].permalink, req.username, function(err, permalink) { 
								"use strict";
								if (err) return next(err); 
							});
						} else {
							posts.copyEntry( all[q].permalink, req.username, function(err, permalink) {
								"use strict";
								if (err) return next(err); 
							});
						}
					}		
				}
			}
			*/


/*	this.follow = function(req, res, next){	///Follow button")
		var title = decodeURIComponent(req.params.title);
		console.log('title '+title);
		var follow = 0;
		posts.becomeFollower(title, req.username, function(err, all){ ///Adds username to followers array in roster")
			"use strict"
			if(err) return next(err);
			follow++;
			var someLinks = [];
			if(follow == 2){ ///Finds memries with title that user already owns") 
				var some = all;
				for(var p=0; p<some.length; p++){
					someLinks.push(some[p].permalink);
				}	
			}
			if(follow == 3){
				for(var q=0; q<all.length; q++){
					if(someLinks.indexOf(all[q].permalink) == -1 ){	///If user doesn't already own memry copy it")
						console.log(all[q].image_path);
						console.log('image path above');
						if(all[q].image_path){
							posts.copyImage( all[q].permalink, req.username, function(err, permalink) { 
								"use strict";
								if (err) return next(err); 
							});
						} else {
							posts.copyEntry( all[q].permalink, req.username, function(err, permalink) {
								"use strict";
								if (err) return next(err); 
							});
						}
					}		
				}
			}
		});
		return res.redirect("/profile");
	}
*/


