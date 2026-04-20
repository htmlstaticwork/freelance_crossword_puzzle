/* =====================================================
   CROSS PURPOSES — Main Script
   ===================================================== */

'use strict';

/* RTL Toggle */
(function () {
  const toggleBtn = document.getElementById('rtl-toggle');
  const drawerToggle = document.getElementById('drawer-rtl-toggle');

  if (!toggleBtn && !drawerToggle) return;

  const toggleRTL = () => {
    const isRTL = document.documentElement.dir === 'rtl';
    document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
    localStorage.setItem('rtl', !isRTL);
  };

  toggleBtn?.addEventListener('click', toggleRTL);
  drawerToggle?.addEventListener('click', toggleRTL);

  // Persistence
  if (localStorage.getItem('rtl') === 'true') {
    document.documentElement.dir = 'rtl';
  }
})();

/* Theme Toggle */
(function () {
  const themeBtn = document.getElementById('theme-toggle');
  const drawerThemeBtn = document.getElementById('drawer-theme-toggle');

  if (!themeBtn && !drawerThemeBtn) return;

  const updateIcon = (theme) => {
    const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    [themeBtn, drawerThemeBtn].forEach(btn => {
      if (btn) {
        const icon = btn.querySelector('i');
        if (icon) icon.className = `fas ${iconClass}`;
      }
    });
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  };

  themeBtn?.addEventListener('click', toggleTheme);
  drawerThemeBtn?.addEventListener('click', toggleTheme);

  // Initial Load
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

  if (initialTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  }
})();


// ── Navbar scroll effect ───────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Always show as scrolled (dark) — the site has a dark hero
  // but on initial load we still want it transparent-over-dark
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ── Active nav link highlight ──────────────────────
(function () {
  const sections = document.querySelectorAll('section[id], header[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
})();


// ── Mobile Drawer ──────────────────────────────────
(function () {
  const hamburger  = document.getElementById('hamburger');
  const drawer     = document.getElementById('mobile-drawer');
  const overlay    = document.getElementById('drawer-overlay');
  const closeBtn   = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links a, .drawer-btn');

  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
})();


// ── Smooth scroll for all anchor links ────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});


// ── Scroll Reveal ──────────────────────────────────
(function () {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters when the about section becomes visible
        if (entry.target.id === 'about') {
          startCounters();
        }
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
})();


// ── Animated Stat Counters ─────────────────────────
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  document.querySelectorAll('.astat-num').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800;
    const stepTime = 16;
    const steps = Math.ceil(duration / stepTime);
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      counter.textContent = current.toLocaleString();

      if (step >= steps) {
        clearInterval(timer);
        if (target === 100) {
          counter.textContent = '100%';
        } else {
          counter.textContent = target.toLocaleString() + '+';
        }
      }
    }, stepTime);
  });
}


// ── FAQ Accordion ──────────────────────────────────
(function () {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const answer  = item.querySelector('.faq-a');
      const isOpen  = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-a').style.maxHeight = '0';
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();


// ── Commission Form ────────────────────────────────
(function () {
  const form = document.getElementById('commission-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const origText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
    btn.disabled = true;
    btn.style.background = '#2e7d32';

    setTimeout(() => {
      btn.innerHTML = origText;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
})();


// ── Back to Top ────────────────────────────────────
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ══════════════════════════════════════════════════
// CROSSWORD MINI PUZZLE ENGINE
// ══════════════════════════════════════════════════

const puzzles = [
  {
    title: 'Puzzle 1: The Greeting',
    gridSize: 5,
    blackCells: [[1, 1], [1, 3], [3, 1], [3, 3]],
    clues: {
      across: ['1. Common greeting (5)', '4. Loud disturbance (5)', '5. Bread riser (5)'],
      down:   ['1. Bee\'s creation (5)', '2. Fill with joy (5)', '3. Memory aids (5)']
    },
    solution: [
      ['H','E','L','L','O'],
      ['O',' ','I',' ',' '],
      ['N','O','I','S','E'],
      ['E',' ','S',' ',' '],
      ['Y','E','A','S','T']
    ]
  },
  {
    title: 'Puzzle 2: Deep Space',
    gridSize: 5,
    blackCells: [[1, 1], [1, 3], [3, 1], [3, 3]],
    clues: {
      across: ['1. Night sky twinklers (5)', '3. Relating to the moon (5)', '5. Moon samples (5)'],
      down:   ['1. Relating to the sun (5)', '2. Small amount (5)', '3. Not dull (5)']
    },
    solution: [
      ['S','T','A','R','S'],
      ['O',' ','A',' ',' '],
      ['L','U','N','A','R'],
      ['A',' ','E',' ',' '],
      ['R','O','C','K','S']
    ]
  },
  {
    title: 'Puzzle 3: Green Thumb',
    gridSize: 5,
    blackCells: [[1, 1], [1, 3], [3, 1], [3, 3]],
    clues: {
      across: ['1. Garden inhabitant (5)', '3. Forbidden fruit? (5)', '5. Dental display (5)'],
      down:   ['1. Growth from seed (5)', '2. Metal mixture (5)', '3. Dental display (5)']
    },
    solution: [
      ['P','L','A','N','T'],
      ['L',' ','L',' ',' '],
      ['A','P','P','L','E'],
      ['N',' ','P',' ',' '],
      ['T','E','E','T','H']
    ]
  },
  {
    title: 'Puzzle 4: Digital World',
    gridSize: 5,
    blackCells: [[1, 1], [1, 3], [3, 1], [3, 3]],
    clues: {
      across: ['1. Computer pointer (5)', '3. Single numeric unit (5)', '5. Internet device (5)'],
      down:   ['1. Internet device (5)', '2. Way of doing (5)', '3. Keyboard key (5)']
    },
    solution: [
      ['M','O','U','S','E'],
      ['O',' ','S',' ',' '],
      ['D','I','G','I','T'],
      ['E',' ','R',' ',' '],
      ['M','O','D','E','M']
    ]
  }
];

let currentPuzzleIndex = 0;
let gridCells = [];

function createCrossword() {
  const container   = document.getElementById('crossword-grid');
  const acrossClues = document.getElementById('across-clues');
  const downClues   = document.getElementById('down-clues');
  const titleEl     = document.getElementById('puzzle-title-display');
  const resultMsg   = document.getElementById('result-msg');

  if (!container) return;

  const puzzle = puzzles[currentPuzzleIndex];

  // Update title and clues
  if (titleEl) titleEl.textContent = puzzle.title;
  if (acrossClues) acrossClues.innerHTML = puzzle.clues.across.map(c => `<li>${c}</li>`).join('');
  if (downClues)   downClues.innerHTML   = puzzle.clues.down.map(c => `<li>${c}</li>`).join('');
  if (resultMsg)   { resultMsg.textContent = ''; resultMsg.className = 'result-msg'; }

  container.innerHTML = '';
  gridCells = [];

  for (let r = 0; r < puzzle.gridSize; r++) {
    gridCells[r] = [];
    for (let c = 0; c < puzzle.gridSize; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (puzzle.blackCells.some(([br, bc]) => br === r && bc === c)) {
        cell.classList.add('black');
      } else {
        cell.contentEditable = 'true';
        cell.spellcheck      = false;
        cell.autocomplete    = 'off';
        cell.dataset.row     = r;
        cell.dataset.col     = c;

        cell.addEventListener('input', (e) => {
          let text = (e.target.textContent || '').toUpperCase().replace(/\s/g, '');
          if (text.length > 1) text = text.charAt(text.length - 1);
          e.target.textContent = text;

          // Move cursor to end
          const range = document.createRange();
          const sel   = window.getSelection();
          range.selectNodeContents(e.target);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);

          if (text) moveToNextCell(r, c);
        });

        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.textContent) {
            e.preventDefault();
            moveToPrevCell(r, c);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault(); moveToNextCell(r, c);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault(); moveToPrevCell(r, c);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault(); moveVertical(r, c, 1);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault(); moveVertical(r, c, -1);
          }
        });

        cell.addEventListener('focus', () => {
          // Select all on focus so typing replaces existing letter
          const range = document.createRange();
          range.selectNodeContents(cell);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        });
      }

      container.appendChild(cell);
      gridCells[r][c] = cell;
    }
  }

  updateProgressDisplay();
}

function moveToNextCell(row, col) {
  const size = puzzles[currentPuzzleIndex].gridSize;
  let r = row, c = col + 1;
  if (c >= size) { c = 0; r++; }
  while (r < size) {
    if (!gridCells[r][c].classList.contains('black')) {
      gridCells[r][c].focus(); return;
    }
    c++;
    if (c >= size) { c = 0; r++; }
  }
}

function moveToPrevCell(row, col) {
  const size = puzzles[currentPuzzleIndex].gridSize;
  let r = row, c = col - 1;
  if (c < 0) { c = size - 1; r--; }
  while (r >= 0) {
    if (!gridCells[r][c].classList.contains('black')) {
      gridCells[r][c].focus(); return;
    }
    c--;
    if (c < 0) { c = size - 1; r--; }
  }
}

function moveVertical(row, col, dir) {
  const size = puzzles[currentPuzzleIndex].gridSize;
  let r = row + dir;
  while (r >= 0 && r < size) {
    if (!gridCells[r][col].classList.contains('black')) {
      gridCells[r][col].focus(); return;
    }
    r += dir;
  }
}

function checkAnswers() {
  const puzzle  = puzzles[currentPuzzleIndex];
  const msg     = document.getElementById('result-msg');
  let allCorrect = true;

  for (let r = 0; r < puzzle.gridSize; r++) {
    for (let c = 0; c < puzzle.gridSize; c++) {
      const cell = gridCells[r][c];
      if (!cell.classList.contains('black')) {
        const char = (cell.textContent || '').toUpperCase().trim();
        if (char !== puzzle.solution[r][c]) {
          allCorrect = false;
          cell.classList.add('error');
          setTimeout(() => cell.classList.remove('error'), 800);
        }
      }
    }
  }

  if (msg) {
    if (allCorrect) {
      msg.textContent = '✨ Correct! You\'ve mastered this grid.';
      msg.className   = 'result-msg success';
      if (currentPuzzleIndex < puzzles.length - 1) {
        setTimeout(() => { nextPuzzle(); }, 2200);
      }
    } else {
      msg.textContent = '✗ Not quite — check the highlighted cells.';
      msg.className   = 'result-msg error-msg';
    }
  }
}

function resetPuzzle() { createCrossword(); }

function nextPuzzle() {
  currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
  createCrossword();
}

function prevPuzzle() {
  currentPuzzleIndex = (currentPuzzleIndex - 1 + puzzles.length) % puzzles.length;
  createCrossword();
}

function updateProgressDisplay() {
  const el = document.getElementById('puzzle-progress');
  if (el) el.textContent = `${currentPuzzleIndex + 1} / ${puzzles.length}`;
}

// Expose to global scope (called by inline onclick attributes)
window.checkAnswers = checkAnswers;
window.resetPuzzle  = resetPuzzle;
window.nextPuzzle   = nextPuzzle;
window.prevPuzzle   = prevPuzzle;

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createCrossword();
});
