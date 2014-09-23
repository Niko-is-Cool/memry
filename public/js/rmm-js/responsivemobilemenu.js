
function responsiveMobileMenu() {	
		$('.rmm').each(function() {
			
			
			
			$(this).children('ul').addClass('rmm-main-list');	// mark main menu list
			
			
			var $style = $(this).attr('data-menu-style');	// get menu style
				if ( typeof $style == 'undefined' ||  $style == false )
					{
						$(this).addClass('graphite'); // set graphite style if style is not defined
					}
				else {
						$(this).addClass($style);
					}
					
					
			/* 	width of menu list (non-toggled) */
			
			var $width = 0;
				$(this).find('ul li').each(function() {
					$width += $(this).outerWidth();
				});
				
			// if modern browser
			
			if ($.support.leadingWhitespace) {
				$(this).css('max-width' , $width*1.05+'px');
			}
			// 
			else {
				$(this).css('width' , $width*1.05+'px');
			}
		
	 	});
}
function getMobileMenu() {

	/* 	build toggled dropdown menu list */
	
	$('.rmm').each(function() {	
				var menutitle = $(this).attr("data-menu-title");
				if ( menutitle == "" ) {
					menutitle = "";
				}
				else if ( menutitle == undefined ) {
					menutitle = "";
				}
				var $menulist = $(this).children('.rmm-main-list').html();
				var $menucontrols ="<div class='rmm-toggled-controls'><div class='rmm-toggled-title'>" + menutitle + "</div><div class='rmm-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>";

				//var $menucontrols ="<div class='rmm-toggled-controls'><div class='rmm-toggled-title'></div><span id='previous'><<<</span><div id='answerBox' spellcheck='true' contenteditable ='true'></div><div class='rmm-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div>";

				//finishType();
				$(this).prepend("<div class='rmm-toggled rmm-closed'>"+$menucontrols+"<ul>"+$menulist+"</ul></div>");
				
		});
}

function adaptMenu() {
	
	/* 	toggle menu on resize */
	
	$('.rmm').each(function() {
			var $width = $(this).css('max-width');
			$width = $width.replace('px', ''); 
			if ( $(this).parent().width() < $width*1.05 ) {
				$(this).children('.rmm-main-list').hide(0);
				$(this).children('.rmm-toggled').show(0);
				$('#navMenu').css('margin-top', -36);

			}
			else {
				$(this).children('.rmm-main-list').show(0);
				$(this).children('.rmm-toggled').hide(0);
				$('#navMenu').css('margin-top', 0);


			}
		});
		
}





$(function() {

	 responsiveMobileMenu();
	 getMobileMenu();
	 adaptMenu();
	 
	 /* slide down mobile menu on click */
	 
	 $('.rmm-button').click(function(){
	 	if ( $('.rmm-toggled').is(".rmm-closed")) {
		 	 $('.rmm-toggled').find('ul').stop().show(300);
		 	 $('.rmm-toggled').removeClass("rmm-closed");
			
			$('#remindMe').click(function(){ remindMe(); 
			 	 $('.rmm-toggled').find('ul').stop().hide(300);
			 	 $('.rmm-toggled').addClass("rmm-closed");
			})

			$('#navMenu').css('visibility', 'hidden');


	 	}
	 	else {
		 	$('.rmm-toggled').find('ul').stop().hide(300);
		 	 $('.rmm-toggled').addClass("rmm-closed");

			$('#navMenu').css('visibility', 'visible');

	 	}
		
	});	

});
	/* 	hide mobile menu on resize */
$(window).resize(function() {
 	adaptMenu();

});

