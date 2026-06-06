import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initEducationAnimation() {
  const eduSection = document.querySelector("#education");
  if (!eduSection) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#education",
      start: "top 78%",
      toggleActions: "play none none reverse"
    }
  });

  // Header
  tl.fromTo("#education h2",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );

  // Card fade + slide
  tl.fromTo("#edu-card",
    { opacity: 0, y: 24, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
    "-=0.3"
  );

  // JSON lines stagger
  tl.fromTo("#edu-line-1, #edu-line-2, #edu-line-3, #edu-line-4, #edu-line-5",
    { opacity: 0, x: -12 },
    { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
    "-=0.3"
  );

  // Progress bar fill
  tl.fromTo("#edu-bar",
    { width: "0%" },
    { width: "95%", duration: 1.1, ease: "power2.inOut" },
    "-=0.1"
  );

  // Bar row fade
  tl.fromTo("#edu-bar-row",
    { opacity: 0 },
    { opacity: 1, duration: 0.4 },
    "<"
  );
}