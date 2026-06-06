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
      toggleActions: "play none none reverse",
    },
  });

  tl.fromTo(
    "#certifications h2",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );
  tl.fromTo(
    "#cert-terminal",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    "-=0.3"
  );
  tl.fromTo(
    "#cert-row-1, #cert-row-2",
    { opacity: 0, x: -14 },
    {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.12,
      ease: "power2.out",
    },
    "-=0.3"
  );

  // --- Modal Logic (Standard DOM Manipulation) ---
  const modal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalBadge = document.getElementById("modal-badge");
  const modalIssuer = document.getElementById("modal-issuer");
  const modalDate = document.getElementById("modal-date");
  const overlay = document.getElementById("modal-overlay");

  if (!modal || !overlay) return;

  function openModal(data) {
    modalImg.src = data.img;
    modalTitle.innerText = data.title;
    modalBadge.innerText = data.issuer;
    modalIssuer.innerText = data.issuer;
    modalDate.innerText = data.date;

    // Disable background scroll
    document.body.classList.add("overflow-hidden");

    // Make modal visible and clickable
    modal.style.pointerEvents = "auto";
    modal.style.opacity = "1";
  }

  function closeModal() {
    modal.style.pointerEvents = "none";
    modal.style.opacity = "0";
    document.body.classList.remove("overflow-hidden");
    modalImg.src = "";
  }

  // Attach click handlers to certificate rows
  document.querySelectorAll(".cert-card").forEach((row) => {
    row.addEventListener("click", () =>
      openModal({
        img: row.dataset.certImg,
        title: row.dataset.certTitle,
        issuer: row.dataset.certIssuer,
        date: row.dataset.certDate,
      })
    );
  });

  // Close button
  const closeBtn = document.getElementById("modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Click on overlay (the blurred background) to close
  overlay.addEventListener("click", closeModal);

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.pointerEvents === "auto") {
      closeModal();
    }
  });
}