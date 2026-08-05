/* =========================================================
   ANIMATIONS.JS — ambient motion: glow-follow, parallax, tilt
   ========================================================= */
(function(){
  "use strict";

  /* ----- Mouse-reactive glow on service cards ----- */
  document.querySelectorAll(".service-card, .client-card").forEach(card=>{
    card.addEventListener("mousemove", (e)=>{
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* ----- Subtle parallax on hero grid / portrait ----- */
  const heroGrid = document.querySelector(".hero-grid");
  const portrait = document.querySelector(".hero-portrait");
  if(heroGrid || portrait){
    window.addEventListener("mousemove", (e)=>{
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      if(heroGrid) heroGrid.style.transform = `translate(${cx*14}px, ${cy*14}px)`;
      if(portrait) portrait.style.transform = `translate(${cx*-10}px, ${cy*-10}px)`;
    }, { passive:true });
  }

  /* ----- Light parallax on scroll for hero background blobs ----- */
  const heroBg = document.querySelector(".hero-bg");
  if(heroBg){
    window.addEventListener("scroll", ()=>{
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive:true });
  }

  /* ----- 3D tilt on case-study / portrait cards ----- */
  document.querySelectorAll("[data-tilt]").forEach(card=>{
    card.addEventListener("mousemove", (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 6}deg)`;
    });
    card.addEventListener("mouseleave", ()=>{
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    });
  });
})();
