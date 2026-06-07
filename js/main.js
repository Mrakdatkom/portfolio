/**
 * main.js
 * Orchestrates section loading and triggers GSAP animations.
 * Add new sections here as the portfolio grows.
 */

import { initAboutAnimation } from "./animations/about.js";
import { initCertificationsAnimation } from "./animations/certifications.js";
import { initContactAnimation } from "./animations/contact.js";
import { initEducationAnimation } from "./animations/education.js";
import { animateHero } from "./animations/hero.js";
import { initProfDevAnimation } from "./animations/profDev.js";
import { initSkillsMarquee } from "./animations/skills.js";
import { initWorkAnimation } from "./animations/work.js";

import gsap from "../vendor/gsap/index.js";
import { ScrollTrigger } from "../vendor/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "../vendor/gsap/ScrollSmoother.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


/* ── Section loader ───────────────────────────────────────────── */
async function loadSection(snippetPath, targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`[portfolio] Target element #${targetId} not found.`);
    return;
  }
  try {
    const res = await fetch(snippetPath);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${snippetPath}`);
    const html = await res.text();
    target.innerHTML = html;
  } catch (err) {
    console.error(`[portfolio] Could not load section "${snippetPath}":`, err);
  }
}

/* ── Bootstrap ────────────────────────────────────────────────── */
async function init() {
  // Load all sections in parallel
  await Promise.all([
    loadSection("sections/hero.html", "section-hero"),
    loadSection("sections/skills.html", "section-skills"),
    loadSection("sections/about.html", "section-about"),
    loadSection("sections/work.html", "section-work"),
    loadSection("sections/education.html", "section-education"),
    loadSection("sections/certifications.html", "section-certifications"),
    loadSection("sections/prof-dev.html", "section-prof-dev"),
    loadSection("sections/contact.html", "section-contact"),
  ]);

  // Teleport the cert modal to <body> so position:fixed isn't broken
  // by GSAP transforms on any ancestor inside #smooth-content
  const certModal = document.getElementById("cert-modal");
  if (certModal) document.body.appendChild(certModal);

  // Initialize ScrollSmoother AFTER content is loaded
  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
    touch: true,
    smoothTouch: 0.5,
  });

  gsap.set("#cert-modal", { clearProps: "all" });
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn && smoother) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoother.scrollTo('#hero', true, 'center center');
    });
  }

  const sectionMap = {
    'about-link': 'section-about',
    'work-experience-link': 'section-work',
    'education-link': 'section-education',
    'certifications-link': 'section-certifications',
    'profdev-link': 'section-prof-dev',
    'contact-link': 'section-contact',
    'hero-contact-btn': 'section-contact',
  };

  Object.entries(sectionMap).forEach(([buttonId, sectionId]) => {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        smoother.scrollTo(`#${sectionId}`, true, 'center center');
      });
    }
  });

  // Kick off animations now that DOM is ready
  animateHero();
  initSkillsMarquee();
  initAboutAnimation();
  initWorkAnimation();
  initEducationAnimation();
  initCertificationsAnimation();
  initProfDevAnimation();
  initContactAnimation();
}

document.addEventListener("DOMContentLoaded", init);