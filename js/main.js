/* =========================================================
   MAIN.JS — global site behavior
   ========================================================= */
(function(){
  "use strict";

  /* ----- Mark active nav link based on current file ----- */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .footer-col a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href && href === path){ a.classList.add("active"); }
  });

  /* ----- Footer year ----- */
  document.querySelectorAll("[data-year]").forEach(el=>{
    el.textContent = new Date().getFullYear();
  });

  /* ----- Contact form (static demo — wires up validation + success state) ----- */
  const form = document.querySelector("#contact-form");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const requiredFields = form.querySelectorAll("[required]");
      let valid = true;
      requiredFields.forEach(f=>{
        if(!f.value.trim()){ valid = false; f.style.borderColor = "#EF4444"; }
        else{ f.style.borderColor = ""; }
      });

      if(!valid){
        if(status){
          status.textContent = "Please fill in the required fields before sending.";
          status.style.color = "#F87171";
        }
        return;
      }

      const submitBtn = form.querySelector("button[type=submit]");
      const originalLabel = submitBtn ? submitBtn.textContent : "";
      if(submitBtn){ submitBtn.textContent = "Sending…"; submitBtn.disabled = true; }

      setTimeout(()=>{
        if(status){
          status.textContent = "Thanks — your message has been noted. I'll reply within 24 hours.";
          status.style.color = "#34D399";
        }
        form.reset();
        if(submitBtn){ submitBtn.textContent = originalLabel; submitBtn.disabled = false; }
      }, 900);
    });
  }

  /* ----- WhatsApp quick-message helper ----- */
  document.querySelectorAll("[data-whatsapp]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const number = btn.getAttribute("data-whatsapp");
      const text = encodeURIComponent("Hi Sudarshan, I found your portfolio and would like to discuss a project.");
      window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener");
    });
  });

  /* ----- Smooth-scroll for on-page anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener("click", (e)=>{
      const id = link.getAttribute("href");
      if(id.length < 2) return;
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 84) + 1;
        window.scrollTo({ top, behavior:"smooth" });
      }
    });
  });
})();
