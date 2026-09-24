/* Motion gate, loaded in the head without defer so the first paint already
   knows whether scenes animate. Sets html.motion only when reduced motion is
   off and IntersectionObserver exists. No other effect. */
(function () {
  try {
    if ('IntersectionObserver' in window && window.matchMedia &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('motion');
    }
  } catch (e) { /* stay static */ }
  /* Cross-document view transitions reject their promises when a navigation
     interrupts them; that is expected, so keep it out of the console. */
  var quiet = function (e) {
    var vt = e && e.viewTransition;
    if (vt) { vt.ready.catch(function () {}); vt.finished.catch(function () {}); vt.updateCallbackDone.catch(function () {}); }
  };
  window.addEventListener('pageswap', quiet);
  window.addEventListener('pagereveal', quiet);
})();
