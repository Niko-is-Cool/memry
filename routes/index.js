console.log('hello from routes/index');

var SessionHandler = require('./session')
  , ContentHandler = require('./content')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);
   
 
	// Middleware to see if a user is logged in
	app.use(sessionHandler.isLoggedInMiddleware);


	// The main page of the blog
	app.get('/', contentHandler.displayMainPage); // contentHandler.displayScore, is cauing problems with login logout //contentHandler.displayScore, 
	app.get('/top', contentHandler.displayMainPage);	

	//Profile Page
	app.get('/profile', contentHandler.displayProfilePage);
	app.get('/profileTop', contentHandler.displayProfilePage);	

	//Add grades
	app.get('/grades', contentHandler.displayMainPage); 
	app.get('/profile/grades', contentHandler.displayProfilePage); 

	//Save edits after sorting 
	app.post('/profile/edit/:title/saveEdit', contentHandler.saveEdits);

	// The main page of the blog, filtered by tag
	app.get('/tag/:tag', contentHandler.displayMainPageByTag);

	//Students Page
	app.get('/profile/students/:title', contentHandler.displayStudentsPage);
	app.get('/profile/students/:title/top', contentHandler.displayStudentsPage);
	
	//Edit Page
	app.get('/profile/edit/:title', contentHandler.displayEditPage); 
	app.get('/profile/edit/:title/top', contentHandler.displayEditPage); 

	//Main page filtered by search words 
	app.get('/find' , contentHandler.displayMainPageBySearchWords);

	//Arrange posts by most remembered 
///	app.get('/remembered',  contentHandler.displayMainPageByRemembered); //Not sure what is wrong. Maybe if there isn't one.  //contentHandler.displayScore, has been removed because I'm not there yet.  //app.get('/remembered',  contentHandler.displayScore, contentHandler.displayMainPageByRemembered);

	//app.get('/top',  contentHandler.displayMainPageByTop); 
	//app.get('/profileTop',  contentHandler.displayProfilePageByTop);
	//app.get('/studentsTop',  contentHandler.displayStudentsPageByTop);
	//app.get('/editTop',  contentHandler.displayEditPageByTop);


	// A single post, which can be commented on
	//app.get("/post/:permalink", contentHandler.displayPostByPermalink); //Add :title here someday instead of split in the back 

	//Gets next and previous posts
	//app.get("/post/next/:permalink", contentHandler.findNextPost); //I could redirect to the next memry --- usabiliyt question. 
	//app.get("/post/previous/:permalink", contentHandler.findPreviousPost);
	

	///Tags Page.")
	app.get("/tags", contentHandler.displayTagsPage);


	app.post('/newcomment', contentHandler.handleNewComment);
	app.get("/post_not_found", contentHandler.displayPostNotFound);

	app.get("/post/:permalink/:class_number", contentHandler.displayPostByPermalink); 	
	app.post("/post/:permalink/:class_number/words", contentHandler.updateWords);//
	app.post("/post/:permalink/:class_number/image", contentHandler.updateImage);//

	app.all("/profile/edit/:title/forgetAll", contentHandler.forgetSubject);
	app.all("/post/forget/:permalink/:title/:class_number", contentHandler.forgetPost);


	app.all("/post/rememberText/:title/:permalink", contentHandler.rememberText);//Copy Text
	app.all("/post/rememberImage/:title/:permalink", contentHandler.rememberImg);//Copy Image


	app.all("/post/follow/:title/:class_number", contentHandler.followSubject);
	//app.all("/post/join/:title", contentHandler.followSubject, contentHandler.joinSubject);  ///THINK ABOUT CLASSES JOINING TOGETHER FOR CURRICULUMS 
	//app.all("/post/join/:title/:permalink", contentHandler.followSubject)
	
	// Displays the form allowing a user to add a new post. Only works for logged in users
	app.get('/newpost', contentHandler.displayNewPostPage);
	app.post('/newpost', contentHandler.handleNewPost);

	// Login form
	app.get('/login', sessionHandler.displayLoginPage);
	app.post('/login', sessionHandler.handleLoginRequest);

	// Logout page
	app.get('/logout', sessionHandler.displayLogoutPage);

	// Welcome page
	app.get("/welcome", sessionHandler.displayWelcomePage);

	// Signup form
	app.get('/signup', sessionHandler.displaySignupPage);
	app.post('/signup', sessionHandler.handleSignup);

	// Error handling middleware
	app.use(ErrorHandler);




/*
app.use(function(req, res, next){
  //whatever you put here will be executed
  //on each request
contentHandler.displayScore;

  next();  // BE SURE TO CALL next() !!
});
*/
	//app.all("*", contentHandler.displayScore);//calls 3 times -bug 


	
	//IMAGES


/*	var path = require('path'),
	    fs = require('fs');
	// ...
	app.post('./uploads', function (req, res) {
    	var tempPath = req.files.file.path,
        	targetPath = path.resolve('./temp_images/image.png');
	    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        	fs.rename(tempPath, targetPath, function(err) {
	            if (err) throw err;
        	    console.log("Upload completed!");
	        });
	    } else {
        	fs.unlink(tempPath, function () {
	            if (err) throw err;
        	    console.error("Only .png files are allowed!");
	        });
	    }
	    // ...
	});


*/
}



