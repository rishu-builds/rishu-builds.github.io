// Interactive terminal emulator
(function() {
  const input = document.getElementById('terminal-input');
  const historyContainer = document.getElementById('terminal-history');
  const quickBadges = document.querySelectorAll('.cmd-badge');

  if (!input || !historyContainer) return;

  const commandHistory = [];
  let historyPointer = -1;

  const commands = {
    help: 'List all available terminal commands',
    about: 'Display developer background, degree & specialization',
    skills: 'View technical skills, languages & tools with proficiency',
    projects: 'View 4 production builds with live URLs & GitHub repositories',
    resume: 'Download Rishabh Yadav\'s Resume (PDF)',
    contact: 'Get direct email, phone, and professional LinkedIn profile',
    clear: 'Clear the terminal output',
    matrix: 'Show streaming matrix hex cascade',
    hire: 'Send direct internship / full-time software engineering inquiry'
  };

  const appendOutput = (html) => {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = html;
    historyContainer.appendChild(line);

    const body = document.querySelector('.terminal-body');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  };

  const escapeHtml = (text) => {
    return text.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  };

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Print command entered by user
    appendOutput(`
      <span class="prompt-user">guest@rishabh-dev</span>:<span class="prompt-path">~</span>$ 
      <span style="color: #fff; font-weight: 600;">${escapeHtml(trimmed)}</span>
    `);

    commandHistory.push(trimmed);
    historyPointer = commandHistory.length;

    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case 'help': {
        let out = '<div style="color: #38bdf8; margin: 4px 0 8px;">Available Commands:</div>';
        for (const [name, desc] of Object.entries(commands)) {
          out += `<div><span style="color: #00f0ff; font-weight: 600; width: 85px; display: inline-block;">${name}</span> — <span style="color: #94a3b8;">${desc}</span></div>`;
        }
        out += '<div style="color: #64748b; margin-top: 8px;">Tip: Click any quick command chip below or press [TAB] to auto-complete.</div>';
        appendOutput(out);
        break;
      }

      case 'about':
      case 'whoami': {
        appendOutput(`
          <div style="background: rgba(0, 240, 255, 0.05); padding: 12px; border-left: 3px solid #00f0ff; border-radius: 4px; margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: 700; font-size: 15px;">Rishabh Yadav</div>
            <div style="color: #e2e8f0; margin: 3px 0;">Full-Stack Web Developer & AI Solutions Builder</div>
            <div style="color: #94a3b8; font-size: 13px;">🎓 Bachelor of Computer Applications (BCA) — 5th Semester</div>
            <div style="color: #94a3b8; font-size: 13px;">🏛️ Dr. Ram Manohar Lohia Avadh University, Ayodhya (Batch 2024–2027)</div>
            <div style="color: #94a3b8; font-size: 13px;">📍 Location: Noida / Delhi NCR / Remote</div>
            <div style="color: #cbd5e1; margin-top: 8px;">Building responsive web apps, multimodal Gemini AI integrations, and 60 FPS canvas graphics.</div>
          </div>
        `);
        break;
      }

      case 'skills': {
        appendOutput(`
          <div style="margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: 700; margin-bottom: 6px;">Technical Proficiency:</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">JavaScript (ES6+)</span> [██████████████████░] 92% (React, Canvas, DOM)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">Python</span> [█████████████████░░] 88% (Streamlit, Gemini API, AI)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">PHP & MySQL</span> [████████████████░░░] 85% (PDO, Relational Schema, Auth)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">HTML5 & CSS3</span> [███████████████████] 96% (Flexbox, Grid, Canvas 2D)</div>
            <div><span style="color: #38bdf8; width: 140px; display: inline-block;">DevOps & Tools</span> [████████████████░░░] 84% (Git, GitHub, Docker, Vercel)</div>
          </div>
        `);
        break;
      }

      case 'projects': {
        appendOutput(`
          <div style="margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: 700; margin-bottom: 6px;">Verified Production Deployments:</div>
            <div style="margin-bottom: 8px;">
              🛍️ <b>Rishu Shop Storefront</b> (PHP / Vanilla JS / MySQL)<br/>
              <span style="color: #94a3b8;">Luxury streetwear platform with cart drawer & phone OTP auth.</span><br/>
              🔗 <a href="https://rishu-builds.github.io/rishu-shop-ecommerce/" target="_blank" style="color: #00f0ff;">Live Storefront ↗</a> &bull; 
              <a href="https://github.com/rishu-builds/rishu-shop-ecommerce" target="_blank" style="color: #38bdf8;">GitHub ↗</a>
            </div>
            <div style="margin-bottom: 8px;">
              🎙️ <b>VoiceAI Mock Interviewer</b> (Python / Gemini 2.0 Flash / Streamlit)<br/>
              <span style="color: #94a3b8;">Voice-to-voice interview coach with speech cadence & PDF report.</span><br/>
              🔗 <a href="https://rishu-voice-ai.streamlit.app/" target="_blank" style="color: #00f0ff;">Live Web App ↗</a> &bull; 
              <a href="https://github.com/rishu-builds/voice-ai-mock-interviewer" target="_blank" style="color: #38bdf8;">GitHub ↗</a>
            </div>
            <div style="margin-bottom: 8px;">
              ⚔️ <b>Key-Jutsu Combat Game</b> (HTML5 Canvas 60 FPS / Web Audio)<br/>
              <span style="color: #94a3b8;">Martial arts typing combat game with 100 levels & 11 arenas.</span><br/>
              🔗 <a href="https://keyjutsu-game.vercel.app/play.html" target="_blank" style="color: #00f0ff;">Play in Browser ↗</a> &bull; 
              <a href="https://github.com/rishu-builds/rishu-key-jutsu" target="_blank" style="color: #38bdf8;">GitHub ↗</a>
            </div>
            <div>
              🤖 <b>WhatsApp AI CRM Bot</b> (Meta Cloud API / Gemini Multimodal)<br/>
              <span style="color: #94a3b8;">24/7 automated inquiry resolution and lead capture CRM engine.</span><br/>
              🔗 <a href="https://github.com/rishu-builds/rishabh-whatsapp-bot" target="_blank" style="color: #38bdf8;">GitHub Repository ↗</a>
            </div>
          </div>
        `);
        break;
      }

      case 'resume': {
        appendOutput('<div style="color: #10b981;">📄 Fetching Rishabh Yadav\'s Resume PDF...</div>');
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf';
        link.download = 'Rishabh_Yadav_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        appendOutput('<div style="color: #34d399;">✓ Resume download initiated.</div>');
        break;
      }

      case 'contact': {
        appendOutput(`
          <div style="margin: 6px 0;">
            <div style="color: #00f0ff; font-weight: 700; margin-bottom: 6px;">Direct Contact:</div>
            <div>✉️ <b>Email:</b> <a href="mailto:ysrishabh017@gmail.com" style="color: #38bdf8;">ysrishabh017@gmail.com</a></div>
            <div>💼 <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/rishabh-yadav777/" target="_blank" style="color: #00f0ff;">linkedin.com/in/rishabh-yadav777</a></div>
            <div>💻 <b>GitHub:</b> <a href="https://github.com/rishu-builds" target="_blank" style="color: #38bdf8;">github.com/rishu-builds</a></div>
            <div>📱 <b>Phone / WhatsApp:</b> <span style="color: #e2e8f0;">+91 7607718791</span></div>
          </div>
        `);
        break;
      }

      case 'hire':
      case 'hire-me': {
        appendOutput(`
          <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 6px; padding: 12px; margin: 8px 0; color: #34d399;">
            <div style="font-size: 15px; font-weight: 700;">Let's connect!</div>
            <div style="color: #e2e8f0; margin: 4px 0;">Opening default mail client with pre-filled subject...</div>
          </div>
        `);
        setTimeout(() => {
          window.location.href = 'mailto:ysrishabh017@gmail.com?subject=Software%20Developer%20Opportunity%20-%20Interview%20Invitation&body=Hi%20Rishabh,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20projects%20and%20would%20like%20to%20discuss%20an%20opportunity...';
        }, 800);
        break;
      }

      case 'matrix': {
        appendOutput('<div style="color: #10b981; font-family: monospace;">[+] INITIATING MATRIX STREAM...</div>');
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            const hex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(' ');
            appendOutput(`<div style="color: rgba(0, 240, 255, 0.7); font-size: 11px;">0x${hex}</div>`);
          }, i * 180);
        }
        break;
      }

      case 'clear': {
        historyContainer.innerHTML = '';
        break;
      }

      default: {
        appendOutput(`
          <div style="color: #ef4444;">command not found: <span style="color: #fff;">${escapeHtml(cmd)}</span>. Type <span style="color: #00f0ff;">help</span> for commands.</div>
        `);
        break;
      }
    }
  };

  // Keyboard controls: Enter, Up/Down history, Tab completion
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyPointer > 0) {
        historyPointer--;
        input.value = commandHistory[historyPointer];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer < commandHistory.length - 1) {
        historyPointer++;
        input.value = commandHistory[historyPointer];
      } else {
        historyPointer = commandHistory.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      if (current) {
        const match = Object.keys(commands).find(c => c.startsWith(current));
        if (match) input.value = match;
      }
    }
  });

  // Quick run chips
  quickBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const cmd = badge.dataset.cmd;
      if (cmd) {
        input.value = cmd;
        runCommand(cmd);
        input.focus();
      }
    });
  });

  // Global launcher for hero/action buttons
  window.launchTerminalCommand = function(cmd) {
    const terminalSection = document.getElementById('terminal');
    if (terminalSection) {
      terminalSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      input.value = cmd;
      runCommand(cmd);
      input.focus();
    }, 500);
  };
})();
