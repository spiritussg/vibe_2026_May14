/**
 * ThemeToggle Web Component
 * Styled as a rugged industrial HUD switch.
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
    const status = this.shadowRoot.querySelector('.status-text');
    if (status) {
      status.textContent = theme === 'dark' ? 'HUD_MODE::FLIGHT' : 'HUD_MODE::STATION';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .switch-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border: 1px solid var(--primary-color);
          background: var(--surface-color);
          transition: all 0.3s;
        }
        .switch-container:hover {
          background: var(--primary-color);
          color: black;
          box-shadow: 0 0 15px var(--primary-color);
        }
        .status-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .icon { font-size: 1rem; }
      </style>
      <div class="switch-container" aria-label="Toggle Interface Mode">
        <span class="status-text">HUD_MODE::FLIGHT</span>
        <span class="icon">⇶</span>
      </div>
    `;
    this.shadowRoot.querySelector('.switch-container').addEventListener('click', () => this.toggleTheme());
  }
}

/**
 * TotoGenerator Web Component
 * High-fidelity RSI Multi-Function Display (MFD).
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
    const btn = this.shadowRoot.getElementById('execute-btn');
    const container = this.shadowRoot.querySelector('.data-block-container');
    const status = this.shadowRoot.querySelector('.mfd-status');
    
    btn.disabled = true;
    status.textContent = "STATE::ACQUIRING_DATA_LINK...";
    container.classList.add('processing');
    
    await new Promise(r => setTimeout(r, 1800)); // UEE Data Link Simulation
    
    container.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((num, index) => {
      const block = document.createElement('div');
      block.className = 'data-block';
      block.innerHTML = `
        <div class="block-label">NODE_${index + 1}</div>
        <div class="block-value">${num.toString().padStart(2, '0')}</div>
      `;
      block.style.animationDelay = `${index * 0.12}s`;
      container.appendChild(block);
    });

    btn.disabled = false;
    status.textContent = "STATE::DATA_PULL_COMPLETE";
    container.classList.remove('processing');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 800px;
        }

        .mfd-panel {
          background: var(--surface-color);
          backdrop-filter: blur(12px) brightness(0.8);
          -webkit-backdrop-filter: blur(12px) brightness(0.8);
          border: 1px solid var(--primary-color);
          padding: 2.5rem;
          position: relative;
          box-shadow: 0 0 40px var(--shadow-color);
          display: flex;
          flex-direction: column;
        }

        /* Industrial Targeting Brackets */
        .bracket {
          position: absolute;
          width: 30px;
          height: 30px;
          border-color: var(--primary-color);
          border-style: solid;
          opacity: 0.8;
        }
        .tl { top: -2px; left: -2px; border-width: 4px 0 0 4px; }
        .tr { top: -2px; right: -2px; border-width: 4px 4px 0 0; }
        .bl { bottom: -2px; left: -2px; border-width: 0 0 4px 4px; }
        .br { bottom: -2px; right: -2px; border-width: 0 4px 4px 0; }

        .mfd-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          border-bottom: 1px dashed var(--primary-color);
          padding-bottom: 1rem;
        }

        .mfd-title {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 900;
          color: var(--primary-color);
          letter-spacing: 2px;
        }

        .mfd-status {
          font-family: var(--font-main);
          font-size: 0.7rem;
          color: var(--accent-color);
          font-weight: 600;
        }

        .mfd-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .readout-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          width: 100%;
          font-family: var(--font-main);
          font-size: 0.6rem;
          color: var(--primary-color);
          opacity: 0.6;
          margin-bottom: 1rem;
        }

        button {
          background: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          font-family: var(--font-display);
          padding: 1rem 4rem;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          overflow: hidden;
        }
        button::before {
          content: "";
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
          opacity: 0.2;
          transition: 0.4s;
        }
        button:hover:not(:disabled) {
          background: var(--primary-color);
          color: black;
          box-shadow: 0 0 25px var(--primary-color);
        }
        button:hover:not(:disabled)::before { left: 100%; }
        button:disabled { opacity: 0.5; cursor: wait; }

        .data-block-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          min-height: 120px;
        }

        .data-block {
          border: 1px solid var(--primary-color);
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          animation: slide-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        
        .block-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--primary-color);
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }

        .block-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          color: white;
          text-shadow: 0 0 10px var(--primary-color);
        }

        @keyframes slide-in {
          0% { transform: translateY(20px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        .processing::after {
          content: "UEE_ENCRYPTION_LINK::ESTABLISHED // DATA_FETCHING_IN_PROGRESS...";
          grid-column: span 3;
          text-align: center;
          font-size: 0.8rem;
          color: var(--primary-color);
          animation: blink 0.8s infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }
      </style>
      <div class="mfd-panel">
        <div class="bracket tl"></div>
        <div class="bracket tr"></div>
        <div class="bracket bl"></div>
        <div class="bracket br"></div>
        
        <div class="mfd-header">
          <div class="mfd-title">RSI_TOTO_GENERATOR::v4.2</div>
          <div class="mfd-status">STATE::SYSTEM_READY</div>
        </div>

        <div class="mfd-content">
          <div class="readout-grid">
            <div>SIGNAL_STRENGTH: 98.4%</div>
            <div>DIVERSITY_RATIO: 1.42</div>
            <div>UEE_CERTIFIED: YES</div>
            <div>RNG_CORE: QUANTUM_FLUX</div>
          </div>
          
          <button id="execute-btn">EXECUTE_DATA_PULL</button>
          
          <div class="data-block-container"></div>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('execute-btn').addEventListener('click', () => this.generateNumbers());
  }
}

customElements.define('theme-toggle', ThemeToggle);
customElements.define('toto-generator', TotoGenerator);
