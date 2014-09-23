
///ALWAYS////////////////////////////////////////////////////////////////////////////////////////.")

var user = $('#username').text();
var student = $('#student').text();
var author = $('#author').text();
console.log(student + ' is the student.');
console.log(author+ ' is the author.');
console.log(user+ ' is the user.');

var copy = $('#copy').text();
console.log('is it a copy? '+$('#copy').text());

console.log(' ');


function checkAuthor(){ // Determine if it's the owner of the memry or a visitor. 

	//console.log($('#follower').text());

	var user = $('#username').text();
	var student = $('#student').text();

	if(user == ''){
		console.log('not logged in');
	}

	if( student != user ){			
		$('#content, #forgetThis, #remindMe').css({"pointer-events":"none"});
		$('#memorizeThis, #followThis').css({"display":"block"});
		$('#forgetThis, #remindMe, #answerBox').css({"display":"none"});
		$('#content').attr('id','contentStranger'); //Must be executed before the WORDS-thjis is wrong!
		//$('#imageContent').attr('id','contentStranger'); //Must be executed before the WORDS-thjis is wrong!
		
		$('#contentStranger').css({'visibility':'visible'}); ///In case of slow load, the letters are hidden.") 

	return;
	}


	if (author != user){
		console.log('adsfadsfasdfadxvxvcb');

		$('#forgetThis').css({"display":"none"});		
	}

	$('#content').css({'visibility':'visible'}); ///In case of slow load, the letters are hidden.") 


	console.log('The user is '+user);

}
checkAuthor();






function windowSize() {		 //NOT SURE IF THIS SHOULD BE EVERYWHERE OR ONLY FOR IMAGES 
	var h = $(window).height();
	var w = $(window).width();
		
	setCookie('width', w, .1);
	setCookie('height', h, .1);
}
windowSize();

function setCookie(cname,cvalue,exdays)
{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}



$('.tftextinput').focus();  ///Focus on search bar.")


window.onload=function(){  ///Adds swipe events.")
(function(d){
 var
 ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
 nm=true,sp={x:0,y:0},ep={x:0,y:0},
 touch={
  touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
  touchcancel:function(e){nm=false}
 };
 for(var a in touch){d.addEventListener(a,touch[a],false);}
})(document);
}
document.addEventListener('swr', right ,false); 
document.addEventListener('swl', left ,false);
function left() {window.location = document.getElementById('previous').href}
function right() {window.location = document.getElementById('next').href}


$('#content, #canvas').bind('touchstart', 
	function() {
		$('#buttons').hide(); 
	});

$('#content, #canvas').bind('touchend', 
	function() {
		$('#buttons').show(); 
	});



function fadeTitle(){
	$(document.getElementById('title')).html(function(){
	     return this.textContent.replace(/./g,'<spanny>$&</spanny>');
	});

	var title = $('#title').text();
	var zoo = fakeRandom(title.length);

	for( var f=0; f<title.length; f++ ) {														
		var t = (f * 1000) + 2700;
		fadeing( title, t, f, zoo[f]);
	}
}

function fadeing( title, t, f, zoo ){
	console.log('u');
	console.log(title+  t + f + zoo );
	if( title.length != 1 ){
		$(document.getElementById('title')).find('spanny:nth-child(' + (zoo + 1) + ')').animate({opacity:0}, {duration:t}).text();
	} else {
		$(document.getElementById('title')).find('spanny:nth-child(' + (zoo) + ')').animate({opacity:0}, {duration:t}).text();
	}
}

fadeTitle();
/*
$(document.getElementsById('title')).find('spanny:nth-child(' + (zoo + 1) + ')').animate({opacity:0}, {duration:t}).text();


	var z = fakeRandom(word.length)

	if(word[0].match(/[a-mA-M]/)){	z.reverse(); } //Reverses the forgetting order of A-M words								//console.log(word + ' fakeRandom '+z);


	
	for( f=0; f<word.length; f++ ) {														
		var R = f/word.length;
		R = Math.max(R, 0.07); // Largest word is ~15 letters. 1/15 = .07
		var t = -strength * Math.log( R );								//console.log('t '+t);
		t = t + newestDate - Date.now(); 
		t = Math.max(Math.min(t, 2147483646), 0); 							//console.log('t '+t+ ' word '+word);

		console.log('t is '+ t);
		console.log('R is '+ R);

		console.log(newestDate +' newestDate');

	//	if(t == 0){
	//		x++;
	//	}
	//	y++;
		
		fadeLetter( word, t, f, z[f] );  
	}
	
}

*/






//PROFILE_PAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.getElementById('profile_page')){

console.log('profile page'); 

	
	//if(memry owner != user)	
	//$('.editLink').hide();



/*
	$.get(document.URL + '/grades', function(data){  ///On Profile & Home Page this makes sure's the grades are live.  calls twice? 
		var mytag=$('<div></div>').html(data);	
		var arr = $('.grades',mytag)
		$('.grades').each(function( index ) {
			$( this ).html(arr[index].innerHTML) ;
		});
		console.log(arr);

	}, "html");
*/

}


//HOME_PAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.getElementById('home_page')){

/*
	$.get(document.URL + 'grades', function(data){  ///On Profile & Home Page this makes sure's the grades are live.  calls twice? 
		var mytag=$('<div></div>').html(data);	
		var arr = $('.grades',mytag)
		$('.grades').each(function( index ) {
			$( this ).html(arr[index].innerHTML) ;
		});
		console.log(arr);

	}, "html");

*/

}

//EDIT_PAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (document.getElementById('edit_page')){


var info = JSON.parse($('#owner').html());
var s = $('.memry').attr('name');
var f = 0; 

for(var e=0; e<info.teacher.length; e++){

	console.log(info.teacher[e]);

 	if(info.teacher[e].subject.trim().toUpperCase() == s.trim().toUpperCase()){
	
		alert('you lead this course');

		$('#memories').sortable({
			update: function(event, ui) {
			    var newOrder = $(this).sortable('toArray').toString();
			    $.post(document.URL + '/saveEdit', {order:newOrder});
			}
		});

		$('#memories').mouseup(
			function() { 
				setTimeout(
					function(){
						window.location.replace(document.URL);
					}, 500)});



		$('#forgetAll').click(function(){
			$.post(document.URL + '/forgetAll').done(function(){;
				window.location.replace(document.URL);
			});
		});


	} else {
		f++;  
	}
}

if(f == info.teacher.length){
	$('#forgetAll').hide();
}



















}

/////////////////////////////////TAGS_TEMPLATE.HTML//////////////////////////////////////////////////////////.")
if (document.getElementById('tags_page')){ 

	var allTags = JSON.parse($('#allTags').text());
	var tags_Arr = [];// 
	for(var all=0; all<allTags.length; all++){
		for(var tg=0; tg<allTags[all].tags.length; tg++){
			tags_Arr.push(allTags[all].tags[tg]);//
			$('#displayTags').append('<a href="/tag/'+allTags[all].tags[tg]+'">'+allTags[all].tags[tg]+' </a>'); //<a href="/tag/{{tag}}">{{tag}}</a>
		} 
	}
}










///////////Words & Images ////// entry_template.html /////////////////////////////////////////////////////////.")

if (document.getElementById('memory_post_page')){

console.log('Words & Images entry_template.html');


///Only if s/he is any one of the students then this will take place.  But if not, then it shouldn't.  
var isStudent = $('#isStudent').text();


/* BUG - thinking the author doesn't own memries he does THIS IS NOT THE PROBLEM FOLLOW BUTTON APPEARING 

if(user != author && user != student){
	if(isStudent == 'yes'){
		alert('Must be the teacher to see other students.');
		history.back();
	}
}

*/

console.log($('#isStudent').text())



$('#previousButton').click(function(){
	var url = document.URL;
	var urlArr = url.split('/');
	var lastNum = parseInt(urlArr.pop());	

	var newURL = urlArr.join('/') + '/' +( lastNum - 1);
	$.ajax({
	    type: 'HEAD',
	    url:  newURL,
		success: function() {
			window.location = newURL;
		},
		error: function() {
			window.location = url;
			alert('start of posts'); //I could redirect to the next memry --- usabiliyt question. 
		}
	});
});
$('#nextButton').click(function(){
	var url = document.URL;
	var urlArr = url.split('/');
	var lastNum = parseInt(urlArr.pop());	

	var newURL = urlArr.join('/') + '/' +( lastNum + 1);
	$.ajax({
	    type: 'HEAD',
	    url:  newURL,
		success: function() {
			window.location = newURL;
		},
		error: function() {
			window.location = url;
			alert('end of posts');
		}
	});
});







}


//////////////////////////////////////////WORDS entry_template.html /////////////////////////////////////////.")

if (document.getElementById('content')){


var allObj = $('#words').text();  
console.log(allObj);
if( allObj ){allObj = JSON.parse(allObj)};
console.log(allObj);


$('#R_Array').html(allObj)//check lata



//document.getElementById('answerBox').onfocus="window.scrollTo(0, 0);"



$('#remindMe').click(function(){ remindMe(); })
$('#forgetThis').click(function(){ 
	window.location = document.getElementById('forgetThis').href
	//window.location.href="/post/forget/{{post['permalink']|url_encode}}/{{post['title']|url_encode}}";
	//NOT SURE IF THIS WORK. FORGET THIS NEEDS TO BE EDITED PROPERLY.  
 })

$('#saveEdits').click(function(){ saveEdits(); })


var originalText = $('#original').text().split(' '); 

var typingTimer;               
var doneTypingInterval = 2000; 



$('#content, #answerBox, #title').keydown(function(e) {
	clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval, [this.id]);

 	if (e.keyCode == 13) {
      		document.execCommand('insertHTML', false, '<br><br>');
    		return false;
    	}
});



function doneTyping(container) {

	console.log(container[0]);

	if(container[0] == 'answerBox'){
		answerBox();
	}
}




function replaceThe( word, date, strength ){		

	classId = word.replace(/[^a-zA-Z ]/g, "_");						
	$(document.getElementsByClassName(classId)).text(word);		
	forget( word, date, strength ); //Forgets the word if it already has existed. 
}





	

$('#answerBox').keydown(function(e) { //if Enter key is pressed submit answer

 	if (e.keyCode == 13) { 
		answerBox();											
    		return false;
    	}
});



function getWords() {	//Gets allObj, fills content and forgets each word.  Happens once per page load   

	var span_Arr = []; 
	var content = $('#content').text().split(' ');//
	console.log('content text ')
	console.log(content)

	var content = $('#content').html().split(' ');//

	console.log('content html ')
	console.log(content)

	for(b=0; b<content.length; b++){

		if (content[b].length > 0){
			var spanny = content[b];
		
			if (content[b]!='<br>'){
				var spanny = addId(content[b], content[b]); //Adds spans
				//console.log($(spanny).attr('id')); gets id of span
			}
			span_Arr.push(spanny);	
		}

	}	

	$('#content').html(span_Arr);	//Fills content with spans;
	//removeId();																									//console.log('allWords: '+allWords);
														//console.log('content: '+content);
	for( c=0; c<content.length; c++ ){	//Loops through allWords and forgets each 				
			for ( a=0; a<allObj.length; a++ ){							//console.log('c '+c+' a '+a);					
				if ( content[c] && content[c].length > 0 && content[c] == allObj[a].word ){  

					if(allObj[a].reminded.length >  allObj[a].answered.length){
						var dates = allObj[a].reminded;
					} else {var dates = allObj[a].answered;}
	
					forget( allObj[a].word, dates, allObj[a].strength );						
				}
			}	
	}

}; 



function addId( word, newWord ){//Add span, class and id 
	
	word = word.trim().replace(/[^a-zA-Z ]/g, "_");
	var spanny = ' <span class="'+word+' w_o_r_d_s" id="'+word+'">'+newWord+'</span>';//style="color:sienna;border:1px dashed blue;" contenteditable="true"
	return spanny;
}







function strengthen( word, dates, u, newWords, original ){

	var originalDate = dates[0];
	var past = Date.now() - originalDate;									

	var strength =  -past/Math.log(.9); //This doesn't take anything into account except time passed 

	allObj[u].strength = strength; //change strength in allObj for 'word' the first time; 

//	var score = scoreBoard();

	return strength; 	


}
function answerBox(){

	var a =  $(document.getElementById('answerBox')).text().replace(/&nbsp;/gi,'');
 
	a = a.trim();
	if(a.length > 0) {
		$('#answerBox').text('');
		a = a.split(' ') 
		update ( a ); 
	}
}

function update( newWords ){

	var brandNewWords = []; 
	for( g=0; g<newWords.length; g++ ){
		var word = newWords[g]; 
		if( word.length > 0 && word != '' ){
			var y = 0;
			var ans = 0;
			for( u=0; u<allObj.length; u++ ){ //Loop newWord thru allObj 
				if( word.toUpperCase().split('').sort().join('').replace(/[^a-zA-Z ]+/g, '').replace('/ {2,}/',' ') == allObj[u].word.toUpperCase().split('').sort().join('').replace(/[^a-zA-Z ]+/g, '').replace('/ {2,}/',' ') && word.length > 0 ) { // Updates word's dates and strength if it matches
					allObj[u].answered.push(Date.now());		
					var date = allObj[u].answered;
					var strength = strengthen( allObj[u].word, date, u, newWords, original ); 
					replaceThe( allObj[u].word, date, strength ); 			
					ans++; 
				} else {  y++; } 
			}
		} 
	}

	postAll(ans, 0); //ans
}



function remindMe() {	//Refreshes words without adding to strength
	var span_Arr = []; 
	var content = $('#original').text().split(' '); 
	for(b=0; b<content.length; b++){
		if (content[b].length > 0){
			var spanny = addId(content[b], content[b]);
			span_Arr.push(spanny);	
			/*
				PROBLEMATIC
			var zeroes = $(document.getElementById(content[b])).html().match(/style="opacity: 0;"/g);  
			if(!zeroes){ ///Letter isn't missing so not reminded.") 
				content[b] = null;
			} */ 
		}
	}

	console.log(span_Arr);	

	$('#content').html(span_Arr);	//Fills content with spans;

	var rem = 0; 

	for( c=0; c<content.length; c++ ){	//Loops through allWords and forgets each 
			for ( a=0; a<allObj.length; a++ ){											
				if ( content[c] && content[c].length > 0 && content[c] == allObj[a].word ){  	 
					allObj[a].reminded.push(Date.now() + 10000) //Adds a little time to re-remember before re-forgetting
					rem++;
					forget( allObj[a].word, allObj[a].reminded, allObj[a].strength );						
				}
			}
	}

	postAll(0, rem); 
}; 

function postAll(ans, rem){ 	
	var grade = oPercent();
	var title = $('#title').text(); 
	var content = $('#content').text(); 
//	var score = parseInt($('#score').text());
	var score = 1000;//

	console.log('post'); 
	console.log(allObj);
	//+ '/words',

//	$.post( document.URL, { 'words':allObj , 'grade':grade , 'score':score , 'title':title , 'content':content, 'ans':ans, 'rem':rem  } )

	$.post( document.URL + '/words', { 'words':allObj , 'grade':grade , 'score':score , 'title':title , 'content':content, 'ans':ans, 'rem':rem  } )
	    .done( function(msg) { console.log( '.done post' + msg ); } )
	    .fail( function( xhr, textStatus, errorThrown ) {
		console.log('POST FAILED');console.log(xhr);console.log(textStatus);console.log(xhr.responseText);
	    });
		
}


//var x = 0;
//var y = 0;

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

		console.log('t is '+ t);
		console.log('R is '+ R);

		console.log(newestDate +' newestDate');

	//	if(t == 0){
	//		x++;
	//	}
	//	y++;
		
		fadeLetter( word, t, f, z[f] );  
	}
	
}


function fadeLetter( word, t, f, z ){
	if( word.length != 1 ){
		$(document.getElementsByClassName(word)).find('spanny:nth-child(' + (z + 1) + ')').animate({opacity:0}, {duration:t}).text();
	} else {
		$(document.getElementsByClassName(word)).find('spanny:nth-child(' + (z) + ')').animate({opacity:0}, {duration:t}).text();//var char = $(document.getElementsByClassName(word)).find('spanny').eq(z).animate({opacity:0}, {duration:t}).text();//$('.' + word + ' spanny:nth-child(' + (z + 1) + ')').animate({opacity:0}, {duration:t});
	}
}



function fakeRandom(x){  //Returns an array that seems random, but isn't.  
	if(x==2){return [1, 0];}
	var z = x;  
	var y = x;
    	var r = Math.floor(x/2);
	var arr = []; 
	while( x%r%2 == 0 ) {r++;}
    	while( x>0 ){
	 	y = y - r;
		if(y<0){
			var n = y;
			y = z + n 
		}   
		arr.push(y);	
    		x--
    	}
	return arr;  
} 





function oPercent() { //calculates precentage of content compared to original

	var o=0;
	var q=0;

	for( p=0; p<originalText.length; p++ ){
		var oWord = originalText[p]; 
		if( document.getElementById(oWord) ){
			var spannys = $(document.getElementById(oWord)).children().length; 
			var zeroes = $(document.getElementById(oWord)).html().match(/style="opacity: 0;"/g);
			if( zeroes ) {
				var l  = spannys - zeroes.length;		
			} else {
				var l = spannys;
			}
		}		 
		var m = oWord.length;
		if( m != 0 ){ o =  l/m + o; } else { q++; }
	} 


	o = o/(p-q);
	var r = Math.round(o * 100)+'%'
	$('#originalPercent').text(r);
	$('#topMenu #progressBar > div').animate({'width':r}, 'slow');  
	return o;
}  

setInterval(function(){oPercent();}, 1000);




function nFormatter(num) {  //makes billions 'B', millions 'M', thousands 'K'
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num;
}


$(document).ready(function(){//No cut, copy & pasting
      $('#content').bind("cut copy paste",function(e) {
          e.preventDefault();
      });
    });



getWords();

 





function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	// || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
}


if( navigator.userAgent.match(/iPad/i) ){  //If device on input focus move input to top. 

	alert('sup');

	$('#answerBox').focus(function(){
		var aboveKeys = window.innerHeight - $('#buttons').outerHeight() - $('#content').outerHeight(); 
		$('#content').css({'margin-top':'368px', 'bottom':'' })
	})
	$('#answerBox').blur(function(){
		$('#content').css({'margin-top':'0px'} )
	})
}

if( navigator.userAgent.match(/iPhone/i) ){
	$('#answerBox').focus(function(){
		var aboveKeys = window.screen.availHeight - $('#buttons').outerHeight() - $('#content').outerHeight() - 40 + 'px'; 
		$('#content').css({'position':'absolute', 'top':aboveKeys, 'bottom':'' })
	})
	$('#answerBox').blur(function(){
		$('#content').css({'position':'absolute', 'top':'100px'} )
	})
}




 
}





















//////////////////////////////////////////newpost_template.html////////////////////////////////////////////////////

if (document.getElementById('newpost_page')){

	jQuery(function ($) {
	    var regex = /.\.(jpg|jpeg|png|gif|tiff)$/i;
	    $(document).on('change', '.fileUpload', function () {
		var filename = this.value;
		if (!regex.test(filename)) {
		    alert('Please select an image.');
		    $(this).replaceWith($(this).clone(true, true))
		} else {
		    $('<input type="file" name="image" class="fileUpload">').insertAfter('.fileUpload:last')
		}
	    });
	})


var yo = $('#owner').html();
console.log(yo);

var info = JSON.parse(yo);
console.log(info);

console.log(info.teacher.length);

console.log(info.teacher[0].subject);


function edValueKeyPress()
    {
        var newSubject = document.getElementById("newSubject");
        var s = newSubject.value;
   

	
	for(t=0; t<info.teacher.length; t++){

		console.log(s);	console.log(info.teacher[t].subject.trim());

		if(info.teacher[t].subject.trim().toUpperCase() == s.trim().toUpperCase()){
			$('#titleHeader').text('You Own This Memry');
			//$('#titleOwner').val('no'); 
			return;
		} 
	$('#titleHeader').text('New Memry'); 
	//$('#titleOwner').val('yes'); 
	}
    }






}



/*
var titles = $('#owner').text().split(',');

function edValueKeyPress()
    {
        var newTitle = document.getElementById("newTitle");
        var s = newTitle.value;
    	
	for(t=0; t<titles.length; t++){
		if(titles[t].trim().toUpperCase() == s.trim().toUpperCase()){
			$('#titleHeader').text('You Own This Memry');
			$('#titleOwner').val('no'); 
			return;
		} 
	$('#titleHeader').text('New Memry'); 
	$('#titleOwner').val('yes'); 
	}
    }


console.log(titles);
*/



















//////////////////////////////////////////IMAGE entry_template.html /////////////////////////////////////////

if (document.getElementById('imageContent')){



function gameOver(){
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    document.addEventListener("touchstart", null, false);
    document.addEventListener("touchmove", null, false);
    document.addEventListener("touchend", null, false);

    initPuzzle();
}


function resetPuzzleAndCheckWin(){
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin && PUZZLE_DIFFICULTY > 1){
        //setTimeout(gameOver,500);
	strengthenImage();
    }
}


function pieceDropped(e){
    document.onmousemove = null;
    document.onmouseup = null;
    document.addEventListener("touchmove", null, false);
    document.addEventListener("touchend", null, false);


    if(_currentDropPiece != null){
        var tmp = {xPos:_currentPiece.xPos,yPos:_currentPiece.yPos};
        _currentPiece.xPos = _currentDropPiece.xPos;
        _currentPiece.yPos = _currentDropPiece.yPos;
        _currentDropPiece.xPos = tmp.xPos;
        _currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}



function updatePuzzle(e){
    _currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        _mouse.x =  e.layerX;// - _canvas.offsetLeft;//e.offsetX==undefined?e.layerX:e.offsetX;
        _mouse.y =  e.layerY;// - _canvas.offsetTop;//e.offsetY==undefined?e.layerY:e.offsetY;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX;// - _canvas.offsetLeft;
        _mouse.y = e.offsetY;// - _canvas.offsetTop;
    }
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(piece == _currentPiece){
            continue;
        }

        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(_currentDropPiece == null){
            if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
                //NOT OVER
            }
            else{
                _currentDropPiece = piece;
                _stage.save();
                _stage.globalAlpha = .4;
                _stage.fillStyle = PUZZLE_HOVER_TINT;
                _stage.fillRect(_currentDropPiece.xPos,_currentDropPiece.yPos,_pieceWidth, _pieceHeight);
                _stage.restore();
            }
        }
    }
    _stage.save();
    _stage.globalAlpha = .6;
    _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
    _stage.restore();
    _stage.strokeRect( _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth,_pieceHeight);
}

function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
            //PIECE NOT HIT
        }
        else{
	
            return piece;
        }
    }
    return null;
}


function onPuzzleClick(e){

	console.log('clicked' + e.x);
	console.log(e);
	$('.drag').text(e.x);

    stopScramble();

    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX; //- _canvas.offsetLeft;//e.offsetX==undefined?e.layerX:e.offsetX //PROBLEMS WITH FIREFOX 
        _mouse.y = e.layerY;// - _canvas.offsetTop;//e.offsetY==undefined?e.layerY:e.offsetY;
	


	var position = $('#canvas').offset();


	//	console.log( e.layerX );
	//	console.log( e.pageX - position.left );
		//alert( e.layerX );
		//alert( e.pageX - position.left );


    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX;// - _canvas.offsetLeft;
        _mouse.y = e.offsetY;// - _canvas.offsetTop;

    }
    _currentPiece = checkPieceClicked();
    if(_currentPiece != null){
        _stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,_pieceWidth,_pieceHeight);
        _stage.save();
        _stage.globalAlpha = .9;
        _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
        _stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
	document.addEventListener("touchmove", updatePuzzle, false);
        document.addEventListener("touchend", pieceDropped, false);

    }
}



function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function shufflePuzzle(){
    _pieces = shuffleArray(_pieces);
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(xPos, yPos, _pieceWidth,_pieceHeight);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }

   document.onmousedown = onPuzzleClick;
   document.addEventListener("touchstart", onPuzzleClick, false);

}

function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        _pieces.push(piece);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }

	shufflePuzzle();
//    document.onmousedown = shufflePuzzle;
}



function createTitle(msg){
    _stage.fillStyle = "#000000";
    _stage.globalAlpha = .4;
    _stage.fillRect(100,_puzzleHeight - 40,_puzzleWidth - 200,40);
    _stage.fillStyle = "#FFFFFF";
    _stage.globalAlpha = 1;
    _stage.textAlign = "center";
    _stage.textBaseline = "middle";
    _stage.font = "14px Arial";
    _stage.fillText(msg,_puzzleWidth / 2,_puzzleHeight - 20);
}


function initPuzzle(){
    _pieces = [];
    _mouse = {x:0,y:0};//
    _currentPiece = null;
    _currentDropPiece = null;
    _stage.drawImage(_img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
    createTitle("Click to Start Puzzle");
    buildPieces();
}


function setCanvas(){
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";


}



function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }




function onImage(){

	
    _pieceWidth = Math.floor(_img.width/ PUZZLE_DIFFICULTY)
    _pieceHeight = Math.floor(_img.height / PUZZLE_DIFFICULTY)
    _puzzleWidth = _pieceWidth * PUZZLE_DIFFICULTY;
    _puzzleHeight = _pieceHeight * PUZZLE_DIFFICULTY;
    setCanvas();
    initPuzzle();


}



function init() { //Initializes image 

	var imageContent = document.getElementById('imageContent');
	var url = imageContent.src;
	var url_parts = url.replace(/\/\s*$/,'').split('/'); //get rid of the trailing / before doing a simple split on /

	console.log('url_parts');
	console.log(url_parts);

         _img = new Image();
   	 _img.addEventListener('load',onImage,false);

	_img.src = "../../temp_pics/"+url_parts[5]+""; //pick 3rd and 4th word in url 

	console.log(_img.src);
}



var PUZZLE_DIFFICULTY;
const PUZZLE_HOVER_TINT = '#009900';
 



var _canvas;
var _stage;
var _img; 
var _pieces;
var _puzzleWidth;
var _puzzleHeight;
var _pieceWidth;
var _pieceHeight;
var _currentPiece;
var _currentDropPiece;
var _mouse;

var _imageStrength = parseInt($('#imageStrength').text());










function forgetImage() { ///Calculates time between image scrambles.")


	var strength = parseInt($('#imageStrength').text()); 
	var answered = $('#answered').text().split(',');
	var reminded = $('#reminded').text().split(','); 

	console.log(answered.length/reminded.length);

	var mostRecent = Math.max(reminded[reminded.length-1], answered[answered.length-1]);

	var maxDiff = 3; //Determines the extent to which the image will scramble 

	//as far as I can tell then it looks like this is faster and either i can run this script on the back end which seems daunting( but prolly right) or I can figure out a quick fix where I figure out how scrambled it should be and scramble() there
	//SO when I loaded the pic up to 2, then came back it was already at 6 moving to 7 (correctly) without needing to reload 
	
	//scramble(1, 100, 0); 


	for( i=1; i<=maxDiff; i++ ) {				console.log('strength '+strength);														
		var R = 1 - (i-1)/maxDiff;			console.log('R '+R);
		var time = -strength * Math.log( R );		console.log('time '+time);
		var t = time + mostRecent - Date.now();		console.log('t '+t); 
		t = Math.max(Math.min(t, 2147483646), 0); 	console.log('scramble i '+i+' t '+t);	

		console.log('forget image called ' + i); 

		//scramble(3, 10000, 40)

		if(t > 0){  ///Begin to call scramble, but call the level right before once.")    
			console.log(' t is greater than zero');	
			foo(i-1, t, maxDiff);	//NOT DONE!
		
			scramble(i, t, maxDiff);
		
		} 

		if (t == 0 && i == maxDiff){ ///There are no positive times so call the last scramble once.") 
			console.log('t equals zero or there are no more');	
			foo(i, t, i);
		} 		
	}
}

function foo(i, t, maxDiff) {	///Calls the scramble once.")	
	console.log('called foo');

	if(i==0){i = 1};
	scramble(i, 1000, maxDiff); 
	foo = noop;
}

function noop() {}; /// this function does nothing.")

function scramble(i, time, maxDiff) { 
	var id = window.setTimeout( 
		function() { 
				PUZZLE_DIFFICULTY = i;		console.log(i+'!'+ ' time '+time);
				init(); ///Begin puzzle process.")
				iPercent(i, maxDiff);
				
	       			}, time);
}
	 
function remindImage() {					

	PUZZLE_DIFFICULTY = 1;
	init();	///Begin puzzle process.")

	var score = parseInt($('#score').text());

	var date = Date.now() + 1000;

	//$.post(document.URL + '/image', {'image_strength' : 10000, 'date':date, 'score':score });

	postImage(10000, date, 1000, 0, 1);  //>_> I could add a scramble(1, 0, 0) here // This makes it fast sometimes and fails othertimes?  It seems to be whether it was loaded fast first or somehting but idk.   
	
//	setTimeout(window.location.reload.bind(window.location), 500); 

	setTimeout(function(){location = ''},500)
} 

function strengthenImage() {


	var created =  $('#created').text();
	var past = parseInt(Date.now()) - parseInt(created); 
	var strength =  -past/Math.log(.9)


/*	var answered = $('#answered').text().split(',');
	var reminded = $('#reminded').text().split(',');
	console.log(answered.length/reminded.length);
	strength = strength * (answered.length/reminded.length);
	///* PUZZLE_DIFFICULTY; ///AHHH IDK!!! Yes the difficulty of the puzzle factors in as well.  How much?  No because PUZZLE_DIFFICULTY is completely related to the time left, ot the time and strength?  
*/


//	var score = scoreBoard();

	
	//$.post(document.URL + '/image', {'image_strength' : strength, 'date' :Date.now(), 'score':score});
	postImage(strength, Date.now(), 1000, 1, 0);

	setTimeout(function(){location = ''},500)

//	setTimeout(window.location.reload.bind(window.location), 250);
//	forgetImage();//This has pass image strength and restart the forgettin process.  		
} 


function postImage(strength, date, score, ans, rem) {

	var class_number = $('#class_number').text();

//	$.post(document.URL + '/image', { 'image_strength':strength, 'date':date, 'score':score, 'ans':ans, 'rem':rem });
	$.post(document.URL + '/image', { 'image_strength':strength, 'date':date, 'score':score, 'ans':ans, 'rem':rem });

}



function stopScramble() {				console.log('stopScramble');
	var id = 1000; //SKETCHY needs to include the number of remindImage's called because each is adding newTimeouts  
	while (id--) {
	    window.clearTimeout(id); // will do nothing if no timeout with id is present
	}
}

function iPercent(i, maxDiff) { 
	var i = maxDiff + 1 - i;		
	var p = 100/maxDiff;
	var r = Math.round(p * i)+'%'
	$('#originalPercent').text(r);
	$('#topMenu #progressBar > div').animate({'width':r});//, 'slow');  

}


window.onresize = function() { //Resize image to browser
	windowSize(); 
	location.reload(); 
	}






var user = $('#username').text();
var student = $('#student').text();

if( user == student ){  
	window.onload = forgetImage();//forgetImage; also works
} else {  ///If the user doesn't own it don't scramble it.  
	scramble(1, 0, 0);
}



$('#remindMe').click(function(){ remindImage(); })
$('#forgetThis').click(function(){ 
	console.log('forget image');
	window.location.href="/post/forget/{{post['permalink']|url_encode}}/{{post['title']|url_encode}}";
	//THIS AINT DELETING 
});

$(document).bind('touchmove', false)



}

















