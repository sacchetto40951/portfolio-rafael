/**
 * HOVER-3D.JS — Letras com rotação 3D interativa no hover
 * 
 * Referência: messenger.abeto.co (Requisito 6.2 P0)
 * - Converte caracteres em spans com perspectiva 3D
 * - No hover, detecta a direção de entrada do mouse (cima, baixo, esquerda, direita)
 * - Gira em rotateX / rotateY conforme o vetor de entrada e retorna suavemente
 */

export function initHover3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Aplica o hover 3D diretamente nas letras já estruturadas do <h1>
  const heroLetters = document.querySelectorAll('.hero-main-title .intro-letter');
  heroLetters.forEach((letter) => {
    letter.classList.add('char-3d');
    attachDirectionalHover(letter);
  });

  // 2. Elementos que recebem a divisão de texto para 3D
  const otherSelectors = [
    '.section-title',
    '.nav-link',
    '.brand-name',
    '.cassette-title'
  ];

  otherSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      splitTextTo3DChars(el);
    });
  });
}

/**
 * Divide o texto de elementos secundários em spans preservando tags
 */
function splitTextTo3DChars(element) {
  if (element.classList.contains('has-3d-split')) return;
  element.classList.add('has-3d-split');

  const childNodes = Array.from(element.childNodes);
  element.innerHTML = '';

  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'char-3d';

        if (char === ' ') {
          span.innerHTML = '&nbsp;';
          span.classList.add('char-space');
        } else {
          span.textContent = char;
          attachDirectionalHover(span);
        }

        fragment.appendChild(span);
      }

      element.appendChild(fragment);
    } else {
      element.appendChild(node);
    }
  });
}

/**
 * Calcula o vetor de entrada do mouse e aplica a rotação 3D no eixo correspondente
 */
function attachDirectionalHover(span) {
  span.addEventListener('mouseenter', (e) => {
    const rect = span.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;

    const dx = e.clientX - midX;
    const dy = e.clientY - midY;

    let initialRotate = '';

    // Compara magnitudes para identificar o eixo dominante
    if (Math.abs(dx) > Math.abs(dy)) {
      initialRotate = dx > 0 ? 'rotateY(-360deg)' : 'rotateY(360deg)';
    } else {
      initialRotate = dy > 0 ? 'rotateX(360deg)' : 'rotateX(-360deg)';
    }

    span.style.transition = 'none';
    span.style.transform = initialRotate;

    requestAnimationFrame(() => {
      span.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.25), color 0.2s ease';
      span.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}
