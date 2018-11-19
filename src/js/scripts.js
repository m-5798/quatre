if (typeof Site === 'undefined') {
  var Site = {};
  (function(S, W) {
    'use strict';

    var d = W.document;

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

  })(Site, window);
}

$(function() {
  Site.tabs();
});
