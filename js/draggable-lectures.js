/**
 * DRAGGABLE-LECTURES.JS — Telegramas / Caixas de Palestras Arrastáveis
 * 
 * Requisito 6.8 (P2):
 * - Caixas de mensagem espalhadas com leve rotação que podem ser arrastadas livremente
 *   na mesa de trabalho retrô.
 * - Suporte a mouse e touch.
 * - Botão para reorganizar os telegramas na disposição original.
 */

export function initDraggableLectures() {
  const cards = document.querySelectorAll('.lecture-card');
  const resetBtn = document.getElementById('reset-lectures-btn');
  if (!cards.length) return;

  cards.forEach((card, index) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    // Rotação inicial charmosa
    const initialRotations = [-1.5, 1.8, -1.2, 1.5];
    const initialRot = initialRotations[index % initialRotations.length];
    card.style.transform = `translate(0px, 0px) rotate(${initialRot}deg)`;

    card.addEventListener('mousedown', onPointerDown);
    card.addEventListener('touchstart', onPointerDown, { passive: true });

    function onPointerDown(e) {
      // Ignora se clicar em links ou botões
      if (e.target.closest('a, button')) return;

      isDragging = true;
      card.classList.add('is-dragging');
      card.style.zIndex = '50';

      const pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
      const pageY = e.type === 'touchstart' ? e.touches[0].pageY : e.pageY;

      startX = pageX - currentX;
      startY = pageY - currentY;

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;

      if (e.type === 'touchmove') {
        // Previne scroll da tela ao arrastar o cartão
        e.preventDefault();
      }

      const pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? e.touches[0].pageY : e.pageY;

      currentX = pageX - startX;
      currentY = pageY - startY;

      // Limita deslocamento para não sumir da tela
      currentX = Math.max(-180, Math.min(180, currentX));
      currentY = Math.max(-120, Math.min(120, currentY));

      card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${initialRot + (currentX * 0.05)}deg)`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove('is-dragging');
      card.style.zIndex = '2';

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
    }

    // Salva referência para restaurar
    card._resetPosition = () => {
      currentX = 0;
      currentY = 0;
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      card.style.transform = `translate(0px, 0px) rotate(${initialRot}deg)`;
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    };
  });

  // Botão de restaurar posições
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      cards.forEach(card => card._resetPosition && card._resetPosition());
    });
  }
}

