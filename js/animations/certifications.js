// js/animations/certifications.js
import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initCertificationsAnimation() {
  const certSection = document.querySelector("#certifications");
  if (!certSection) return;

  // Animate section header
  gsap.fromTo("#certifications h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#certifications",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate each certificate card with stagger
  gsap.fromTo(".cert-card",
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#certifications .grid",
        start: "top 75%",
      }
    }
  );

  // --- Modal functionality ---
  const modal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalIssuer = document.getElementById("modal-issuer");
  const modalDate = document.getElementById("modal-date");
  const closeBtn = document.getElementById("modal-close");
  const overlay = document.getElementById("modal-overlay");

  // Helper: open modal with GSAP animation
  function openModal(certData) {
    // Populate modal with data
    modalImg.src = certData.img;
    modalTitle.innerText = certData.title;
    modalIssuer.innerText = certData.issuer;
    modalDate.innerText = certData.date;

    // Make modal interactive and visible
    gsap.set(modal, { pointerEvents: "auto" });
    gsap.fromTo(modal,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(0.5)" }
    );
  }

  function closeModal() {
    gsap.to(modal, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(modal, { pointerEvents: "none" });
        // Optionally clear image src to free memory
        modalImg.src = "";
      }
    });
  }

  // Attach click listeners to each card
  document.querySelectorAll(".cert-card").forEach(card => {
    card.addEventListener("click", (e) => {
      // Prevent opening if clicked on the "View credential" button's inner span? It's fine.
      e.stopPropagation();
      const certData = {
        img: card.getAttribute("data-cert-img"),
        title: card.getAttribute("data-cert-title"),
        issuer: card.getAttribute("data-cert-issuer"),
        date: card.getAttribute("data-cert-date")
      };
      if (certData.img) openModal(certData);
    });
  });

  // Close modal on close button or overlay click
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.pointerEvents === "auto") {
      closeModal();
    }
  });
}