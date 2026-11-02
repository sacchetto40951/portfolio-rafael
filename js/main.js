/**
 * MAIN.JS — Arquivo principal de inicialização do Portfólio
 * 
 * Rafael Sacchetto — Canal 01
 * Vanilla JavaScript (ES Modules). Sem frameworks e sem dependências de build.
 */

import { content } from '../content.js';
import { initLiveClock } from './clock.js';
import { initThemeToggle } from './theme.js';
import { initAsciiHero } from './ascii-hero.js';
import { initVinylPlayer } from './player.js';
import { initIntro } from './intro.js';
import { initHover3D } from './hover-3d.js';
import { initScrollEffects } from './scroll-effects.js';
import { initProjectTapes } from './projects-tape.js';
import { initSoundSystem, playMechanicalSound } from './sound-effects.js';
import { initDraggableLectures } from './draggable-lectures.js';

document.addEventListener('DOMContentLoaded', () => {
  // Easter Egg no console do desenvolvedor (Requisito 6.8 P2)
  setupConsoleEasterEgg();

  // 1. Queda de Letras diretamente no <h1> (Correção 2)
  initIntro();

  // 2. Relógio ao Vivo com Fuso de Campinas/SP
  initLiveClock('live-clock');

  // 3. Alternador de Tema (P&B vs Retrô Anos 50)
  initThemeToggle('theme-toggle-btn');

  // 4. Efeitos Sonoros Mecânicos Analógicos "Click/Clack" (Requisito 6.7 P1)
  initSoundSystem('sound-toggle-btn');

  // 5. REQUISITO FIRME (6.1): Objeto 3D Fita Cassete em ASCII (Three.js)
  initAsciiHero('ascii-hero-wrap');

  // 6. REQUISITO FIRME (6.4): Toca-Discos com Vinil giratório e áudio real
  initVinylPlayer();

  // 7. Carretéis mecânicos e Side-Scroll das Fitas Cassete (Requisito 6.3 P0)
  initProjectTapes();

  // 8. Telegramas de Palestras Arrastáveis (Requisito 6.8 P2)
  initDraggableLectures();

  // 9. Letras 3D Interativas no Hover (Referência Abeto - 6.2 P0)
  initHover3D();

  // 10. Efeitos de Rolagem, Anéis Obys 1 a 12 e Torrada Pop-up (GSAP ScrollTrigger)
  initScrollEffects();

  // 11. Copiar E-mail da Torradeira
  setupCopyEmail();

  // 12. Avisos para utilitários adicionais
  setupPlaceholderInteractions();
});

/**
 * Configura o botão e clique na torradeira para copiar o e-mail
 */
function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toasterArt = document.querySelector('.toaster-art');
  const userEmail = content.contact.email;

  function doCopy() {
    navigator.clipboard.writeText(userEmail).then(() => {
      playMechanicalSound('clack');
      if (copyBtn) {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `✓ COPIADO COM SUCESSO!`;
        copyBtn.style.backgroundColor = 'var(--accent)';
        copyBtn.style.color = 'var(--accent-contrast)';

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.backgroundColor = '';
          copyBtn.style.color = '';
        }, 2500);
      }
    }).catch(() => {
      prompt('Copie o e-mail de Rafael Sacchetto:', userEmail);
    });
  }

  if (copyBtn) copyBtn.addEventListener('click', doCopy);
  if (toasterArt) {
    toasterArt.style.cursor = 'pointer';
    toasterArt.setAttribute('title', 'Clique na torradeira para copiar o e-mail');
    toasterArt.addEventListener('click', doCopy);
  }
}

/**
 * Easter Egg retrô no console do navegador (Requisito 6.8 P2)
 */
function setupConsoleEasterEgg() {
  console.log(
    `%c` +
    `  _____________________________________________\n` +
    ` |  _________________________________________  |\n` +
    ` | | [A]  RAFAEL SACCHETTO - CANAL 01        | |\n` +
    ` | |===.=================================.===| |\n` +
    ` | |   |     .---.             .---.     |   | |\n` +
    ` | |   |    ( (O) )   [===]   ( (O) )    |   | |\n` +
    ` | |   |     '---'             '---'     |   | |\n` +
    ` | |===o=================================o===| |\n` +
    ` | |_________________________________________| |\n` +
    ` |_____________________________________________|\n\n` +
    ` [CANAL 01 TRANSMISSÃO ATIVA]\n` +
    ` Olá dev! Digite window.canal01 para inspecionar os parâmetros técnicos.`,
    'color: #9CCFB8; font-family: monospace; font-size: 11px; font-weight: bold; line-height: 1.2;'
  );

  window.canal01 = {
    operador: "Rafael Sacchetto",
    cidade: "Campinas, SP",
    fuso: "America/Sao_Paulo (UTC-3)",
    status: "Transmissão analógica ativa",
    frequencia: "101.9 MHz",
    audio: "Web Audio Synthesizer + /assets/audio/minha-faixa.mp3",
    contato: content.contact
  };
}

/**
 * Notificações para funcionalidades reservadas para a Fase 4
 */
function setupPlaceholderInteractions() {
  const langBtn = document.getElementById('lang-toggle-btn');

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      alert('Alternância de Idioma [EN]: a versão completa em Inglês será integrada na Fase 4.');
    });
  }
}

