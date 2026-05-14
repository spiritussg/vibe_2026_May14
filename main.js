/**
 * ThemeToggle Web Component
 * Styled as a futuristic power interface.
 */
class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initTheme();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateIcon(theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateIcon(theme) {
    const btn = this.shadowRoot.querySelector('button');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? 'POWER::ON' : 'POWER::STBY';
      btn.style.color = theme === 'dark' ? 'var(--primary-color)' : 'var(--text-color)';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: transparent;
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          letter-spacing: 1px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0 10px oklch(80% 0.2 190 / 20%);
          position: relative;
          overflow: hidden;
        }
        button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            oklch(80% 0.2 190 / 20%),
            transparent
          );
          transition: 0.5s;
        }
        button:hover {
          box-shadow: 0 0 20px var(--primary-color);
          transform: translateY(-2px);
        }
        button:hover::before {
          left: 100%;
        }
        button:active {
          transform: translateY(0);
        }
      </style>
      <button type="button" aria-label="Toggle Interface Mode">POWER::ON</button>
    `;
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleTheme());
  }
}

/**
 * TotoGenerator Web Component
 * Futuristic HUD console for generating lucky numbers.
 */
class TotoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  async generateNumbers() {
    const btn = this.shadowRoot.getElementById('generate');
    const container = this.shadowRoot.querySelector('.numbers-container');
    
    // Scanning state
    btn.disabled = true;
    btn.textContent = 'SCANNING...';
    container.classList.add('scanning');
    
    await new Promise(r => setTimeout(r, 1500)); // Simulate tech processing
    
    container.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = 'energy-orb';
      ball.innerHTML = `<span>${num.toString().padStart(2, '0')}</span>`;
      ball.style.animationDelay = `${index * 0.15}s`;
      container.appendChild(ball);
    });

    btn.disabled = false;
    btn.textContent = 'RE-CALIBRATE';
    container.classList.remove('scanning');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 700px;
        }

        .hud-container {
          background: var(--surface-color);
          border: 1px solid oklch(80% 0.2 190 / 30%);
          border-radius: 8px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-deep);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Decorative Corners */
        .hud-container::before, .hud-container::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--primary-color);
          border-style: solid;
        }
        .hud-container::before {
          top: 10px;
          left: 10px;
          border-width: 3px 0 0 3px;
        }
        .hud-container::after {
          bottom: 10px;
          right: 10px;
          border-width: 0 3px 3px 0;
        }

        .status-header {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          color: var(--secondary-color);
          margin-bottom: 2rem;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--primary-color);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        button {
          background: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          font-family: 'Orbitron', sans-serif;
          padding: 1.2rem 3rem;
          font-size: 1rem;
          font-weight: 900;
          cursor: pointer;
          position: relative;
          transition: 0.3s;
          z-index: 10;
        }
        button:hover:not(:disabled) {
          background: var(--primary-color);
          color: black;
          box-shadow: 0 0 30px var(--primary-color);
        }
        button:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        .numbers-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
          min-height: 100px;
        }

        .energy-orb {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          border: 2px solid var(--secondary-color);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          background: radial-gradient(circle at center, var(--secondary-color), transparent);
          box-shadow: 0 0 20px var(--secondary-color);
          position: relative;
          animation: pop-orb 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        
        .energy-orb::after {
          content: "";
          position: absolute;
          width: 110%;
          height: 110%;
          border: 1px dashed var(--primary-color);
          border-radius: 50%;
          animation: rotate-ring 4s linear infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }

        @keyframes pop-orb {
          0% { transform: scale(0) translateY(50px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .scanning::before {
          content: "INITIALIZING DATA RETRIEVAL...";
          position: absolute;
          bottom: 20px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.7rem;
          color: var(--primary-color);
          animation: blink 0.5s infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      </style>
      <div class="hud-container">
        <div class="status-header">
          <div class="status-dot"></div>
          SYSTEM_READY::HUD_LINK_ACTIVE
        </div>
        <button id="generate">INITIATE_SEQUENCE</button>
        <div class="numbers-container"></div>
      </div>
    `;

    this.shadowRoot.getElementById('generate').addEventListener('click', () => this.generateNumbers());
  }
}

customElements.define('theme-toggle', ThemeToggle);
customElements.define('toto-generator', TotoGenerator);
