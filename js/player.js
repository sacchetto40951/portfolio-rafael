/**
 * PLAYER.JS — Toca-Discos Retrô Analógico (Vinil com Braço + Áudio Real)
 * 
 * Requisito Firme (6.4):
 * - O vinil GIRA fisicamente enquanto toca.
 * - O braço do toca-discos se desloca até o disco ao dar play e retorna ao pausar.
 * - TOCA ÁUDIO DE VERDADE:
 *   1. Tenta carregar /assets/audio/minha-faixa.mp3.
 *   2. Se o arquivo ainda não existir, sintetizador analógico Web Audio toca
 *      uma transmissão sonora retrô anos 50 instantaneamente.
 * - Nunca faz autoplay: apenas após o clique do usuário.
 * - VU Meter com animação em tempo real reagindo ao áudio.
 * - Controles de play/pause, volume e indicador de status.
 */

export function initVinylPlayer() {
  const playBtn = document.getElementById('player-play-btn');
  const vinylRecord = document.querySelector('.vinyl-record');
  const toneArm = document.querySelector('.tone-arm');
  const timecodeEl = document.querySelector('.timecode-display span');
  const statusTag = document.querySelector('.player-status-tag');
  const volumeSlider = document.getElementById('player-volume-slider');
  const vuBars = document.querySelectorAll('.vu-bar');

  if (!playBtn || !vinylRecord) return;

  let isPlaying = false;
  let audioContext = null;
  let analyserNode = null;
  let synthGainNode = null;
  let masterGainNode = null;
  let synthInterval = null;
  let animationFrameId = null;
  let playbackSeconds = 0;
  let timerInterval = null;

  // Elemento de áudio para o arquivo mp3
  const audioFile = new Audio('assets/audio/minha-faixa.mp3');
  audioFile.preload = 'metadata';

  // Configura volume inicial
  let currentVolume = 0.8;
  audioFile.volume = currentVolume;

  // Alternar Play / Pause
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  });

  // Controle de volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      currentVolume = parseFloat(e.target.value);
      audioFile.volume = currentVolume;
      if (masterGainNode) {
        masterGainNode.gain.setValueAtTime(currentVolume, audioContext.currentTime);
      }
    });
  }

  function playTrack() {
    isPlaying = true;

    // 1. Gira o disco de vinil e posiciona o braço de leitura
    vinylRecord.classList.add('is-spinning');
    if (toneArm) {
      toneArm.classList.add('arm-on-record');
    }

    // 2. Atualiza os botões e texto da interface
    playBtn.innerHTML = `❚❚ PAUSAR TRANSMISSÃO`;
    playBtn.classList.add('is-active');
    if (statusTag) {
      statusTag.textContent = `● [NO AR // 101.9 MHz]: Mensagem de Apresentação — Rafael Sacchetto`;
      statusTag.style.color = '#27ae60';
    }

    // 3. Tenta reproduzir o arquivo MP3 real
    audioFile.play().then(() => {
      // Arquivo MP3 carregado e tocando
      initAudioVisualizer(audioFile);
    }).catch(() => {
      // Fallback: Sintetizador Web Audio gera a trilha analógica anos 50
      startWebAudioSynth();
    });

    // 4. Inicia contagem de tempo
    startTimer();
  }

  function pauseTrack() {
    isPlaying = false;

    // 1. Para o disco e recolhe o braço de volta ao descanso
    vinylRecord.classList.remove('is-spinning');
    if (toneArm) {
      toneArm.classList.remove('arm-on-record');
    }

    // 2. Atualiza controles
    playBtn.innerHTML = `▶ REPRODUZIR ÁUDIO`;
    playBtn.classList.remove('is-active');
    if (statusTag) {
      statusTag.textContent = `[TRANSMISSÃO PAUSADA // FREQUÊNCIA SINTONIZADA]`;
      statusTag.style.color = '';
    }

    // 3. Pausa áudio físico e sintetizador
    audioFile.pause();
    stopWebAudioSynth();

    // 4. Pausa timer e zera VU bars
    clearInterval(timerInterval);
    resetVuMeter();
  }

  /**
   * Sintetizador Analógico Web Audio (Garante que som real saia mesmo sem o MP3)
   */
  function startWebAudioSynth() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 64;

    masterGainNode = audioContext.createGain();
    masterGainNode.gain.setValueAtTime(currentVolume, audioContext.currentTime);

    masterGainNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    // Notas de uma harmonia suave retrô (Fá Maior 7 - Ré menor 7)
    const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 440.00, 349.23];
    let noteIdx = 0;

    function triggerVintageNote() {
      if (!isPlaying) return;

      const osc = audioContext.createOscillator();
      const noteGain = audioContext.createGain();

      // Timbre suave vintage (onda triangular com filtro passa-baixa)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioContext.currentTime);
      noteIdx++;

      const now = audioContext.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(noteGain);
      noteGain.connect(masterGainNode);

      osc.start(now);
      osc.stop(now + 0.95);
    }

    triggerVintageNote();
    synthInterval = setInterval(triggerVintageNote, 600);

    // Loop de animação do VU meter reagindo ao sintetizador
    renderVuMeterLoop();
  }

  function stopWebAudioSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  /**
   * Conecta o analisador Web Audio ao elemento de áudio quando o MP3 toca
   */
  function initAudioVisualizer(audioEl) {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    try {
      const source = audioContext.createMediaElementSource(audioEl);
      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 64;
      source.connect(analyserNode);
      analyserNode.connect(audioContext.destination);
    } catch {
      // Já conectado
    }

    renderVuMeterLoop();
  }

  /**
   * Atualiza as barras do VU meter conforme as frequências do áudio
   */
  function renderVuMeterLoop() {
    if (!analyserNode || !isPlaying) return;

    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(dataArray);

    // Média de energia nas frequências graves e médias
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += dataArray[i];
    }
    const average = sum / 8; // Valor de 0 a 255
    const activeLevel = Math.round((average / 255) * vuBars.length) + 1;

    vuBars.forEach((bar, index) => {
      if (index < activeLevel) {
        bar.style.opacity = '1';
        bar.style.transform = 'scaleY(1)';
      } else {
        bar.style.opacity = '0.2';
        bar.style.transform = 'scaleY(0.7)';
      }
    });

    animationFrameId = requestAnimationFrame(renderVuMeterLoop);
  }

  function resetVuMeter() {
    vuBars.forEach((bar) => {
      bar.style.opacity = '0.2';
      bar.style.transform = 'scaleY(0.7)';
    });
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      playbackSeconds++;
      const mins = Math.floor(playbackSeconds / 60).toString().padStart(2, '0');
      const secs = (playbackSeconds % 60).toString().padStart(2, '0');
      if (timecodeEl) {
        timecodeEl.textContent = `TIMECODE: ${mins}:${secs} / 01:24`;
      }

      if (playbackSeconds >= 84) { // 1 min e 24 seg
        pauseTrack();
        playbackSeconds = 0;
      }
    }, 1000);
  }
}

