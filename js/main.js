function loadNow($) {
	"use strict";

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	// Initiate superfish on nav menu
	$('.nav-menu').superfish({
		animation: {
			opacity: 'show'
		},
		speed: 400
	});

	// Mobile Navigation
	if ($('#nav-menu-container').length) {
		var $mobile_nav = $('#nav-menu-container').clone().prop({
			id: 'mobile-nav'
		});
		$mobile_nav.find('> ul').attr({
			'class': '',
			'id': ''
		});
		$('body').append($mobile_nav);
		$('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
		$('body').append('<div id="mobile-body-overly"></div>');
		$('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

		$(document).on('click', '.menu-has-children i', function (e) {
			$(this).next().toggleClass('menu-item-active');
			$(this).nextAll('ul').eq(0).slideToggle();
			$(this).toggleClass("fa-chevron-up fa-chevron-down");
		});

		$(document).on('click', '#mobile-nav-toggle', function (e) {
			$('body').toggleClass('mobile-nav-active');
			$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
			$('#mobile-body-overly').toggle();
		});

		$(document).click(function (e) {
			var container = $("#mobile-nav, #mobile-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('mobile-nav-active')) {
					$('body').removeClass('mobile-nav-active');
					$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
					$('#mobile-body-overly').fadeOut();
				}
			}
		});
	} else if ($("#mobile-nav, #mobile-nav-toggle").length) {
		$("#mobile-nav, #mobile-nav-toggle").hide();
	}

	// Header scroll class
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#header').addClass('header-scrolled');
		} else {
			$('#header').removeClass('header-scrolled');
		}
	});

	if ($(window).scrollTop() > 100) {
		$('#header').addClass('header-scrolled');
	}

	// Intro carousel
	var introCarousel = $(".carousel");
	var introCarouselIndicators = $(".carousel-indicators");
	introCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
		(index === 0) ?
			introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
			introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

		$(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
		$(this).children('.carousel-background').remove();
	});

	$(".carousel").swipe({
		swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left')
				$(this).carousel('next');
			if (direction == 'right')
				$(this).carousel('prev');
		},
		allowPageScroll: "vertical"
	});

	// Cart Quantity
	$('.quantity').prepend('<span class="dec q-btn">-</span>');
	$('.quantity').append('<span class="inc q-btn">+</span>');
	$('.q-btn').on('click', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
	});

	// start the countdown code
	// Setup End Date for Countdown (getTime == Time in Milleseconds)
	let launchDate = new Date("oct 31, 2023 12:00:00").getTime();

	// Setup Timer to tick every 1 second
	let timer = setInterval(tick, 1000);

	function tick() {
		// Get current time
		let now = new Date().getTime();
		// Get the difference in time to get time left until reaches 0
		let t = launchDate - now;

		// Check if time is above 0
		if (t > 0) {
			// Setup Days, hours, seconds and minutes
			// Algorithm to calculate days...
			let days = Math.floor(t / (1000 * 60 * 60 * 24));
			// prefix any number below 10 with a "0" E.g. 1 = 01
			if (days < 10) { days = "0" + days; }

			// Algorithm to calculate hours
			let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			if (hours < 10) { hours = "0" + hours; }

			// Algorithm to calculate minutes
			let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			if (mins < 10) { mins = "0" + mins; }

			// Algorithm to calc seconds
			let secs = Math.floor((t % (1000 * 60)) / 1000);
			if (secs < 10) { secs = "0" + secs; }

			// Create Time String
			let time = `${days} : ${hours} : ${mins} : ${secs}`;

			// Set time on document
			let countdown = document.querySelector('.countdown')
			if (countdown)
				countdown.innerText = time;
		}
	}
	// end the countdown code

	// start the promo code
	'use strict';

	var swiper = new Swiper('.slide-content', {
	  slidesPerView: 1,                    // Number of slides to show at once
	  spaceBetween: 25,                    // Space between slides (in pixels)
	  loop: false,                          // Enable continuous loop of slides
	  centerSlide: false,                   // Center the active slide
	  fade: false,                          // Enable fade transition effect
	  grabCursor: false,                    // Show grab cursor on slide hover
		pagination: {
			el: '.swiper-pagination',          // Pagination element selector
			clickable: true,                   // Allow clicking on pagination bullets
			dynamicBullets: false,              // Dynamically show/hide pagination bullets
		},
		navigation: {
			nextEl: '.swiper-button-next',     // Next slide button selector
			prevEl: '.swiper-button-prev',     // Previous slide button selector
		},
		autoplay: {
			delay: 1500,                       // Time between each auto slide (in milliseconds)
			disableOnInteraction: false,       // Enable user interaction (clicking) with slider during autoplay
		},
		breakpoints: {
			0: {
			slidesPerView: 1,                // Number of slides to show at screen width 0px and above
			},
			520: {
			slidesPerView: 2,                // Number of slides to show at screen width 520px and above
			},
			950: {
			slidesPerView: 3,                // Number of slides to show at screen width 950px and above
			},
		},
	});
	

}
