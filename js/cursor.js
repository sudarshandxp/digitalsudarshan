/* =========================================================
   CURSOR.JS — custom targeting cursor (dot + lagging ring)
   Skipped automatically on touch devices via CSS.
   ========================================================= */
(function(){
  "use strict";
  if(window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener("mousemove", (e)=>{
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function loop(){
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  const hoverTargets = "a, button, .btn, .card, .gallery-item, [data-cursor-hover]";
  document.addEventListener("mouseover", (e)=>{
    if(e.target.closest(hoverTargets)) ring.classList.add("hover");
  });
  document.addEventListener("mouseout", (e)=>{
    if(e.target.closest(hoverTargets)) ring.classList.remove("hover");
  });

  document.addEventListener("mouseleave", ()=>{ dot.style.opacity="0"; ring.style.opacity="0"; });
  document.addEventListener("mouseenter", ()=>{ dot.style.opacity="1"; ring.style.opacity="1"; });
})();
