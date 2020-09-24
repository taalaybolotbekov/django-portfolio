/* CUSTOM JQUERY
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
'use strict';

	var $winW = function(){ return $(window).width(); };
	var $winH = function(){ return $(window).height(); };
	var $screensize = function(element){  
		$(element).width($winW()).height($winH());
	};
	
	var screencheck = function(mediasize){
		if (typeof window.matchMedia !== "undefined"){
			var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
			if( screensize.matches ) {
				return true;
			}else {
				return false;
			}
		} else {
			if( $winW() <=  mediasize ) {
				return true;
			}else {
				return false;
			}
		}
	};
		
	$(document).ready(function() {
	
	/*========================================================== 
	 PRELOADER
	========================================================== */	
	$(window).on('load', function() {
		$('.preloader').fadeOut();
	});
	
	/*========================================================== 
	 STYLE SWITCHER JS
	========================================================== */	
	$(".gear-check").on('click',(function () {
		$(".option-box").toggleClass('open');
	}));
	var colorBox = $(".color-option li");
	colorBox.on('click',function () {
		$("link[href*='color']").attr("href", $(this).attr("data-value"));
	});
	
	/*========================================================== 
	 STICKY HEADER
	========================================================== */
	$(window).on('scroll',function () {
		if( $(document).scrollTop() > 5 ) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});
	
	/*========================================================== 
	 MENU
	 ========================================================== */
	 $(document).on('click', '.menu-trigger-btn', function() {
		$('body').toggleClass('menuopen');	
	 }).on('click', '#main-nav ul li a', function() {
		var targetContent = $(this).attr('data-rel');
		$('.section-anim').removeClass('show');
		$('#nav li').removeClass('active');
   		$("#"+targetContent).addClass('show');
		$(this).parent('li').addClass('active');
	 });
	 
	 /*========================================================== 
	 PORTFOLIO SLIDER
	 ========================================================== */
	 if($('.portfolio-slider').length) {
		 var swiper = new Swiper('.portfolio-slider', {
			slidesPerView: 4,
			mousewheel: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				767: {
				  slidesPerView: 1,
				  mousewheel: false
				},
				768: {
				  slidesPerView: 2
				},
				1024: {
				  slidesPerView: 3
				}
			 }
		});
	}
	
	if($('.portfolio-full').length) {
		 var swiper = new Swiper('.portfolio-full', {
			slidesPerView: 1,
			mousewheel: true,
			direction: 'vertical',
			loop: true,
			speed: 600,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				767: {
				  mousewheel: false,
				  direction: 'horizontal'
				}
			 }
		});
	}
	
	if($('.portfolio-onepage').length) {
		 var swiper = new Swiper('.portfolio-onepage', {
			slidesPerView: 4,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				767: {
				  slidesPerView: 1
				},
				768: {
				  slidesPerView: 2
				},
				1024: {
				  slidesPerView: 3
				}
			 }
		});
	}
	
	/*========================================================== 
	 BRAND LOGOS SLIDER
	 ========================================================== */
	 if($('.brand-logos').length) {
		 var swiper = new Swiper('.brand-logos', {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			speed: 600,
			 autoplay: {
				delay: 2500
			},
		  	breakpoints: {
				768: {
				  slidesPerView: 2,
				  spaceBetween: 20
				}
			 }
		});
	}
	
	if($('.brand-logos-cols4').length) {
		 var swiper = new Swiper('.brand-logos-cols4', {
			slidesPerView: 4,
			spaceBetween: 30,
			speed: 600,
			loop: true,
			 autoplay: {
				delay: 2000
			},
		  	breakpoints: {
				575: {
				  slidesPerView: 2,
				  spaceBetween: 20
				},
				768: {
				  slidesPerView: 3,
				  spaceBetween: 20
				}
			 }
		});
	}
	
	$(window).on('resize', function(){
		if (screencheck(767)) {
			$('#nav').addClass('scrollnav');
		} else {
			$('#nav').removeClass('scrollnav');
		}
	}).resize();
	
	/*========================================================== 
	SCROLL SPY MENU
	========================================================== */
	if($('.scrollnav').length) {
		var lastId,
			topMenu = $('.scrollnav'),
			topMenuHeight = 100,
			// All list items
			menuItems = topMenu.find('a'),
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function(){
				var item = $($(this).attr('href'));
				if (item.length) { return item; }
			});
	
		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		
		  menuItems.on('click', function(e) {
			$('body').removeClass('menuopen');
			var href = $(this).attr("href");
			var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight+1;
			$('html, body').stop().animate({ 
				scrollTop: offsetTop
			}, 500);
			
			e.preventDefault();
		});
	
		// Bind to scroll
		$(window).on('scroll',function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop()+topMenuHeight;
			// Get id of current scroll item
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
				return this;
			});
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass('active');
		   }                   
		});	
	}
	
	/*========================================================== 
	ISOTOPE PORTFOLIO
	========================================================== */
	$(window).on("load",function (){ 
		if($('#portfolio').length) {
			$('#portfolio').isotope({
				itemSelector: '.portfolio-item'
			});
			var $grid = $('#portfolio').isotope({
			// options
			});
			
			$('.filters-row').on( 'click', 'span', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});
			$('.filters-row').on( 'click', 'span', function() {
				$(this).addClass('active').siblings().removeClass('active');
			});
		}
	});
	
	/*========================================================== 
		 TEXT TYPE IN DEMOS PAGE
	========================================================== */
	if($(".typed-text").length) {
		$(".typed-text").typed({
			strings: ["Agency", "Freelancers", "Photographers", "Startups"],
			typeSpeed: 40,
			backSpeed: 6,
			backDelay: 2000,
			loop: true
		 });
	 }

});	})(jQuery, window, document);