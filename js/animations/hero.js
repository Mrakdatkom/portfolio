// hero.js
import { gsap } from "../../vendor/gsap/index.js";

const ROLES = [
  "Full-Stack Development",
  "UI/UX Design & Styling",
  "Database Management",
  "System Analysis",
  "Web Development",
  "AI & Emerging Tech",
  "Office Productivity",
  "Professional Communication",
  "Networking",
];

const STREAM_LINES = [
  `<span class="text-pink-400">import</span> <span class="text-white">{ createApp }</span> <span class="text-pink-400">from</span> <span class="text-emerald-400">"vue"</span><span class="text-gray-500">;</span>`,
  `<span class="text-purple-400">const </span><span class="text-blue-400">server</span><span class="text-gray-500"> = </span><span class="text-blue-400">express</span><span class="text-gray-500">();</span>`,
  `<span class="text-gray-600 italic">// initializing portfolio modules...</span>`,
  `<span class="text-white">Route</span><span class="text-gray-500">::</span><span class="text-blue-400">get</span><span class="text-gray-500">(</span><span class="text-emerald-400">"/api/skills"</span><span class="text-gray-500">, [</span><span class="text-white">SkillController</span><span class="text-gray-500">::class,</span><span class="text-emerald-400">"index"</span><span class="text-gray-500">]);</span>`,
  `<span class="text-purple-400">await </span><span class="text-white">db</span><span class="text-gray-500">.</span><span class="text-blue-400">connect</span><span class="text-gray-500">({ host: </span><span class="text-emerald-400">"localhost"</span><span class="text-gray-500"> });</span>`,
  `<span class="text-gray-600 italic">// loading skill tree...</span>`,
  `<span class="text-purple-400">const </span><span class="text-white">stack</span><span class="text-gray-500"> = [</span><span class="text-emerald-400">"Laravel"</span><span class="text-gray-500">, </span><span class="text-emerald-400">"React"</span><span class="text-gray-500">, </span><span class="text-emerald-400">"Tailwind"</span><span class="text-gray-500">];</span>`,
  `<span class="text-blue-400">gsap</span><span class="text-gray-500">.</span><span class="text-blue-400">timeline</span><span class="text-gray-500">({ ease: </span><span class="text-emerald-400">"power3.out"</span><span class="text-gray-500"> });</span>`,
  `<span class="text-gray-600 italic">// compiling styles...</span>`,
  `<span class="text-white">@apply </span><span class="text-blue-400">flex items-center gap-4</span><span class="text-gray-500">;</span>`,
  `<span class="text-purple-400">export default </span><span class="text-purple-400">function </span><span class="text-blue-400">Handler</span><span class="text-gray-500">(</span><span class="text-white">req</span><span class="text-gray-500">, </span><span class="text-white">res</span><span class="text-gray-500">) {</span>`,
  `<span class="text-white">  res</span><span class="text-gray-500">.</span><span class="text-blue-400">json</span><span class="text-gray-500">({ status: </span><span class="text-emerald-400">"ok"</span><span class="text-gray-500">, available: </span><span class="text-amber-400">true</span><span class="text-gray-500"> });</span>`,
  `<span class="text-gray-500">}</span>`,
  `<span class="text-gray-600 italic">// migrating database...</span>`,
  `<span class="text-white">Schema</span><span class="text-gray-500">::</span><span class="text-blue-400">create</span><span class="text-gray-500">(</span><span class="text-emerald-400">"projects"</span><span class="text-gray-500">, </span><span class="text-purple-400">function</span><span class="text-gray-500">(</span><span class="text-white">Blueprint $table</span><span class="text-gray-500">) {</span>`,
  `<span class="text-white">  $table</span><span class="text-gray-500">-></span><span class="text-blue-400">id</span><span class="text-gray-500">();</span>`,
  `<span class="text-white">  $table</span><span class="text-gray-500">-></span><span class="text-blue-400">string</span><span class="text-gray-500">(</span><span class="text-emerald-400">"title"</span><span class="text-gray-500">);</span>`,
  `<span class="text-gray-500">});</span>`,
  `<span class="text-gray-600 italic">// build complete. serving at :5173</span>`,
  `<span class="text-blue-400">ScrollSmoother</span><span class="text-gray-500">.</span><span class="text-blue-400">create</span><span class="text-gray-500">({ smooth: </span><span class="text-amber-400">2</span><span class="text-gray-500">, effects: </span><span class="text-amber-400">true</span><span class="text-gray-500"> });</span>`,
  `<span class="text-gray-600 italic">// ready.</span>`,
  `<span class="text-white">console</span><span class="text-gray-500">.</span><span class="text-blue-400">log</span><span class="text-gray-500">(</span><span class="text-emerald-400">"mark.ryan — portfolio v1.0"</span><span class="text-gray-500">);</span>`,
];

const TYPEWRITER_SPEED_MS = 80;
const ERASE_SPEED_MS = 40;
const PAUSE_AFTER_TYPE_MS = 2000;
const PAUSE_AFTER_ERASE_MS = 400;
const MAX_STREAM_LINES = 16;
const STREAM_INTERVAL_MS = 600;

/* ── Typewriter ─────────────────────────────────── */
function startCursorBlink() {
  const cursor = document.getElementById("typewriter-cursor");
  if (!cursor) return;
  gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
}

function runTypewriter(roleIndex = 0) {
  const output = document.getElementById("typewriter-output");
  if (!output) return;
  const role = ROLES[roleIndex % ROLES.length];
  const next = (roleIndex + 1) % ROLES.length;
  let text = "", charIdx = 0;

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

/* ── Code stream ────────────────────────────────── */
function startCodeStream() {
  const stream = document.getElementById("code-stream");
  if (!stream) return;
  let idx = 0;

  function addLine() {
    const div = document.createElement("div");
    div.className = "font-mono text-[11px] leading-[1.75] whitespace-nowrap opacity-0";
    div.innerHTML = STREAM_LINES[idx % STREAM_LINES.length];
    stream.appendChild(div);
    idx++;

    // Fade line in
    gsap.to(div, { opacity: 1, duration: 0.3, ease: "power1.out" });

    // Trim old lines
    while (stream.children.length > MAX_STREAM_LINES) {
      stream.removeChild(stream.firstChild);
    }
  }

  addLine();
  setInterval(addLine, STREAM_INTERVAL_MS);
}

/* ── Main entrance ──────────────────────────────── */
export function animateHero() {
  setTimeout(() => {
    const show = (el) => gsap.set(el, { visibility: "visible" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        startCursorBlink();
        runTypewriter(0);
        startCodeStream();
      }
    });

    // Code panel slides in first
    tl.fromTo("#hero-code-panel",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.9 }
    )

      // Greeting pill
      .call(show, ["#hero-greeting"], "<+0.2")
      .fromTo("#hero-greeting",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }, "<"
      )

      // Name
      .call(show, ["#hero-name"], "<+0.15")
      .fromTo("#hero-name",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.65 }, "<"
      )

      // Typewriter row
      .call(show, ["#hero-typewriter-wrapper"], "<+0.2")
      .fromTo("#hero-typewriter-wrapper",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45 }, "<"
      )

      // CTA
      .call(show, ["#hero-cta"], "<+0.2")
      .fromTo("#hero-cta",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }, "<"
      );

  }, 50);
}