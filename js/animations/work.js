// js/animations/work.js
import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initWorkAnimation() {
  const workSection = document.querySelector("#work");
  if (!workSection) return;

  // Fade in section header
  gsap.fromTo("#work h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#work",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate the timeline card (slide from left + fade)
  gsap.fromTo("#work .bg-parchment-dark",
    { opacity: 0, x: -40 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#work .bg-parchment-dark",
        start: "top 75%",
      }
    }
  );

  // Animate each bullet point with stagger
  gsap.fromTo("#work ul li",
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#work ul",
        start: "top 80%",
      }
    }
  );

  // Optional: timeline line draw effect (width grows)
  gsap.fromTo("#work .border-l-2",
    { scaleY: 0, transformOrigin: "top" },
    {
      scaleY: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#work .border-l-2",
        start: "top 80%",
        toggleActions: "play none none reset"
      }
    }
  );
}