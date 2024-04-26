jQuery(function ($) {


	// Special banner animation	- start

	function sb_height() {

		$('.special-banner').css('height', $('.special-banner').find('img').outerHeight());
	}

	$(document).ready(function () {
		sb_height();
	});

	$(window).resize(function () {
		sb_height();
	});

	window.setTimeout(function () {
		$('.special-banner').addClass('hidden')
	}, 10000);

	// Special banner animation	- end



	/* Move ADS from sidebar to listing - start */
	function grid_ads_move() {
		if ($('.grid-move-ads').length) {
			setTimeout(function () {
				if ($(window).width() < 768) {

					var ads_in_content = $('.grid.listing .main .item.ad[style="display: block;"]').length;
					var ads_counter = 0;
					console.log('Ads in content', ads_in_content);
					//console.log('Ads move counter', ads_counter);


					$('.grid.listing .main .item.ad[style="display: block;"]').each(function (index) {
						$(this).prependTo('.sidebar.grid-move-ads')
						ads_counter = ads_counter + 1;
					});


					$('.grid.listing .main .item.ad[style="display: none;"]').each(function (index) {
						$(this).remove();
					});



					var ad_count = $('.sidebar .ad').length;
					console.log("Ad count: ", ad_count);

					var card_count = $('.grid.listing .main .facetwp-template > .item:not(.ad):not(.section-name)').length;
					console.log("Cards count: ", card_count);

					//console.log(card_count / ad_count);
					//console.log(Math.floor(card_count / ad_count));


					var counter = Math.floor(card_count / ad_count);

					if (ads_in_content == ads_counter && card_count > ad_count + 3) {
						//console.log('true');
						$('.sidebar .ad').each(function (index) {
							//console.log('more than ads')
							$(this).insertAfter(".grid .main .facetwp-template > .item:not(.ad):nth-of-type(" + counter + ")");
							counter = counter + Math.floor(card_count / ad_count) + 1;
							console.log(counter);
						});
					}
					else {
						//console.log('false');
					}



				};
			}, 1000);
		}
	}
	grid_ads_move();
	/* Move ADS from sidebar to listing - end */




	/* Move ADS from sidebar to content - start */

	function moveads() {
		if ($('.movable-ads').length) {
			setTimeout(function () {
				var ad_count = $('.sidebar .ad').length;
				console.log("Ad count: ", ad_count);
				var paragraph_count = $('.grid .main > p').length;
				console.log("Paragraph count: ", paragraph_count);
				//console.log(Math.round(paragraph_count / ad_count));

				var ads = []
				var count = 1;


				if ($(window).width() < 768) {
					$('.sidebar .ad').each(function (index) {
						if (index == 0) {
							console.log('ad index 0');
							$(this).eq(0).insertBefore(".grid .main > p:nth-of-type(1)");
						}
						else {
							console.log('ad index', index);
							if (paragraph_count <= ad_count) {
								console.log('less than ads')
								$(this).insertAfter(".grid .main > p:nth-of-type(" + index * Math.ceil(paragraph_count / ad_count) * 2 + ")");
							}
							else {
								console.log('more than ads')
								$(this).insertAfter(".grid .main > p:nth-of-type(" + index * Math.ceil(paragraph_count / ad_count) + ")");
							}
						}
					});
				};
			}, 1000);
		}
	}
	moveads();

	/* Move ADS from sidebar to content - end */


	$('.header-search').click(function (e) {
		e.preventDefault();
		$('.search-wrap').addClass('active');

		$('.search-field input[type="text"]').focus();
	});

	$('.search-close').click(function (e) {
		$('.search-wrap').removeClass('active');
	});

	/* ======  Load unread articles ====== */

	/* ======  FILTER EPAPERS - start ====== */



	if ($('.listing-with-filter').length) {
		$('<div class="cw-filters"></div>').insertBefore($(".issues-listing"));


		var filternames = [];
		var filtervalues = [];
		var options = [];

		$('.issues-listing .item').each(function () {
			$.each(this.attributes, function (i, a) {
				//console.log(a.name, a.value);
				filternames.push(a.name);
				filtervalues.push(a.value);
			})
		});




		var remove_names = 'class';
		filternames = $.grep(filternames, function (value) {
			return value != remove_names;
		});

		var unique_filternames = filternames.filter(function (element, index, self) {
			return index === self.indexOf(element);
		});
		console.log(unique_filternames);

		var unique_filtervalues = filternames.filter(function (element, index, self) {
			return index === self.indexOf(element);
		});
		console.log(unique_filtervalues);

		function sort_alpha() {
			var options = $('#data-filter-country option');
			var arr = options.map(function (_, o) {
				return {
					t: $(o).text(),
					v: o.value
				};
			}).get();
			arr.sort(function (o1, o2) {
				return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
			});
			options.each(function (i, o) {
				console.log(i);
				o.value = arr[i].v;
				$(o).text(arr[i].t);
			});
		}

		$.each(unique_filternames, function (index, value) {
			var label = value.replace("data-filter-", "");

			$("<div><label>" + label + "</label><select id='" + value + "'></select></div>").appendTo($(".cw-filters"));

			$('.issues-listing .item[' + value + ']').each(function () {
				$('#' + value + '').append('<option value="' + $(this).attr(value) + '">' + $(this).attr(value) + '</option>');
			});

			sort_alpha()
		});








		var seen = {};
		$('.cw-filters select option').each(function () {
			var txt = $(this).text();
			if (seen[txt])
				$(this).remove();
			else
				seen[txt] = true;
		});


		$('.cw-filters select').each(function () {
			$(this).prepend('<option value="all" selected>All</option>')
		});




		$('body').on('change', '.cw-filters select', function () {
			$('.issues-listing .item').hide();

			$('.cw-filters select').not(this).val('all')

			if ($(this).val() == "all") {
				$('.issues-listing .item').show();
			}

			$('.item[' + $(this).attr('id') + '="' + $(this).val() + '"]').show();

		})
	}




	/* ======  FILTER EPAPERS - end ====== */



	$(".twentytwenty-container").twentytwenty();


	$('.grid .item').each(function () {
		var i = $(this).index();
		//console.log(i);
		//$(this).css('order', i )
	});

	$('.grid .paging').each(function () {
		var i = $(this).index();
		console.log(i);
		$(this).css('order', i)
	});



	$('.speaker-bio').click(function () {
		$('.speaker-bio-text').toggle();
	});




	/* ===== Footer ad - start ===== */
	$('.close-ad').click(function () {
		$(this).parents('.sticky').hide();
	});


	function sitepadding() {
		var windowW = jQuery(window).outerWidth();
		var sitept = $('#masthead:not(.sticky)').outerHeight();

		if (windowW < 992) {
			$('.wrapper').css('padding-top', sitept + 20);
			$('.wrapper.padding-small').css('padding-top', sitept);
		}
		else {
			$('.wrapper').css('padding-top', sitept + 40);
			$('.wrapper.padding-small').css('padding-top', sitept);
		}
	}
	$(document).ready(function () {
		sitepadding();
	});

	$(window).resize(function () {
		sitepadding();
	});


	function footerpadding() {
		var footerH = $('.footer-top').outerHeight();
		var coverH = $('.footer-top .right picture:nth-child(1) img').outerHeight();
		//console.log(footerH);
		//console.log(coverH);

	}

	footerpadding();



	//	console.log('init masonry');
	var masonryOptions = {
		itemSelector: '.grid-item',
		columnWidth: '.grid-item'
	};

	var $grid = $('.masonry-grid').masonry(masonryOptions);
	$grid.imagesLoaded(function () {
		//		console.log('imagesLoaded');
		$grid.masonry();
	});




	/* ========================= */
	/* ===== Zoom - start ===== */
	/* ========================= */


	function zoom_image_height() {
		$('.gallery-item img').each(function () {
			var pH = $('#zoom-modal .modal-body').outerHeight();
			var cH = $(this).siblings('.caption').outerHeight();
			$(this).css('max-height', pH - cH);
		});
	}

	function zoom_picture_height() {
		$('.gallery-item picture').each(function () {
			console.log('PICTURE: ', $(this));
			var pH = $('#zoom-modal .modal-body').outerHeight();
			var cH = $(this).siblings('.caption').outerHeight();
			//$(this).find('img').css('max-height', pH - cH);
			console.log()
			$(this).find('img').css('max-height', pH - cH);
		});
	}

	//RADU 
	function picture_tag_for_zoom(picture) {
		var $picture = jQuery(picture);
		// console.log('$picture: ',$picture);

		$picture.find('img').attr('sizes', '100vw');
		$picture.find('source').attr('sizes', '100vw');
		// var modifiedPictureContent = $picture[0].outerHTML;
		return $picture[0].outerHTML;

		// console.log('modifiedPictureContent: ',modifiedPictureContent);		
	}

	/*RADU CHANGED THIS ON 15.06.2023
	$('.owl-gallery img').click(function(event){
		$('.owl-gallery img').each(function(){
			$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item"><img src="'+$(this).data('zoom')+'"><div class="caption">'+$(this).parents('.owl-item').find('.caption').text()+'</div></div>')
		});
	
		var index_slider = $(this).parents('.owl-item').index();
	
		console.log('ITEM CLICKED: ',index_slider);
	
		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_slider).addClass('active');
		$('.modal-slider-nav').show();
		$('#zoom-modal').modal('show');
		setTimeout(function(){ 
			zoom_image_height();
		}, 500);
	});
	*/

	$('.owl-gallery img').click(function (event) {

		//console.log('IMAGES IN CUR GALLERY: ',$(this).closest('.owl-gallery').find('img'));
		$(this).closest('.owl-gallery').find('picture').each(function () {
			//console.log('OWL CAROUSEL PICTURE: ', $(this));

			//FIND PICTURE IF NOT FIND IMG FOR FALLBACK

			var pictureContent = $(this)[0].outerHTML;
			pictureContent = picture_tag_for_zoom(pictureContent);

			$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item">' + pictureContent + '<div class="caption">' + $(this).parents('.owl-item').find('.caption').text() + '</div></div>')
		});

		/*
		$(this).closest('.owl-gallery').find('img').each(function(){
			//$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item"><img src="'+$(this).data('zoom')+'"><div class="caption">'+$(this).parents('.owl-item').find('.caption').text()+'</div></div>')
		});
		*/

		var index_slider = $(this).parents('.owl-item').index();

		//console.log('ITEM CLICKED: ',index_slider);

		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_slider).addClass('active');
		$('.modal-slider-nav').show();
		$('#zoom-modal').modal('show');
		setTimeout(function () {
			//zoom_image_height();
			zoom_picture_height();
		}, 500);
	});

	$('.image-block img[data-zoom]').click(function (event) {
		$(this).parents('.image-block').find('img').each(function () {
			$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item"><img src="' + $(this).data('zoom') + '"><div class="caption">' + $(this).siblings('.caption').text() + '</div></div>')
		});

		var index_slider2 = $(this).parents('.item').index();
		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_slider2).addClass('active');


		var slider_count = $(this).parents('.image-block').find('.item').length;
		//console.log(slider_count);
		if (slider_count < 2) {
			$('.modal-slider-nav').hide();
		}
		else {
			$('.modal-slider-nav').show();
		}


		$('#zoom-modal').modal('show');
		setTimeout(function () {
			zoom_image_height();
		}, 500);
	});

	$('.image-block picture').click(function (event) {

		$(this).parents('.image-block').find('picture').each(function () {
			var pictureContent = $(this).get(0).outerHTML;

			// var $picture = jQuery(pictureContent);
			// console.log('$picture: ',$picture);

			// $picture.find('img').attr('sizes', '100vw');
			// $picture.find('source').attr('sizes', '100vw');
			// var modifiedPictureContent = $picture[0].outerHTML;

			// console.log('modifiedPictureContent: ',modifiedPictureContent);
			pictureContent = picture_tag_for_zoom(pictureContent);

			$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item">' + pictureContent + '<div class="caption">' + $(this).siblings('.caption').text() + '</div></div>')
		});

		var index_slider2 = $(this).parents('.item').index();
		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_slider2).addClass('active');

		var slider_count = $(this).parents('.image-block').find('.item').length;
		//console.log(slider_count);
		if (slider_count < 2) {
			$('.modal-slider-nav').hide();
		}
		else {
			$('.modal-slider-nav').show();
		}


		$('#zoom-modal').modal('show');
		setTimeout(function () {
			zoom_picture_height();
		}, 500);
	});

	$('.zoom-link picture').click(function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var pictureContent = $(this).get(0).outerHTML;
		pictureContent = picture_tag_for_zoom(pictureContent);


		$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item">' + pictureContent + '<div class="caption">' + $(this).parents('.wp-caption').find('em').text() + '</div></div>')
		//});
		var index_slider3 = $(this).parents('.item').index();
		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_slider3).addClass('active');
		$('.modal-slider-nav').hide();
		$('#zoom-modal').modal('show');

		setTimeout(function () {
			zoom_picture_height();
		}, 500);

	});

	$('.zoom-link img[data-zoom]').click(function (event) {
		event.preventDefault();

		//console.log('OLD ZOOM CODE!');
		$(this).each(function () {
			$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item"><img src="' + $(this).data('zoom') + '"><div class="caption">' + $(this).parents('.wp-caption').find('em').text() + '</div></div>')
		});

		var index_slider3 = $(this).parents('.item').index();
		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_slider3).addClass('active');
		$('.modal-slider-nav').hide();
		$('#zoom-modal').modal('show');
		setTimeout(function () {
			zoom_image_height();
		}, 500);
	});

	$('.masonry-grid img').click(function (event) {
		$('.masonry-grid img').each(function () {
			$('#zoom-modal .modal-body .modal-slider').append('<div class="gallery-item"><img src="' + $(this).data('zoom') + '"><div class="caption">' + $(this).parents('.grid-item').find('.caption').text() + '</div></div>')
		});

		var index_masonry = $(this).parents('.grid-item').index();
		$('#zoom-modal .modal-body .modal-slider .gallery-item').eq(index_masonry).addClass('active');
		$('#zoom-modal').modal('show');
		setTimeout(function () {
			zoom_image_height();
		}, 500);
	});

	$(window).resize(function () {
		setTimeout(function () {
			zoom_image_height();
			zoom_picture_height();
		}, 500);
	});

	$('.modal-slider-nav .next').on("click", function () {
		var $first = $('.modal-slider .gallery-item:first');
		var $last = $('.modal-slider .gallery-item:last');
		var $selected = $(".modal-slider .gallery-item.active");
		$next = $selected.next('.gallery-item').length ? $selected.next('.gallery-item') : $first;
		$selected.removeClass("active").fadeOut('fast');
		$next.addClass('active').fadeIn('fast');
		zoom_image_height();
		zoom_picture_height();
	});


	$('.modal-slider-nav .prev').on("click", function () {
		var $first = $('.modal-slider .gallery-item:first');
		var $last = $('.modal-slider .gallery-item:last');
		var $selected = $(".modal-slider .gallery-item.active");
		$prev = $selected.prev('.gallery-item').length ? $selected.prev('.gallery-item') : $last;
		$selected.removeClass("active").fadeOut('fast');
		$prev.addClass('active').fadeIn('fast');
		zoom_image_height();
		zoom_picture_height();
	});



	$("body").keydown(function (e) {
		if (e.keyCode == 37) { // left
			var $first = $('.modal-slider .gallery-item:first');
			var $last = $('.modal-slider .gallery-item:last');
			var $selected = $(".modal-slider .gallery-item.active");
			$next = $selected.next('.gallery-item').length ? $selected.next('.gallery-item') : $first;
			$selected.removeClass("active").fadeOut('fast');
			$next.addClass('active').fadeIn('fast');
			zoom_image_height();
			zoom_picture_height();
		}
		else if (e.keyCode == 39) { // right
			var $first = $('.modal-slider .gallery-item:first');
			var $last = $('.modal-slider .gallery-item:last');
			var $selected = $(".modal-slider .gallery-item.active");
			$prev = $selected.prev('.gallery-item').length ? $selected.prev('.gallery-item') : $last;
			$selected.removeClass("active").fadeOut('fast');
			$prev.addClass('active').fadeIn('fast');
			zoom_image_height();
			zoom_picture_height();
		}
	});


	$('#zoom-modal').on('hidden.bs.modal', function (e) {
		$('#zoom-modal .modal-body .modal-slider').empty();
	})

	/* ========================= */
	/* ===== Zoom - end ===== */
	/* ========================= */


	/* ========================== */
	/* ===== Ticker - start ===== */
	/* ========================== */

	var block = $('.tickerr .item');
	//variable for counter
	var k = 0;
	$('.tickerr .item:first-child').addClass('active');

	//interval function works only when pause is false
	setInterval(function () {


		var $this = block.eq(k);


		block.removeClass('active').eq(k).addClass('active');
		$this.addClass('active');
		//increase k every 1.5 sec
		k++;
		//if k more then number of blocks on page
		if (k >= block.length) {
			//rewrite variable to start over
			k = 0;
		}

		//every 1.5 sec
	}, 5000);

	/* ======================== */
	/* ===== Ticker - end ===== */
	/* ======================== */


	/* =================================== */
	/* ===== Article Gallery - start ===== */
	/* =================================== */


	function position_arrows() {
		console.log('Position arrows', $('.enviraGallery .owl-item.active img').outerHeight());

		$('.enviraGallery .owl-gallery .owl-nav .owl-next, .enviraGallery .owl-gallery .owl-nav .owl-prev').each(function () {
			$(this).css('top', (($(this).parent().siblings('.owl-stage-outer').find('.active img').outerHeight()) / 2));
		})
	}

	function enviraGallery() {
		$('.enviraGallery').imagesLoaded(function () {

			$('.enviraGallery').each(function () {
				var slider = $(this).find('.owl-gallery');
				var thumbnailSlider = $(this).find('.owl-thumb');
				var duration = 200;


				slider.on('changed.owl.carousel', function (e) {
					setTimeout(function () {
						position_arrows();
					}, 100);
				});

				slider.on('initialized.owl.carousel', function () {
					setTimeout(function () {
						position_arrows();
					}, 100);
				})

				slider.owlCarousel({
					loop: false,
					nav: false,
					items: 1,
					nav: true,
					dots: false,
					nav: false,
					navText: [],
					responsive: {
						0: {
							autoHeight: true
						},
						768: {
							autoHeight: true
						}
					}
				})




					.on('changed.owl.carousel', function (e) {
						thumbnailSlider.trigger('to.owl.carousel', [e.item.index, duration, true]);
						thumbnailSlider.find('.owl-item').removeClass('focused');
						thumbnailSlider.find('.owl-item').eq(e.item.index).addClass('focused');
					})

				thumbnailSlider.on('initialized.owl.carousel', function () {
					thumbnailSlider.find('.owl-item').eq(0).addClass('focused');
				})

				thumbnailSlider.owlCarousel({
					loop: false,
					nav: false,
					dots: false,
					mouseDrag: false,
					margin: 3,
					nav: true,
					navText: [],
					slideBy: 0,
					responsive: {
						0: {
							items: 5
						},
						768: {
							items: 10
						}
					}
				})

					.on('click', '.owl-item', function () {
						slider.trigger('to.owl.carousel', [$(this).index(), duration, true]);
					})

					.on('changed.owl.carousel', function (e) {
						slider.trigger('to.owl.carousel', [e.item.index, duration, true]);
					});

				$('.owl-thumb .owl-next').click(function () {
					slider.trigger('next.owl.carousel');
				});

				$('.owl-thumb .owl-prev').click(function () {
					slider.trigger('prev.owl.carousel');
				});

			});



		});
	}
	/* ================================= */
	/* ===== Article Gallery - end ===== */
	/* ================================= */



	/* ============================= */
	/* ===== Fixes ads - start ===== */
	/* ============================= */

	function fCarpet() {
		var windowH = jQuery(window).innerHeight();
		var windowW = jQuery(window).width();


		if (windowH > windowW) {

			jQuery('.desktopAd').hide();
			jQuery('.mobileAd').show();

		}
		else if (windowH < windowW) {

			jQuery('.desktopAd').show();
			jQuery('.mobileAd').hide();
		}
		jQuery('.adWrapper').css('height', windowH + 100);
	}
	$(document).ready(function () {
		$('.adWrapper').imagesLoaded(function () {
			fCarpet();
		});
	});

	$(window).resize(function () {
		fCarpet();
	});
	/* =========================== */
	/* ===== Fixes ads - end ===== */
	/* =========================== */



	/* =========================================== */
	/* ===== Active menus & submenus - start ===== */
	/* =========================================== */

	jQuery(function () {
		var path = [];
		path = location.pathname.split("/");
		var newpath = path.filter(function (v) { return v !== '' });
		//console.log('Path:', path);
		//console.log('Path:', newpath);
		if (path.length == 3) {
			//console.log('case 1');
			jQuery('#masthead .menu > li > a[href^="/' + path[1] + '/"]').addClass('active');

		}
		else if ((path.length - 2) == 2) {
			//console.log('case 2');
			if (path[2] != 'c') {
				//console.log('case 3');
				//console.log('/' + path[1]+'/'+path[2]+'/');
				jQuery('.company .head .tabs li a[href="/' + path[1] + '/' + path[2] + '/"]').addClass('active');
				jQuery('#masthead .menu > li > a[href^="/' + path[1] + '/"]').addClass('active');
			}
		}
		else {
			//console.log('case 4');
			if ((path[2] == 'c') && (path[3] != '')) {
				//console.log('case 5');
				var subpath = [];
				var checkme = '';
				subpath = path[3].split('-');
				//alert(subpath);
				for (i = 0; i < subpath.length; i++) {
					if (checkme)
						checkme = checkme + '-' + subpath[i];
					else checkme = subpath[i];
					jQuery('#masthead .menu > li > a[href^="/' + path[1] + '/"]').addClass('active');
				}
				jQuery('#masthead .menu > li > a[href^="/' + path[1] + '/"]').addClass('active');
			}
			else {
				//console.log('case 6');
				jQuery('#masthead .menu > li > a[href^="/' + path[1] + '/"]').addClass('active');
				//console.log('/' + path[1]+'/'+path[2]+'/'+path[3] + '/');
				jQuery('.company .head  .tabs li a[href^="/' + path[1] + '/' + path[2] + '/' + path[3] + '/"]').addClass('active');

			}
		}
	});
	/* ========================================= */
	/* ===== Active menus & submenus - end ===== */
	/* ========================================= */




	$('.filter-trigger').click(function () {
		$(this).toggleClass('open');
		$('.filter').toggleClass('open');
	})





	$.fn.isInViewport = function () {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$(window).on('ready resize scroll', function () {
		var flag = true;
		$('.ad').each(function () {
			if ($(this).isInViewport()) {
				//console.log('visible');
			}

		});

	});







	// function el_scroll() {

	// 	/* Check the location of each desired element */
	// 	$('.item.ad').each( function(i){

	// 		var bottom_of_object = $(this).offset().top + $(this).outerHeight();
	// 		var bottom_of_window = $(window).scrollTop() + $(window).height();


	// 		 If the object is completely visible in the window, fade it it 
	// 		if( bottom_of_window > bottom_of_object - $(this).outerHeight()){
	// 			console.log('visible in viewport')
	// 		}

	// 		else {

	// 			console.log('no ad visible visible in viewport')
	// 		}
	// 	});
	// }



	// $( document ).ready(function() {
	// 	el_scroll();
	// });
	// $(window).scroll( function(){

	// 	el_scroll();		 

	// });



	function createLayout() {
		// if ($(window).width() > 992 && !$('.grid.listing .main').length) {
		// 	$( ".grid.listing" ).prepend( "<div class='sidebar'></div>" );
		// 	$( ".grid.listing" ).prepend( "<div class='main'></div>" );
		// 	$(".to-sidebar").appendTo(".grid.listing .sidebar");


		// 	if ($('.facetwp-template').length) {
		// 		$(".facetwp-template").appendTo(".main");	
		// 		$(".item.section-name[style='order: 0;']").prependTo(".main");	
		// 	} 
		// 	else {
		// 		$(".grid.listing .item:not(.to-sidebar)").appendTo(".main");	
		// 	}


		// } 
		// if ($(window).width() < 992 && $('.grid .main').length) {
		// 	if ($('.facetwp-template').length) {

		// 	}
		// 	else {
		// 		$(".grid.listing .item").appendTo(".grid");
		// 		$('.grid.listing .main').remove();
		// 		$('.grid.listing .sidebar').remove();	
		// 	}

		// }

	}
	createLayout();

	var resizeTimer;
	$(window).on('resize', function (e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			createLayout();
		}, 250);
	});




	/* ===== Slider width - BEGIN ===== */

	function images_width() {
		var vW = $(window).width();
		//console.log('Window width:',vW);

		// var lw = $('.main').offset().left + $('.main').outerWidth();
		// $('.hero-image .banner').css('width',lw);
		// var rw = $('.sidebar').offset().left + $('.main').outerWidth();

		if (vW > 1600) {
			var dif = (1600 - 1320) / 2;
			//console.log('Case 1');
			//console.log(dif);


			$('body:not(.single) .slider').css('flex', '0 1 calc(66.66% + ' + dif + 'px)');
			$('body:not(.single) .slider').css('max-width', 'calc(66.66% + ' + dif + 'px)');
			$('body:not(.single) .slider').css('margin-left', -dif);


			$('.hero-image.small .banner').css('flex', '0 1 calc(66.66% + ' + dif + 'px)');
			$('.hero-image.small .banner').css('max-width', 'calc(66.66% + ' + dif + 'px)');
			$('.hero-image.small .banner').css('margin-left', -dif);


			$('.hero-image.small .photo-credits').css('flex', '0 1 calc(66.66% + ' + dif + 'px)');
			$('.hero-image.small .photo-credits').css('max-width', 'calc(66.66% + ' + dif + 'px)');
			$('.hero-image.small .photo-credits').css('margin-left', -dif);



			$('.company .head .info').css('margin-left', -dif);
			$('.company-slider').css('margin-right', -dif);
			$('.company-slider').css('flex', '0 1 calc(66.66% + ' + dif + 'px)');
			$('.company-slider').css('max-width', 'calc(66.66% + ' + dif + 'px)');


			$('.news').css('margin-right', -dif);
			$('.slider-banner').css('margin-right', -dif);
			$('.info-wrap.small .info').css('margin-right', - dif);
			$('.hero-image.small .box > *').css('margin-right', - dif);


			$('.outside.alignleft').css('margin-left', -dif);
			$('.outside.alignright').css('margin-right', -dif);
		}


		else if (vW <= 1360) {
			console.log('case 2')
			$('body:not(.single) .slider').css('margin-left', 0);
			$('body:not(.single) .slider').css('flex', '0 1 calc(66.66%)');
			$('body:not(.single) .slider').css('max-width', 'calc(66.66%)');


			$('.hero-image.small .banner').css('flex', '0 1 calc(66.66%)');
			$('.hero-image.small .banner').css('max-width', 'calc(66.66%)');
			$('.hero-image.small .banner').css('margin-left', 0);


			$('.hero-image.small .photo-credits').css('flex', '0 1 calc(66.66%)');
			$('.hero-image.small .photo-credits').css('max-width', 'calc(66.66%)');
			$('.hero-image.small .photo-credits').css('margin-left', 0);


			$('.company-slider').css('flex', '0 1 calc(66.66%)');
			$('.company-slider').css('max-width', 'calc(66.66%)');
			$('.company .head .info').css('margin-left', 0);


			$('.news').css('margin-right', 0);
			$('.slider-banner').css('margin-right', 0);
			$('.info-wrap.small .info').css('margin-right', 0);
		}
		else {
			//console.log('Case 3');
			var diff = (vW - 1360) / 2;
			var diff2 = (vW - 1360) / 2;

			$('body:not(.single) .slider').css('flex', '0 1 calc(66.66% + ' + Math.abs(diff) + 'px)');
			$('body:not(.single) .slider').css('max-width', 'calc(66.66% + ' + Math.abs(diff) + 'px)');
			$('body:not(.single) .slider').css('margin-left', -Math.abs(diff));


			$('.hero-image.small .banner').css('flex', '0 1 calc(66.66% + ' + Math.abs(diff) + 'px)');
			$('.hero-image.small .banner').css('max-width', 'calc(66.66% + ' + Math.abs(diff) + 'px)');
			$('.hero-image.small .banner').css('margin-left', - Math.abs(diff));


			$('.company-slider').css('flex', '0 1 calc(66.66% + ' + Math.abs(diff) + 'px)');
			$('.company-slider').css('max-width', 'calc(66.66% + ' + Math.abs(diff) + 'px)');
			$('.company-slider').css('margin-right', - Math.abs(diff));


			$('.company .head .info').css('margin-left', -Math.abs(diff));
			$('.news').css('margin-right', -Math.abs(diff));
			$('.slider-banner').css('margin-right', -Math.abs(diff));
			$('.info-wrap.small .info').css('margin-right', -Math.abs(diff));

			$('.outside.alignleft').css('margin-left', -diff);
			$('.outside.alignright').css('margin-right', -diff);
		}
		//console.log('Slider resize done');
	}

	$(document).ready(function () {
		images_width();
		$('.slider').owlCarousel({
			margin: 0,
			items: 1,
			loop: true,
			nav: false,
			autoplay: true,
			autoplaySpeed: 500,
			navText: ['', ''],
			dots: true,
			dotsEach: true,
			autoHeight: true,
			mouseDrag: true,
			loop: true,
			items: 1
		});

		$('.img-text-container.owl-carousel').owlCarousel({
			margin: 0,
			items: 1,
			loop: true,
			nav: false,
			autoplay: true,
			autoplaySpeed: 500,
			navText: ['', ''],
			dots: true,
			dotsEach: true,
			autoHeight: true,
			mouseDrag: true,
			loop: true,
			items: 1
		});

		$('.sponsor-block-logos.owl-carousel').each(function(){
			var carousel = $(this);
			var items = $(this).data('items');
			
			carousel.owlCarousel({
				margin: 40,
				items: 6,
				loop: true,
				nav: false,
				autoplay: false,
				autoplaySpeed: 500,
				navText: ['', ''],
				dots: true,
				dotsEach: true,
				autoHeight: true,				
				mouseDrag: true,
				loop: true,
				responsive: {
					0: {
						items: 2,
						//margin: 20
					},
					767: {
						items: 3,
						//margin: 30
					},
					1024: {
						items: items,//put var here
						//margin: items*10
					}
				}
			
			});
		});

		$('.speakers-block .speakers.owl-carousel').each(function(){
			var carousel = $(this);
			var items = $(this).data('items');

			//console.log('ITEMS: ',items);

			carousel.owlCarousel({
				margin: 20,
				items: 5,
				loop: true,
				nav: false,
				autoplay: false,
				autoplaySpeed: 500,
				navText: ['', ''],
				dots: true,
				dotsEach: true,
				autoHeight: true,
				mouseDrag: true,
				loop: true,
				responsive: {
					0: {
						items: 2
					},
					767: {
						items: 3
					},
					1024: {
						items: items//add var here
					}
				}
			});
		});

		// $('.speakers-block .speakers.owl-carousel').owlCarousel({ 
		// 	margin: 20,
		// 	items: 5,
		// 	loop: true, 
		// 	nav:false,
		// 	autoplay:false,
		// 	autoplaySpeed:500,
		// 	navText: [ '', '' ],
		// 	dots:true,
		// 	dotsEach: true,
		// 	autoHeight: true,
		// 	mouseDrag:true,
		// 	loop: true,
		// 	responsive: {
		// 		0 : {
		// 			items:2
		// 		},		
		// 		767 : {
		// 			items:3
		// 		},		
		// 		1024 : {
		// 			items:5//add var here
		// 		}
		// 	}
		// });

	});

	setTimeout(function () {
		$('.company-slider.owl-carousel').owlCarousel({
			margin: 0,
			items: 1,
			loop: true,
			nav: false,
			autoplay: false,
			autoplaySpeed: 500,
			navText: ['', ''],
			dots: true,
			dotsEach: true,
			autoHeight: true,
			mouseDrag: true,
			loop: false,
			items: 1,
		});

	}, 500);





	$(window).on('resize', function (e) {
		images_width();

	});





	/* ===== Slider width - END ===== */


	/* ===== Menu sticky - BEGIN ===== */

	var lastScrollTop = 0;
	$(window).scroll(function (event) {
		var scrollTop = $(window).scrollTop();
		var menuH = $('#masthead').outerHeight();
		var st = $(this).scrollTop();

		///console.clear();
		//console.log('Window top: ', scrollTop);
		//console.log('Menu height: ',menuH);
		//console.log('Scroll top: ',st);

		if (st > lastScrollTop && st > 300) {

			$('#masthead').addClass('sticky-hidden');
			$('#masthead').removeClass('sticky');
		}

		else {
			if (300 < scrollTop) {
				$('#masthead').addClass('sticky');
				$('#masthead').removeClass('sticky-hidden');
			}
			else {
				$('#masthead').removeClass('sticky');
				$('#masthead').removeClass('sticky-hidden');
			}
		}
		lastScrollTop = st;
	});

	/* ===== Menu sticky - END ===== */





	/* ===== Menu dropdown - BEGIN ===== */

	$('.menu > li .dropdown').each(function () {
		$(this).parent('li').addClass('has-dropdown');
	});

	$('.menu > li.has-dropdown').hover(
		function () {
			//console.log('enter:', $(this).find('> a').text());
			$(this).addClass('active');
			$(this).children('.dropdown').addClass('open');
		}, function () {
			//console.log('leave');
			$(this).removeClass('active');
			$('.dropdown').removeClass('open');
		}
	);

	$('.language').click(function () {
		$('#masthead .middle .countryList').addClass('open');
		$('body').addClass('no-scroll');
	});


	$('.countryList .close').click(function () {
		$('#masthead .middle .countryList').removeClass('open');
		$('body').removeClass('no-scroll');
	});


	$('.menuTrigger').click(function () {
		$('body').toggleClass('menu-opened');
		$('.menu-mobile .menuTrigger').toggleClass('open');
		$('.menu-mobile').toggleClass('open');
	});




	$('body').on("click", "div.share", function (e) {
		if ($(this).hasClass('open')) {
			$('div.share').removeClass('open');
		}

		else {
			console.log('case 1');
			$('div.share').removeClass('open');
			if (e.target.nodeName == "A") {
				$('div.share').removeClass('open');
			}
			else {
				$(this).addClass('open');
			}
		}
	});


	/* ===== Menu dropdown - END ===== */






	function noMoreLonelyWords(selector, numWords) {
		var elems = document.querySelectorAll(selector);
		var i;
		for (i = 0; i < elems.length; ++i) {
			var textArray = elems[i].innerHTML.split(" ");
			var lastWords = textArray.splice(-numWords, numWords).join("&nbsp;");
			var textMinusLastWords = textArray.join(" ");
			elems[i].innerHTML = textMinusLastWords + " " + lastWords;
			//console.log(lastWords);
		}
	}

	function test() {
		var myStr = $('.name-wrap .name').text();
		var lastword = myStr.split(" ").pop();
		//console.log(lastword.length);

		if (lastword.length <= '4') {
			//noMoreLonelyWords(".name", 2);
		}
		else { }
	}
	test();



	function textfill() {
		$('.name-wrap').textfill({
			maxFontPixels: 80,
			minFontPixels: 16,
			innerTag: 'a',
		});
	}






	$('.photos-videos:not(.related) .carousel').owlCarousel({
		margin: 20,
		items: 3,
		loop: true,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: true,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 3
			}
		}
	});

	$('.photos-videos.related:not(.inside-content) .carousel:not(.issues-listing)').owlCarousel({
		margin: 20,
		items: 3,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: true,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 3
			}
		}
	});


	$('.photos-videos.related.inside-content .carousel:not(.issues-listing)').owlCarousel({
		margin: 20,
		items: 2,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: true,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 2
			}
		}
	});


	$('.photos-videos.related .issues-listing.carousel').owlCarousel({
		margin: 20,
		items: 5,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: true,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 5
			}
		}
	});



	$('.webinar-carousel-wrap:not(.inside-content) .webinar-carousel.owl-carousel:not(.large-margin)').owlCarousel({
		margin: 20,
		items: 3,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 3
			}
		}
	});

	$('.webinar-carousel-wrap.inside-content .webinar-carousel.owl-carousel:not(.large-margin)').owlCarousel({
		margin: 20,
		items: 3,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 2
			}
		}
	});



	$('.webinar-carousel-wrap:not(.inside-content) .webinar-carousel.large-margin.owl-carousel:not(.event-carousel)').owlCarousel({
		margin: 40,
		items: 3,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 3
			}
		}
	});


	$('.event-carousel.large-margin.owl-carousel').owlCarousel({
		margin: 40,
		items: 3,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 1
			},
			1024: {
				items: 2
			}
		}
	});

	$('.news-carousel').owlCarousel({
		margin: 20,
		items: 5,
		loop: false,
		nav: true,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1024: {
				items: 5
			}
		}
	});


	$('.grid .photo.owl-carousel').owlCarousel({
		margin: 0,
		items: 5,
		loop: true,
		nav: false,
		autoplay: true,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		loop: true,
		responsive: {
			0: {
				items: 5
			},
			767: {
				items: 5
			},
			1024: {
				items: 5
			}
		}
	});





	$('.menu .photo.owl-carousel, .news .text-education .photo.owl-carousel ').owlCarousel({
		margin: 0,
		items: 5,
		loop: true,
		nav: false,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		loop: true,
		responsive: {
			0: {
				items: 5
			},
			767: {
				items: 5
			},
			1024: {
				items: 5
			}
		}
	});


	$('.issues-listing.owl-carousel').owlCarousel({
		margin: 20,
		items: 6,
		loop: false,
		nav: true,
		autoplay: false,
		autoplayTimeout: 7500,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 2
			},
			768: {
				items: 4
			},
			992: {
				items: 4
			},
			1200: {
				items: 6
			}
		}
	});

	$('.product-carousel.owl-carousel').owlCarousel({
		margin: 20,
		loop: true,
		nav: true,
		autoplay: false,
		autoplayTimeout: 7500,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: false,
		dotsEach: true,
		mouseDrag: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 3
			},
			992: {
				items: 4
			}
		}
	});




	$('.slide-group .box.owl-carousel').owlCarousel({
		margin: 0,
		items: 1,
		loop: true,
		nav: false,
		autoplay: false,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: true,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
		loop: true,
		items: 1,
	});



	$('.sidebar-gallery.owl-carousel').owlCarousel({
		margin: 2,
		items: 1,
		nav: false,
		autoplay: true,
		autoplaySpeed: 500,
		navText: ['', ''],
		dots: true,
		dotsEach: true,
		autoHeight: true,
		mouseDrag: true,
	});








	$(".authors").each(function () {
		//$(".banner").removeClass('hasSlider');
		var count = $(this).find('.author').length;
		if (count > 1) {
			//console.log('Speaker photos: ',count);
			$(this).addClass('hasSlider');
			$(this).find('.author:first-child').addClass('active');
		}
	});


	$(".item.webinar .content .top .sponsor").each(function () {
		//$(".banner").removeClass('hasSlider');
		var count = $(this).find('img').length;
		if (count > 1) {
			//console.log('Speaker photos: ',count);
			$(this).addClass('hasSlider');
			$(this).find('img:first-child').addClass('active');
		}
	});


	function swapImages() {
		$(".hasSlider").each(function () {
			var $active = $(this).find('.author.active');
			var $next = ($(this).find('.author.active').next().length > 0) ? $(this).find('.author.active').next() : $(this).find('.author:first');
			$active.fadeOut(function () {
				$active.removeClass('active');
				$next.fadeIn().addClass('active');
			});
		});
	}
	setInterval(swapImages, 5000);

	function swapImages_sponsors() {
		$(".hasSlider").each(function () {
			var $active = $(this).find('img.active');
			var $next = ($(this).find('img.active').next().length > 0) ? $(this).find('img.active').next() : $(this).find('img:first');
			$active.fadeOut(function () {
				$active.removeClass('active');
				$next.fadeIn().addClass('active');
			});
		});
	}
	setInterval(swapImages_sponsors, 5000);









	$(document).ready(function () {
		//issue_carousel();
		enviraGallery();
		textfill();
	});


	$(window).on('resize', function (e) {
		textfill();
	});








	$('#modal-epaper').on('show.bs.modal', function (e) {



		setTimeout(function () {
			$('.issueModal .issues-listing.issues-listing-modal').addClass('owl-carousel');
			$('.issues-listing.issues-listing-modal.owl-carousel').owlCarousel({
				margin: 20,
				items: 5,
				loop: false,
				nav: true,
				autoplay: false,
				autoplayTimeout: 7500,
				autoplaySpeed: 500,
				navText: ['', ''],
				dots: false,
				dotsEach: true,
				mouseDrag: true,
				responsive: {
					0: {
						items: 2
					},
					992: {
						items: 4
					}
				}
			});

		}, 1500);


	})

	$('#modal-epaper').on('hidden.bs.modal', function (e) {
		$('.issueModal .modal-dialog .modal-content .modal-body').empty();
	});

});