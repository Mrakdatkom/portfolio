// js/animations/profDev.js
import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initProfDevAnimation() {
  const section = document.querySelector("#prof-dev");
  if (!section) return;

  // Animate header
  gsap.fromTo("#prof-dev h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#prof-dev",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate each card with stagger (fade up)
  gsap.fromTo("#prof-dev .group",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#prof-dev .grid",
        start: "top 75%",
      }
    }
  );
}