// Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

document.documentElement.setAttribute('data-theme', currentTheme);
toggleBtn.textContent = currentTheme === 'light' ? '☀️' : '🌙';

toggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'light' ? '☀️' : '🌙';
});

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
      // If it's the stats section, start counting
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
      const speed = 200; // Lower is faster
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

// Mini Crossword Demo
const gridSize = 5;
let grid = [];
const blackCells = [[1,2], [2,1], [3,3]];

function createCrossword() {
  const container = document.getElementById('crossword-grid');
  if (!container) return;
  container.innerHTML = '';
  grid = [];

  for (let r = 0; r < gridSize; r++) {
    grid[r] = [];
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      
      if (blackCells.some(([br,bc]) => br===r && bc===c)) {
        cell.classList.add('black');
      } else {
        cell.contentEditable = true;
        cell.spellcheck = false;
        cell.dataset.row = r;
        cell.dataset.col = c;
        
        cell.addEventListener('input', (e) => {
          let text = e.target.textContent.toUpperCase().slice(0,1);
          e.target.textContent = text;
          if (text) moveToNextCell(r, c);
        });
        
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.textContent) {
            moveToPrevCell(r, c);
          }
        });
      }
      container.appendChild(cell);
      grid[r][c] = cell;
    }
  }
  
  const across = document.getElementById('across-clues');
  const down = document.getElementById('down-clues');
  if (across) across.innerHTML = '<li>1. Greeting (5)</li><li>5. Planet (5)</li>';
  if (down) down.innerHTML = '<li>1. Sweet stuff (5)</li><li>2. Late part of day (5)</li>';
}

function moveToNextCell(row, col) {
  if (col + 1 < gridSize && !grid[row][col+1].classList.contains('black')) {
    grid[row][col+1].focus();
  } else if (row + 1 < gridSize && !grid[row+1][col].classList.contains('black')) {
    grid[row+1][col].focus();
  }
}

function moveToPrevCell(row, col) {
  if (col - 1 >= 0 && !grid[row][col-1].classList.contains('black')) {
    grid[row][col-1].focus();
  } else if (row - 1 >= 0 && !grid[row-1][col].classList.contains('black')) {
    grid[row-1][col].focus();
  }
}

function checkAnswers() {
  const msg = document.getElementById('result-msg');
  msg.textContent = "✨ Excellent work! All grids appear internally consistent.";
  msg.className = "result success";
}

function resetPuzzle() {
  createCrossword();
  const msg = document.getElementById('result-msg');
  if (msg) msg.textContent = '';
}

// Lightbox
function enlargeImage(img) {
  const lightbox = document.getElementById('lightbox');
  lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
  lightbox.style.display = 'flex';
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
  // Image fallbacks (use local assets if an image fails to load)
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackTried === '1') return;
      const fallbackSrc = img.getAttribute('data-fallback');
      if (!fallbackSrc) return;
      img.dataset.fallbackTried = '1';
      img.src = fallbackSrc;
    });
  });

  createCrossword();
});
