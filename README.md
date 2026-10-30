# Dynamic Animated Login Form (TikTok Replicant)

Recreation of the animated login form showcased on TikTok ([@settigation](https://www.tiktok.com/@settigation/video/7677966945739623687)), featuring the **exact same color palette** and an **interactive dynamic 3D animation experience**.

---

## 🎨 Color Specifications (Pixel-Matched to Original)

| Element | Hex Code | RGB | Visual Role |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#c95b02` | `rgb(201, 91, 2)` | Vibrant warm amber/orange background |
| **Header & Labels** | `#012031` | `rgb(1, 32, 49)` | Deep midnight navy text for "Animated login form", "Welcome Back!", and labels |
| **Inputs Background** | `#ffffff` | `rgb(255, 255, 255)` | Clean white rounded inputs with soft border `rgba(1, 32, 49, 0.15)` |
| **Submit Button** | `#000000` | `rgb(0, 0, 0)` | Bold solid black button with white `#ffffff` text |
| **Disclaimer & Links** | `rgba(1, 32, 49, 0.72)` | — | Legal notice & report form link |
| **Success / Confetti** | `#10b981` | `rgb(16, 185, 129)` | Emerald celebration checkmark and confetti particles |

---

## ✨ Dynamic Features

1. **Stage Entrance & Form Push**:
   - The 3D animated character walks in from the left across the orange canvas.
   - He reaches the right side, turns around, places his hands on the login form, and physically pushes the form into the center of the viewport with realistic momentum.
   - He dusts his hands off, turns forward, crosses his arms, crosses one ankle, and leans against the card looking cool with his sunglasses!
2. **Seamless Interactive Hand-off**:
   - Right when the character finishes the push and leans against the form (at `5.4s`), the live HTML form activates over the exact coordinates.
3. **Live Reactive Character**:
   - **Email Focus**: Character reacts attentively, speech bubble: *"Ready when you are! Type your email 📬"*
   - **Password Focus**: Character respects user privacy, covers his eyes with a *"No Peeking! 🙈"* badge.
   - **Show Password Toggle**: Clicking the eye icon lets the character peek playfully: *"Peeking mode! 👀 Make sure nobody is watching!"*
   - **Validation & Error Handling**: Invalid submissions trigger physical shake animation (`@keyframes fieldShake`) and an error buzz.
   - **Celebration & Confetti**: Valid submissions trigger button spinner, checkmark, custom physics confetti particle explosion, and success fanfare!
4. **Web Audio API Sound Synthesizer**:
   - Synthesizes footsteps, sliding friction, settling thud, typing clicks, and victory fanfare without any external audio file dependencies.
   - Includes a floating **🔊 Sound: ON / OFF** toggle.
5. **Interactive Controls**:
   - **🔁 Replay Push**: Re-triggers the walk & push sequence from the beginning anytime.
   - **⏩ Skip Intro**: Instantly reveals the interactive form without waiting for the animation.

---

## 🚀 How to Run

### Method 1: Double-click `start.bat`
Double-click `start.bat` in Windows Explorer to launch the local web server and open your default browser automatically.

### Method 2: Command Line
```powershell
python -m http.server 8080
```
Then navigate to: [http://localhost:8080/index.html](http://localhost:8080/index.html)

