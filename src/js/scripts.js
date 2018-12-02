if (typeof Site === 'undefined') {
  var Site = {};
  (function(S, W) {
    'use strict';

    var d = W.document;

    S.getDevice = function() {
      var ua = navigator.userAgent
        , res = '';
      if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        res = 'sp';
      } else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        res = 'tablet';
      } else {
        res = 'other';
      }
      return res;
    };

    S.nav = function() {
      var nav_class = '.c-nav'
        , nav_items = '.c-nav_items'
        , open_class = 'c-nav-open'
        , $body = $(d.body)
        , $toggle = $('.c-nav_toggle')
        , $nav_items = $(nav_class).find(nav_items + ' li > a')
        ;
      $($toggle.add($nav_items)).on('click', function() {
        var $nav = $(this).closest(nav_class)
          , is_open = false
          ;
        $nav.toggleClass(open_class);
        is_open = $nav.hasClass(open_class);
        $body.css({
          'height': is_open ? '100%': '',
          'overflow': is_open ? 'hidden': '',
        });
        $(W).on('touchmove', function(evt) {
          if(is_open) evt.preventDefault();
        });
        if(!is_open) $(W).off('touchmove');
      });
    };

    S.tabs = function() {
      var tabs = '[data-qt-tabs]'
        , toggles = '[data-qt-toggles]'
        , contents = '[data-qt-contents]'
        , toggle_active = 'c-tabs_toggle-active'
        , content_active = 'c-tabs_content-active'
        , $toggles = $(tabs).children(toggles).children()
        ;
      $toggles.on('click', function() {
        var $tabs = $(this).closest(tabs)
          , $contents = $tabs.children(contents).children()
          , idx = $(this).prevAll().length
          ;
        $toggles.removeClass(toggle_active);
        $contents.removeClass(content_active);
        $(this).addClass(toggle_active);
        $contents.eq(idx).addClass(content_active);
      });
    };

    S.anchorScroll = function() {
      $('a[href^="#"]').click(function() {
        var speed = 400
          , href= $(this).attr('href')
          , target = $(href == '#' || href == '' ? 'html' : href)
          , position = target.offset().top;
        if($(target[0]).attr('id') !== 'start') position = position - 70;
        $('body, html').animate({scrollTop:position}, speed, 'swing');
        return false;
      });
    };

  })(Site, window);
}

$(document).ready(function () {
  if(Site.getDevice() === 'other') {
    $('nav > .c-nav').sticky({topSpacing:0});
  } else {
    Site.nav();
  }
  Site.tabs();
  Site.anchorScroll();

  var mySwiper = new Swiper ('.swiper-container', {
    centeredSlides: true,
    loop: false,
    speed: 1000,
    navigation: {
      prevEl: '.p-kodawari_swiperBtn-prev',
      nextEl: '.p-kodawari_swiperBtn-next',
    },
    slidesPerView: 'auto',
    autoplay: {
      delay: 20000,
      disableOnInteraction: false,
    },
  });
  mySwiper.autoplay.stop();

  $(window).on('scroll.swiper', function() {
    var t = $('.p-kodawari > .c-heading1').offset().top;
    var p = t - $(window).height();
    if($(window).scrollTop() > p) {
      mySwiper.autoplay.start();
      $(window).off('scroll.swiper');
    }
  });

  $('.c-animimg').scrolla({
    mobile: true,
    once: true
  });

});
