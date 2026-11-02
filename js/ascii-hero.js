/**
 * ASCII-HERO.JS — Objeto 3D Fita Cassete renderizado em ASCII
 * 
 * Requisito Firme (6.1):
 * - Three.js modela uma fita cassete com primitivas (sem arquivos externos)
 * - Converte a renderização 3D em tempo real para caracteres ASCII por luminância
 * - Rampa de caracteres: " .:-=+*#%@"
 * - Rotação contínua no eixo Y, inclinação com movimento do mouse e aceleração no hover
 * - Pausa automática quando a aba está oculta (visibilitychange)
 * - Fallback para prefers-reduced-motion
 */

import * as THREE from 'three';

export function initAsciiHero(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const preElement = container.querySelector('.ascii-frame') || container;

  // Verifica preferência de redução de movimento do usuário
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Resolução da grade ASCII (colunas x linhas)
  const cols = 78;
  const rows = 36;
  const charRamp = " .:-=+*#%@";
  const rampLength = charRamp.length;

  // 2. Configuração do Three.js em baixa resolução (offscreen)
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(40, cols / (rows * 2), 0.1, 100);
  camera.position.set(0, 0, 6.2);

  // Renderizador offscreen para captura de pixels
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
  renderer.setSize(cols, rows);

  // Canvas 2D auxiliar para leitura rápida de pixels
  const helperCanvas = document.createElement('canvas');
  helperCanvas.width = cols;
  helperCanvas.height = rows;
  const helperCtx = helperCanvas.getContext('2d', { willReadFrequently: true });

  // 3. Iluminação para gerar contraste claro de luminância
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
  dirLight1.position.set(4, 5, 6);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight2.position.set(-4, -3, 3);
  scene.add(dirLight2);

  // 4. Modelagem da Fita Cassete com Primitivas Three.js
  const tapeGroup = new THREE.Group();

  // Materiais
  const shellMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.4 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
  const tapeRollMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.9 });

  // A. Corpo principal da fita (carcaça)
  const bodyGeo = new THREE.BoxGeometry(3.6, 2.3, 0.4);
  const bodyMesh = new THREE.Mesh(bodyGeo, shellMat);
  tapeGroup.add(bodyMesh);

  // B. Base inferior trapezoidal (área de leitura das cabeças)
  const bottomGeo = new THREE.BoxGeometry(2.5, 0.65, 0.44);
  const bottomMesh = new THREE.Mesh(bottomGeo, shellMat);
  bottomMesh.position.set(0, -0.85, 0.01);
  tapeGroup.add(bottomMesh);

  // C. Rebaixo da etiqueta central
  const labelGeo = new THREE.BoxGeometry(3.1, 1.25, 0.43);
  const labelMesh = new THREE.Mesh(labelGeo, whiteMat);
  labelMesh.position.set(0, 0.15, 0.01);
  tapeGroup.add(labelMesh);

  // D. Janela transparente central
  const windowGeo = new THREE.BoxGeometry(1.6, 0.55, 0.46);
  const windowMesh = new THREE.Mesh(windowGeo, darkMat);
  windowMesh.position.set(0, 0.15, 0.02);
  tapeGroup.add(windowMesh);

  // E. Carretéis de fita (esquerdo e direito)
  const spoolGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.5, 20);
  spoolGeo.rotateX(Math.PI / 2);

  const spoolLeft = new THREE.Mesh(spoolGeo, darkMat);
  spoolLeft.position.set(-0.85, 0.15, 0);
  tapeGroup.add(spoolLeft);

  const spoolRight = new THREE.Mesh(spoolGeo, darkMat);
  spoolRight.position.set(0.85, 0.15, 0);
  tapeGroup.add(spoolRight);

  // F. Rolos de fita magnética (bobinas)
  const rollLeftGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.44, 20);
  rollLeftGeo.rotateX(Math.PI / 2);
  const rollLeft = new THREE.Mesh(rollLeftGeo, tapeRollMat);
  rollLeft.position.set(-0.85, 0.15, 0);
  tapeGroup.add(rollLeft);

  const rollRightGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.44, 20);
  rollRightGeo.rotateX(Math.PI / 2);
  const rollRight = new THREE.Mesh(rollRightGeo, tapeRollMat);
  rollRight.position.set(0.85, 0.15, 0);
  tapeGroup.add(rollRight);

  // G. Dentes / raios internos dos carretéis
  const spokeGeo = new THREE.BoxGeometry(0.1, 0.65, 0.52);
  const spokeL1 = new THREE.Mesh(spokeGeo, whiteMat);
  spokeL1.position.copy(spoolLeft.position);
  tapeGroup.add(spokeL1);

  const spokeL2 = new THREE.Mesh(spokeGeo, whiteMat);
  spokeL2.rotation.z = Math.PI / 2;
  spokeL2.position.copy(spoolLeft.position);
  tapeGroup.add(spokeL2);

  const spokeR1 = new THREE.Mesh(spokeGeo, whiteMat);
  spokeR1.position.copy(spoolRight.position);
  tapeGroup.add(spokeR1);

  const spokeR2 = new THREE.Mesh(spokeGeo, whiteMat);
  spokeR2.rotation.z = Math.PI / 2;
  spokeR2.position.copy(spoolRight.position);
  tapeGroup.add(spokeR2);

  // H. Parafusos nos quatro cantos
  const screwGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.46, 8);
  screwGeo.rotateX(Math.PI / 2);
  const corners = [
    [-1.6, 0.95],
    [1.6, 0.95],
    [-1.6, -0.95],
    [1.6, -0.95]
  ];
  corners.forEach(([cx, cy]) => {
    const screw = new THREE.Mesh(screwGeo, darkMat);
    screw.position.set(cx, cy, 0);
    tapeGroup.add(screw);
  });

  // Posição e inclinação inicial charmosa
  tapeGroup.rotation.x = 0.15;
  tapeGroup.rotation.y = -0.3;
  scene.add(tapeGroup);

  // 5. Interações: mouse, hover e rotação
  let mouseX = 0;
  let mouseY = 0;
  let targetTiltX = 0.15;
  let targetTiltY = 0;
  let isHovered = false;
  let isRunning = true;
  let baseSpeed = 0.012;

  // Interação do mouse para inclinação sutil
  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;
    targetTiltX = 0.15 + normY * 0.4;
    targetTiltY = normX * 0.6;
  });

  // Acelera a rotação no hover sobre o card
  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  container.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Pausa a animação quando a aba não estiver visível (economia de recursos)
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
  });

  // 6. Conversão de Frame 3D para ASCII
  function renderAsciiFrame() {
    renderer.render(scene, camera);

    // Transfere os pixels do WebGL para o canvas 2D
    helperCtx.drawImage(renderer.domElement, 0, 0);
    const imgData = helperCtx.getImageData(0, 0, cols, rows).data;

    let asciiOutput = '';
    for (let y = 0; y < rows; y++) {
      let line = '';
      for (let x = 0; x < cols; x++) {
        const offset = (y * cols + x) * 4;
        const r = imgData[offset];
        const g = imgData[offset + 1];
        const b = imgData[offset + 2];

        // Cálculo de luminância perceptiva (padrão ITU-R BT.601)
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const charIndex = Math.min(
          rampLength - 1,
          Math.floor((lum / 255) * rampLength)
        );
        line += charRamp[charIndex];
      }
      asciiOutput += line + '\n';
    }

    preElement.textContent = asciiOutput;
  }

  // 7. Loop de Animação
  function animate() {
    if (!isRunning) {
      requestAnimationFrame(animate);
      return;
    }

    if (!prefersReducedMotion) {
      // Velocidade acelera no hover (de 0.012 para ~0.038)
      const currentSpeed = isHovered ? baseSpeed * 3.2 : baseSpeed;
      tapeGroup.rotation.y += currentSpeed;

      // Amortecimento suave na inclinação pelo mouse
      tapeGroup.rotation.x += (targetTiltX - tapeGroup.rotation.x) * 0.05;
      tapeGroup.position.x += ((targetTiltY * 0.5) - tapeGroup.position.x) * 0.05;

      // Gira os carretéis internos
      spokeL1.rotation.z += currentSpeed * 2.5;
      spokeL2.rotation.z += currentSpeed * 2.5;
      spokeR1.rotation.z += currentSpeed * 2.5;
      spokeR2.rotation.z += currentSpeed * 2.5;
    }

    renderAsciiFrame();

    if (!prefersReducedMotion) {
      requestAnimationFrame(animate);
    }
  }

  // Render inicial ou loop
  if (prefersReducedMotion) {
    tapeGroup.rotation.y = 0.4;
    renderAsciiFrame();
  } else {
    animate();
  }
}

