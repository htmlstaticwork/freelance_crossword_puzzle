// Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
  let currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });
}

function updateThemeIcon(theme) {
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'light' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons();
  }
}

// RTL Toggle
const rtlBtn = document.getElementById('rtl-toggle');
if (rtlBtn) {
  rtlBtn.addEventListener('click', () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
    rtlBtn.innerHTML = isRtl ? '<i data-lucide="languages"></i>' : '<i data-lucide="align-right"></i>';
    lucide.createIcons();
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialize Lucide Icons on load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileMenuClose.addEventListener('click', closeMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Mobile Toggles
const mobileRtlBtn = document.getElementById('mobile-rtl-toggle');
if (mobileRtlBtn) {
  mobileRtlBtn.addEventListener('click', () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
    mobileRtlBtn.innerHTML = isRtl ? '<i data-lucide="languages"></i>' : '<i data-lucide="align-right"></i>';
    lucide.createIcons();
  });
}

const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
if (mobileThemeBtn) {
  mobileThemeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active Navigation Highlight
const navObserverOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      if (id) {
        document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    }
  });
}, navObserverOptions);

document.querySelectorAll('header.hero, section.section, footer').forEach(section => {
  navObserver.observe(section);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'stats') {
        startCounters();
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stat Counters
function startCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const count = +counter.innerText;
      const speed = 200;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + (target > 99 ? "+" : "");
      }
    };
    updateCount();
  });
}

// --- Enhanced Multi-Puzzle Crossword Logic ---

const puzzles = [
  {
    title: "Puzzle 1: The Greeting",
    gridSize: 5,
    blackCells: [[1,1], [1,3], [3,1], [3,3]],
    clues: {
      across: ["1. Common greeting (5)", "4. Loud sound (5)", "5. Bread riser (5)"],
      down: ["1. Bee's creation (5)", "2. Fill with joy (5)", "3. Memory aids (5)"]
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
    title: "Puzzle 2: Deep Space",
    gridSize: 5,
    blackCells: [[1,1], [1,3], [3,1], [3,3]],
    clues: {
      across: ["1. Night sky twinklers (5)", "3. Relating to the moon (5)", "5. Moon samples (5)"],
      down: ["1. Relating to the sun (5)", "2. Small amount (5)", "3. Not dull (5)"]
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
    title: "Puzzle 3: Green Thumb",
    gridSize: 5,
    blackCells: [[1,1], [1,3], [3,1], [3,3]],
    clues: {
      across: ["1. Garden inhabitant (5)", "3. Forbidden fruit? (5)", "5. Mouth parts (5)"],
      down: ["1. Garden inhabitant (5)", "2. Metal mixture (5)", "3. Mouth parts (5)"]
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
    title: "Puzzle 4: Digital World",
    gridSize: 5,
    blackCells: [[1,1], [1,3], [3,1], [3,3]],
    clues: {
      across: ["1. Computer pointer (5)", "3. Single number (5)", "5. Internet box (5)"],
      down: ["1. Internet box (5)", "2. Manner of use (5)", "3. Keyboard key (5)"]
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
let grid = [];

function createCrossword() {
  const container = document.getElementById('crossword-grid');
  const acrossClues = document.getElementById('across-clues');
  const downClues = document.getElementById('down-clues');
  const puzzleTitle = document.querySelector('.demo-section h2');
  const resultMsg = document.getElementById('result-msg');

  if (!container) return;

  const puzzle = puzzles[currentPuzzleIndex];
  puzzleTitle.textContent = puzzle.title;
  container.innerHTML = '';
  acrossClues.innerHTML = puzzle.clues.across.map(c => `<li>${c}</li>`).join('');
  downClues.innerHTML = puzzle.clues.down.map(c => `<li>${c}</li>`).join('');
  resultMsg.textContent = '';
  grid = [];

  for (let r = 0; r < puzzle.gridSize; r++) {
    grid[r] = [];
    for (let c = 0; c < puzzle.gridSize; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      
      if (puzzle.blackCells.some(([br,bc]) => br===r && bc===c)) {
        cell.classList.add('black');
      } else {
        cell.contentEditable = true;
        cell.spellcheck = false;
        cell.dataset.row = r;
        cell.dataset.col = c;
        
        cell.addEventListener('input', (e) => {
          let text = e.target.textContent.toUpperCase().trim();
          if (text.length > 1) text = text.charAt(text.length - 1);
          e.target.textContent = text;
          if (text) moveToNextCell(r, c);
        });
        
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.textContent) {
            moveToPrevCell(r, c);
          } else if (e.key === 'ArrowRight') {
            moveToNextCell(r, c);
          } else if (e.key === 'ArrowLeft') {
            moveToPrevCell(r, c);
          } else if (e.key === 'ArrowDown') {
             moveVertical(r, c, 1);
          } else if (e.key === 'ArrowUp') {
             moveVertical(r, c, -1);
          }
        });
      }
      container.appendChild(cell);
      grid[r][c] = cell;
    }
  }
}

function moveToNextCell(row, col) {
  let nextCol = col + 1;
  let nextRow = row;
  if (nextCol >= puzzles[currentPuzzleIndex].gridSize) {
    nextCol = 0;
    nextRow++;
  }
  if (nextRow < puzzles[currentPuzzleIndex].gridSize) {
    if (grid[nextRow][nextCol].classList.contains('black')) {
      moveToNextCell(nextRow, nextCol);
    } else {
      grid[nextRow][nextCol].focus();
    }
  }
}

function moveToPrevCell(row, col) {
  let prevCol = col - 1;
  let prevRow = row;
  if (prevCol < 0) {
    prevCol = puzzles[currentPuzzleIndex].gridSize - 1;
    prevRow--;
  }
  if (prevRow >= 0) {
    if (grid[prevRow][prevCol].classList.contains('black')) {
      moveToPrevCell(prevRow, prevCol);
    } else {
      grid[prevRow][prevCol].focus();
    }
  }
}

function moveVertical(row, col, dir) {
  let nextRow = row + dir;
  if (nextRow >= 0 && nextRow < puzzles[currentPuzzleIndex].gridSize) {
    if (grid[nextRow][col].classList.contains('black')) {
       // skip black if possible or just stay
    } else {
       grid[nextRow][col].focus();
    }
  }
}

function checkAnswers() {
  const puzzle = puzzles[currentPuzzleIndex];
  const msg = document.getElementById('result-msg');
  let correct = true;

  for (let r = 0; r < puzzle.gridSize; r++) {
    for (let c = 0; c < puzzle.gridSize; c++) {
      if (!grid[r][c].classList.contains('black')) {
        const char = grid[r][c].textContent.toUpperCase();
        if (char !== puzzle.solution[r][c]) {
          correct = false;
          grid[r][c].classList.add('error');
          setTimeout(() => grid[r][c].classList.remove('error'), 1000);
        }
      }
    }
  }

  if (correct) {
    msg.textContent = "✨ Correct! You've mastered this grid.";
    msg.className = "result success";
    if (currentPuzzleIndex < puzzles.length - 1) {
      setTimeout(() => {
        nextPuzzle();
        updateProgressDisplay();
      }, 2000);
    }
  } else {
    msg.textContent = "❌ Not quite right. Keep trying!";
    msg.className = "result error-msg";
  }
}

function resetPuzzle() {
  createCrossword();
}

function nextPuzzle() {
  currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
  createCrossword();
  updateProgressDisplay();
}

function prevPuzzle() {
  currentPuzzleIndex = (currentPuzzleIndex - 1 + puzzles.length) % puzzles.length;
  createCrossword();
  updateProgressDisplay();
}

// Lightbox
function enlargeImage(img) {
  const lightbox = document.getElementById('lightbox');
  lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
  lightbox.style.display = 'flex';
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  createCrossword();
  
  // Add Nav buttons to demo controls dynamically if not in HTML
  const controls = document.querySelector('.demo-controls');
  if (controls && !document.getElementById('nav-controls')) {
    const navDiv = document.createElement('div');
    navDiv.id = 'nav-controls';
    navDiv.style.marginTop = '1rem';
    navDiv.innerHTML = `
      <button onclick="prevPuzzle()" class="btn btn-outline" style="padding: 0.5rem 1rem">← Prev</button>
      <span id="puzzle-progress" style="margin: 0 1rem; font-weight: 600;"></span>
      <button onclick="nextPuzzle()" class="btn btn-outline" style="padding: 0.5rem 1rem">Next →</button>
    `;
    controls.appendChild(navDiv);
  }
  
  updateProgressDisplay();
});

function updateProgressDisplay() {
  const progress = document.getElementById('puzzle-progress');
  if (progress) {
    progress.textContent = `${currentPuzzleIndex + 1} / ${puzzles.length}`;
  }
}

// Wrap functions for global access
window.checkAnswers = checkAnswers;
window.resetPuzzle = resetPuzzle;
window.nextPuzzle = nextPuzzle;
window.prevPuzzle = prevPuzzle;
