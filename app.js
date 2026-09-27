// Portfolio main application logic
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  const sections = document.querySelectorAll('section[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Scroll handler: progress bar, sticky header & back-to-top visibility
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && docHeight > 0) {
      progressBar.style.width = `${Math.min((scrollY / docHeight) * 100, 100)}%`;
    }

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 400);
    }

    // Update active nav link
    const offset = scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (offset >= top && offset < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, { passive: true });

  // Smooth scroll back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking any nav link on mobile
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Hero subtitle typewriter effect
  const typedEl = document.getElementById('hero-typed-text');
  if (typedEl) {
    const titles = [
      'Full-Stack Developer',
      'AI Systems Builder',
      '60 FPS Game Engineer',
      'Web App Architect'
    ];
    let titleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const full = titles[titleIdx];
      typedEl.textContent = deleting
        ? full.substring(0, charIdx--)
        : full.substring(0, charIdx++);

      let delay = deleting ? 35 : 70;

      if (!deleting && charIdx === full.length + 1) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    };
    tick();
  }

  // Scroll reveal observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -15px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Animated metric counters on scroll
  const metricItems = document.querySelectorAll('.metric-item');
  if ('IntersectionObserver' in window && metricItems.length > 0) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector('.metric-number');
          if (numEl && !numEl.dataset.counted) {
            numEl.dataset.counted = 'true';
            animateCount(numEl);
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    metricItems.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const raw = el.textContent.trim();
    if (raw.includes('4')) {
      runCounter(el, 0, 4, 1000, (v) => `${v}<span class="plus">+</span>`);
    } else if (raw.includes('60')) {
      runCounter(el, 0, 60, 1100, (v) => `${v}<span class="plus">FPS</span>`);
    } else if (raw.includes('1.2')) {
      runDecCounter(el, 0.1, 1.2, 1100, (v) => `${v}<span class="plus">K+</span>`);
    } else if (raw.includes('2027')) {
      runCounter(el, 2010, 2027, 1000, (v) => `${v}`);
    }
  }

  function runCounter(el, start, end, duration, formatFn) {
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(start + (end - start) * ease);
      el.innerHTML = formatFn(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function runDecCounter(el, start, end, duration, formatFn) {
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = (start + (end - start) * ease).toFixed(1);
      el.innerHTML = formatFn(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Projects filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.category || '';
        const match = filter === 'all' || cat.includes(filter);
        card.style.display = match ? 'flex' : 'none';
      });
    });
  });

  // Global clipboard copy helper
  window.copyText = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard`);
    }).catch(() => {
      showToast('Failed to copy');
    });
  };
});

// Toast notification helper
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
