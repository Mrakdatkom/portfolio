/**
 * animations/hero.js
 * GSAP entrance + typewriter animations for the hero section.
 * Called by main.js after hero.html has been injected into the DOM.
 */

import { gsap } from "../../vendor/gsap/index.js";

/* ── Typewriter config ────────────────────────────────────────── */
const ROLES = [
  "Full-Stack Development",
  "UI/UX Design & Styling",
  "Database Management",
  "System Analysis",
  "AI & Emerging Tech",
  "Office Productivity",
  "Professional Communication"
];

const TYPEWRITER_SPEED_MS = 80;   // ms per character typed
const ERASE_SPEED_MS = 40;   // ms per character erased
const PAUSE_AFTER_TYPE_MS = 2000; // pause before erasing
const PAUSE_AFTER_ERASE_MS = 400;  // pause before typing next

/* ── Cursor blink ─────────────────────────────────────────────── */
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

/* ── Typewriter loop ──────────────────────────────────────────── */
function runTypewriter(roleIndex = 0) {
  const output = document.getElementById("typewriter-output");
  if (!output) return;

  const role = ROLES[roleIndex % ROLES.length];
  const next = (roleIndex + 1) % ROLES.length;
  let text = "";
  let charIdx = 0;

  // Type characters one by one
  function typeChar() {
    if (charIdx < role.length) {
      text += role[charIdx++];
      output.textContent = text;
      setTimeout(typeChar, TYPEWRITER_SPEED_MS);
    } else {
      // Finished typing — pause then start erasing
      setTimeout(eraseChar, PAUSE_AFTER_TYPE_MS);
    }
  }

  // Erase characters one by one
  function eraseChar() {
    if (text.length > 0) {
      text = text.slice(0, -1);
      output.textContent = text;
      setTimeout(eraseChar, ERASE_SPEED_MS);
    } else {
      // Finished erasing — pause then type next role
      setTimeout(() => runTypewriter(next), PAUSE_AFTER_ERASE_MS);
    }
  }

  typeChar();
}

/* ── Entrance animation timeline ─────────────────────────────── */
export function animateHero() {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      startCursorBlink();
      runTypewriter(0);
    },
  });

  // Helper: unhide an element before animating it
  const show = (el) => {
    gsap.set(el, { visibility: "visible" });
  };

  /* Avatar column — slides in from the left */
  tl.call(show, ["#hero-avatar-col"])
    .fromTo(
      "#hero-avatar-col",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.9 }
    )

    /* Greeting tag — fades in from slightly above */
    .call(show, ["#hero-greeting"], "<+0.3")
    .fromTo(
      "#hero-greeting",
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.5 },
      "<"
    )

    /* Name — slides in from the right with slight stagger */
    .call(show, ["#hero-name"], "<+0.15")
    .fromTo(
      "#hero-name",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.65 },
      "<"
    )

    /* Typewriter row */
    .call(show, ["#hero-typewriter"], "<+0.2")
    .fromTo(
      "#hero-typewriter",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45 },
      "<"
    )

    /* Bio */
    .call(show, ["#hero-bio"], "<+0.2")
    .fromTo(
      "#hero-bio",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.55 },
      "<"
    )

    /* Skills grid — stagger each chip */
    .call(show, ["#hero-skills"], "<+0.2")
    .fromTo(
      "#hero-skills",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 },
      "<"
    )
    .fromTo(
      "#hero-skills .skill-chip",
      { opacity: 0, scale: 0.8, y: 6 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "back.out(1.4)",
      },
      "<+0.1"
    )

    /* CTA buttons */
    .call(show, ["#hero-cta"], "<+0.1")
    .fromTo(
      "#hero-cta",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      "<"
    );

  return tl;
}
