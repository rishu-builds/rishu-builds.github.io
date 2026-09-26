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

  // Navbar & Scroll Progress Tracking
  const navbar = document.querySelector('.navbar');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 1. Scroll Progress
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Navbar Background
    if (scrollTop > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 3. Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    highlightActiveNavLink();
  }, { passive: true });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      AudioSynth.playClick();
    });
  }

  // Highlight active nav link based on scroll position
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 140;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop;
      const sectionId = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  }

  // Hero Dynamic Typing Animation
  function initHeroTyping() {
    const el = document.getElementById('hero-typed-text');
    if (!el) return;

    const roles = [
      'Full-Stack Web Architect',
      'Multimodal GenAI Developer',
      '60 FPS Canvas Game Engineer',
      'Production Systems Builder'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = roles[roleIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 38 : 75;

      if (!isDeleting && charIndex === current.length) {
        speed = 2200; // Pause on completed phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500; // Pause before typing next
      }

      setTimeout(type, speed);
    }
    type();
  }
  initHeroTyping();

  // Scroll Reveal Observer
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }
  initScrollReveals();

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
