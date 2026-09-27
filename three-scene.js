// Interactive 3D WebGL background using Three.js
(function() {
  const container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // 1. Scene & Camera setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050811, 0.032);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 14);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 2. Cyberpunk Atmospheric Lighting
  const ambient = new THREE.AmbientLight(0x0a101d, 1.4);
  scene.add(ambient);

  const cyanKey = new THREE.PointLight(0x00f0ff, 2.5, 35);
  cyanKey.position.set(6, 8, 4);
  scene.add(cyanKey);

  const magentaRim = new THREE.PointLight(0xff007f, 2.2, 30);
  magentaRim.position.set(-10, 4, 2);
  scene.add(magentaRim);

  const purpleFill = new THREE.PointLight(0x8b5cf6, 1.8, 25);
  purpleFill.position.set(0, -3, 6);
  scene.add(purpleFill);

  // 3. Cyber Perspective Floor Grid
  const grid = new THREE.GridHelper(70, 70, 0x00f0ff, 0x1e293b);
  grid.position.y = -2.8;
  grid.material.opacity = 0.28;
  grid.material.transparent = true;
  scene.add(grid);

  // 4. Floating 3D Stardust Particle Field (800+ Nodes)
  const particleCount = 850;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colCyan = new THREE.Color(0x00f0ff);
  const colPurple = new THREE.Color(0x8b5cf6);
  const colWhite = new THREE.Color(0xffffff);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 55;
    positions[i + 1] = Math.random() * 24 - 4;
    positions[i + 2] = (Math.random() - 0.5) * 45;

    const rand = Math.random();
    const c = rand > 0.5 ? colCyan : (rand > 0.25 ? colPurple : colWhite);
    colors[i] = c.r;
    colors[i + 1] = c.g;
    colors[i + 2] = c.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // 5. Ambient Cyber Orbital Rings (positioned in deep background)
  const orbitGroup = new THREE.Group();
  orbitGroup.position.set(-6, 1.5, -4);

  const ringGeo1 = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  orbitGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(2.2, 0.015, 16, 80);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xff007f,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  orbitGroup.add(ring2);

  const coreGeo = new THREE.IcosahedronGeometry(0.7, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  orbitGroup.add(core);

  scene.add(orbitGroup);

  // 6. Smooth Inertial Mouse Parallax Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCamX = mouseX * 2.2;
    targetCamY = 2 + mouseY * 1.2;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetCamX = mouseX * 1.2;
      targetCamY = 2 + mouseY * 0.7;
    }
  }, { passive: true });

  // 7. Responsive Viewport Handler
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener('resize', handleResize);

  // 8. Animation & Render Loop
  const clock = new THREE.Clock();

  function loop() {
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    // Smooth camera damping
    camera.position.x += (targetCamX - camera.position.x) * 0.045;
    camera.position.y += (targetCamY - camera.position.y) * 0.045;
    camera.lookAt(0, 0.5, 0);

    // Subtle cosmic rotations
    particles.rotation.y = t * 0.02;
    particles.rotation.x = t * 0.01;

    ring1.rotation.x = t * 0.3;
    ring1.rotation.y = t * 0.4;
    ring2.rotation.y = -t * 0.35;
    ring2.rotation.z = t * 0.25;
    core.rotation.x = t * 0.5;
    core.rotation.y = t * 0.7;

    renderer.render(scene, camera);
  }
  loop();
})();
