// Three.js interactive 3D WebGL hero background
(function() {
  const container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050811, 0.035);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 14);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0x0f172a, 1.2);
  scene.add(ambient);

  const cyanSpot = new THREE.SpotLight(0x00f0ff, 4, 30, Math.PI / 4, 0.5, 1);
  cyanSpot.position.set(4, 12, 6);
  scene.add(cyanSpot);

  const magentaRim = new THREE.PointLight(0xff007f, 3, 25);
  magentaRim.position.set(-8, 5, 2);
  scene.add(magentaRim);

  const purpleFill = new THREE.PointLight(0x8b5cf6, 2, 20);
  purpleFill.position.set(0, -2, 8);
  scene.add(purpleFill);

  // Perspective floor grid
  const grid = new THREE.GridHelper(60, 60, 0x00f0ff, 0x1e293b);
  grid.position.y = -2;
  grid.material.opacity = 0.35;
  grid.material.transparent = true;
  scene.add(grid);

  // Ambient floating dust particles
  const particleCount = 700;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colCyan = new THREE.Color(0x00f0ff);
  const colPurple = new THREE.Color(0x8b5cf6);
  const colWhite = new THREE.Color(0xffffff);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = Math.random() * 25 - 4;
    positions[i + 2] = (Math.random() - 0.5) * 40;

    const c = Math.random() > 0.5 ? colCyan : (Math.random() > 0.3 ? colPurple : colWhite);
    colors[i] = c.r;
    colors[i + 1] = c.g;
    colors[i + 2] = c.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.13,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Workstation group (desk + laptop + holographic projector)
  const workstation = new THREE.Group();
  workstation.position.set(3.8, -0.6, 2);
  workstation.rotation.y = -0.35;

  // Desk geometry
  const deskMat = new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.8, roughness: 0.2 });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.18, 3.2), deskMat);
  workstation.add(desk);

  // Cyan neon front edge
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const edgeStrip = new THREE.Mesh(new THREE.BoxGeometry(6.52, 0.04, 0.05), edgeMat);
  edgeStrip.position.set(0, 0.08, 1.6);
  workstation.add(edgeStrip);

  // Laptop chassis
  const laptopMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.1 });
  const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.7), laptopMat);
  laptopBase.position.set(0, 0.12, 0.3);
  workstation.add(laptopBase);

  // Keyboard grid
  const kbMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.55 });
  const keyboard = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.0), kbMat);
  keyboard.rotation.x = -Math.PI / 2;
  keyboard.position.set(0, 0.17, 0.35);
  workstation.add(keyboard);

  // Laptop screen lid
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.15, -0.55);

  const lid = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.5, 0.06), laptopMat);
  lid.position.set(0, 0.75, 0);
  lidGroup.add(lid);

  // Canvas texture for live screen simulation
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 320;
  const ctx = screenCanvas.getContext('2d');

  function renderScreen(time) {
    ctx.fillStyle = '#050a14';
    ctx.fillRect(0, 0, 512, 320);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('// Rishabh Yadav — Cyber Station', 20, 35);

    ctx.fillStyle = '#34d399';
    ctx.font = '13px monospace';
    ctx.fillText('> SYSTEM_STATUS: READY FOR INTERNSHIP', 20, 65);
    ctx.fillText('> STACK: JS (ES6+) • Python • PHP • Gemini AI', 20, 90);
    ctx.fillText('> BUILDS: RishuShop | VoiceAI | Key-Jutsu', 20, 115);

    ctx.fillStyle = 'rgba(0, 240, 255, 0.65)';
    ctx.font = '12px monospace';
    const lines = [
      'const dev = new SoftwareEngineer("Rishabh");',
      'await dev.deployProjectsToCloud();',
      'git commit -m "feat: high performance web apps"',
      'Live worldwide: https://rishu-builds.github.io'
    ];
    lines.forEach((l, i) => ctx.fillText(l, 20, 160 + i * 25));

    if (Math.floor(time * 2) % 2 === 0) {
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(20, 260, 12, 18);
    }
  }

  const screenTex = new THREE.CanvasTexture(screenCanvas);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.25, 1.35), new THREE.MeshBasicMaterial({ map: screenTex }));
  screen.position.set(0, 0.75, 0.04);
  lidGroup.add(screen);

  lidGroup.rotation.x = -0.25;
  workstation.add(lidGroup);

  // Hologram emitter beam
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.15, wireframe: true, side: THREE.DoubleSide });
  const holoBeam = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.5, 16, 1, true), beamMat);
  holoBeam.position.set(0, 2.2, 0);
  holoBeam.rotation.x = Math.PI;
  workstation.add(holoBeam);

  // Spinning polyhedron core
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.75 });
  const dataCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), coreMat);
  dataCore.position.set(0, 2.5, 0);
  workstation.add(dataCore);

  scene.add(workstation);

  // Floating background geometry
  const ringGroup = new THREE.Group();
  ringGroup.position.set(-7, 2, -2);

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.03, 16, 100), new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.35 }));
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.02, 16, 80), new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true, transparent: true, opacity: 0.3 }));
  ringGroup.add(ring1);
  ringGroup.add(ring2);
  scene.add(ringGroup);

  // Mouse parallax tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 3;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCamX = mouseX * 2.2;
    targetCamY = 3 + mouseY * 1.3;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetCamX = mouseX * 1.2;
      targetCamY = 3 + mouseY * 0.8;
    }
  }, { passive: true });

  // Responsive layout sync
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (window.innerWidth < 992) {
      workstation.position.set(0, -1.2, 0);
      workstation.scale.set(0.75, 0.75, 0.75);
    } else {
      workstation.position.set(3.8, -0.6, 2);
      workstation.scale.set(1, 1, 1);
    }
  };
  window.addEventListener('resize', handleResize);
  handleResize();

  // Render loop
  const clock = new THREE.Clock();

  function loop() {
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    // Inertial camera damping
    camera.position.x += (targetCamX - camera.position.x) * 0.045;
    camera.position.y += (targetCamY - camera.position.y) * 0.045;
    camera.lookAt(0, 0.8, 0);

    // Subtle idle float
    workstation.position.y += Math.sin(t * 1.5) * 0.0015;

    // Rotations
    dataCore.rotation.x = t * 0.8;
    dataCore.rotation.y = t * 1.2;
    holoBeam.rotation.y = -t * 0.5;

    ring1.rotation.x = t * 0.4;
    ring1.rotation.y = t * 0.6;
    ring2.rotation.y = -t * 0.5;
    ring2.rotation.z = t * 0.3;

    particles.rotation.y = t * 0.02;

    renderScreen(t);
    screenTex.needsUpdate = true;

    renderer.render(scene, camera);
  }
  loop();
})();
