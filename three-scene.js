/**
 * ============================================================================
 * 3D CYBERPUNK WEBGL SCENE — THREE.JS ENGINE
 * Features:
 * - 3D Cyber Desk & Laptop with glowing animated code matrix on screen
 * - Holographic projection beam & spinning data polyhedron
 * - 3D Cyberpunk Infinite Perspective Grid Floor
 * - 800+ Particle Starfield Dust with organic float physics
 * - Smooth inertial mouse parallax camera tracking (lerp damping)
 * ============================================================================
 */

(function init3DScene() {
  const container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') {
    console.warn('[3D Scene] Three.js not loaded or container not found.');
    return;
  }

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050811, 0.035);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 14);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 2. Lighting
  const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
  scene.add(ambientLight);

  // Cyber Cyan Spot Light over desk
  const spotLightCyan = new THREE.SpotLight(0x00f0ff, 4, 30, Math.PI / 4, 0.5, 1);
  spotLightCyan.position.set(4, 12, 6);
  scene.add(spotLightCyan);

  // Magenta Rim Light
  const pointLightMagenta = new THREE.PointLight(0xff007f, 3, 25);
  pointLightMagenta.position.set(-8, 5, 2);
  scene.add(pointLightMagenta);

  // Indigo Fill Light
  const pointLightIndigo = new THREE.PointLight(0x8b5cf6, 2, 20);
  pointLightIndigo.position.set(0, -2, 8);
  scene.add(pointLightIndigo);

  // 3. Cyber Grid Floor
  const gridHelper = new THREE.GridHelper(60, 60, 0x00f0ff, 0x1e293b);
  gridHelper.position.y = -2;
  gridHelper.material.opacity = 0.35;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // 4. 3D Floating Cyber Particles (Data Dust)
  const particleCount = 750;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const cyanColor = new THREE.Color(0x00f0ff);
  const purpleColor = new THREE.Color(0x8b5cf6);
  const whiteColor = new THREE.Color(0xffffff);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 50;
    particlePositions[i + 1] = Math.random() * 25 - 4;
    particlePositions[i + 2] = (Math.random() - 0.5) * 40;

    const chosenColor = Math.random() > 0.5 ? cyanColor : (Math.random() > 0.3 ? purpleColor : whiteColor);
    particleColors[i] = chosenColor.r;
    particleColors[i + 1] = chosenColor.g;
    particleColors[i + 2] = chosenColor.b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.14,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // 5. 3D Developer Workstation & Laptop Model (Procedural Geometry)
  const workstationGroup = new THREE.Group();
  workstationGroup.position.set(3.8, -0.6, 2);
  workstationGroup.rotation.y = -0.35;

  // Desk Base
  const deskGeo = new THREE.BoxGeometry(6.5, 0.18, 3.2);
  const deskMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    metalness: 0.8,
    roughness: 0.2
  });
  const desk = new THREE.Mesh(deskGeo, deskMat);
  desk.position.y = 0;
  workstationGroup.add(desk);

  // Glowing Edge Strip on Desk
  const edgeGeo = new THREE.BoxGeometry(6.52, 0.04, 0.05);
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const edgeStrip = new THREE.Mesh(edgeGeo, edgeMat);
  edgeStrip.position.set(0, 0.08, 1.6);
  workstationGroup.add(edgeStrip);

  // Laptop Base (Bottom chassis)
  const laptopBaseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.7);
  const laptopMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.1 });
  const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
  laptopBase.position.set(0, 0.12, 0.3);
  workstationGroup.add(laptopBase);

  // Keyboard Glowing Matrix (Grid of emissive keys)
  const kbGeo = new THREE.PlaneGeometry(2.0, 1.0);
  const kbMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 });
  const keyboard = new THREE.Mesh(kbGeo, kbMat);
  keyboard.rotation.x = -Math.PI / 2;
  keyboard.position.set(0, 0.17, 0.35);
  workstationGroup.add(keyboard);

  // Laptop Screen Lid (Angled back 110 degrees)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.15, -0.55);

  const lidGeo = new THREE.BoxGeometry(2.4, 1.5, 0.06);
  const lid = new THREE.Mesh(lidGeo, laptopMat);
  lid.position.set(0, 0.75, 0);
  lidGroup.add(lid);

  // Glowing Screen with Code Canvas Texture
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 320;
  const ctx = screenCanvas.getContext('2d');
  
  function updateScreenCanvas(time) {
    ctx.fillStyle = '#050a14';
    ctx.fillRect(0, 0, 512, 320);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('// RISHABH.DEV — CYBER STATION 2026', 20, 35);

    ctx.fillStyle = '#34d399';
    ctx.font = '13px monospace';
    ctx.fillText('> SYSTEM_STATUS: 100% ONLINE (READY TO HIRE)', 20, 65);
    ctx.fillText('> CORE: React.js • Python • PHP • Gemini AI', 20, 90);
    ctx.fillText('> BUILDS: RishuShop | VoiceAI | Key-Jutsu', 20, 115);

    // Matrix Rain Effect on Laptop Screen
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.font = '12px monospace';
    const lines = [
      'const dev = new FullStackDeveloper("Rishabh");',
      'await dev.launchInteractiveShowcase();',
      'git commit -m "feat: scalable enterprise apps"',
      'HTTP 200 OK — Ready for SDE / Web Internships'
    ];
    lines.forEach((line, idx) => {
      ctx.fillText(line, 20, 160 + idx * 25);
    });

    // Blinking Prompt Cursor
    if (Math.floor(time * 2) % 2 === 0) {
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(20, 260, 12, 18);
    }
  }

  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  const screenGeo = new THREE.PlaneGeometry(2.25, 1.35);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.75, 0.04);
  lidGroup.add(screen);

  lidGroup.rotation.x = -0.25; // 105 deg open
  workstationGroup.add(lidGroup);

  // Holographic Beam Emitter
  const beamGeo = new THREE.ConeGeometry(1.6, 3.5, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.15,
    wireframe: true,
    side: THREE.DoubleSide
  });
  const holoBeam = new THREE.Mesh(beamGeo, beamMat);
  holoBeam.position.set(0, 2.2, 0);
  holoBeam.rotation.x = Math.PI;
  workstationGroup.add(holoBeam);

  // Spinning Holographic Polyhedron (Data Core)
  const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const dataCore = new THREE.Mesh(coreGeo, coreMat);
  dataCore.position.set(0, 2.5, 0);
  workstationGroup.add(dataCore);

  scene.add(workstationGroup);

  // 6. Interactive Floating Tech Rings in Background Left
  const ringGroup = new THREE.Group();
  ringGroup.position.set(-7, 2, -2);

  const ringGeo1 = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.4 });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(1.5, 0.02, 16, 80);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true, transparent: true, opacity: 0.35 });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringGroup.add(ring2);

  scene.add(ringGroup);

  // 7. Mouse Parallax Handling
  let mouseX = 0;
  let mouseY = 0;
  let targetCameraX = 0;
  let targetCameraY = 3;

  function onMouseMove(event) {
    // Normalized coordinates (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    targetCameraX = mouseX * 2.5;
    targetCameraY = 3 + mouseY * 1.5;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Touch parallax for mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetCameraX = mouseX * 1.5;
      targetCameraY = 3 + mouseY * 1.0;
    }
  }, { passive: true });

  // Resize Handler
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Responsive position of 3D workstation
    if (window.innerWidth < 992) {
      workstationGroup.position.set(0, -1.2, 0);
      workstationGroup.scale.set(0.75, 0.75, 0.75);
    } else {
      workstationGroup.position.set(3.8, -0.6, 2);
      workstationGroup.scale.set(1, 1, 1);
    }
  }
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  // 8. Animation Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth Camera Lerp (Inertial damping)
    camera.position.x += (targetCameraX - camera.position.x) * 0.045;
    camera.position.y += (targetCameraY - camera.position.y) * 0.045;
    camera.lookAt(0, 0.8, 0);

    // Subtle breathing animation for desk
    workstationGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.0015;

    // Spin Holographic Core & Rings
    dataCore.rotation.x = elapsedTime * 0.8;
    dataCore.rotation.y = elapsedTime * 1.2;

    holoBeam.rotation.y = -elapsedTime * 0.5;

    ring1.rotation.x = elapsedTime * 0.4;
    ring1.rotation.y = elapsedTime * 0.6;
    ring2.rotation.y = -elapsedTime * 0.5;
    ring2.rotation.z = elapsedTime * 0.3;

    // Slowly drift particles
    particleSystem.rotation.y = elapsedTime * 0.02;

    // Update screen code canvas
    updateScreenCanvas(elapsedTime);
    screenTexture.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
})();
