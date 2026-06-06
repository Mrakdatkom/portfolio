import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initWorkAnimation() {
  const workSection = document.querySelector("#work");
  if (!workSection) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#work",
      start: "top 78%",
      toggleActions: "play none none reverse"
    }
  });

  // Header
  tl.fromTo("#work h2",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );

  // Timeline spine draw
  tl.fromTo("#work-timeline",
    { scaleY: 0, transformOrigin: "top center" },
    { scaleY: 1, duration: 0.9, ease: "power2.out" },
    "-=0.3"
  );

  // Timeline dot pop
  tl.fromTo("#work-entry-1 .rotate-45.bg-primary",
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
    "-=0.4"
  );

  // Card slide in
  tl.fromTo("#work-card-1",
    { opacity: 0, x: -32 },
    { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
    "-=0.2"
  );

  // Bullet lines stagger
  tl.fromTo("#work-bullets-1 li",
    { opacity: 0, x: -14 },
    { opacity: 1, x: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" },
    "-=0.3"
  );
}