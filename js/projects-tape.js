/**
 * PROJECTS-TAPE.JS — Controle dos Carretéis e Side-Scroll das Fitas Cassete
 * 
 * Requisitos:
 * - 6.3 (P0) Side-Scroll com as fitas de projetos: cada projeto é uma fita em fileira horizontal.
 * - Botão "Próxima fita" e "Fita anterior".
 * - Em mobile vira carrossel nativo por swipe.
 * - Clicar na fita faz ela engatar no "deck", os carretéis aceleram para velocidade máxima
 *   e abre o painel detalhado de especificações.
 * - IntersectionObserver pausa as animações fora da tela.
 */

export function initProjectTapes() {
  const tapeCards = document.querySelectorAll('.cassette-card');
  const projectsSection = document.getElementById('projetos');
  const track = document.querySelector('.tapes-track');
  const prevBtn = document.getElementById('prev-tape-btn');
  const nextBtn = document.getElementById('next-tape-btn');
  const counterEl = document.getElementById('tape-counter-indicator');

  if (!tapeCards.length) return;

  let currentTapeIndex = 0;

  // 1. Navegação de Side-Scroll (Próxima / Anterior)
  if (prevBtn && nextBtn && track) {
    function scrollToTape(index) {
      if (index < 0) index = 0;
      if (index >= tapeCards.length) index = tapeCards.length - 1;
      currentTapeIndex = index;

      const targetCard = tapeCards[index];
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }

      updateCounter();
    }

    prevBtn.addEventListener('click', () => {
      scrollToTape(currentTapeIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      scrollToTape(currentTapeIndex + 1);
    });

    // Atualiza o contador durante o swipe ou scroll
    track.addEventListener('scroll', () => {
      const trackScroll = track.scrollLeft;
      const cardWidth = tapeCards[0].offsetWidth;
      const newIndex = Math.round(trackScroll / (cardWidth + 24));
      if (newIndex !== currentTapeIndex && newIndex >= 0 && newIndex < tapeCards.length) {
        currentTapeIndex = newIndex;
        updateCounter();
      }
    }, { passive: true });

    function updateCounter() {
      if (counterEl) {
        counterEl.textContent = `FITA [0${currentTapeIndex + 1} / 0${tapeCards.length}]`;
      }
      prevBtn.disabled = currentTapeIndex === 0;
      nextBtn.disabled = currentTapeIndex === tapeCards.length - 1;
    }

    updateCounter();
  }

  // 2. Interação de Inserir / Ejetar fita do deck
  tapeCards.forEach((card, idx) => {
    const deckBtn = card.querySelector('.cassette-deck-btn');
    const statusLabel = card.querySelector('.tape-deck-status');

    function toggleDeckInsertion(e) {
      if (e.target.closest('.cassette-link')) return;

      const isInserted = card.classList.toggle('tape-inserted');

      if (isInserted) {
        if (deckBtn) deckBtn.textContent = '⏏ [EJETAR DO DECK // MODO NORMAL]';
        if (statusLabel) {
          statusLabel.textContent = 'MODO: TAPE PLAY (VELOCIDADE MÁXIMA)';
          statusLabel.style.color = 'var(--accent)';
        }
      } else {
        if (deckBtn) deckBtn.textContent = '[TOCAR NO DECK // ACELERAR FITA]';
        if (statusLabel) {
          statusLabel.textContent = 'MODO: REPOUSO (ROTAÇÃO CONTÍNUA)';
          statusLabel.style.color = '';
        }
      }
    }

    if (deckBtn) {
      deckBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDeckInsertion(e);
      });
    }

    card.addEventListener('click', toggleDeckInsertion);

    // Acessibilidade via teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.cassette-link')) return;
        e.preventDefault();
        toggleDeckInsertion(e);
      }
    });
  });

  // 3. IntersectionObserver para pausar carretéis fora da tela
  if ('IntersectionObserver' in window && projectsSection && track) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          track.classList.remove('tapes-paused');
        } else {
          track.classList.add('tapes-paused');
        }
      });
    }, {
      root: null,
      threshold: 0.05
    });

    observer.observe(projectsSection);
  }
}
