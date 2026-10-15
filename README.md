# The Pultec Trick

A short, interactive web module explaining why the Pultec EQP-1A behaves unlike other EQs — comparing it to a Neve 1073 and a generic EQ, and demonstrating the famous "Pultec trick" (boosting and cutting the same low frequency at once).

## Run it

Open **`index.html`** — that's the course (the entry point). On GitHub Pages it loads at the site's root URL.

Needs an internet connection (the Figtree webfont loads from Google Fonts). Follows the viewer's light/dark system setting automatically.

**Audio:** press the **▶** button (on the cover, and under each unit) to play a short looping clip through the EQ. The loop keeps playing as you move between screens and is shaped live by whichever unit is on screen — only Pause stops it. It's optional; the module works fully with the sound off. Audio needs to be served over `http(s)` (e.g. GitHub Pages or a local server) — opening the files directly from `file://` works in Safari but is blocked in some browsers.

## Files

| File | What it is |
|------|------------|
| `index.html` | The course — 9 screens with Back/Next navigation (this is the entry point); also owns the shared audio player |
| `pultec.html` | Standalone interactive **Pultec EQP-1A** faceplate + response curve |
| `neve.html` | Standalone interactive **Neve 1073** EQ section faceplate + curve |
| `demo.html` | Standalone generic one-band EQ "unit" (bell + high-pass / high-shelf) |
| `logo.js` | Shared animated waveform logo injected into the standalone pages |
| `eqp-1a-curves.jpg` | Scan of the original EQP-1A manual response curves |
| `EQloop.m4a` | The looping audio clip played through the EQ — original recording by the author, who owns all rights |

The course embeds `pultec.html`, `neve.html`, and `demo.html` in iframes, so each unit is a single source of truth. Each embedded unit reports its EQ settings to the course's audio engine via `postMessage`.

## Hosting on GitHub Pages

Push this folder to a repo and enable Pages (Settings → Pages → deploy from branch). The module is fully portable: all paths are relative and the iframes are same-origin.
