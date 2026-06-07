import gsap from "../../vendor/gsap/index.js";
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

// Helper: scramble a number element
function scrambleNumber(element, targetNumber, suffix = "") {
  const duration = 1.4;        // total animation time
  const steps = 30;            // number of scramble changes
  let currentStep = 0;
  let currentNumber = 0;

  // Generate a random character (digit or symbol)
  const randomChar = () => {
    const chars = "0123456789?!#%&";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Scramble interval
  const interval = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(interval);
      // Final number set by GSAP counter, but ensure it ends cleanly
      element.innerText = targetNumber + suffix;
      return;
    }
    // Show random characters that "look like" numbers
    const scrambled = Array.from({ length: String(targetNumber).length }, () => randomChar()).join("");
    element.innerText = scrambled + (suffix ? " " + suffix : "");
    currentStep++;
  }, duration / steps * 1000);

  // GSAP counter (actual number increments)
  gsap.fromTo({ val: 0 },
    { val: targetNumber },
    {
      val: targetNumber,
      duration: duration,
      ease: "power1.inOut",
      snap: { val: 1 },
      onUpdate: function() {
        currentNumber = Math.floor(this.targets()[0].val);
        // Only update if not during scramble? We'll let scramble override, but final set will correct.
        // Actually, let the counter update after scramble finishes.
        // But we can also let the counter update the final number after scramble ends.
        // Simpler: after interval finishes, we set the final number. Counter's final value will match.
        // So we don't write here; just rely on interval's final set.
      },
      onComplete: () => {
        // Ensure final number is correct (in case interval already set it)
        element.innerText = targetNumber + suffix;
      }
    }
  );
}

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

  // Decorative panel
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

  // Scramble + Counter animation for numeric stats
  const numbers = document.querySelectorAll("#about [data-count]");
  numbers.forEach(el => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;

    // Check if the element already contains a suffix (like "+")
    const originalText = el.innerText;
    const suffix = originalText.includes("+") ? "+" : "";

    // Start the scramble effect when the element is scrolled into view
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,            // trigger only once
      onEnter: () => {
        scrambleNumber(el, target, suffix);
      }
    });
  });
}