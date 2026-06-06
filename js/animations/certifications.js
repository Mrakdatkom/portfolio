import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initCertificationsAnimation() {
  const section = document.querySelector("#certifications");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#certifications",
      start: "top 78%",
      toggleActions: "play none none reverse"
    }
  });

  // Header
  tl.fromTo("#certifications h2",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );

  // Terminal card
  tl.fromTo("#cert-terminal",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    "-=0.3"
  );

  // File rows stagger
  tl.fromTo("#cert-row-1, #cert-row-2",
    { opacity: 0, x: -14 },
    { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
    "-=0.3"
  );

  // --- Modal ---
  const modal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalIssuer = document.getElementById("modal-issuer");
  const modalDate = document.getElementById("modal-date");

  function openModal(data) {
    modalImg.src = data.img;
    modalTitle.innerText = data.title;
    modalIssuer.innerText = data.issuer;
    modalDate.innerText = data.date;
    document.body.classList.add("overflow-hidden");
    gsap.set(modal, { pointerEvents: "auto" });
    gsap.fromTo(modal,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(0.8)" }
    );
  }

  function closeModal() {
    gsap.to(modal, {
      opacity: 0, scale: 0.94, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        gsap.set(modal, { pointerEvents: "none" });
        document.body.classList.remove("overflow-hidden");
        modalImg.src = "";
      }
    });
  }

  document.querySelectorAll(".cert-card").forEach(row => {
    row.addEventListener("click", () => openModal({
      img: row.dataset.certImg,
      title: row.dataset.certTitle,
      issuer: row.dataset.certIssuer,
      date: row.dataset.certDate,
    }));
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.pointerEvents === "auto") closeModal();
  });
}