import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initContactAnimation() {
  const footer = document.querySelector("#contact");
  if (!footer) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // Top rule draws in
  tl.fromTo("#contact .h-\\[3px\\]",
    { scaleX: 0, transformOrigin: "center" },
    { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
  );

  // Name stamp drops in
  tl.fromTo("#contact-name-row",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    "-=0.4"
  );

  // Left col slides in
  tl.fromTo("#contact-left",
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
    "-=0.3"
  );

  // Right col slides in
  tl.fromTo("#contact-right",
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
    "<"
  );

  // Bottom bar fades in last
  tl.fromTo("#contact-bottom",
    { opacity: 0 },
    { opacity: 1, duration: 0.5 },
    "-=0.2"
  );
}