// Shared module branding: injects the compact waveform logo (left) with a
// trailing line into the top of the page, no title. Skips itself when embedded
// in the course (iframe), so the course's own masthead isn't duplicated.
(function () {
  if (window.self !== window.top) return;

  var NS = "http://www.w3.org/2000/svg";
  var css = [
    ":root{--c-red:#e24b3f;--c-orange:#f08a3c;--c-yellow:#eccf3f;--c-green:#5cb85a;--c-teal:#3fb2a6;--c-blue:#4a90d9;--c-purple:#8e5aa8;}",
    ".pd-masthead{display:flex;align-items:center;gap:0;width:100%;max-width:860px;margin:6px auto 2px;padding:0 14px;box-sizing:border-box;}",
    ".pd-masthead .pd-logomark{width:80px;height:42px;flex:none;margin-left:12px;}",
    ".pd-masthead .pd-tail{flex:1;height:42px;min-width:0;}",
    ".pd-masthead svg path{fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;transform-box:fill-box;transform-origin:center;animation:pd-pulse 4s ease-in-out infinite;}",
    ".pd-masthead .pd-logomark path:nth-child(1){animation-delay:0s}.pd-masthead .pd-logomark path:nth-child(2){animation-delay:.18s}.pd-masthead .pd-logomark path:nth-child(3){animation-delay:.36s}.pd-masthead .pd-logomark path:nth-child(4){animation-delay:.54s}.pd-masthead .pd-logomark path:nth-child(5){animation-delay:.72s}.pd-masthead .pd-logomark path:nth-child(6){animation-delay:.9s}",
    "@keyframes pd-pulse{0%,100%{transform:scaleY(.82)}50%{transform:scaleY(1.12)}}",
    "@media (prefers-reduced-motion:reduce){.pd-masthead svg path{animation:none}}"
  ].join("");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // Compact logomark (centred cluster with short tails)
  var markPaths = [
    ["M0 22 L18 22 C 25 22, 28 2, 33 2 C 38 2, 41 30, 46 30 C 51 30, 55 22, 84 22", "--c-red"],
    ["M0 22 L18 22 C 25 22, 28 5, 33 5 C 38 5, 41 29, 46 29 C 51 29, 55 22, 84 22", "--c-orange"],
    ["M0 22 L18 22 C 25 22, 28 8, 33 8 C 38 8, 41 28, 46 28 C 51 28, 55 22, 84 22", "--c-yellow"],
    ["M0 22 L18 22 C 25 22, 28 11, 33 11 C 38 11, 41 26, 46 26 C 51 26, 55 22, 84 22", "--c-green"],
    ["M0 22 L18 22 C 25 22, 28 14, 33 14 C 38 14, 41 25, 46 25 C 51 25, 55 22, 84 22", "--c-teal"],
    ["M0 22 L18 22 C 25 22, 28 16, 33 16 C 38 16, 41 24, 46 24 C 51 24, 55 22, 84 22", "--c-blue"]
  ];
  var mark = document.createElementNS(NS, "svg");
  mark.setAttribute("class", "pd-logomark"); mark.setAttribute("viewBox", "0 -7 84 58"); mark.setAttribute("preserveAspectRatio", "none");
  markPaths.forEach(function (a) { var p = document.createElementNS(NS, "path"); p.setAttribute("d", a[0]); p.setAttribute("stroke", "var(" + a[1] + ")"); p.setAttribute("vector-effect", "non-scaling-stroke"); mark.appendChild(p); });

  // Trailing tight line to the right
  var tail = document.createElementNS(NS, "svg");
  tail.setAttribute("class", "pd-tail"); tail.setAttribute("viewBox", "0 -7 200 58"); tail.setAttribute("preserveAspectRatio", "none");
  var colors = ["#e24b3f", "#f08a3c", "#eccf3f", "#5cb85a", "#3fb2a6", "#4a90d9"];
  var amps = [3, 2.4, 1.9, 2.6, 2.1, 1.6], phases = [0, 1.1, 2.2, 3.1, 4.3, 5.2], delays = [0, .18, .36, .54, .72, .9];
  colors.forEach(function (col, i) {
    var d = "";
    for (var x = 0; x <= 200; x += 4) { var r = Math.min(1, x / 36); var y = 22 + amps[i] * r * Math.sin((x / 110) * 2 * Math.PI + phases[i]); d += (x === 0 ? "M" : " L") + x + " " + y.toFixed(1); }
    var p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("stroke", col); p.setAttribute("vector-effect", "non-scaling-stroke"); p.style.animationDelay = delays[i] + "s"; tail.appendChild(p);
  });

  var head = document.createElement("div"); head.className = "pd-masthead";
  head.appendChild(mark); head.appendChild(tail);
  document.body.insertBefore(head, document.body.firstChild);
})();
