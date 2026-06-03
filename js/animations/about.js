// js/animations/about.js
import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initAboutAnimation() {
  // Wait for the about section to be in the DOM
  const aboutSection = document.querySelector("#about");
  if (!aboutSection) return;

  // Fade-in & slide-up for the entire section header
  gsap.fromTo("#about h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate the image (fade & scale)
  gsap.fromTo("#about .relative.border-4",
    { opacity: 0, scale: 0.9, rotationX: -15 },
    {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
      }
    }
  );

  // Animate each paragraph and stats cards with stagger
  gsap.fromTo("#about .space-y-4 p",
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#about .space-y-4",
        start: "top 80%",
      }
    }
  );

  // Animate stats cards (each card)
  gsap.fromTo("#about .grid > div",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#about .grid",
        start: "top 85%",
      }
    }
  );

  // Optional: counting animation for numbers (requires additional logic)
  // We'll add a simple GSAP text animation for demo
  const numbers = document.querySelectorAll("#about [data-count]");
  numbers.forEach(el => {
    const finalValue = el.innerText;
    const numeric = parseFloat(finalValue);
    if (!isNaN(numeric)) {
      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: numeric,
          duration: 1.5,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reset"
          },
          onUpdate: function() {
            el.innerText = Math.floor(this.targets()[0].innerText);
            if (finalValue.includes('+')) el.innerText += '+';
          }
        }
      );
    }
  });
}