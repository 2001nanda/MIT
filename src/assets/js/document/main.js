(function ($) {
	"use strict";

	    $(".mode").on("click", function () {
			$('.mode i').toggleClass("fa-moon-o").toggleClass("fa-lightbulb-o");
			$('body').toggleClass("dark-layout");
		});

		// font size
		$(".decrease").on("click", function () {
			$('.content').addClass("font-decrease").removeClass("font-increase");
		});

		$(".increase").on("click", function () {
			$('.content').addClass("font-increase").removeClass("font-decrease");
		});

		$(".reset").on("click", function () {
			$('.content').removeClass("font-decrease").removeClass("font-increase");
		});
		
   
	jQuery('.title').addClass('active');
    jQuery('.title').on('click', function () {
	  jQuery('.dropdown-nav').slideUp('normal');	
      if (jQuery(this).next().is(':hidden') == true) {
        jQuery(this).addClass('active');
        jQuery(this).next().slideDown('normal');
		}
	});
    // jQuery('.dropdown-nav').hide();
  
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('.tap-top').fadeIn();
		} else {
			$('.tap-top').fadeOut();
		}
	});
	$('.tap-top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	$(".toggle-sidebar").on("click", function () {
        $('.left-sidebar').toggleClass("open");
	});

})(jQuery);

function onScroll(event){
	var scrollPosition = $(document).scrollTop();
	$('.page-right-sidebar nav a[href^="#"').each(function () { //added a[href^="#"] so that the loop only iterates over the elements with the ID tag
	  var currentLink = $(this);
	  var refElement = $(currentLink.attr("href"));
	  console.log(currentLink.attr("href")); //log
	  if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
		$('.page-right-sidebar nav a').removeClass("active");
		currentLink.addClass("active");
	  }
	  else{
		currentLink.removeClass("active");
	  }

	});
  }

  $(document).ready(function () {
		  $(document).on("scroll", onScroll);

		  $('.page-right-sidebar nav a[href^="#"]').on('click', function (e) {
			  e.preventDefault();
			  $(document).off("scroll");

			  $('.page-right-sidebar nav a').each(function () {
				  $(this).removeClass('active');
			  });
			  $(this).addClass('active');

			  var target = this.hash;
			  $target = $(target);
		console.log(target);
		$('html, body').stop().animate({
				  'scrollTop': $target.offset().top - 1
			  }, 1000, 'swing', function () {
				  window.location.hash = target;
				  $(document).on("scroll", onScroll);
			  });

		  });
	  });
// sidebar active
var current = window.location.pathname
$(".nav-sidebar >li .nav-link").filter(function() {

	var link = $(this).attr("href");
	// console.log("active page", $(this).attr("href"));
    if(link){
        if (current.indexOf(link) != -1) {
            $(this).parents().children('ul').css('display', 'block');
            $(this).parents().children('.title').addClass('active');
			$(this).addClass('active');
            return false;
        }
    }
});