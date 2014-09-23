console.log('POSTS.JS');


/* The PostsDAO must be constructed with a connected database object */
function PostsDAO(db) {
	"use strict";

	/* If this constructor is called without the "new" operator, "this" points
	* to the global object. Log a warning and call it correctly. */
	if (false === (this instanceof PostsDAO)) {
		console.log('Warning: PostsDAO constructor called without "new" operator');
	return new PostsDAO(db);
	}

	var posts = db.collection("posts");







	this.newStudent  = function(title, username, author, callback){
		"use strict"
		posts.remove({"title":title, "student":username}, function(err, numRemoved){   ///Remove all previous memries with same title owned by student.")
			"use strict"
			if (err) return callback(err, null);	
			callback(err, numRemoved);
		});

		posts.find({"title":title, "original":"yes", "author":author}).toArray(function(err, old){	///Find all of user's permalinks with that title.")
			"use strict"
			if (err) return callback(err, null);	

			console.log('in newStudent');
			console.log(old);
			console.log('');

			callback(err, old);
		});

		posts.update({'title':title, 'original':'yes'}, { '$push': { 'students':username }}, {upsert:true, multi:true}, function(err, numUpdated){  ///Pushes new student name into every title.") 
			"use strict"
			if (err) return callback(err, null);	
			callback(err, numUpdated);
			console.log(numUpdated + ' updated');
		});
	}







	this.insertEntry = function (title, body, tags, author, student, class_number, original, permalink, callback) {
		"use strict";
		
		///Make array of search words.")
		var searchWords = [author];
		var title_Arr = title.split(' ');
		for( var t=0; t<title_Arr.length; t++){
			searchWords.push(title_Arr[t].toLowerCase());
		}
		for( var a=0; a<tags.length; a++ ){
			searchWords.push(tags[a].toLowerCase());
		}

		///Make post into word objects.") 
		var body_Arr = body.split(' ');
		var words = []; 
		var date = [Date.now()];
		for( var i=0; i<body_Arr.length; i++ ){
				words.push({ "word":body_Arr[i], "reminded":date, "answered":date, "strength":10000 });
			searchWords.push(body_Arr[i].toLowerCase());
		}	
		//var permalink = permalink + '_' + class_number;

		if(student != author){
			console.log(' ');
			permalink = permalink.replace( /\W/g, '' )+'_'+student;
			console.log('permalink '+permalink);
			console.log(' ');
		}

					

		/// Build a new post.")
		var post = {	
			"title":title,
			"author":author,
			"student":student,
			"students":[student],	
			"current":'',
			"body":body,
			"content":body,
			"permalink":permalink,
			"tags":tags,
			"comments":[],
			"created": Date.now(),
			"words":words,
			"searchWords":searchWords,
			"memorized":1,
			"ans":1,
			"rem":1,
			"original":original,
			"copy":false,
			"class_number":class_number,
			"grade": 1,
			"views":[]
			}

		posts.insert(post, function (err, result) {  ///Insert the new post.")
			"use strict";
			if (err) return callback(err, null);
			callback(err, permalink);
		});
	}

	this.insertImage = function(title, image_path, tags, author, student, class_number, original, permalink, callback){
		"use strict"
	
		///Make array of search words.")
		var searchWords = [author];
		var title_Arr = title.split(' ');
		for( var t=0; t<title_Arr.length; t++){
			searchWords.push(title_Arr[t].toLowerCase());
		}
		for( var a=0; a<tags.length; a++ ){
			searchWords.push(tags[a].toLowerCase());
		}

		//var permalink = permalink + '_' + class_number;

		if(student != author){
			console.log(' ');
			permalink = permalink.replace( /\W/g, '' )+'_'+student;
			console.log('permalink '+permalink);
			console.log(' ');
		}



		var created = Date.now();			
		
		/// Build a new image post.")
		var post = {
			"title":title,
			"author":author,
			"student":student,
			"students":[student],	
			"permalink":permalink,
			"comments":[],
			"tags":tags,
			"created": created,
			"date": Date.now(),
			"image_path":image_path,
			"image_strength":10000,
			"searchWords":searchWords,
			"answered":[Date.now()],
			"reminded":[Date.now()],
			"memorized":1,
			"class_number":class_number,
			"ans":1,
			"rem":1,
			"original":original,
			"copy":false,
			"grade": 1,
			"views":[]
		}

		/// Now insert the new post.")
		posts.insert(post, function (err, result) {
		    "use strict";
		    if (err) return callback(err, null);
		    callback(err, permalink);
		});
	}		


	this.deleteSubject = function(title, username, callback){  //Removes entire memry 
		"use strict"	
		posts.remove({'title':title}, 
			function(err, numRemoved){
				if(err) return callback(err, null);
				console.log(numRemoved+' posts removed');
				callback(err, numRemoved);
			});
	}



	this.deletePost =  function(title, class_number, callback){
		"use strict"

		//console.log(' deletePermalink ');
		//console.log(class_number);
		//console.log(permalink);

		posts.remove({'title':title, 'class_number':class_number}, 
			function(err, num){
				if (err) return callback(err, null);	
				console.log(num +' posts removed.'); 				
				callback(err, num); 					
			}); 
	}



	this.decrementClassNumber =  function(title, username, class_number, callback){   ///Descreases classNumbers by 1.");
		"use strict" 
		console.log(' in here ');
		console.log(title);
		console.log(username);
		console.log(class_number);
	
		posts.update(
			{ 'title':title, 'copy':false, 'class_number':{ '$gt': class_number } }, 
			{ '$inc': { 'class_number':-1 } }, 
			{ multi: true }, 
			function(err, dox){
		      		if (err) return callback(err, null);

				console.log('decclassnumber');

				console.log(dox + ' posts were decremented.');
				
				callback(err, dox); 		
		});
	}



/*	this.deletePermalink =  function(permalink, class_number, callback){
		"use strict"

		console.log(' deletePermalink ');
		console.log(class_number);
		console.log(permalink);


		posts.findAndModify({'permalink': permalink, 'class_number':class_number}, [['_id','asc']],{},{remove :true}, 
			function(err, doc) { 
				"use strict"; 
				if (err) return callback(err, null); 
				callback(err, doc); 
				console.log('');
				console.log(doc);
		});
	}

*/




	this.deleteAllClassNumber = function(title, username, doc, callback){		
			
		posts.remove({ 'title':doc.title, 'copy':false, 'class_number':doc.class_number }, 
			function(err, numRemoved){
		      		if (err) return callback(err, null);					
				callback(err, numRemoved); 		
		});


	}

/*	this.decrementClassNumber =  function(title, username, doc, callback){   ///Descreases classNumbers by 1.");

		posts.update(
			{ 'title':doc.title, 'student':username, 'copy':false, 'class_number':{ '$gt': doc.class_number } }, 
			{ '$inc': { 'class_number':-1 } }, 
			{ multi: true }, 
			function(err, dox){
		      		if (err) return callback(err, null);

				console.log('decclassnumber');

				console.log(dox + ' posts were decremented.');
				
				callback(err, dox); 		
		});
	}



	this.decrementPerms = function(title, username, doc, dox, callback){ ///Descreases permalinks by 1.");

		console.log(' decrementPerms called '); 

		var num = parseInt(doc.class_number);
		for(var i=1; i<=dox; i++){
			console.log('i '+i);
			console.log('findAndModify permalink '+doc.title+'_'+(num+i))
			console.log('permalink_'+(num+i-1))

			posts.findAndModify(   
				{'title': doc.title, 'permalink':doc.title+'_'+(num+i)},
				[['_id','asc']],
				{'$set': {'permalink':doc.title+'_'+(num+i-1)}}, 			
				function(err, doc) { 
					"use strict"; 
					if (err) return callback(err, null); 
					callback(err, doc);

					console.log('findAndModify called');
					console.log('');
					console.log(doc);
				}
			)				
		}
	}

*/


	

	this.decrementPermsAndClassNumber = function(title, username, doc, callback){   ///Descreases classNumbers & permalinks by 1.");

		console.log('');
		console.log('decrementPermsAndClassNumber');		
		console.log(title);
		console.log(doc.permalink);
		var num = parseInt(doc.class_number);
		console.log(num);

		var e; 
		posts.find({'title':title}).count(function (e, total) {
		
			for(var d=num; d<total; d++){
					posts.findAndModify(   
					{'title': doc.title, 'permalink':doc.title+'_'+(d)},
					[['_id','asc']],
					{'$set': {'permalink':doc.title+'_'+(d-1), 'class_number':d-1}}, 			
					function(err, doc) { 
						"use strict"; 
						if (err) return callback(err, null); 
						callback(err, doc);

						if(doc == null){
							console.log('IT IS NULL!!!');
							return;
						}
						else { console.log('findAndModify called'); } 
					})

				}			
			


    		});

	
	}

	this.copyEntry = function (permalink, username, callback) {
        	"use strict";

	        posts.findOne({'permalink': permalink}, function(err, entry) {
        		"use strict";
	        	if (err) return callback(err, null);
		
			var body_Arr = entry.content.split(' ');
			var words = []; 
			var date = [Date.now()];
			for( var i=0; i<body_Arr.length; i++ ){
				words.push({ "word":body_Arr[i], "reminded":date, "answered":date, "strength":10000 });
			}
			var new_permalink = entry.permalink.replace( /\W/g, '' )+'_'+Math.floor(Math.random() * 100)*Date.now();

			/// Copy an old post.")
			var post = {
				"title":new_permalink,
				"author":entry.author,
				"student":username,
				"content":entry.body,
				"body":entry.body,
				"permalink":new_permalink,
				"tags":entry.tags,
				"created": Date.now(),
				"words":words,
				"searchWords":entry.searchWords,
				"ans":1,
				"rem":1,
				"copy":true,
				"class_number":0,
				"grade": 1
				}

			/// Now insert the old post.")
			posts.insert(post, function (err, result) {
				"use strict";
		    		if (err) return callback(err, null);
				callback(err, result);
			}); 
	              	callback(err, entry);
	        });
    	}
	


	this.copyImage = function (permalink, username, callback) {
		"use strict"

		posts.findOne({'permalink': permalink}, function(err, entry) {
			"use strict";
		    	if (err) return callback(err, null);

			var new_permalink = entry.permalink.replace( /\W/g, '' )+'_'+Math.floor(Math.random() * 100)*Date.now();

			/// Copy an old post.")
			var post = {
				"title":new_permalink,
				"author":entry.author,
				"student":username,
				"permalink":new_permalink,
				"created": entry.created,
				"date": Date.now(),
				"image_path":entry.image_path,
				"image_strength":10000,
				"answered":[Date.now()],
				"reminded":[Date.now()],
				"searchWords":entry.searchWords,
				"ans":1,
				"rem":1,
				"copy":true,
				"class_number":0,
				"grade": 1
			}

			/// Now insert the old post.")
			posts.insert(post, function (err, result) {
			    "use strict";
			    if (err) return callback(err, null);
			    console.log("copied old post");
			    callback(err, result);
			});
		   
			callback(err, entry);
		});
    	}


	

	this.getAll = function(num, user, path, callback) {
		"use strict";
			console.log('in getall');
		
		if(path == '/top'){

			console.log('clicked top'); 
			var order  = {'grade': 1}
		} else {
			var order  = {'created': -1}

			console.log('didnt clicked top'); 

		}
		posts.find({ 'original':'yes', 'class_number':0, 'students': { '$ne':user } }).sort(order).limit(num).toArray(function(err, items) { //{ 'student':{ '$ne':user } , 'class_number':0 }  <- If i don't that specific user
		    "use strict";
		    if (err) return callback(err, null);
		    callback(err, items);
		});
	}



	this.getPosts = function(num, user, path, callback) {
		"use strict";
		if(path == '/profileTop'){
			var order  = {'grade': 1}
		} else {
			var order  = {'created': -1}
		}
		posts.find({'student':user , 'class_number':0}).sort(order).limit(num).toArray(function(err, items) { //If a class_number is removed than all class_numbers decrement 
			"use strict";
			if (err) return callback(err, null);
			console.log("Found " + items.length + " posts");
			callback(err, items);
		});
	}



	this.getPostBySearchWords = function(search, num, callback) { ///Wee search engine.") 
		"use strict";
		var arr = []
		for(var s=0; s<search.length; s++){
			var obj = { 'searchWords' : search[s].toLowerCase() }
			arr.push(obj);
		}	
		posts.find({  $or : arr }).sort('date', -1).limit(num).toArray(function(err, items) {
			"use strict";
			if (err) return callback(err, null);
    			console.log("Found " + items.length + " posts");
			callback(err, items);
		});
	}

	this.getPostByPermalink = function(req, callback) { ///Get post when clicked.")
		"use strict";

		var permalink = req.params.permalink;
		var class_number = parseInt(req.params.class_number);
		console.log(' in getPostByPermalink'); 
		console.log('class_number '+class_number);
		console.log('permalink '+permalink);
		console.log('req.uesrname '+ req.username);//'student':req.username, 
		console.log(''); 

/*
		posts.findOne({'permalink': permalink, 'class_number':class_number}, function(err, post) {
			"use strict";
			if (err) return callback(err, null);		
			if(post){
				var words = post.words;		//problem with empty db 
				post.words = JSON.stringify(words); 	
			}
		//	console.log('find one');
		//	console.log(post);
	
		/*		var title = permalink.split('_');  ///Cannot have underscore in titles 
			var title = title[0];  
			posts.findOne({'title':title, 'student':req.username}, function(err, p){
				"use strict"

				console.log('fine1 within find1');
				console.log(p);
				console.log(post);

				callback(err, post, p);

			}); 
		
			callback(err, post);
		});

		*/
		var date = Date.now();
	
		posts.findAndModify(   
			{ 'permalink':permalink, 'class_number':class_number },
			[['_id','asc']],
			{'$push': {'views':date}}, 			
			function(err, post) { 
				"use strict"; 
				if (err) return callback(err, null);		
				if(post){
					var words = post.words;		//problem with empty db 
					post.words = JSON.stringify(words); 	
				}
 				console.log('');
 				console.log(' why is this called so much?');
 				console.log('');
 				console.log(post);
 				console.log('');

				callback(err, post);

			}
		) 		
	}

	this.getPostsByTitle = function(title, callback) { //Gets Posts By Title
		"use strict";
		posts.find().sort('created', -1).limit(10).toArray(function(err, items) { 
		    "use strict";
		    if (err) return callback(err, null);
		    console.log("OMG Found " + items.length + " posts");
		    callback(err, items);
		});
	}

	this.findThisPermalink = function(permalink, callback) {
		"use strict";
		posts.findOne({'permalink': permalink}, function(err, post) {
		    "use strict";
		    if (err) return callback(err, null);				
		    callback(err, post);
		});
	}


/*
	this.findNextPermalink = function(query, callback) {
		"use strict";
		posts.findOne(query, function(err, post) {
		    "use strict";
		    if (err) return callback(err, null);		
		    callback(err, post);
		});
	}

	this.findPreviousPermalink = function(query, callback) {
		"use strict";
		posts.findOne(query, {sort: {_id: -1}}, function(err, post) {
		    "use strict";
		    if (err) return callback(err, null);		
		    callback(err, post);

		});
	}

*/


	this.wordsStrength = function (permalink, class_number, obj, callback){
		"use strict"
		var ans = parseInt(obj.ans);
		var rem = parseInt(obj.rem);
		var words = obj.words;
		var query = { 'permalink':permalink, 'class_number':class_number }; 
		var operator = { '$set' : { 'words':words },  '$inc':{'ans':ans, 'rem':rem}  };
		var options = { 'upsert' : false };
		posts.update(query, operator, options, function(err, numModified) {
			"use strict";
			if (err) return callback(err, null); 
			callback(err, numModified); 
		}); 
	}

	this.imageStrength = function (permalink, class_number, obj, callback) {  
		"use strict"
		var image_strength = obj.image_strength;
		var date = obj.date;
		var rem = parseInt(obj.rem);
		var ans = parseInt(obj.ans); 
		var query = { 'permalink':permalink, 'class_number':class_number }; 
		var options = { 'upsert' : false };

		if(ans > 0){
			var operator = { '$set' : {'image_strength':image_strength , 'date':date }, '$push':{ 'answered':Date.now() }, '$inc':{'ans':ans}  };
		} else if (rem > 0){
			var operator = { '$set' : {'image_strength':image_strength , 'date':date }, '$push':{ 'reminded':Date.now() }, '$inc':{'rem':rem}  };
		} else { throw err; }

		posts.update(query, operator, options, function(err, numModified) {
			"use strict";
			console.log('numModified numModified ' +numModified); 
			console.log(query)
			if (err) return callback(err, null); 
			callback(err, numModified); 
		}); 
	}

	this.makePercentages = function(user, list, callback){  ///Finds percentages of any subject and $sets them class_number 0;."); 
		for(var p = 0; p < list.length; p++){
			var q = 0;
			var query = {'student':user, 'title':list[p].title};
			posts.find(query).toArray(function(err, memories) {
				"use strict";
				if (err) return callback(err, null);
				var x = 0;
				var y = 0; 
				for(var m=0; m<memories.length; m++){	
					if(memories[m].words){ 
						for(var w=0; w<memories[m].words.length; w++){
							var word = memories[m].words[w].word;
							var newestDate = parseInt(memories[m].words[w].reminded.concat(memories[m].words[w].answered).sort(function(a,b){return b - a})[0]);	
							var strength = memories[m].words[w].strength;
							for( var f=0; f<word.length; f++ ) {														
								var R = f/word.length;
								R = Math.max(R, 0.07); // Largest word is ~15 letters. 1/15 = .07
								var t = -strength * Math.log( R );
								t = (t + newestDate) - Date.now(); 
								t = Math.max(Math.min(t, 2147483646), 0); 							
								if(t <= 0){  ///This means that t was negative and that's a letter gone.
									x++;
								}
								y++;	///This is the total letters 
								//fadeLetter( word, t, f, z[f] );  
							}

						}
					} else if (memories[m].image_strength){
						var mostRecent =  parseInt(memories[m].reminded.concat(memories[m].answered).sort(function(a,b){return b - a})[0]);
						var image_strength = parseInt(memories[m].image_strength);		
						var maxDiff = 3; 
						for(var i=1; i<=maxDiff; i++ ) {																
							var img_R = 1 - (i-1)/maxDiff;
							var img_time = -image_strength * Math.log( img_R );									
							var img_t = img_time + mostRecent - Date.now();									
							var img_t = Math.max(Math.min(img_t, 2147483646), 0); 	
							if(img_t <= 0){				
								x++;
							}
							y++; 
						}
						x--;///This makes the first one 100%;  
					} else {	console.log('screwed something up!'); 	}
				}
				var g = ((1 - x/y)*100).toFixed(0);
				var title = list[q].title;
				q++; 
				posts.update({'student':user, 'title':title, 'class_number':0},{'$set': {'grade':g}}, function(err, numModified) {  ///The values are getting mixed up.  They r correct in the db, but render screwy") 
					"use strict";
					if (err) return callback(err, null); 
					///callback(err, numModified);  I don't know what I'm doing, but this sends duplicate headers. 
				}); 
				callback(err, memories);
			});
		}
	}


	this.getStudents = function(num, title, path, callback) {
		"use strict";
		if(path == '/profile/students/:title/top'){
			var order  = {'grade': 1}
		} else {
			var order  = {'created': -1}
		}
		posts.find({"title":title , 'class_number':0}).sort(order).limit(num).toArray(function(err, items) {
		    "use strict";
		    if (err) return callback(err, null);
		    console.log("Found " + items.length + " posts with title "+title);
		    callback(err, items);
		});
	}

	this.getSubject = function(num, user, title, path, callback) {
		"use strict";
		if(path == '/profile/edit/:title/top'){
			console.log('up');
			var order  = {'grade': -1}
		} else {
			console.log('down');
			var order  = {'class_number': 1}
		}

		posts.find({"title":title, "student":user}).sort(order).limit(num).toArray(function(err, items) {
		    "use strict";
		    if (err) return callback(err, null);
		    console.log("Found " + items.length + " posts with title "+title);
			for(var i=0; i<items.length; i++){
				console.log(items[i].grade);
			}
		    callback(err, items);
		});
	}

	this.updateEdits = function(title, bodyImage, order, student, callback){
		"use strict"
		console.log('')
		console.log('')
		console.log('')

		console.log('updateEdits')

		console.log(title);
		console.log(bodyImage);
		console.log(order);
		console.log(student);
		console.log('')
		console.log('')
		console.log('')



		posts.findAndModify(   
			{ 'student': student, '$or': [ { 'image_path':bodyImage }, { 'body': bodyImage } ] },
			[['_id','asc']],
			{'$set': {'class_number':order}}, 			
			function(err, doc) { 
				"use strict"; 
				if (err) return callback(err, null); 
				callback(err, doc);

			}
		) 
	/*
		posts.findAndModify(   
			{ '$or': [ { 'image_path':bodyImage }, { 'body': bodyImage } ] },
			[['_id','asc']],
			{'$set': {'class_number':order}}, 			
			function(err, doc) { 
				"use strict"; 
				if (err) return callback(err, null); 
				callback(err, doc);

			}
		)
*/

	}




	this.getStudentNames = function(username, title, callback) {
		"use strict"


		posts.find({'student':username, 'title':title}, {'students':1, '_id':0 }).toArray(function(err, names){
			"use strict"
			if(err) return callback(err, null);
			console.log('getStudentNames');
			console.log(names);
			console.log('username is '+username); 
			console.log('title is '+title); 
				
			callback(err, names);
		});

	}

	




	this.getTags = function(req, callback){
		"use strict"
		posts.find({}, {"tags":1}).toArray( function(err, items){
	        	if (err) return callback(err, null);	
			callback(err, items);
		});
	}
	this.getPostsByTag = function(tag, num, callback) {
		"use strict";
		posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(err, items) {
			"use strict";
			if (err) return callback(err, null);
			console.log("Found " + items.length + " posts");
			callback(err, items);
		});
	}
	this.addComment = function(permalink, name, email, body, callback) {
		"use strict";
		var comment = {'author': name, 'body': body}
		if (email != "") {
			comment['email'] = email
		}
		posts.update({'permalink': permalink}, {'$push': {'comments': comment}}, function(err, numModified) {
			"use strict";
			if (err) return callback(err, null);
			callback(err, numModified);
		});
	}


}
module.exports.PostsDAO = PostsDAO;




/*
function forget( word, dates, strength ) {									//console.log('forgot ' +word+' dates '+dates+ ' strength '+strength);

	word = word.replace(/[^a-zA-Z ]/g, "_");
	var newestDate = parseInt(dates[dates.length-1]);							//console.log('newestDate '+newestDate+ ' now '+Date.now());							

	$(document.getElementsByClassName(word)).html(function(){
	     return this.textContent.replace(/./g,'<spanny>$&</spanny>');
	});

	var z = fakeRandom(word.length)

	if(word[0].match(/[a-mA-M]/)){	z.reverse(); } //Reverses the forgetting order of A-M words								//console.log(word + ' fakeRandom '+z);
	
	for( f=0; f<word.length; f++ ) {														
		var R = f/word.length;
		R = Math.max(R, 0.07); // Largest word is ~15 letters. 1/15 = .07
		var t = -strength * Math.log( R );								//console.log('t '+t);
		t = t + newestDate - Date.now(); 
		t = Math.max(Math.min(t, 2147483646), 0); 							//console.log('t '+t+ ' word '+word);
		
		fadeLetter( word, t, f, z[f] );  
	}
	
	//$('#answerBox').focus();
}


*/







/*


//	post = JSON.stringify(post);  not sure if this does anything 
	//escapeHtml(body);

	function escapeHtml(unsafe) {
	    return unsafe
		 .replace(/&/g, "&amp;")
		 .replace(/</g, "&lt;")
		 .replace(/>/g, "&gt;")
		 .replace(/"/g, "&quot;")
		 .replace(/'/g, "&#039;");
	 }



	this.resetEntirePost = function(permalink, obj, callback){
		"use strict" 		
		//console.log(obj);

		var word =  obj.content.word;
		var strength = obj.content.strength; 
		var reminded = obj.content.reminded; 
		var ask = obj.content.ask; 
		var R = obj.content.R;		


		var query = { 'permalink':permalink , 'content.word':word };
 		var operator = { '$push': { 'content.$.strength':strength, 'content.$.ask':ask, 'content.$.reminded':reminded,  'content.$.R':R } }; 
		var options = { 'upsert' : true }; 

		posts.update(query, operator, options, function(err, numModified) {

		"use strict";
		if (err) return callback(err, null); 
		callback(err, numModified); 
		}); 
	}
*/

/*	this.becomeFollower = function(title, username, callback){
		"use strict"
		
		posts.update({"title":title, "roster":"yes"}, { "$addToSet": { "followers":username } }, function(err, roster){
			"use strict"
			if(err) return callback(err, null);
		
			callback(err, roster);
		});

		posts.find({"title":title, "follower":username}).toArray(function(err, some){
			"use strict";
			if(err) return callback(err, null);
			
			posts.find({"title":title}).toArray(function(err, all){
				"use strict";
				if(err) return callback(err, null);	
				callback(err, all);
			});

			callback(err, some);
		});

	

		posts.findOne({"title":title, "roster":"yes"}, function(err, subj){
			"use strict";
			if (err) return callback(err, null);
			console.log("subj img followers ");
			console.log(subj);
			if(subj != null){				
				console.log(subj.followers);

				//follower = subj.followers[f];//this aint passing 
				//followers = subj.followers;//this aint passing 				
			}
			callback(err, subj);	
		});
		


	}
*/

	/*this.becomeFollower = function(title, username, callback){
		"use strict"

		posts.findAndModify(	///Add user to the followers array.")
			{"title":title, "roster":"yes"},
			[['_id','asc']],
			{ "$addToSet": { "followers":username } },
			{new: true, upsert: true}, 
			function(err, doc){
				console.log(' ');
				console.log(' find & modify ');
				callback(err, doc.followers);
			});
		
		posts.find({"title":title, "follower":username}, {"old_permalink":1, "follower":1}).toArray(function(err, copies){	///Find all of user's permalinks with that title")
			"use strict"
			if (err) return callback(err, null);
			callback(err, copies);
		});

	}

	this.copyMemries = function(title, username, callback){
		"use strict"

		posts.find({"title":title, "original":true}, {"permalink":1, "original":1, "image_path":1}).toArray(function(err, orig){	///Find all original permalinks with that title") 
			"use strict"
			if (err) return callback(err, null);
			callback(err, orig);
		});		

	} */




/*
	this.copyEntry = function (permalink, username, callback) {
        	"use strict";

	        posts.findOne({'permalink': permalink}, function(err, entry) {
        		"use strict";
	        	if (err) return callback(err, null);
		
			var body_Arr = entry.content.split(' ');
			var words = []; 
			var date = [Date.now()];
			for( var i=0; i<body_Arr.length; i++ ){
				words.push({ "word":body_Arr[i], "reminded":date, "answered":date, "strength":10000 });
			}
			var new_permalink = entry.permalink.replace( /\W/g, '' )+'_'+Math.floor(Math.random() * 100)*Date.now();

			/// Copy an old post.")
			var post = {
				"title":entry.title + '_copy',
				"author":entry.author,
				"student":username,
				"content":entry.body,
				"body":entry.body,
				"permalink":new_permalink,
				"tags":entry.tags,
				"created": Date.now(),
				"words":words,
				"searchWords":entry.searchWords,
				"ans":1,
				"rem":1,
				"copy":true,
				}

			/// Now insert the old post.")
			posts.insert(post, function (err, result) {
				"use strict";
		    		if (err) return callback(err, null);
				callback(err, result);
			}); 
	              	callback(err, entry);
	        });
    	}
	


	this.copyImage = function (permalink, username, callback) {
		"use strict"

		posts.findOne({'permalink': permalink}, function(err, entry) {
			"use strict";
		    	if (err) return callback(err, null);

			var new_permalink = entry.permalink.replace( /\W/g, '' )+'_'+Math.floor(Math.random() * 100)*Date.now();

			/// Copy an old post.")
			var post = {
				"title":entry.title+'_copy',
				"author":entry.author,
				"student":username,
				"permalink":new_permalink,
				"created": entry.created,
				"date": Date.now(),
				"image_path":entry.image_path,
				"image_strength":10000,
				"answered":[Date.now()],
				"reminded":[Date.now()],
				"searchWords":entry.searchWords,
				"ans":1,
				"rem":1,
				"copy":true
			}

			/// Now insert the old post.")
			posts.insert(post, function (err, result) {
			    "use strict";
			    if (err) return callback(err, null);
			    console.log("copied old post");
			    callback(err, result);
			});
		   
			callback(err, entry);
		});
    	}

*/

