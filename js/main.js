/**
 * main.js
 * Orchestrates section loading and triggers GSAP animations.
 * Add new sections here as the portfolio grows.
 */

import { initAboutAnimation } from "./animations/about.js";
import { initEducationAnimation } from "./animations/education.js";
import { animateHero } from "./animations/hero.js";
import { initSkillsMarquee } from "./animations/skills.js";
import { initWorkAnimation } from "./animations/work.js";

/* ── Section loader ───────────────────────────────────────────── */
/**
 * Fetches an HTML snippet and injects it into a target element.
 * @param {string} snippetPath  - Path to the .html file
 * @param {string} targetId     - ID of the container to inject into
 */
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

    // Future sections — uncomment and add as you build them:
    // loadSection("sections/projects.html", "section-projects"),
    // loadSection("sections/contact.html",  "section-contact"),
  ]);

  // Kick off animations now that DOM is ready
  animateHero();
  initSkillsMarquee();
  initAboutAnimation();
  initWorkAnimation();
  initEducationAnimation();
}

document.addEventListener("DOMContentLoaded", init);
