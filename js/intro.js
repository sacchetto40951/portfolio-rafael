/**
 * INTRO.JS — Animação das Letras Caindo diretamente no <h1> (Canal 01)
 * 
 * Correção 2:
 * - O nome "RAFAEL SACCHETTO" é uma unidade coesa em um único <h1>.
 * - As letras desse MESMO <h1> caem do topo e assentam na posição final exata.
 * - Sem elemento de intro separado, sem duplicatas, sem sobreposições.
 * - Pulável com tecla ESC ou clique.
 * - Respeita prefers-reduced-motion e salva em sessionStorage.
 */

export function initIntro() {
  const letters = document.querySelectorAll('.hero-main-title .intro-letter');
  if (!letters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem('canal01-intro-seen');

  // Se o usuário prefere redução de movimento ou já viu a intro nesta sessão: estado final imediato
  if (prefersReduced || alreadySeen) {
    settleLettersInstantly(letters);
    return;
  }

  // Animação com GSAP
  if (window.gsap) {
    const tl = window.gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('canal01-intro-seen', 'true');
      }
    });

    // Posição inicial: acima do topo da janela
    window.gsap.set(letters, {
      y: -Math.min(window.innerHeight * 0.65, 380),
      opacity: 0,
      rotation: () => (Math.random() - 0.5) * 40
    });

    // Queda física com gravidade e assentamento em bounce
    tl.to(letters, {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.15,
      ease: "bounce.out",
      stagger: {
        each: 0.045,
        from: "random"
      }
    });

    // Pular intro com ESC ou clique na tela
    const skipHandler = (e) => {
      if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Escape')) {
        tl.progress(1);
        sessionStorage.setItem('canal01-intro-seen', 'true');
        window.removeEventListener('keydown', skipHandler);
        document.removeEventListener('click', skipHandler);
      }
    };

    window.addEventListener('keydown', skipHandler);
    document.addEventListener('click', skipHandler, { once: true });

  } else {
    // Fallback nativo
    letters.forEach((letter, i) => {
      letter.style.opacity = '0';
      letter.style.transform = 'translateY(-200px)';
      setTimeout(() => {
        letter.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease';
        letter.style.transform = 'translateY(0)';
        letter.style.opacity = '1';
      }, i * 40);
    });
    sessionStorage.setItem('canal01-intro-seen', 'true');
  }

  function settleLettersInstantly(letterEls) {
    if (window.gsap) {
      window.gsap.set(letterEls, {
        y: 0,
        opacity: 1,
        rotation: 0
      });
    } else {
      letterEls.forEach((el) => {
        el.style.transform = 'none';
        el.style.opacity = '1';
      });
    }
  }
}
