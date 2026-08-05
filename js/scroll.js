/* =========================================================
   SCROLL.JS — reveal-on-scroll, progress bar, nav state, back-to-top
   ========================================================= */
(function(){
  "use strict";

  /* ----- Navbar state on scroll ----- */
  const nav = document.querySelector(".nav");
  const backTop = document.querySelector(".back-to-top");
  const progress = document.querySelector(".scroll-progress");

  function onScroll(){
    const y = window.scrollY;
    if(nav) nav.classList.toggle("is-scrolled", y > 12);
    if(backTop) backTop.classList.toggle("show", y > 700);
    if(progress){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (y / h) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  if(backTop){
    backTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
  }

  /* ----- Mobile nav toggle ----- */
  const toggle = document.querySelector(".nav-toggle");
  if(toggle && nav){
    toggle.addEventListener("click", () => nav.classList.toggle("menu-open"));
    document.querySelectorAll(".nav-links a").forEach(a=>{
      a.addEventListener("click", () => nav.classList.remove("menu-open"));
    });
  }

  /* ----- IntersectionObserver reveal ----- */
  const revealEls = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
  if("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.16, rootMargin:"0px 0px -8% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in-view"));
  }

  /* ----- Page loader ----- */
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if(loader){
      setTimeout(()=> loader.classList.add("hide"), 420);
    }
  });

})();
