/**
 * THEME.JS — Gerenciador de tema (Preto & Branco vs Paleta Anos 50)
 * 
 * P&B [ON]: Modo monocromático com alto contraste (preto, branco, cinzas).
 * P&B [OFF]: Ativa a paleta retrô anos 50 (creme #F2E8D5, vermelho-tomate #D8432E, 
 *            verde-menta #9CCFB8 e preto-tinta #111111).
 */

export function initThemeToggle(buttonId) {
  const toggleBtn = document.getElementById(buttonId);
  const root = document.documentElement;

  // Carrega a preferência anterior do usuário ou adota 'bw' (P&B ligado) como padrão
  const savedTheme = localStorage.getItem('rafael-portfolio-theme') || 'bw';
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'bw';
      const nextTheme = currentTheme === 'bw' ? 'retro' : 'bw';
      applyTheme(nextTheme);
      localStorage.setItem('rafael-portfolio-theme', nextTheme);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
      if (theme === 'bw') {
        toggleBtn.innerHTML = `P&B <span class="toggle-status">[ON]</span>`;
        toggleBtn.setAttribute('aria-label', 'Desativar modo Preto e Branco e ver paleta anos 50');
      } else {
        toggleBtn.innerHTML = `P&B <span class="toggle-status">[OFF]</span>`;
        toggleBtn.setAttribute('aria-label', 'Ativar modo Preto e Branco');
      }
    }
  }
}

