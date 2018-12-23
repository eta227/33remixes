"use strict";

// TRY STOP PEOPLE FROM INSPECT THIS WEBSITE :)
$(document).keydown(function (e) {
    if (e.which === 123) {

        return false;

    }

});

$(document).bind("contextmenu", function (e) {
    e.preventDefault();

});


// ANOTHERS THINGS

var lastScroll = 0;

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
}

function SetMegamenuPosition() {
    if ($(window).width() > 991) {
        setTimeout(function () {
            var totalHeight = $('nav.navbar').outerHeight();
            $('.mega-menu').css({
                top: totalHeight
            });
            if ($('.navbar-brand-top').length === 0)
                $('.dropdown.simple-dropdown > .dropdown-menu').css({
                    top: totalHeight
                });
        }, 200);
    } else {
        $('.mega-menu').css('top', '');
        $('.dropdown.simple-dropdown > .dropdown-menu').css('top', '');
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        return true;
    } else // If another browser, return 0
    {
        return false;
    }
}

//page title space
function setPageTitleSpace() {
    if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {
        if ($('.top-space').length > 0) {
            var top_space_height = $('.navbar').outerHeight();
            if ($('.top-header-area').length > 0) {
                top_space_height = top_space_height + $('.top-header-area').outerHeight();
            }
            $('.top-space').css('margin-top', top_space_height + "px");
        }
    }
}

//swiper button position in auto height slider
function setButtonPosition() {
    if ($(window).width() > 767 && $(".swiper-auto-height-container").length > 0) {
        var leftPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-left'));
        var bottomPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-bottom'));
        var bannerWidth = parseInt($('.swiper-auto-height-container .slide-banner').outerWidth());
        $('.navigation-area').css({
            'left': bannerWidth + leftPosition + 'px',
            'bottom': bottomPosition + 'px'
        });
    } else if ($(".swiper-auto-height-container").length > 0) {
        $('.navigation-area').css({
            'left': '',
            'bottom': ''
        });
    }
}

$(window).on("scroll", init_scroll_navigate);

function init_scroll_navigate() {
    /*==============================================================
     One Page Main JS - START CODE
     =============================================================*/
    var menu_links = $(".navbar-nav li a");
    var scrollPos = $(document).scrollTop();
    menu_links.each(function () {
        var currLink = $(this);
        var split = currLink.attr("href").split("#");
        var refElement = $("#" + split[1]);
        if (split[1] != null && currLink.attr("href").indexOf("#") > -1 && refElement.length > 0) {
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                menu_links.removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        }
    });
    /*==============================================================
     One Page Main JS - END CODE
     =============================================================*/

    /*==============================================================*/
    //background color slider Start
    /*==============================================================*/
    var $window = $(window),
        $body = $('.bg-background-fade'),
        $panel = $('.color-code');
    var scroll = $window.scrollTop() + ($window.height() / 2);
    $panel.each(function () {
        var $this = $(this);
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });
            $body.addClass('color-' + $(this).data('color'));
        }
    });
    /*==============================================================*/
    //background color slider End
    /*==============================================================*/

    /* ===================================
     sticky nav Start
     ====================================== */
    var headerHeight = $('nav').outerHeight();
    if (!$('header').hasClass('no-sticky')) {
        if ($(document).scrollTop() >= headerHeight) {
            $('header').addClass('sticky');

        } else if ($(document).scrollTop() <= headerHeight) {
            $('header').removeClass('sticky');
            setTimeout(function () {
                setPageTitleSpace();
            }, 500);
        }
        SetMegamenuPosition();
    }

    /* ===================================
     header appear on scroll up
     ====================================== */
    var st = $(this).scrollTop();
    if (st > lastScroll) {
        $('.sticky').removeClass('header-appear');
        //        $('.dropdown.on').removeClass('on').removeClass('open').find('.dropdown-menu').fadeOut(100);
    } else
        $('.sticky').addClass('header-appear');
    lastScroll = st;
    if (lastScroll <= headerHeight)
        $('header').removeClass('header-appear');
    /* ===================================
     sticky nav End
     ====================================== */
}

/*==============================================================
 parallax text - START CODE
 ==============================================================*/
function parallax_text() {
    var window_width = $(window).width();
    if (window_width > 1024) {
        if ($('.swiper-auto-slide .swiper-slide').length !== 0) {
            $(document).on("mousemove", ".swiper-auto-slide .swiper-slide", function (e) {
                var positionX = e.clientX;
                var positionY = e.clientY;
                positionX = Math.round(positionX / 10) - 80;
                positionY = Math.round(positionY / 10) - 40;
                $(this).find('.parallax-text').css({
                    'transform': 'translate(' + positionX + 'px,' + positionY + 'px)',
                    'transition-duration': '0s'
                });
            });

            $(document).on("mouseout", ".swiper-auto-slide .swiper-slide", function (e) {
                $('.parallax-text').css({
                    'transform': 'translate(0,0)',
                    'transition-duration': '0.5s'
                });
            });
        }
    }
}
/*==============================================================*/
//parallax text - END CODE
/*==============================================================*/

/*==============================================================*/
//Search - START CODE
/*==============================================================*/
function ScrollStop() {
    return false;
}

function ScrollStart() {
    return true;
}

function validationSearchForm() {
    var error = true;
    $('#search-header input[type=text]').each(function (index) {
        if (index === 0) {
            if ($(this).val() === null || $(this).val() === "") {
                $("#search-header").find("input:eq(" + index + ")").css({
                    "border": "none",
                    "border-bottom": "2px solid red"
                });
                error = false;
            } else {
                $("#search-header").find("input:eq(" + index + ")").css({
                    "border": "none",
                    "border-bottom": "2px solid #000"
                });
            }
        }
    });
    return error;
}
/*==============================================================
 Search - END CODE
 ==============================================================*/

/*==============================================================
 equalize - START CODE
 ==============================================================*/
function equalizeHeight() {
    $(document).imagesLoaded(function () {
        if ($(window).width() < 768) {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            $('.equalize.xs-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 992) {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 1199) {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            $('.equalize.md-equalize-auto').children().css("height", "");
            return false;
        } else {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
        }
    });
}
/*==============================================================
 equalize - END CODE
 ==============================================================*/

/*==============================================================
 dynamic font size START CODE
 ==============================================================*/
function feature_dynamic_font_line_height() {
    if ($('.dynamic-font-size').length > 0) {
        var site_width = 1100;
        var window_width = $(window).width();
        if (window_width < site_width) {
            var window_site_width_ratio = window_width / site_width;
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size != '' && font_size != undefined) {
                    var new_font_size = Math.round(font_size * window_site_width_ratio * 1000) / 1000;
                    $(this).css('font-size', new_font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    var new_line_height = Math.round(line_height * window_site_width_ratio * 1000) / 1000;
                    $(this).css('line-height', new_line_height + 'px');
                }
            });
        } else {
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size !== '' && font_size !== undefined) {
                    $(this).css('font-size', font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    $(this).css('line-height', line_height + 'px');
                }
            });
        }
    }
}
/*==============================================================
 dynamic font size END CODE
 ==============================================================*/

/*==============================================================
 set parallax
 ==============================================================*/
function stellarParallax() {
    if ($(window).width() > 1024) {
        $.stellar();
    } else {
        $.stellar('destroy');
        $('.parallax').css('background-position', '');
    }
}

/*==============================================================
 full screen START CODE
 ==============================================================*/
function fullScreenHeight() {
    var element = $(".full-screen");
    var $minheight = $(window).height();
    element.parents('section').imagesLoaded(function () {
        if ($(".top-space .full-screen").length > 0) {
            var $headerheight = $("header nav.navbar").outerHeight();
            $(".top-space .full-screen").css('min-height', $minheight - $headerheight);
        } else {
            element.css('min-height', $minheight);
        }
    });

    var minwidth = $(window).width();
    $(".full-screen-width").css('min-width', minwidth);

    var sidebarNavHeight = $('.sidebar-nav-style-1').height() - $('.logo-holder').parent().height() - $('.footer-holder').parent().height() - 10;
    $(".sidebar-nav-style-1 .nav").css('height', (sidebarNavHeight));
    var style2NavHeight = parseInt($('.sidebar-part2').height() - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-top')) - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-bottom')) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('margin-bottom')));
    $(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('height', (style2NavHeight));


}
/*==============================================================
 full screen END CODE
 ==============================================================*/
function SetResizeContent() {
    //    all function call
    feature_dynamic_font_line_height();
    SetMegamenuPosition();
    setPageTitleSpace();
    setButtonPosition();
    parallax_text();
    stellarParallax();
    fullScreenHeight();
    equalizeHeight();
}

/* ===================================
 START RESIZE
 ====================================== */
$(window).resize(function (event) {
    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function (e) {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({
                    equalize: 'outerHeight',
                    reset: true
                });
                return false;
            }
        });
    });

    setTimeout(function () {
        SetResizeContent();
    }, 500);

    event.preventDefault();
});
/* ===================================
 END RESIZE
 ====================================== */

/* ===================================
 START READY
 ====================================== */
$(document).ready(function () {
    "use strict";

    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function () {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({
                    equalize: 'outerHeight',
                    reset: true
                });
                return false;
            }
        });
    });
    // Bootsnav tab work with eualize height
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if ($(window).width() > 991) {
            $(target).find('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            return false;
        }
    });

    // Active class to current menu for only html
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    var $hash = window.location.hash.substring(1);

    if ($hash) {
        $hash = "#" + $hash;
        pgurl = pgurl.replace($hash, "");
    } else {
        pgurl = pgurl.replace("#", "");
    }

    $(".nav li a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
            $(this).parent().addClass("active");
            $(this).parents('li.dropdown').addClass("active");
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150)
            $('.scroll-top-arrow').fadeIn('slow');
        else
            $('.scroll-top-arrow').fadeOut('slow');
    });
    //Click event to scroll to top
    $(document).on('click', '.scroll-top-arrow', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    /* ===================================
     swiper slider
     ====================================== */
    var swiperFull = new Swiper('.swiper-full-screen', {
        loop: true,
        slidesPerView: 1,
        preventClicks: false,
        allowTouchMove: true,
        pagination: {
            el: '.swiper-full-screen-pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            resize: function () {
                swiperFull.update();
            }
        }
    });

    var swiperAutoFade = new Swiper('.swiper-auto-fade', {
        allowTouchMove: true,
        loop: true,
        slidesPerView: 1,
        preventClicks: false,
        effect: 'fade',
        autoplay: {
            delay: 5000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-auto-pagination',
            clickable: true
        },
        on: {
            resize: function () {
                swiperAutoFade.update();
            }
        }
    });

    var swiperSecond = new Swiper('.swiper-slider-second', {
        allowTouchMove: true,
        slidesPerView: 1,
        preventClicks: false,
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination-second',
            clickable: true
        },
        on: {
            resize: function () {
                swiperSecond.update();
            }
        }
    });

    var swiperThird = new Swiper('.swiper-slider-third', {
        allowTouchMove: true,
        slidesPerView: 1,
        preventClicks: false,
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination-third',
            clickable: true
        },
        on: {
            resize: function () {
                swiperThird.update();
            }
        }
    });

    var swiperNumber = new Swiper('.swiper-number-pagination', {
        allowTouchMove: true,
        preventClicks: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        pagination: {
            el: '.swiper-number',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + pad((index + 1)) + '</span>';
            }
        },
        on: {
            resize: function () {
                swiperNumber.update();
            }
        }
    });

    var swiperVerticalPagination = new Swiper('.swiper-vertical-pagination', {
        allowTouchMove: true,
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        preventClicks: false,
        mousewheel: {
            mousewheel: true,
            sensitivity: 1,
            releaseOnEdges: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination-vertical',
            clickable: true
        },
        on: {
            resize: function () {
                swiperVerticalPagination.update();
            }
        }
    });

    var swiperClients = new Swiper('.swiper-slider-clients', {
        allowTouchMove: true,
        slidesPerView: 4,
        paginationClickable: true,
        preventClicks: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        pagination: {
            el: null
        },
        breakpoints: {
            1199: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperClients.update();
            }
        }
    });

    var swiperClients2 = new Swiper('.swiper-slider-clients-second', {
        allowTouchMove: true,
        slidesPerView: 4,
        paginationClickable: true,
        preventClicks: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        pagination: {
            el: null
        },
        breakpoints: {
            1199: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperClients2.update();
            }
        }
    });

    var swiperThreeSlides = new Swiper('.swiper-three-slides', {
        allowTouchMove: true,
        slidesPerView: 3,
        preventClicks: false,
        pagination: {
            el: '.swiper-pagination-three-slides',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-three-slide-next',
            prevEl: '.swiper-three-slide-prev'
        },
        breakpoints: {
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperThreeSlides.update();
            }
        }
    });

    var swiperFourSlides = new Swiper('.swiper-four-slides', {
        allowTouchMove: true,
        slidesPerView: 4,
        preventClicks: false,
        pagination: {
            el: '.swiper-pagination-four-slides',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1199: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperFourSlides.update();
            }
        }
    });

    var swiperDemoHeaderStyle = new Swiper('.swiper-demo-header-style', {
        allowTouchMove: true,
        loop: true,
        slidesPerView: 4,
        preventClicks: true,
        slidesPerGroup: 4,
        pagination: {
            el: '.swiper-pagination-demo-header-style',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1199: {
                slidesPerGroup: 2,
                slidesPerView: 2
            },
            767: {
                slidesPerGroup: 1,
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperDemoHeaderStyle.update();
            }
        }
    });

    var $swiperAutoSlideIndex = 0;
    var swiperAutoSlide = new Swiper('.swiper-auto-slide', {
        allowTouchMove: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 80,
        preventClicks: false,
        observer: true,
        speed: 1000,
        pagination: {
            el: null
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: false,
            snapOnRelease: true
        },
        autoplay: {
            delay: 3000
        },
        mousewheel: {
            invert: false
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-next-style2',
            prevEl: '.swiper-prev-style2'
        },
        breakpoints: {
            1199: {
                spaceBetween: 60
            },
            960: {
                spaceBetween: 30
            },
            767: {
                spaceBetween: 15
            }
        },
        on: {
            resize: function () {
                swiperAutoSlide.update();
            }
        }
    });

    if ($(window).width() > 767) {
        var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
            allowTouchMove: true,
            slidesPerView: 'auto',
            grabCursor: true,
            preventClicks: false,
            spaceBetween: 30,
            keyboardControl: true,
            speed: 1000,
            pagination: {
                el: null
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: false,
                snapOnRelease: true
            },
            mousewheel: {
                enable: true
            },
            keyboard: {
                enabled: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    }

    var swiperAutoHieght = new Swiper('.swiper-auto-height-container', {
        allowTouchMove: true,
        effect: 'fade',
        loop: true,
        autoHeight: true,
        pagination: {
            el: '.swiper-auto-height-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            resize: function () {
                swiperAutoHieght.update();
            }
        }
    });

    var swiperMultyRow = new Swiper('.swiper-multy-row-container', {
        allowTouchMove: true,
        slidesPerView: 4,
        spaceBetween: 15,
        pagination: {
            el: '.swiper-multy-row-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-portfolio-next',
            prevEl: '.swiper-portfolio-prev'
        },
        breakpoints: {
            991: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperMultyRow.update();
            }
        }
    });

    var swiperBlog = new Swiper('.swiper-blog', {
        allowTouchMove: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 15,
        preventClicks: false,
        loop: true,
        loopedSlides: 3,
        pagination: {
            el: '.swiper-blog-pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            resize: function () {
                swiperBlog.update();
            }
        }
    });

    var swiperPresentation = new Swiper('.swiper-presentation', {
        allowTouchMove: true,
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        preventClicks: true,
        loop: true,
        loopedSlides: 6,
        pagination: {
            el: '.swiper-presentation-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            991: {
                spaceBetween: 15,
                slidesPerView: 2
            },
            767: {
                slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                swiperPresentation.update();
            }
        }
    });

    var resizeId;

    $(window).resize(function () {
        if ($(".swiper-auto-slide").length > 0 && swiperAutoSlide) {
            $swiperAutoSlideIndex = swiperAutoSlide.activeIndex;
            swiperAutoSlide.detachEvents();
            swiperAutoSlide.destroy(true, false);
            swiperAutoSlide = undefined;
            $(".swiper-auto-slide .swiper-wrapper").css("transform", "").css("transition-duration", "");
            $(".swiper-auto-slide .swiper-slide").css("margin-right", "");

            setTimeout(function () {
                swiperAutoSlide = new Swiper('.swiper-auto-slide', {
                    allowTouchMove: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 80,
                    preventClicks: false,
                    mousewheelControl: true,
                    observer: true,
                    speed: 1000,
                    pagination: {
                        el: null
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        hide: false,
                        snapOnRelease: true
                    },
                    autoplay: {
                        delay: 3000
                    },
                    keyboard: {
                        enabled: true
                    },
                    navigation: {
                        nextEl: '.swiper-next-style2',
                        prevEl: '.swiper-prev-style2'
                    },
                    breakpoints: {
                        1199: {
                            spaceBetween: 60
                        },
                        960: {
                            spaceBetween: 30
                        },
                        767: {
                            spaceBetween: 15
                        }
                    },
                    on: {
                        resize: function () {
                            swiperAutoSlide.update();
                        }
                    }
                });

                swiperAutoSlide.slideTo($swiperAutoSlideIndex, 1000, false);
            }, 1000);
        }

        if ($(".swiper-bottom-scrollbar-full").length > 0) {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 1000);
        }

        /* update all swiper on window resize */

        setTimeout(function () {
            if ($('.swiper-full-screen').length > 0 && swiperFull) {
                swiperFull.update();
            }

            if ($('.swiper-auto-fade').length > 0 && swiperAutoFade) {
                swiperAutoFade.update();
            }

            if ($('.swiper-slider-second').length > 0 && swiperSecond) {
                swiperSecond.update();
            }

            if ($('.swiper-slider-third').length > 0 && swiperThird) {
                swiperThird.update();
            }

            if ($('.swiper-number-pagination').length > 0 && swiperNumber) {
                swiperNumber.update();
            }

            if ($('.swiper-vertical-pagination').length > 0 && swiperVerticalPagination) {
                swiperVerticalPagination.update();
            }

            if ($('.swiper-slider-clients').length > 0 && swiperClients) {
                swiperClients.update();
            }

            if ($('.swiper-slider-clients-second').length > 0 && swiperClients2) {
                swiperClients2.update();
            }

            if ($('.swiper-three-slides').length > 0 && swiperThreeSlides) {
                swiperThreeSlides.update();
            }

            if ($('.swiper-four-slides').length > 0 && swiperFourSlides) {
                swiperFourSlides.update();
            }

            if ($('.swiper-demo-header-style').length > 0 && swiperDemoHeaderStyle) {
                swiperDemoHeaderStyle.update();
            }

            if ($('.swiper-auto-slide').length > 0 && swiperAutoSlide) {
                swiperAutoSlide.update();
            }

            if ($('.swiper-auto-height-container').length > 0 && swiperAutoHieght) {
                swiperAutoHieght.update();
            }

            if ($('.swiper-multy-row-container').length > 0 && swiperMultyRow) {
                swiperMultyRow.update();
            }

            if ($('.swiper-blog').length > 0 && swiperBlog) {
                swiperBlog.update();
            }

            if ($('.swiper-presentation').length > 0 && swiperPresentation) {
                swiperPresentation.update();
            }

        }, 500);
        if (isIE()) {
            setTimeout(function () {
                if ($('.swiper-full-screen').length > 0 && swiperFull) {
                    swiperFull.update();
                }

                if ($('.swiper-auto-fade').length > 0 && swiperAutoFade) {
                    swiperAutoFade.update();
                }

                if ($('.swiper-slider-second').length > 0 && swiperSecond) {
                    swiperSecond.update();
                }

                if ($('.swiper-slider-third').length > 0 && swiperThird) {
                    swiperThird.update();
                }

                if ($('.swiper-number-pagination').length > 0 && swiperNumber) {
                    swiperNumber.update();
                }

                if ($('.swiper-vertical-pagination').length > 0 && swiperVerticalPagination) {
                    swiperVerticalPagination.update();
                }

                if ($('.swiper-slider-clients').length > 0 && swiperClients) {
                    swiperClients.update();
                }

                if ($('.swiper-slider-clients-second').length > 0 && swiperClients2) {
                    swiperClients2.update();
                }

                if ($('.swiper-three-slides').length > 0 && swiperThreeSlides) {
                    swiperThreeSlides.update();
                }

                if ($('.swiper-four-slides').length > 0 && swiperFourSlides) {
                    swiperFourSlides.update();
                }

                if ($('.swiper-demo-header-style').length > 0 && swiperDemoHeaderStyle) {
                    swiperDemoHeaderStyle.update();
                }

                if ($('.swiper-auto-slide').length > 0 && swiperAutoSlide) {
                    swiperAutoSlide.update();
                }

                if ($('.swiper-auto-height-container').length > 0 && swiperAutoHieght) {
                    swiperAutoHieght.update();
                }

                if ($('.swiper-multy-row-container').length > 0 && swiperMultyRow) {
                    swiperMultyRow.update();
                }

                if ($('.swiper-blog').length > 0 && swiperBlog) {
                    swiperBlog.update();
                }

                if ($('.swiper-presentation').length > 0 && swiperPresentation) {
                    swiperPresentation.update();
                }

            }, 500);
        }

    });

    function doneResizing() {
        if (swiperBottomScrollbarFull) {
            swiperBottomScrollbarFull.detachEvents();
            swiperBottomScrollbarFull.destroy(true, true);
            swiperBottomScrollbarFull = undefined;
        }

        $(".swiper-bottom-scrollbar-full .swiper-wrapper").css("transform", "").css("transition-duration", "");
        $(".swiper-bottom-scrollbar-full .swiper-slide").css("margin-right", "");
        $('.swiper-bottom-scrollbar-full .swiper-wrapper').removeAttr('style');
        $('.swiper-bottom-scrollbar-full .swiper-slide').removeAttr('style');

        if ($(window).width() > 767) {
            setTimeout(function () {
                swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
                    allowTouchMove: true,
                    slidesPerView: 'auto',
                    grabCursor: true,
                    preventClicks: false,
                    spaceBetween: 30,
                    keyboardControl: true,
                    speed: 1000,
                    pagination: {
                        el: null
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        hide: false,
                        snapOnRelease: true
                    },
                    mousewheel: {
                        enable: true
                    },
                    keyboard: {
                        enabled: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            }, 500);
        }
    }

    /*==============================================================
     smooth scroll
     ==============================================================*/

    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';
    $(document).on('click.smoothscroll', 'a.scrollto', function (event) {
        event.preventDefault();
        var target = this.hash;
        if ($(target).length != 0) {
            $('html, body').stop()
                .animate({
                    'scrollTop': $(target)
                        .offset()
                        .top
                }, scrollAnimationTime, scrollAnimation, function () {
                    window.location.hash = target;
                });
        }
    });

    /*==============================================================
     humburger menu one page navigation
     ==============================================================*/

    if ($('.full-width-pull-menu').length > 0) {
        $(document).on('click', '.full-width-pull-menu .inner-link', function (e) {
            //$('body').removeClass('overflow-hidden position-fixed');
            $(".full-width-pull-menu .close-button-menu").trigger("click");
            var _this = $(this);
            setTimeout(function () {
                var target = _this.attr("href");
                if ($(target).length > 0) {
                    $('html, body').stop()
                        .animate({
                            'scrollTop': $(target).offset().top
                        });
                }
            }, 500);
        });
    }

    // Inner links
    if ($('.navbar-top').length > 0 || $('.navbar-scroll-top').length > 0 || $('.nav-top-scroll').length > 0) {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: 0
        });
    } else {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: -59
        });
    }

    $('.section-link').smoothScroll({
        speed: 900,
        offset: 1
    });

    /*==============================================================*/
    //PieChart For Onepage - START CODE
    /*==============================================================*/
    if ($('.chart1').length > 0) {
        $('.chart1').appear();
        $('.chart1').easyPieChart({
            barColor: '#929292',
            trackColor: '#d9d9d9',
            scaleColor: false,
            easing: 'easeOutBounce',
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 3, //12
            size: 150, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart1', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }

    if ($('.chart2').length > 0) {
        $('.chart2').appear();
        $('.chart2').easyPieChart({
            easing: 'easeOutCirc',
            barColor: '#ff214f',
            trackColor: '#c7c7c7',
            scaleColor: false,
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 2, //12
            size: 120, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart2', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }

    if ($('.chart3').length > 0) {
        $('.chart3').appear();
        $('.chart3').easyPieChart({
            easing: 'easeOutCirc',
            barColor: '#ff214f',
            trackColor: '',
            scaleColor: false,
            scaleLength: 1,
            lineCap: 'round',
            lineWidth: 3, //12
            size: 140, //110
            animate: {
                duration: 2000,
                enabled: true
            },
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(document.body).on('appear', '.chart3', function (e) {
            // this code is executed for each appeared element
            if (!$(this).hasClass('appear')) {
                $(this).addClass('appear');
                $(this).data('easyPieChart').update(0).update($(this).data('percent'));
            }
        });
    }
    /*==============================================================*/
    //PieChart For Onepage - END CODE
    /*==============================================================*/

    /*==============================================================
     portfolio filter
     ==============================================================*/
    var $portfolio_filter = $('.portfolio-grid');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        $portfolio_filter.isotope();
    });
    var $grid_selectors = $('.portfolio-filter > li > a');
    $grid_selectors.on('click', function () {
        $grid_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio_filter.find('.grid-item').removeClass('animated').css("visibility", ""); // avoid problem to filter after sorting
        $portfolio_filter.find('.grid-item').each(function () {
            /* remove perticular element from WOW array when you don't want animation on element after DOM lead */
            wow.removeBox(this);
            $(this).css("-webkit-animation", "none");
            $(this).css("-moz-animation", "none");
            $(this).css("-ms-animation", "none");
            $(this).css("animation", "none");
        });
        $portfolio_filter.isotope({
            filter: selector
        });
        return false;
    });
    $(window).resize(function () {
        if (!isMobile && !isiPhoneiPad) {
            $portfolio_filter.imagesLoaded(function () {
                setTimeout(function () {
                    $portfolio_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
                    $portfolio_filter.isotope('layout');
                }, 300);
            });
        }
    });
    var $blog_filter = $('.blog-grid');
    $blog_filter.imagesLoaded(function () {
        $blog_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });
    $(window).resize(function () {
        setTimeout(function () {
            $blog_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
            $blog_filter.isotope('layout');
        }, 300);
    });

    /*==============================================================
     lightbox gallery
     ==============================================================*/
    $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        fixedContentPos: true,
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });
    /* for group gallery */
    var lightboxgallerygroups = {};
    $('.lightbox-group-gallery-item').each(function () {
        var id = $(this).attr('data-group');
        if (!lightboxgallerygroups[id]) {
            lightboxgallerygroups[id] = [];
        }
        lightboxgallerygroups[id].push(this);
    });
    $.each(lightboxgallerygroups, function () {
        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            gallery: {
                enabled: true
            }
        });
    });

    $('.lightbox-portfolio').magnificPopup({
        delegate: '.gallery-link',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        fixedContentPos: true,
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: false,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });
    /*==============================================================
     single image lightbox - zoom animation
     ==============================================================*/
    $('.single-image-lightbox').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        fixedContentPos: true,
        closeBtnInside: false,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });
    /*==============================================================
     zoom gallery
     ==============================================================*/
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        fixedContentPos: true,
        closeBtnInside: false,
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });
    /*==============================================================*/
    //Modal popup - START CODE
    /*==============================================================*/
    $('.modal-popup').magnificPopup({
        type: 'inline',
        preloader: false,
        // modal: true,
        blackbg: true,
        callbacks: {
            open: function () {
                $('html').css('margin-right', 0);
            }
        }
    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    /*==============================================================*/
    //Modal popup - END CODE
    /*==============================================================*/

    /*==============================================================*/
    //Modal popup - zoom animation - START CODE
    /*==============================================================*/
    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        blackbg: true,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        blackbg: true,
        mainClass: 'my-mfp-slide-bottom'
    });
    /*==============================================================*/
    //Modal popup - zoom animation - END CODE
    /*==============================================================*/

    /*==============================================================
     popup with form
     ==============================================================*/
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        closeBtnInside: false,
        fixedContentPos: true,
        focus: '#name',
        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });
    /*==============================================================
     video magnific popup
     ==============================================================*/

    $('.popup-youtube, .popup-vimeo, .popup-googlemap').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true,
        closeBtnInside: false
    });
    /*==============================================================
     ajax magnific popup for onepage portfolio
     ==============================================================*/
    $('.ajax-popup').magnificPopup({
        type: 'ajax',
        alignTop: true,
        fixedContentPos: true,
        overflowY: 'scroll', // as we know that popup content is tall we set scroll overflow by default to avoid jump
        callbacks: {
            open: function () {
                $('.navbar .collapse').removeClass('in');
                $('.navbar a.dropdown-toggle').addClass('collapsed');
            }
        }
    });

    /*==============================================================
     mega menu width 
     ===============================================================*/
    $("ul.mega-menu-full").each(function (idx, elm) {
        var megaMenuWidth = 0;
        $(this).children('li').each(function (idx, elm) {
            var LIheight = 0;
            megaMenuWidth += $(this).outerWidth();
        });
        $(this).width(megaMenuWidth + 95);
        megaMenuWidth = 0;
    });
    /*==============================================================
     fit videos
     ==============================================================*/
    $(".fit-videos").fitVids();

    /*==============================================================
     form to email
     ==============================================================*/
    $("#success-subscribe-newsletter").hide();
    $("#success-subscribe-newsletter2").hide();
    $("#success-contact-form").hide();
    $("#success-project-contact-form").hide();
    $("#success-contact-form-2").hide();
    $("#success-contact-form-3").hide();
    $("#success-project-contact-form-4").hide();

    //Subscribe newsletter form
    $(document).on("click", '#button-subscribe-newsletter', function () {
        var error = ValidationsubscribenewsletterForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/subscribe-newsletter.php",
                data: $("#subscribenewsletterform").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-subscribe-newsletter").html(result);
                    $("#success-subscribe-newsletter").fadeIn("slow");
                    $('#success-subscribe-newsletter').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationsubscribenewsletterForm() {
        var error = true;
        $('#subscribenewsletterform input[type=text]').each(function (index) {
            if (index == 0) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#subscribenewsletterform").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#subscribenewsletterform").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    $(document).on("click", '#button-subscribe-newsletter2', function () {
        var error = ValidationsubscribenewsletterForm2();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/subscribe-newsletter.php",
                data: $("#subscribenewsletterform2").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-subscribe-newsletter2").html(result);
                    $("#success-subscribe-newsletter2").fadeIn("slow");
                    $('#success-subscribe-newsletter2').delay(4000).fadeOut("slow");


                }
            });
        }
    });

    function ValidationsubscribenewsletterForm2() {
        var error = true;
        $('#subscribenewsletterform2 input[type=text]').each(function (index) {
            if (index == 0) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#subscribenewsletterform2").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#subscribenewsletterform2").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
        });
        return error;
    }

    //Contact us form
    $(document).on("click", '#contact-us-button', function () {
        var error = ValidationContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/contact.php",
                data: $("#contact-form").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form").html(result);
                    $("#success-contact-form").fadeIn("slow");
                    $('#success-contact-form').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationContactForm() {
        var error = true;
        $('#contact-form input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    //Contact us form 2
    $('#contact-us-button-2').on("click", function () {
        var error = ValidationContactForm2();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/contact.php",
                data: $("#contact-form-2").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form-2").html(result);
                    $("#success-contact-form-2").fadeIn("slow");
                    $('#success-contact-form-2').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationContactForm2() {
        var error = true;
        $('#contact-form-2 input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#contact-form-2").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-2").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#contact-form-2").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-2").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
        });
        return error;
    }

    //Contact us form 3

    $(document).on("click", '#contact-us-button-3', function () {
        var error = ValidationContactForm3();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/contact.php",
                data: $("#contact-form-3").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";
                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form-3").html(result);
                    $("#success-contact-form-3").fadeIn("slow");
                    $('#success-contact-form-3').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationContactForm3() {
        var error = true;
        $('#contact-form-3 input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#contact-form-3").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-3").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#contact-form-3").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#contact-form-3").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    //Project Contact us form
    $(document).on("click", '#project-contact-us-button', function () {
        var error = ValidationProjectContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/project-contact.php",
                data: $("#project-contact-form").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-project-contact-form").html(result);
                    $("#success-project-contact-form").fadeIn("slow");
                    $('#success-project-contact-form').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationProjectContactForm() {
        var error = true;
        $('#project-contact-form input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#project-contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 2) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#project-contact-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }

    //Project Contact us form 2
    $(document).on("click", '#project-contact-us-4-button', function () {
        var error = ValidationProjectContactForm4();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/project-contact.php",
                data: $("#project-contact-form-4").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-project-contact-form-4").html(result);
                    $("#success-project-contact-form-4").fadeIn("slow");
                    $('#success-project-contact-form-4').delay(4000).fadeOut("slow");
                }
            });
        }
    });

    function ValidationProjectContactForm4() {
        var error = true;
        $('#project-contact-form-4 input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 2) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#project-contact-form-4").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
        });
        return error;
    }

    /*==============================================================
     End form to email
     ==============================================================*/

    /*==============================================================
     wow animation - on scroll
     ==============================================================*/
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    $(window).imagesLoaded(function () {
        wow.init();
    });
    /*==============================================================
     counter
     ==============================================================*/
    $(function ($) {
        animatecounters();
    });

    function animatecounters() {
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    }
    /* ===================================
     counter number reset while scrolling
     ====================================== */
    $('.timer').appear();
    $(document.body).on('appear', '.timer', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            animatecounters();
            $(this).addClass('appear');
        }
    });
    $('.countdown').countdown($('.countdown').attr("data-enddate")).on('update.countdown', function (event) {
        $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'));
    });

    /* ===================================
     left nav
     ====================================== */
    $(document).on('click', '.right-menu-button', function (e) {
        $('body').toggleClass('left-nav-on');
    });

    /*==============================================================*/
    //    hamburger menu 
    /*==============================================================*/
    $(document).on('click', '.btn-hamburger', function () {
        $('.hamburger-menu').toggleClass('show-menu');
        $('body').removeClass('show-menu');
    });

    /*==============================================================*/
    //sidebar nav open
    /*==============================================================*/
    $(document).on('click', '#mobileToggleSidenav', function () {
        $(this).closest('nav').toggleClass('sidemenu-open');
    });

    /*=================================
     //justified Gallery
     =================================*/
    $(document).imagesLoaded(function () {
        if ($(".justified-gallery").length > 0) {
            $(".justified-gallery").justifiedGallery({
                rowHeight: 400,
                maxRowHeight: false,
                captions: true,
                margins: 10,
                waitThumbnailsLoad: true
            });
        }
    });

    $('.atr-nav').on("click", function () {
        $(".atr-div").append("<a class='close-cross' href='#'>X</a>");
        $(".atr-div").animate({
            width: "toggle"
        });
    });

    $('.close-cross').on("click", function () {
        $(".atr-div").hide();
    });

    var menuRight = document.getElementById('cbp-spmenu-s2'),
        showRightPush = document.getElementById('showRightPush'),
        body = document.body;
    if (showRightPush) {
        showRightPush.onclick = function () {
            classie.toggle(this, 'active');
            if (menuRight)
                classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    var test = document.getElementById('close-pushmenu');
    if (test) {
        test.onclick = function () {
            classie.toggle(this, 'active');
            if (menuRight)
                classie.toggle(menuRight, 'cbp-spmenu-open');
        };
    }

    //blog page header animation
    $(".blog-header-style1 li").hover(function () {
        $('.blog-header-style1 li.blog-column-active').removeClass('blog-column-active');
        $(this).addClass('blog-column-active');
    }, function () {
        $(this).removeClass('blog-column-active');
        $('.blog-header-style1 li:first-child').addClass('blog-column-active');
    });

    /*==============================================================*/
    //big menu open close start
    /*==============================================================*/
    $('.big-menu-open').on("click", function () {
        $('.big-menu-right').addClass("open");
    });

    $('.big-menu-close').on("click", function () {
        $('.big-menu-right').removeClass("open");
    });
    /*==============================================================*/
    //big menu open close end
    /*==============================================================*/

    /*==============================================================
     instagramfeed
     ==============================================================*/
    if ($('#instaFeed-style1').length != 0) {
        var instaFeedStyle1 = new Instafeed({
            target: 'instaFeed-style1',
            get: 'user',
            userId: 5640046896,
            limit: '8',
            accessToken: '5640046896.1677ed0.f7cd85767e124a9f9f8d698cb33252a0',
            resolution: "low_resolution",
            error: {
                template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
            },
            template: '<div class="col-md-3 col-sm-6 col-xs-12 instafeed-style1"><a class="insta-link" href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /><div class="insta-counts"><span><i class="ti-heart"></i> <span class="count-number">{{likes}}</span></span><span><i class="ti-comment"></i> <span class="count-number">{{comments}}</span></span></div></a></div>'
        });
        instaFeedStyle1.run();
    }

    if ($('#instaFeed-aside').length != 0) {
        var instaFeedAside = new Instafeed({
            target: 'instaFeed-aside',
            get: 'user',
            userId: 5640046896,
            limit: '6',
            accessToken: '5640046896.1677ed0.f7cd85767e124a9f9f8d698cb33252a0',
            resolution: "low_resolution",
            after: function () {
                equalizeHeight();
            },
            error: {
                template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
            },
            template: '<li><figure><a href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /><span class="insta-counts"><i class="ti-heart"></i>{{likes}}</span></a></figure></li>'
        });
        instaFeedAside.run();
    }

    if ($('#instaFeed-footer').length != 0) {
        var instaFeedFooter = new Instafeed({
            target: 'instaFeed-footer',
            get: 'user',
            userId: 5640046896,
            limit: '6',
            accessToken: '5640046896.1677ed0.f7cd85767e124a9f9f8d698cb33252a0',
            resolution: "low_resolution",
            after: function () {
                equalizeHeight();
            },
            error: {
                template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
            },
            template: '<li><figure><a href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /><span class="insta-counts"><i class="ti-heart"></i><span>{{likes}}</span></span></a></figure></li>'
        });
        instaFeedFooter.run();
    }
    /*==============================================================
     instagramfeed end
     ==============================================================*/

    /*==============================================================*/
    //revolution Start 
    /*==============================================================*/
    /* ================================
     home-creative-studio
     ================================*/
    if ($("#rev_slider_151_1").revolution == undefined) {
        revslider_showDoubleJqueryError("#rev_slider_151_1");
    } else {
        $("#rev_slider_151_1").show().revolution({
            sliderType: "standard",
            jsFileLocation: "revolution/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "vertical",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "uranus",
                    enable: true,
                    hide_onmobile: false,
                    hide_over: 479,
                    hide_onleave: false,
                    tmp: '',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                }
            },
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [1240, 1024, 778, 480],
            gridheight: [868, 768, 960, 720],
            lazyType: "none",
            scrolleffect: {
                blur: "on",
                maxblur: "20",
                on_slidebg: "on",
                direction: "top",
                multiplicator: "2",
                multiplicator_layers: "2",
                tilt: "10",
                disable_on_mobile: "off"
            },
            parallax: {
                type: "scroll",
                origo: "slidercenter",
                speed: 400,
                levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55]
            },
            shadow: 0,
            spinner: "spinner3",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "0px",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false
            }
        });
    }

    /* ================================
     home-classic-web-agency
     ================================*/
    if ($("#rev_slider_1174_1").revolution == undefined) {
        revslider_showDoubleJqueryError("#rev_slider_1174_1");
    } else {
        $("#rev_slider_1174_1").show().revolution({
            sliderType: "hero",
            jsFileLocation: "revolution/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {},
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [1240, 1024, 778, 480],
            gridheight: [868, 768, 960, 720],
            lazyType: "none",
            parallax: {
                type: "scroll",
                origo: "slidercenter",
                speed: 400,
                levels: [10, 15, 20, 25, 30, 35, 40, -10, -15, -20, -25, -30, -35, -40, -45, 55]
            },
            shadow: 0,
            spinner: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            disableProgressBar: "on",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                disableFocusListener: false
            }
        });
    }

    /* ================================
     home-classic-corporate
     ================================*/
    if ($("#rev_slider_1078_1").revolution == undefined) {
        revslider_showDoubleJqueryError("#rev_slider_1078_1");
    } else {
        $("#rev_slider_1078_1").show().revolution({
            sliderType: "standard",
            jsFileLocation: "revolution/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "on",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "zeus",
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 600,
                    hide_onleave: true,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    tmp: '<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 30,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 30,
                        v_offset: 0
                    }
                },
                bullets: {
                    enable: true,
                    hide_onmobile: false,
                    hide_under: 300,
                    style: "hermes",
                    hide_onleave: false,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    direction: "horizontal",
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 30,
                    space: 8,
                    tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
                }
            },
            viewPort: {
                enable: true,
                outof: "pause",
                visible_area: "80%",
                presize: false
            },
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [1240, 1024, 778, 480],
            gridheight: [600, 600, 500, 400],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "slidercenter",
                speed: 2000,
                levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 46, 47, 48, 49, 50, 55]
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false
            }
        });
    }
    /*==============================================================*/
    //revolution End 
    /*==============================================================*/

    /*==============================================================*/
    //magnificPopup Start 
    /*==============================================================*/
    $('.header-search-form').magnificPopup({
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        preloader: false,
        // for white backgriund
        fixedContentPos: false,
        closeBtnInside: false,
        callbacks: {
            open: function () {
                setTimeout(function () {
                    $('.search-input').focus();
                }, 500);
                $('#search-header').parent().addClass('search-popup');
                if (!isMobile) {
                    $('body').addClass('overflow-hidden');
                    //$('body').addClass('position-fixed');
                    $('body').addClass('width-100');
                    document.onmousewheel = ScrollStop;
                } else {
                    $('body, html').on('touchmove', function (e) {
                        e.preventDefault();
                    });
                }
            },
            close: function () {
                if (!isMobile) {
                    $('body').removeClass('overflow-hidden');
                    //$('body').removeClass('position-fixed');
                    $('body').removeClass('width-100');
                    $('#search-header input[type=text]').each(function (index) {
                        if (index == 0) {
                            $(this).val('');
                            $("#search-header").find("input:eq(" + index + ")").css({
                                "border": "none",
                                "border-bottom": "2px solid rgba(255,255,255,0.5)"
                            });
                        }
                    });
                    document.onmousewheel = ScrollStart;
                } else {
                    $('body, html').unbind('touchmove');
                }
            }
        }
    });

    /*==============================================================*/
    //magnificPopup End 
    /*==============================================================*/
    $("input.search-input").on("keypress", function (event) {
        if (event.which == 13 && !isMobile) {
            $("button.search-button").trigger("click");
            event.preventDefault();
        }
    });

    $("input.search-input").on("keyup", function (event) {
        if ($(this).val() == null || $(this).val() == "") {
            $(this).css({
                "border": "none",
                "border-bottom": "2px solid red"
            });
        } else {
            $(this).css({
                "border": "none",
                "border-bottom": "2px solid rgba(255,255,255,0.5)"
            });
        }
    });

    $("form.search-form, form.search-form-result").submit(function (event) {
        var error = validationSearchForm();
        if (error) {
            var action = $(this).attr('action');
            action = action == '#' || action == '' ? 'blog-grid-3columns.html' : action;
            action = action + '?' + $(this).serialize();
            window.location = action;
        }

        event.preventDefault();
    });

    $(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-toggle="tab"], a.shopping-cart', function (e) {
        e.preventDefault();
    });

    $(document).on('touchstart click', 'body', function (e) {
        if ($(window).width() < 992) {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('in') && !$(e.target).hasClass('navbar-toggle')) {
                $('.navbar-collapse').collapse('hide');
            }
        } else {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse ul').hasClass('in')) {
                $('.navbar-collapse').find('a.dropdown-toggle').addClass('collapsed');
                $('.navbar-collapse').find('ul.dropdown-menu').removeClass('in');
                $('.navbar-collapse a.dropdown-toggle').removeClass('active');
            }
        }
    });

    $('.navbar-collapse a.dropdown-toggle').on('touchstart', function (e) {
        $('.navbar-collapse a.dropdown-toggle').not(this).removeClass('active');
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');
    });

    $('button.navbar-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $('a.dropdown-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $(document).on('touchstart click', '.navbar-collapse [data-toggle="dropdown"]', function (event) {

        var $innerLinkLI = $(this).parents('ul.navbar-nav').find('li.dropdown a.inner-link').parent('li.dropdown');
        if (!$(this).hasClass('inner-link') && !$(this).hasClass('dropdown-toggle') && $innerLinkLI.hasClass('open')) {
            $innerLinkLI.removeClass('open');
        }
        var target = $(this).attr('target');
        if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').indexOf("#") <= -1 && !$(event.target).is('i')) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() > 991 && $(this).attr('href').indexOf("#") <= -1) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').length > 1 && $(this).attr('href').indexOf("#") >= 0 && $(this).hasClass('inner-link')) {
            $(this).parents('ul.navbar-nav').find('li.dropdown').not($(this).parent('.dropdown')).removeClass('open');
            if ($(this).parent('.dropdown').hasClass('open')) {
                $(this).parent('.dropdown').removeClass('open');
            } else {
                $(this).parent('.dropdown').addClass('open');
            }
            $(this).toggleClass('active');
        }
    });

    /* ===================================
     skillbar
     ====================================== */
    $('.skillbar').appear();
    $('.skillbar').skillBars({
        from: 0,
        speed: 4000,
        interval: 100,
        decimals: 0
    });

    $(document.body).on('appear', '.skillbar', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            $(this).addClass('appear');
            $(this).find('.skillbar-bar').css("width", "0%");
            $(this).skillBars({
                from: 0,
                speed: 4000,
                interval: 100,
                decimals: 0
            });
        }
    });

    /* ===================================
     touchstart click
     ====================================== */
    $('body').on('touchstart click', function (e) {
        if ($(window).width() < 992) {}
    });

    /*==============================================================*/
    //Set Resize Header Menu - START CODE
    /*==============================================================*/
    $('nav.full-width-pull-menu ul.panel-group li.dropdown a.dropdown-toggle').on("click", function (e) {
        if ($(this).parent('li').find('ul.dropdown-menu').length > 0) {
            if ($(this).parent('li').hasClass('open')) {
                $(this).parent('li').removeClass('open');
            } else {
                $(this).parent('li').addClass('open');
            }
        }
    });

    /*==============================================================*/
    //accordion  - START CODE
    /*==============================================================*/
    $('.accordion-style1 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-minus"></i>');
    });

    $('.accordion-style1 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-plus"></i>');
    });

    $('.nav.navbar-nav a.inner-link').on("click", function (e) {
        $(this).parents('ul.navbar-nav').find('a.inner-link').removeClass('active');
        var $this = $(this);
        if ($('.nav-header-container .navbar-toggle').is(':visible'))
            $(this).parents('.navbar-collapse').collapse('hide');
        setTimeout(function () {
            $this.addClass('active');
        }, 1000);

    });

    $('.accordion-style2 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    });

    $('.accordion-style2 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    });

    $('.accordion-style3 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    });

    $('.accordion-style3 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    });
    /*==============================================================*/
    //accordion - END CODE
    /*==============================================================*/

    /*==============================================================*/
    //toggles  - START CODE
    /*==============================================================*/
    $('.toggles .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-minus"></i>');
    });

    $('.toggles .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="ti-plus"></i>');
    });

    $('.toggles-style2 .collapse').on('show.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-angle-up"></i>');
    });

    $('.toggles-style2 .collapse').on('hide.bs.collapse', function () {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fas fa-angle-down"></i>');
    });
    /*==============================================================*/
    //toggles  - END CODE
    /*==============================================================*/

    /* ===================================
     blog hover box
     ====================================== */
    $(document).on("mouseenter", ".blog-post-style4 .grid-item", function (e) {
        $(this).find("figcaption .blog-hover-text").slideDown(300);
    });
    $(document).on("mouseleave", ".blog-post-style4 .grid-item", function (e) {
        $(this).find("figcaption .blog-hover-text").slideUp(300);
    });
    /* ===================================
     End blog hover box
     ====================================== */
    SetResizeContent();

    var $allNonRatinaImages = $("img:not([data-rjs])");
    $allNonRatinaImages.attr('data-no-retina', '');

    /*==============================================================*/
    //demo button  - START CODE
    /*==============================================================*/

    var $buythemediv = '<div class="buy-theme alt-font sm-display-none"><a href="https://themeforest.net/item/pofo-creative-agency-corporate-and-portfolio-multipurpose-template/20645944?ref=themezaa" target="_blank"><i class="ti-shopping-cart"></i><span>Buy Theme</span></a></div><div class="all-demo alt-font sm-display-none"><a href="mailto:info@themezaa.com?subject=POFO – Creative Agency, Corporate and Portfolio Multi-purpose Template - Quick Question"><i class="ti-email"></i><span>Quick Question?</span></a></div>';
    $('body').append($buythemediv);

    /*==============================================================*/
    //demo button  - END CODE
    /*==============================================================*/

    $(document).on("touchstart", ".sidebar-wrapper", function () {
        clearOpen();
    });

    var getNav = $("nav.navbar.bootsnav"),
        getIn = getNav.find("ul.nav").data("in"),
        getOut = getNav.find("ul.nav").data("out");
    // Hidden dropdown
    function clearOpen() {
        $('li.dropdown').removeClass("on").removeClass("open");
        $(".dropdown-menu").stop().fadeOut('fast');
        $(".dropdown-menu").removeClass(getIn);
        $(".dropdown-menu").addClass(getOut);
    }

});
/* ===================================
 END READY
 ====================================== */


/* ===================================
 START Page Load
 ====================================== */
$(window).load(function () {
    var hash = window.location.hash.substr(1);
    if (hash != "") {
        setTimeout(function () {
            $(window).imagesLoaded(function () {
                var scrollAnimationTime = 1200,
                    scrollAnimation = 'easeInOutExpo';
                var target = '#' + hash;
                if ($(target).length > 0) {

                    $('html, body').stop()
                        .animate({
                            'scrollTop': $(target).offset().top
                        }, scrollAnimationTime, scrollAnimation, function () {
                            window.location.hash = target;
                        });
                }
            });
        }, 500);
    }

    fullScreenHeight();
});
/* ===================================
 END Page Load
 ====================================== */



/* ===================================
001
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#F7F7F7",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.2)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer);




/* ===================================
002
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer2);





/* ===================================
003
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer3);




/* ===================================
004
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer4);





/* ===================================
005
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer5);






/* ===================================
006
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer6);






/* ===================================
007
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer7);




/* ===================================
008
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer8);




/* ===================================
009
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/afonso_a.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer9);


/* ===================================
010
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/afonso_b.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer10);


/* ===================================
011
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer11);


/* ===================================
012
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer12);

/* ===================================
013
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/pedro_a.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer13);



/* ===================================
014
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/pedro_b.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer14);



/* ===================================
015
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/guilherme_a.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer15);





/* ===================================
016
 ====================================== */




// settings
var DEFAULTS = {
    borderColor: "#EDEDED",
    playedColor: "#ffffff",
    backgroundColor: "rgba(254,65,104,.3)",
    iconColor: "#ffffff",
    borderWidth: 2,
    size: 48,
    className: 'circle-audio-player'
};

// reused values
var pi = Math.PI;
var doublePi = pi * 2;
var arcOffset = -pi / 2;
var animTime = 200;
var loaderTime = 1800;

var CircleAudioPlayer = function (options) {
    options = options || {};
    for (var property in DEFAULTS) {
        this[property] = options[property] || DEFAULTS[property];
    }

    // create some things we need
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('class', this.className + ' is-loading');
    this._canvas.addEventListener('mousedown', (function () {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }).bind(this));
    this._ctx = this._canvas.getContext('2d');

    // set up initial stuff
    this.setAudio(options.audio);
    this.setSize(this.size);

    // redraw loop
    (function cAPAnimationLoop(now) {
        // check if we need to update anything
        if (this.animating) {
            this._updateAnimations(now);
        }
        if (this._forceDraw || this.playing || this.animating || this.loading) {
            this._draw();
            this._forceDraw = false;
        }

        requestAnimationFrame(cAPAnimationLoop.bind(this));
    }).call(this, new Date().getTime());
};
CircleAudioPlayer.prototype = {
    // private methods
    _animateIcon: function (to, from) {
        // define a few things the first time
        this._animationProps = {
            animStart: null,
            from: from,
            to: to
        };
        if (from) {
            this.animating = true;
        } else {
            this._animationProps.current = this._icons[to].slice();
            this.draw();
        }
    },
    _updateAnimations: function (now) {
        this._animationProps.animStart = this._animationProps.animStart || now;
        var deltaTime = now - this._animationProps.animStart;
        var perc = (1 - Math.cos(deltaTime / animTime * pi / 2));
        if (deltaTime >= animTime) {
            this.animating = false;
            perc = 1;
            this._animationProps.current = this._icons[this._animationProps.to].slice();
            this.draw();
        } else {
            var from = this._icons[this._animationProps.from];
            var current = [];
            for (var i = 0; i < from.length; i++) {
                current.push([]);
                for (var j = 0; j < from[i].length; j++) {
                    current[i].push([]);
                    var to = this._icons[this._animationProps.to][i][j];
                    current[i][j][0] = from[i][j][0] + (to[0] - from[i][j][0]) * perc;
                    current[i][j][1] = from[i][j][1] + (to[1] - from[i][j][1]) * perc;
                }
            }
            this._animationProps.current = current;
        }
    },
    _draw: function (progress) {
        // common settings
        if (isNaN(progress)) {
            progress = this.audio.currentTime / this.audio.duration || 0;
        }

        // clear existing
        this._ctx.clearRect(0, 0, this.size, this.size);

        // draw bg
        this._ctx.beginPath();
        this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), 0, doublePi);
        this._ctx.closePath();
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fill();

        // draw border
        // our active path is already the full circle, so just stroke it
        this._ctx.lineWidth = this.borderWidth;
        this._ctx.strokeStyle = this.borderColor;
        this._ctx.stroke();

        // play progress
        if (progress > 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize - (this.borderWidth / 2), arcOffset, arcOffset + doublePi * progress);
            this._ctx.strokeStyle = this.playedColor;
            this._ctx.stroke();
        }

        // icons
        this._ctx.fillStyle = this.iconColor;
        if (this.loading) {
            var loaderOffset = -Math.cos((new Date().getTime() % (loaderTime)) / (loaderTime) * pi) * doublePi - (pi / 3) - (pi / 2);
            this._ctx.beginPath();
            this._ctx.arc(this._halfSize, this._halfSize, this._halfSize / 3, loaderOffset, loaderOffset + pi / 3 * 2);
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.stroke();
        } else {
            this._ctx.beginPath();
            var icon = (this._animationProps && this._animationProps.current) || this._icons.play;
            for (var i = 0; i < icon.length; i++) {
                this._ctx.moveTo(icon[i][0][0], icon[i][0][1]);

                for (var j = 1; j < icon[i].length; j++) {
                    this._ctx.lineTo(icon[i][j][0], icon[i][j][1]);
                }
            }

            // this._ctx.closePath();
            this._ctx.fill();
            // stroke to fill in for retina
            this._ctx.strokeStyle = this.iconColor;
            this._ctx.lineWidth = 2;
            this._ctx.lineJoin = 'miter';
            this._ctx.stroke();
        }
    },
    _setState: function (state) {
        this.playing = false;
        this.loading = false;
        if (state === 'playing') {
            this.playing = true;
            this._animateIcon('pause', 'play');
        } else if (state === 'loading') {
            this.loading = true;
        } else if (this.state !== 'loading') {
            this._animateIcon('play', 'pause');
        } else {
            this._animateIcon('play', null);
        }
        this.state = state;
        this._canvas.setAttribute('class', this.className + ' is-' + state);
        this.draw();
    },
    // public methods
    draw: function () {
        this._forceDraw = true;
    },
    setSize: function (size) {
        this.size = size;
        this._halfSize = size / 2; // we do this a lot. it's not heavy, but why repeat?
        this._canvas.width = size;
        this._canvas.height = size;
        // set icon paths
        var iconSize = this.size / 2;
        var pauseGap = iconSize / 10;
        var playLeft = Math.cos(pi / 3 * 2) * (iconSize / 2) + this._halfSize;
        var playRight = iconSize / 2 + this._halfSize;
        var playHalf = (playRight - playLeft) / 2 + playLeft;
        var top = this._halfSize - Math.sin(pi / 3 * 2) * (iconSize / 2);
        var bottom = this.size - top;
        var pauseLeft = this._halfSize - iconSize / 3;
        var pauseRight = this.size - pauseLeft;
        this._icons = {
            play: [
				[
					[playLeft, top],
					[playHalf, (this._halfSize - top) / 2 + top],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize],
					[playLeft, bottom]
				],
				[
					[playHalf, (this._halfSize - top) / 2 + top],
					[playRight, this._halfSize],
					[playRight, this._halfSize],
					[playHalf, (this._halfSize - top) / 2 + this._halfSize]
				]
			],
            pause: [
				[
					[pauseLeft, top + pauseGap],
					[this._halfSize - pauseGap, top + pauseGap],
					[this._halfSize - pauseGap, bottom - pauseGap],
					[pauseLeft, bottom - pauseGap]
				],
				[
					[this._halfSize + pauseGap, top + pauseGap],
					[pauseRight, top + pauseGap],
					[pauseRight, bottom - pauseGap],
					[this._halfSize + pauseGap, bottom - pauseGap]
				]
			]
        };

        if (this._animationProps && this._animationProps.current) {
            this._animateIcon(this._animationProps.to);
        }
        if (!this.playing) {
            this.draw();
        }
    },
    setAudio: function (audioUrl) {
        this.audio = new Audio(audioUrl);
        this._setState('loading');

        this.audio.addEventListener('canplaythrough', (function () {
            this._setState('paused');
        }).bind(this));
        this.audio.addEventListener('play', (function () {
            this._setState('playing');
        }).bind(this));
        this.audio.addEventListener('pause', (function () {
            // reset when finished
            if (this.audio.currentTime === this.audio.duration) {
                this.audio.currentTime = 0;
            }
            this._setState('paused');
        }).bind(this));
    },
    appendTo: function (element) {
        element.appendChild(this._canvas);
    },
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    }
};


// now init one as an example
var cap = new CircleAudioPlayer({
    audio: 'sound/001.mp3',
    size: 45,
    borderWidth: 5,
});
cap.appendTo(playerContainer16);




// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
