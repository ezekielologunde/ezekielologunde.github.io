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
})();
