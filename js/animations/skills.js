// js/animations/skills.js

import gsap from "../../vendor/gsap/index.js";

// --- The original working horizontalLoop (with spacing control) ---
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalProgress(1)
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    x: () => {
      let x = (gsap.getProperty(item, "x", "px") || 0) + (startX - items[0].offsetLeft);
      return x;
    }
  });

  for (i = 0; i < length; i++) {
    item = items[i];
    widths[i] = (config.paddingRight ? parseFloat(gsap.getProperty(item, "marginRight", "px")) + parseFloat(config.paddingRight) : item.offsetWidth);
    xPercents[i] = (parseFloat(gsap.getProperty(item, "x", "px")) / widths[i]) * 100;
  }

  totalWidth = widths.reduce((a, b) => a + b, 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + totalWidth;
    tl.to(item, {
      x: -distanceToLoop,
      duration: distanceToLoop / pixelsPerSecond,
      immediateRender: false
    }, 0)
      .fromTo(item, {
        x: totalWidth - distanceToLoop
      }, {
        x: -distanceToLoop,
        duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond)
      .add(() => {
        curIndex = (curIndex + 1) % length;
      }, distanceToLoop / pixelsPerSecond);
    times.push(distanceToLoop / pixelsPerSecond);
  }

  tl.totalDuration(times[times.length - 1]);
  if (config.repeat === -1) tl.repeat(-1);
  if (config.paused) tl.pause();
  return tl;
}

export function initSkillsMarquee() {
  const marqueeItems = gsap.utils.toArray(".marquee-item");
  if (!marqueeItems.length) {
    console.warn("No .marquee-item elements found");
    return;
  }

  // Get all images inside marquee items
  const images = marqueeItems.map(item => item.querySelector('img')).filter(img => img);

  // If there are images, wait for them to load
  if (images.length) {
    const loadPromises = images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
    });

    Promise.all(loadPromises).then(() => {
      startMarquee(marqueeItems);
    });
  } else {
    startMarquee(marqueeItems);
  }
}

function startMarquee(marqueeItems) {
  const marqueeTimeline = horizontalLoop(marqueeItems, {
    repeat: -1,
    paddingRight: 0,   // no extra spacing
    speed: 0.5,
  });

  const container = document.querySelector(".marquee-wrapper");
  if (container) {
    container.addEventListener("mouseenter", () => marqueeTimeline.pause());
    container.addEventListener("mouseleave", () => marqueeTimeline.play());
  }
}