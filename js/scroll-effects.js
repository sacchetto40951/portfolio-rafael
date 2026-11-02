/**
 * SCROLL-EFFECTS.JS — Efeitos de Rolagem, Anéis de Relógio Obys e Reveals
 * 
 * Requisitos:
 * - Anéis circulares numerados de 1 a 12 cuja rotação = scroll × fator (6.5 P1)
 * - Revelações elegantes no scroll com GSAP ScrollTrigger
 * - Suporte completo a prefers-reduced-motion
 */

export function initScrollEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Se o GSAP estiver disponível
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    initClockDialsGSAP();
    initSectionReveals();
  } else {
    // Fallback leve com requestAnimationFrame caso CDN falhe
    initClockDialsFallback();
  }
}

/**
 * Anéis circulares Obys numerados de 1 a 12 girando ligados ao scroll
 * Estrutura corrigida: gira SOMENTE o .hand-wrapper que possui transform-origin: 50% 50%
 */
function initClockDialsGSAP() {
  const wrappers = document.querySelectorAll('.analog-clock .hand-wrapper');
  if (!wrappers.length) return;

  // Animação SOMENTE do wrapper do ponteiro ligada ao scroll
  window.gsap.to(wrappers, {
    rotation: 1440, // 4 voltas de 360° ao longo da página
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.25
    }
  });
}

/**
 * Fallback nativo para rotação dos ponteiros caso a CDN não carregue
 */
function initClockDialsFallback() {
  const wrappers = document.querySelectorAll('.analog-clock .hand-wrapper');
  if (!wrappers.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const angle = (scrollY * 0.45) % 360;
        wrappers.forEach((wrapper) => {
          wrapper.style.transform = `rotate(${angle}deg)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Revelações suaves e coordenadas dos elementos no scroll
 */
function initSectionReveals() {
  // 1. Cabeçalhos de Seções (Badge + Título + Subtítulo)
  document.querySelectorAll('.section-header').forEach((header) => {
    window.gsap.from(header.children, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  // 2. Fitas Cassete de Projetos (Seção 02)
  const tapes = document.querySelectorAll('.cassette-card');
  if (tapes.length) {
    window.gsap.from(tapes, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projetos",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });
  }

  // 3. Fichas de Competências Obys (Seção 03)
  const skillCards = document.querySelectorAll('.skill-category-card');
  if (skillCards.length) {
    window.gsap.from(skillCards, {
      y: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#competencias",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });
  }

  // 4. Caixas de Palestras (Seção 05)
  const lectureCards = document.querySelectorAll('.lecture-card');
  if (lectureCards.length) {
    window.gsap.from(lectureCards, {
      y: 40,
      opacity: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#palestras",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });
  }

  // 5. Seção de Contato e Torradeira Final (Requisito 6.6 P1)
  const contactBox = document.querySelector('.toaster-showcase');
  const toastPiece = document.querySelector('.toaster-toast');
  const speechBubble = document.querySelector('.toaster-speech-bubble');

  if (contactBox) {
    window.gsap.from(contactBox, {
      scale: 0.94,
      opacity: 0,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contato",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });
  }

  // A torrada sobe automaticamente ao entrar na viewport
  if (toastPiece) {
    window.gsap.fromTo(toastPiece,
      { y: 35 },
      {
        y: -18,
        duration: 0.9,
        delay: 0.2,
        ease: "back.out(2.4)",
        scrollTrigger: {
          trigger: "#contato",
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  // O balão de fala surge suavemente
  if (speechBubble) {
    window.gsap.fromTo(speechBubble,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.45,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: "#contato",
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}

