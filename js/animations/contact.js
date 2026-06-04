// js/animations/contact.js
import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initContactAnimation() {
  const footer = document.querySelector("#contact");
  if (!footer) return;

  // Fade in whole footer with slight slide up
  gsap.fromTo("#contact",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );

  // Animate each contact item (stagger)
  gsap.fromTo("#contact .space-y-6 > div, #contact .bg-charcoal-light\\/10",
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#contact .grid",
        start: "top 80%",
      }
    }
  );
}