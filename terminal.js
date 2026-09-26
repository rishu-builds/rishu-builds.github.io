/**
 * ============================================================================
 * INTERACTIVE CYBER TERMINAL — CLI FOR RECRUITERS & ENGINEERS
 * Features:
 * - Real Command Interpreter (help, about, skills, projects, resume, hire, clear)
 * - Auto-Complete on [TAB] key
 * - Command History (Arrow Up / Arrow Down)
 * - Web Audio API synthesized key clicks & success fanfare
 * - Celebratory Confetti shower on "hire" command
 * ============================================================================
 */

(function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const quickBadges = document.querySelectorAll('.cmd-badge');

  if (!terminalInput || !terminalHistory) return;

  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: 'List all available terminal commands',
    about: 'Display developer background, degree & specialization',
    skills: 'View technical skills, languages & tools with proficiency',
    projects: 'View 4 production builds with live URLs & GitHub repositories',
    resume: 'Open and download Rishabh Yadav\'s 2026 Resume PDF',
    contact: 'Get direct email, phone, and professional LinkedIn profile',
    clear: 'Clear the terminal console buffer',
    matrix: 'Initiate visual cyberpunk matrix data cascade',
    hire: 'Send direct internship / full-time software engineering inquiry'
  };

  function appendLine(htmlContent) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = htmlContent;
    terminalHistory.appendChild(div);

    // Auto scroll to bottom
    const body = document.querySelector('.terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo input line
    appendLine(`
      <span class="prompt-user">guest@rishabh-dev</span>:<span class="prompt-path">~</span>$ 
      <span style="color: #fff; font-weight: 600;">${escapeHtml(rawCmd)}</span>
    `);

    // Add to history
    history.push(rawCmd);
    historyIndex = history.length;

    // Play terminal sound
    if (window.AudioSynth) window.AudioSynth.playBlip(600);

    // Command handling
    switch (cmd) {
      case 'help':
        let helpText = '<div style="color: #38bdf8; margin: 4px 0 8px;">Available Commands:</div>';
        for (const [key, desc] of Object.entries(COMMANDS)) {
          helpText += `<div><span style="color: #00f0ff; font-weight: bold; width: 90px; display: inline-block;">${key}</span> — <span style="color: #94a3b8;">${desc}</span></div>`;
        }
        helpText += '<div style="color: #64748b; margin-top: 8px;">Tip: Click any quick command chip below or press [TAB] to auto-complete.</div>';
        appendLine(helpText);
        break;

      case 'about':
      case 'whoami':
        appendLine(`
          <div style="background: rgba(0, 240, 255, 0.05); padding: 12px; border-left: 3px solid #00f0ff; border-radius: 4px; margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: bold; font-size: 15px;">Rishabh Yadav</div>
            <div style="color: #e2e8f0; margin: 4px 0;">Full-Stack Web Developer & AI Solutions Builder</div>
            <div style="color: #94a3b8; font-size: 13px;">🎓 Bachelor of Computer Applications (BCA) — 5th Semester</div>
            <div style="color: #94a3b8; font-size: 13px;">🏛️ Dr. Ram Manohar Lohia Avadh University, Ayodhya (Batch 2024–2027)</div>
            <div style="color: #94a3b8; font-size: 13px;">📍 Open to Opportunities: Noida • Delhi NCR • Bengaluru • Remote</div>
            <div style="color: #cbd5e1; margin-top: 8px;">Focusing on scalable backend systems (PHP/Python/Node), responsive web architectures, and multimodal AI automation.</div>
          </div>
        `);
        break;

      case 'skills':
        appendLine(`
          <div style="margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: bold; margin-bottom: 6px;">Technical Proficiency & Tooling:</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">JavaScript (ES6+)</span> [██████████████████░] 92% (React, Canvas, DOM)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">Python</span> [█████████████████░░] 88% (Streamlit, Gemini API, AI)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">PHP & MySQL</span> [████████████████░░░] 85% (PDO, Relational Schema, Auth)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">HTML5 & CSS3</span> [███████████████████] 96% (Tailwind, 3D Tilt, Grid)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">DevOps & Tools</span> [████████████████░░░] 84% (Git, GitHub, Docker, Vercel)</div>
          </div>
        `);
        break;

      case 'projects':
        appendLine(`
          <div style="margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: bold; margin-bottom: 6px;">Verified Production Deployments:</div>
            <div style="margin-bottom: 8px;">
              🛍️ <b>Rishu Shop Storefront</b> (PHP / Vanilla JS / MySQL)<br/>
              <span style="color: #94a3b8;">Luxury streetwear retail platform with real-time cart drawer & phone OTP auth.</span><br/>
              🔗 <a href="https://rishu-builds.github.io/rishu-shop-ecommerce/" target="_blank" style="color: #00f0ff;">Live Storefront ↗</a> &bull; 
              <a href="https://github.com/rishu-builds/rishu-shop-ecommerce" target="_blank" style="color: #38bdf8;">GitHub ↗</a>
            </div>
            <div style="margin-bottom: 8px;">
              🎙️ <b>VoiceAI Mock Interviewer</b> (Python / Gemini 2.0 Flash / Streamlit)<br/>
              <span style="color: #94a3b8;">Real-time voice-to-voice interview coach with WPM cadence & automated PDF report.</span><br/>
              🔗 <a href="https://rishu-voice-ai.streamlit.app/" target="_blank" style="color: #00f0ff;">Live Web App ↗</a> &bull; 
              <a href="https://github.com/rishu-builds/voice-ai-mock-interviewer" target="_blank" style="color: #38bdf8;">GitHub ↗</a>
            </div>
            <div style="margin-bottom: 8px;">
              ⚔️ <b>Key-Jutsu Combat Game</b> (HTML5 Canvas 60 FPS / Web Audio)<br/>
              <span style="color: #94a3b8;">Action martial arts touch-typing combat game with 100 levels & 11 arenas.</span><br/>
              🔗 <a href="https://keyjutsu-game.vercel.app/play.html" target="_blank" style="color: #00f0ff;">Play in Browser ↗</a> &bull; 
              <a href="https://github.com/rishu-builds/rishu-key-jutsu" target="_blank" style="color: #38bdf8;">GitHub ↗</a>
            </div>
            <div>
              🤖 <b>Enterprise WhatsApp AI CRM</b> (Meta Cloud API / Gemini Multimodal)<br/>
              <span style="color: #94a3b8;">24/7 automated inquiry resolution and lead capture CRM engine.</span><br/>
              🔗 <a href="https://github.com/rishu-builds/rishabh-whatsapp-bot" target="_blank" style="color: #38bdf8;">GitHub Repository ↗</a>
            </div>
          </div>
        `);
        break;

      case 'resume':
        appendLine('<div style="color: #10b981;">📄 Fetching Rishabh Yadav\'s 2026 Resume PDF...</div>');
        if (window.AudioSynth) window.AudioSynth.playSuccess();
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf';
        link.download = 'Rishabh_Yadav_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        appendLine('<div style="color: #34d399;">✓ Resume download initiated in new tab.</div>');
        break;

      case 'contact':
        appendLine(`
          <div style="margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: bold; margin-bottom: 6px;">Direct Contact Channels:</div>
            <div>✉️ <b>Email:</b> <a href="mailto:ysrishabh017@gmail.com" style="color: #38bdf8;">ysrishabh017@gmail.com</a></div>
            <div>💼 <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/rishabh-yadav777/" target="_blank" style="color: #00f0ff;">linkedin.com/in/rishabh-yadav777</a></div>
            <div>💻 <b>GitHub:</b> <a href="https://github.com/rishu-builds" target="_blank" style="color: #38bdf8;">github.com/rishu-builds</a></div>
            <div>📱 <b>Phone / WhatsApp:</b> <span style="color: #e2e8f0;">+91 7607718791</span></div>
          </div>
        `);
        break;

      case 'hire':
      case 'hire-me':
        appendLine(`
          <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 6px; padding: 14px; margin: 8px 0; color: #34d399;">
            <div style="font-size: 16px; font-weight: bold;">🎉 Outstanding Decision! Let's Build Something Exceptional.</div>
            <div style="color: #e2e8f0; margin: 6px 0;">Launching priority communication channel with Rishabh Yadav...</div>
            <div style="font-size: 12px; color: #94a3b8;">Email client opening with pre-configured candidate subject line.</div>
          </div>
        `);
        if (window.AudioSynth) window.AudioSynth.playSuccess();
        triggerConfetti();
        setTimeout(() => {
          window.location.href = 'mailto:ysrishabh017@gmail.com?subject=Software%20Developer%20Opportunity%20-%20Interview%20Invitation&body=Hi%20Rishabh,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20projects%20and%20would%20like%20to%20discuss%20an%20opportunity...';
        }, 1200);
        break;

      case 'clear':
        terminalHistory.innerHTML = '';
        break;

      case 'matrix':
        appendLine('<div style="color: #10b981; font-family: monospace;">[+] INITIATING MATRIX STREAM... ACCESS GRANTED.</div>');
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            const hex = Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join(' ');
            appendLine(`<div style="color: rgba(0, 240, 255, 0.7); font-size: 11px;">0x${hex}</div>`);
          }, i * 200);
        }
        break;

      default:
        appendLine(`
          <div style="color: #ef4444;">command not found: <span style="color: #fff;">${escapeHtml(cmd)}</span>. Type <span style="color: #00f0ff;">help</span> to see available commands.</div>
        `);
        break;
    }
  }

  // Confetti Animation Trigger
  function triggerConfetti() {
    const count = 60;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = '-10px';
      el.style.width = `${Math.random() * 8 + 6}px`;
      el.style.height = `${Math.random() * 14 + 8}px`;
      el.style.backgroundColor = ['#00f0ff', '#ff007f', '#8b5cf6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)];
      el.style.zIndex = '99999';
      el.style.pointerEvents = 'none';
      el.style.borderRadius = '2px';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.transition = `transform ${Math.random() * 2 + 1.5}s cubic-bezier(0.25, 1, 0.5, 1), top ${Math.random() * 2 + 1.5}s ease-in, opacity 0.5s ease-out 1.5s`;
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.top = '105vh';
        el.style.transform = `rotate(${Math.random() * 720}deg) translateX(${(Math.random() - 0.5) * 200}px)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 2500);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keyboard Event Listeners
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      if (current) {
        const match = Object.keys(COMMANDS).find(c => c.startsWith(current));
        if (match) terminalInput.value = match;
      }
    }
  });

  // Quick Command Chips
  quickBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const cmd = badge.dataset.cmd;
      if (cmd) {
        terminalInput.value = cmd;
        executeCommand(cmd);
        terminalInput.focus();
      }
    });
  });

  // Export helper globally so hero buttons can launch commands
  window.launchTerminalCommand = function(cmd) {
    const termSec = document.getElementById('terminal');
    if (termSec) termSec.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      terminalInput.value = cmd;
      executeCommand(cmd);
      terminalInput.focus();
    }, 600);
  };
})();
