/* =========================================================
   GALLERY.JS — filterable creative gallery + lightbox
   ========================================================= */
(function(){
  "use strict";

  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");

  filterBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      filterBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      items.forEach(item=>{
        const cat = item.getAttribute("data-cat") || "";
        const show = filter === "all" || cat === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });

  /* ----- Lightbox ----- */
  const lightbox = document.querySelector(".lightbox");
  if(!lightbox) return;
  const lbImg = lightbox.querySelector("img");
  const lbCaption = lightbox.querySelector(".lightbox-caption");
  const lbClose = lightbox.querySelector(".lightbox-close");

  items.forEach(item=>{
    item.addEventListener("click", ()=>{
      const img = item.querySelector("img");
      if(!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      if(lbCaption) lbCaption.textContent = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox(){
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  if(lbClose) lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e)=>{ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeLightbox(); });
})();
