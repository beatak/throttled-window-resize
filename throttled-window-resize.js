/**
 * throttled window resize:
 * (c) 2013, Takashi Mizohata <beatak@gmail.com>
 * MIT License
 */

(function() {
  var EVENT_NAME           = 'throttledWindowResize',
  MILSEC_ONRESIZE_INTERVAL = 333,
  last_resize     = -1,
  timeout_handler = null,
  fireEvent = function(ev, needs_trailing_event) {
    var current_epoch, e;
    current_epoch = Date.now();
    if (needs_trailing_event && (MILSEC_ONRESIZE_INTERVAL > current_epoch - last_resize)) {
      return;
    }
    last_resize = current_epoch;

    if (null !== timeout_handler) {
      clearTimeout(timeout_handler);
      timeout_handler = null;
    }
    e = $.Event(EVENT_NAME);
    if (ev) {
      e.originalEvent = ev;
    }

    $(window).trigger(e);

    if (needs_trailing_event) {
      timeout_handler = setTimeout(
        function() {
          return fireEvent(null, false);
        }, 
        MILSEC_ONRESIZE_INTERVAL * 1.1
      );
    }
  };

  if ('undefined' === typeof Date.now) {
    Date.now(function() {
      return (new Date()).getTime();
    });
  }

  $(window).on('resize', function(ev) {
    fireEvent(ev, true);
  });
}).call();

