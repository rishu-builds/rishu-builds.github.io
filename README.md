# ⚡ 3D Interactive Cyberpunk Developer Portfolio — Rishabh Yadav

<div align="center">

[![Live Production Site](https://img.shields.io/badge/Live_Site-rishu--builds.github.io-00f0ff?style=for-the-badge&logo=googlechrome&logoColor=black)](https://rishu-builds.github.io/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-60_FPS-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  <b>An immersive, high-performance 3D developer portfolio engineered with Three.js (WebGL), atmospheric procedural lighting, smooth inertial parallax, and verified production project deployments.</b>
</p>

[**🌐 Explore Live Portfolio**](https://rishu-builds.github.io/) &nbsp;•&nbsp; 
[**📄 View Resume**](https://rishu-builds.github.io/assets/resume.pdf) &nbsp;•&nbsp; 
[**💼 LinkedIn**](https://www.linkedin.com/in/rishabh-yadav777) &nbsp;•&nbsp; 
[**📫 Contact Developer**](mailto:ysrishabh017@gmail.com)

</div>

---

## 🌟 Overview

This repository hosts the official personal developer portfolio of **Rishabh Yadav** (BCA Undergrad at Dr. Ram Manohar Lohia Avadh University). 

Built as an interactive **3D Cyberpunk Portfolio Station** — combining low-latency WebGL graphics, butter-smooth scroll reveals, and direct one-click access to 4 live production projects.

### 🎮 Live Demo: [https://rishu-builds.github.io/](https://rishu-builds.github.io/)

---

## ✨ Key Engineering Features

### 1. 🖥️ Interactive 3D Cyber Atmosphere (`three-scene.js`)
* **Custom WebGL Engine**: Built directly with Three.js without external bulky 3D assets (0 MB 3D asset overhead).
* **Multi-Point Lighting**: Cyberpunk lighting rig featuring Cyan key light, Magenta rim glow, and Indigo ambient fill.
* **Inertial Mouse Parallax**: Camera tracks cursor movement with smooth linear interpolation (`lerp` damping) for a fluid 3D depth perception.
* **Particle Starfield**: 850+ floating stardust nodes with organic cosmic drift physics.
* **Responsive Viewport**: Automatically recalibrates camera aspect ratio and renderer pixel ratio on window resize.

### 2. 🚀 Verified Production Builds Showcase
Direct live interactive links and repository code for 4 full-stack projects:

| Project | Domain | Tech Stack | Live Demo | Repository |
| :--- | :--- | :--- | :--- | :--- |
| **🛍️ Rishu Shop** | Full-Stack E-Commerce | Vanilla JS, PHP, MySQL, SQLite | [Live Storefront](https://rishu-builds.github.io/rishu-shop-ecommerce/) | [GitHub](https://github.com/rishu-builds/rishu-shop-ecommerce) |
| **🎙️ VoiceAI** | GenAI Placement Coach | Python, Streamlit, Google Gemini 2.0 | [Live App](https://rishu-voice-ai.streamlit.app/) | [GitHub](https://github.com/rishu-builds/voice-ai-mock-interviewer) |
| **⚔️ Key-Jutsu** | 60 FPS Combat Engine | HTML5 Canvas, Web Audio, JS | [Play Online](https://keyjutsu-game.vercel.app/play.html) | [GitHub](https://github.com/rishu-builds/rishu-key-jutsu) |
| **🤖 WhatsApp AI Bot** | Enterprise Multimodal CRM | Node.js, Gemini AI, Meta Cloud API | — | [GitHub](https://github.com/rishu-builds/rishabh-whatsapp-bot) |

### 3. 🎨 Human-Crafted Architecture & Performance
* **Zero Build Steps**: Pure vanilla ES6+, HTML5 semantic markup, and modern CSS3 variables (`:root`).
* **Instant Load Times**: Sub-second First Contentful Paint (FCP) hosted on GitHub Pages CDN.
* **IntersectionObserver**: Butter-smooth scroll reveal transitions for cards and sections.
* **Scroll Telemetry**: Gradient progress indicator bar synced to viewport scroll depth.

---

## 📂 Project Structure

```bash
rishabh-3d-portfolio/
│
├── index.html          # Clean semantic markup with accessible navigation & meta tags
├── style.css           # Glassmorphic cyberpunk design system, CSS variables & media queries
├── app.js              # DOM controller: scroll telemetry, sticky nav, filtering & reveals
├── three-scene.js      # Procedural Three.js 3D WebGL particle constellation & perspective engine
│
├── assets/             # Optimized visual assets
│   ├── profile.jpg     # High-resolution developer headshot
│   ├── resume.pdf      # Downloadable software developer resume
│   ├── preview_shop.jpg
│   ├── preview_voiceai.jpg
│   ├── preview_keyjutsu.jpg
│   └── preview_whatsapp.jpg
│
├── .gitignore          # Git configuration
├── LICENSE             # MIT License
└── README.md           # Comprehensive project documentation
```

---

## 🛠️ Tech Stack & Libraries

* **Core**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Modern Flexbox & Grid)
* **3D & Graphics**: Three.js (r128), WebGL
* **Typography**: Plus Jakarta Sans, Space Grotesk, JetBrains Mono
* **Deployment & Hosting**: GitHub Pages (Continuous Deployment from `main` branch)

---

## 🚀 Running Locally

No heavy Node modules or build steps required. You can run the portfolio locally using any static web server:

### Option 1: Python HTTP Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/rishu-builds/rishu-builds.github.io.git
cd rishu-builds.github.io

# Start local server
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Click **Go Live** on the bottom status bar (using the Live Server extension).

---

## 👨‍💻 About the Author

**Rishabh Yadav**  
*Full-Stack Web Architect & AI Systems Engineer*  
*BCA Undergrad (Batch 2024–2027) • Dr. Ram Manohar Lohia Avadh University*

* 🌐 **Portfolio**: [https://rishu-builds.github.io/](https://rishu-builds.github.io/)
* 💼 **LinkedIn**: [linkedin.com/in/rishabh-yadav777](https://www.linkedin.com/in/rishabh-yadav777)
* 💻 **GitHub**: [github.com/rishu-builds](https://github.com/rishu-builds)
* ✉️ **Email**: [ysrishabh017@gmail.com](mailto:ysrishabh017@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use and adapt for personal showcase inspiration.
