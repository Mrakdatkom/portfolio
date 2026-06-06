import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function initAboutAnimation() {
  const aboutSection = document.querySelector("#about");
  if (!aboutSection) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      start: "top 78%",
      toggleActions: "play none none reverse"
    }
  });

  // Header
  tl.fromTo("#about h2",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );

  // Decorative panel — subtle float up + fade
  tl.fromTo("#about-deco",
    { opacity: 0, y: 30, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
    "-=0.4"
  );

  // Bio paragraphs stagger
  tl.fromTo("#about .space-y-4 p",
    { opacity: 0, x: -16 },
    { opacity: 1, x: 0, duration: 0.55, stagger: 0.18, ease: "power2.out" },
    "-=0.6"
  );

  // Stat cards stagger
  tl.fromTo("#about [data-stat]",
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
    "-=0.3"
  );

  // Availability tag
  tl.fromTo("#about .italic",
    { opacity: 0 },
    { opacity: 1, duration: 0.5 },
    "-=0.1"
  );

  // Counter animation for numeric stats
  const numbers = document.querySelectorAll("#about [data-count]");
  numbers.forEach(el => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;

    const suffix = el.innerText.includes("+") ? "+" : "";

    gsap.fromTo({ val: 0 },
      { val: target },
      {
        val: target,
        duration: 1.4,
        ease: "power1.inOut",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reset"
        },
        onUpdate: function () {
          el.innerText = Math.floor(this.targets()[0].val) + suffix;
        }
      }
    );
  });
}