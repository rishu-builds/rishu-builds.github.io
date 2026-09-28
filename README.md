# ⚡ Developer Portfolio — Rishabh Yadav

<div align="center">

[![Live Production Site](https://img.shields.io/badge/Live_Site-rishu--builds.github.io-00f0ff?style=for-the-badge&logo=googlechrome&logoColor=black)](https://rishu-builds.github.io/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-Canvas-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  <b>An interactive personal developer portfolio built with Three.js (WebGL), responsive layouts, smooth scroll animations, and live project showcases.</b>
</p>

[**🌐 Explore Live Portfolio**](https://rishu-builds.github.io/) &nbsp;•&nbsp; 
[**📄 View Resume**](https://rishu-builds.github.io/assets/resume.pdf) &nbsp;•&nbsp; 
[**💼 LinkedIn**](https://www.linkedin.com/in/rishabh-yadav777) &nbsp;•&nbsp; 
[**📫 Contact Developer**](mailto:ysrishabh017@gmail.com)

</div>

---

## 🌟 Overview

This repository hosts the official personal developer portfolio of **Rishabh Yadav** (BCA Undergrad at Dr. Ram Manohar Lohia Avadh University). 

Features interactive WebGL particle effects, smooth scroll reveals, and direct access to 4 live production projects.

### 🎮 Live Demo: [https://rishu-builds.github.io/](https://rishu-builds.github.io/)

---

## ✨ Key Features

### 1. 🖥️ Interactive WebGL Background (`three-scene.js`)
* **Custom Three.js Scene**: Lightweight canvas background without external heavy 3D assets.
* **Scene Lighting**: Dynamic multi-point lighting featuring cyan, magenta, and purple tones.
* **Inertial Mouse Parallax**: Smooth camera tracking with lerp interpolation for fluid depth perception.
* **Particle Starfield**: Floating stardust nodes with subtle ambient drift animations.
* **Responsive Viewport**: Automatically handles window resizing and device pixel ratios.

### 2. 🚀 Project Showcase
Direct live interactive links and repository code for 4 full-stack projects:

| Project | Domain | Tech Stack | Live Demo | Repository |
| :--- | :--- | :--- | :--- | :--- |
| **🛍️ Rishu Shop** | Full-Stack E-Commerce | Vanilla JS, PHP, MySQL, SQLite | [Live Storefront](https://rishu-builds.github.io/rishu-shop-ecommerce/) | [GitHub](https://github.com/rishu-builds/rishu-shop-ecommerce) |
| **🎙️ VoiceAI** | GenAI Placement Coach | Python, Streamlit, Google Gemini 2.0 | [Live App](https://rishu-voice-ai.streamlit.app/) | [GitHub](https://github.com/rishu-builds/voice-ai-mock-interviewer) |
| **⚔️ Key-Jutsu** | Action Typing Game | HTML5 Canvas, Web Audio, JS | [Play Online](https://keyjutsu-game.vercel.app/play.html) | [GitHub](https://github.com/rishu-builds/rishu-key-jutsu) |
| **🤖 WhatsApp AI Bot** | Assistant & Lead Bot | Node.js, Gemini AI, Meta Cloud API | — | [GitHub](https://github.com/rishu-builds/rishabh-whatsapp-bot) |

### 3. 🎨 Clean Architecture & Performance
* **Zero Build Steps**: Pure vanilla ES6+, semantic HTML5 markup, and modern CSS3 variables (`:root`).
* **Fast Load Times**: Sub-second load times hosted on GitHub Pages CDN.
* **IntersectionObserver**: Smooth scroll reveal transitions for cards and sections.
* **Scroll Progress Bar**: Indicator bar synced to viewport scroll depth.

---

## 📂 Project Structure

```bash
rishabh-3d-portfolio/
│
├── index.html          # Clean semantic markup with accessible navigation & meta tags
├── style.css           # Modern dark design system, CSS variables & media queries
├── app.js              # DOM controller: scroll progress, sticky nav, filtering & reveals
├── three-scene.js      # Three.js WebGL particle and perspective canvas
│
├── assets/             # Visual assets
│   ├── profile.jpg     # High-resolution developer headshot
│   ├── resume.pdf      # Downloadable software developer resume
│   ├── preview_shop.jpg
│   ├── preview_voiceai.jpg
│   ├── preview_keyjutsu.jpg
│   └── preview_whatsapp.jpg
│
├── .gitignore          # Git configuration
├── LICENSE             # MIT License
└── README.md           # Project documentation
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
