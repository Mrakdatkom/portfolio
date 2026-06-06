/**
 * animations/hero.js
 * GSAP entrance + typewriter animations for the hero section.
 */

import { gsap } from "../../vendor/gsap/index.js";

const ROLES = [
  "Full-Stack Development",
  "UI/UX Design & Styling",
  "Database Management",
  "System Analysis",
  "AI & Emerging Tech",
  "Office Productivity",
  "Professional Communication"
];

const TYPEWRITER_SPEED_MS = 80;
const ERASE_SPEED_MS = 40;
const PAUSE_AFTER_TYPE_MS = 2000;
const PAUSE_AFTER_ERASE_MS = 400;

function startCursorBlink() {
  const cursor = document.getElementById("typewriter-cursor");
  if (!cursor) return;
  gsap.to(cursor, {
    opacity: 0,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "steps(1)",
  });
}

function runTypewriter(roleIndex = 0) {
  const output = document.getElementById("typewriter-output");
  if (!output) return;

  const role = ROLES[roleIndex % ROLES.length];
  const next = (roleIndex + 1) % ROLES.length;
  let text = "";
  let charIdx = 0;

  function typeChar() {
    if (charIdx < role.length) {
      text += role[charIdx++];
      output.textContent = text;
      setTimeout(typeChar, TYPEWRITER_SPEED_MS);
    } else {
      setTimeout(eraseChar, PAUSE_AFTER_TYPE_MS);
    }
  }

  function eraseChar() {
    if (text.length > 0) {
      text = text.slice(0, -1);
      output.textContent = text;
      setTimeout(eraseChar, ERASE_SPEED_MS);
    } else {
      setTimeout(() => runTypewriter(next), PAUSE_AFTER_ERASE_MS);
    }
  }

  typeChar();
}

export function animateHero() {
  // Wait a tiny moment for DOM to settle
  setTimeout(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        startCursorBlink();
        runTypewriter(0);
      },
    });

    const show = (el) => gsap.set(el, { visibility: "visible" });

    // Avatar column
    tl.call(show, ["#hero-avatar-col"])
      .fromTo("#hero-avatar-col", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.9 })

      // Greeting tag
      .call(show, ["#hero-greeting"], "<+0.3")
      .fromTo("#hero-greeting", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 }, "<")

      // Name
      .call(show, ["#hero-name"], "<+0.15")
      .fromTo("#hero-name", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.65 }, "<")

      // Typewriter row
      .call(show, ["#hero-typewriter-wrapper"], "<+0.2")
      .fromTo("#hero-typewriter-wrapper", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, "<")

      // CTA buttons
      .call(show, ["#hero-cta"], "<+0.2")
      .fromTo("#hero-cta", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "<");
  }, 50); // small delay ensures elements are in DOM
}