import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initProfDevAnimation() {
  const section = document.querySelector("#prof-dev");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#prof-dev",
      start: "top 78%",
      toggleActions: "play none none reverse"
    }
  });

  // Header
  tl.fromTo("#prof-dev h2",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );

  // Changelog window
  tl.fromTo("#pd-changelog",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    "-=0.3"
  );

  // File comment
  tl.fromTo("#pd-comment",
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "power2.out" },
    "-=0.3"
  );

  // Entries stagger
  tl.fromTo("#pd-entry-1, #pd-entry-2, #pd-entry-3",
    { opacity: 0, x: -14 },
    { opacity: 1, x: 0, duration: 0.45, stagger: 0.14, ease: "power2.out" },
    "-=0.2"
  );

  // EOF line
  tl.fromTo("#pd-eof",
    { opacity: 0 },
    { opacity: 1, duration: 0.3 },
    "-=0.1"
  );
}