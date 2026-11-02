/**
 * SOUND-EFFECTS.JS — Sons Analógicos Mecânicos "Click / Clack" (Canal 01)
 * 
 * Requisito 6.7 (P1):
 * - Sons mecânicos discretos e analógicos ao clicar nos botões.
 * - Desligado por padrão (SOM [OFF]).
 * - Ao ativar (SOM [ON]), sintetiza cliques mecânicos realistas via Web Audio API
 *   sem necessidade de download de arquivos pesados, com latência zero.
 */

let soundEnabled = false;
let audioCtx = null;

export function initSoundSystem(toggleButtonId) {
  const toggleBtn = document.getElementById(toggleButtonId);

  // Carrega preferência anterior do localStorage (padrão desligado)
  const savedPref = localStorage.getItem('canal01-sound-enabled') === 'true';
  setSoundState(savedPref);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      // Cria/desperta AudioContext na primeira interação do usuário
      ensureAudioContext();
      setSoundState(!soundEnabled);
      // Feedback imediato com o clack de relé
      if (soundEnabled) {
        playMechanicalSound('clack');
      }
    });
  }

  // Adiciona evento de clique mecânico aos botões interativos do site
  setupGlobalClickSounds();

  function setSoundState(state) {
    soundEnabled = state;
    localStorage.setItem('canal01-sound-enabled', state);

    if (toggleBtn) {
      if (soundEnabled) {
        toggleBtn.innerHTML = `SOM <span class="toggle-status">[ON]</span>`;
        toggleBtn.setAttribute('aria-label', 'Desativar efeitos sonoros mecânicos');
        toggleBtn.classList.add('is-sound-on');
      } else {
        toggleBtn.innerHTML = `SOM <span class="badge-notice">[OFF]</span>`;
        toggleBtn.setAttribute('aria-label', 'Ativar efeitos sonoros mecânicos');
        toggleBtn.classList.remove('is-sound-on');
      }
    }
  }
}

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

/**
 * Sintetizador Web Audio de som mecânico ("click" ou "clack")
 */
export function playMechanicalSound(type = 'click') {
  if (!soundEnabled) return;
  ensureAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  // Criação dos nós de síntese
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  if (type === 'clack') {
    // Clack mais encorpado e grave (estilo interruptor de baquelite anos 50)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } else {
    // Click leve e crocante (estilo tecla mecânica ou botão de rádio)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(2, now);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }
}

/**
 * Conecta sons aos botões e links
 */
function setupGlobalClickSounds() {
  const interactiveSelectors = [
    'button',
    '.nav-link',
    '.btn-primary',
    '.btn-secondary',
    '.cassette-card',
    '.social-btn',
    '.cassette-deck-btn'
  ];

  document.addEventListener('click', (e) => {
    // Evita o próprio botão de som para não tocar som duplo
    if (e.target.closest('#sound-toggle-btn')) return;

    const matched = interactiveSelectors.some(selector => e.target.closest(selector));
    if (matched && soundEnabled) {
      const isCardOrTheme = e.target.closest('.cassette-card, #theme-toggle-btn, .btn-primary');
      playMechanicalSound(isCardOrTheme ? 'clack' : 'click');
    }
  });
}

