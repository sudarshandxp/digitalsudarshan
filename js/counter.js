/* =========================================================
   COUNTER.JS — animated number counters (KPI stat blocks)
   Usage: <span data-counter data-target="429" data-suffix="+">0</span>
   ========================================================= */
(function(){
  "use strict";

  function easeOutExpo(t){ return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

  function animateCounter(el){
    const target = parseFloat(el.getAttribute("data-target") || "0");
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = parseInt(el.getAttribute("data-duration") || "1600", 10);
    const start = performance.now();

    function tick(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const value = target * eased;
      el.textContent = prefix + value.toLocaleString("en-IN", {
        minimumFractionDigits:decimals, maximumFractionDigits:decimals
      }) + suffix;
      if(progress < 1){
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target.toLocaleString("en-IN", {
          minimumFractionDigits:decimals, maximumFractionDigits:decimals
        }) + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll("[data-counter]");
  if(!counters.length) return;

  if("IntersectionObserver" in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.5 });
    counters.forEach(el => io.observe(el));
  } else {
    counters.forEach(animateCounter);
  }
})();
