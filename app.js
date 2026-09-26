/**
 * ============================================================================
 * MAIN APPLICATION LOGIC & AUDIO SYNTHESIZER
 * ============================================================================
 */

// 1. Web Audio API Synthesizer (Zero asset dependency)
const AudioSynth = (function() {
  let ctx = null;
  let isMuted = localStorage.getItem('rishabh_audio_muted') === 'true';

  function getContext() {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) ctx = new AudioContext();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function playTone(freq, type, duration, gainVal = 0.08) {
    if (isMuted) return;
    try {
      const audioCtx = getContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  return {
    playHover: () => playTone(880, 'sine', 0.05, 0.03),
    playClick: () => playTone(540, 'triangle', 0.08, 0.05),
    playBlip: (f = 700) => playTone(f, 'sine', 0.07, 0.06),
    playSuccess: () => {
      if (isMuted) return;
      playTone(523.25, 'triangle', 0.15, 0.08); // C5
      setTimeout(() => playTone(659.25, 'triangle', 0.15, 0.08), 100); // E5
      setTimeout(() => playTone(783.99, 'triangle', 0.25, 0.08), 200); // G5
    },
    toggleMute: () => {
      isMuted = !isMuted;
      localStorage.setItem('rishabh_audio_muted', isMuted);
      return isMuted;
    },
    isMuted: () => isMuted
  };
})();

window.AudioSynth = AudioSynth;

// 2. DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Audio Mute Button
  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn) {
    function updateSoundIcon() {
      soundToggleBtn.innerHTML = AudioSynth.isMuted() ? '🔇' : '🔊';
      soundToggleBtn.title = AudioSynth.isMuted() ? 'Unmute SFX' : 'Mute SFX';
    }
    updateSoundIcon();

    soundToggleBtn.addEventListener('click', () => {
      const muted = AudioSynth.toggleMute();
      updateSoundIcon();
      showToast(muted ? 'Sound Effects Muted' : 'Sound Effects Enabled 🔊');
      if (!muted) AudioSynth.playSuccess();
    });
  }

  // Sound triggers on interactive elements
  document.querySelectorAll('a, button, .cmd-badge, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => AudioSynth.playHover(), { passive: true });
    el.addEventListener('click', () => AudioSynth.playClick(), { passive: true });
  });

  // Navbar Scroll Background
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  }, { passive: true });

  // Highlight active nav link based on scroll position
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop;
      const sectionId = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#090d16';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(0,240,255,0.2)';
      }
    });
  }

  // Projects Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'scaleIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Copy to Clipboard Helpers
  window.copyText = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
      AudioSynth.playSuccess();
    }).catch(() => {
      showToast(`Failed to copy`);
    });
  };
});

// Toast Manager
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
