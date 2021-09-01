![Card 2 Phone banner](assets/banner.jpeg)

# Card 2 Phone

**Archived · learning project.** No demo. Experimented with the Device Motion / acceleration API on the phone to simulate items (e.g. a coin) flowing and bouncing on the screen. Didn’t ship; kept for reference.

---

Card to Phone was a mobile app for magic tricks: something would appear on the screen out of nowhere, and the magician could “pull it out” in real life. I bought it, then it got taken down or disappeared. After learning webdev the idea felt simple enough to try myself—tilt the phone, use accelerometer data, move things on screen. This repo is that attempt. PWA shell, one coin asset, physics-ish motion. For learning purposes; maybe I’ll do a proper version later.

## Tech

- Vanilla JS, HTML, CSS
- **Device Motion API** (`devicemotion`, `accelerationIncludingGravity`) for tilt-based movement
- Simple physics: velocity, collision with screen edges, rotation from wall hits
- PWA (manifest, standalone display)

## Run

Open `index.html` in a browser. For real accelerometer data use a phone or a browser that supports Device Motion (often requires HTTPS or localhost). No build step.
