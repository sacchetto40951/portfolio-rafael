/**
 * CLOCK.JS — Relógio ao vivo de Campinas, SP
 * 
 * Fuso horário: America/Sao_Paulo (UTC-3)
 * Atualiza a cada 1 segundo e exibe no formato militar retrô.
 */

export function initLiveClock(elementId) {
  const clockElement = document.getElementById(elementId);
  if (!clockElement) return;

  function update() {
    const now = new Date();
    
    // Formata a hora no fuso horário exato de Campinas/São Paulo
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const timeString = formatter.format(now);
    clockElement.textContent = timeString;
  }

  // Atualiza imediatamente e depois a cada segundo
  update();
  setInterval(update, 1000);
}

