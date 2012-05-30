// Generated by CoffeeScript 1.3.3

define(['jquery', 'underscore', 'backbone', 'serrano'], function($, _, Backbone, Serrano) {
  return $(function() {
    return $('[data-toggle=detail]').each(function() {
      var details, toggle;
      toggle = $(this);
      details = toggle.parent().siblings('.details');
      return toggle.on('click', function() {
        if (details.is(':visible')) {
          return details.slideUp(200);
        } else {
          return details.slideDown(200);
        }
      });
    });
  });
});
