// js/animations/education.js
import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initEducationAnimation() {
  const eduSection = document.querySelector("#education");
  if (!eduSection) return;

  // Animate section header
  gsap.fromTo("#education h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#education",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate the main card (scale + fade)
  gsap.fromTo("#education .bg-parchment-dark",
    { opacity: 0, scale: 0.95, y: 20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: "#education .bg-parchment-dark",
        start: "top 75%",
      }
    }
  );

  // Animate each line inside the card with stagger (degree, university, date)
  gsap.fromTo("#education .bg-parchment-dark > div > *", // careful selector
    { opacity: 0, x: -15 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#education .bg-parchment-dark",
        start: "top 80%",
      }
    }
  );

  // Animate the progress bar width (optional)
  gsap.fromTo("#education .rounded-full .bg-terracotta",
    { width: "0%" },
    {
      width: "85%",
      duration: 1.2,
      delay: 0.3,
      scrollTrigger: {
        trigger: "#education .rounded-full",
        start: "top 85%",
        toggleActions: "play none none reset"
      }
    }
  );
}