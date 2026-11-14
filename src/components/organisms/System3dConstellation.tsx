import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Node3DData {
  id: string; // 'cu-01'..'cu-16' or actor id
  label: string;
  type: 'core' | 'actor' | 'usecase';
  color: string;
  role?: string;
  epic?: string;
  x: number;
  y: number;
  z: number;
  size: number;
}

interface System3dConstellationProps {
  selectedCaseId?: string;
  onSelectCaseId?: (id: string) => void;
}

export function System3dConstellation({
  selectedCaseId,
  onSelectCaseId,
}: System3dConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node3DData | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 520;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate 900 background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 35, 110);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2.5, 200);
    pointLight.position.set(0, 20, 0);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 200);
    pointLight2.position.set(40, -20, 30);
    scene.add(pointLight2);

    // 3. Central System Core (Faroo Lighthouse Nucleus)
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const coreGeo = new THREE.SphereGeometry(4.5, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.userData = { id: 'core', label: 'FAROO CORE BACKEND', type: 'core' };
    systemGroup.add(coreMesh);

    // Orbital ring 1
    const ring1Geo = new THREE.TorusGeometry(32, 0.25, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    systemGroup.add(ring1);

    // Orbital ring 2
    const ring2Geo = new THREE.TorusGeometry(52, 0.2, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.6 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.3;
    systemGroup.add(ring2);

    // Star field particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 300;
      particlePositions[i + 1] = (Math.random() - 0.5) * 200;
      particlePositions[i + 2] = (Math.random() - 0.5) * 300;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x64748b, size: 1.2, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Data nodes
    const actors: Node3DData[] = [
      { id: 'actor-prop', label: 'Actor: Propietario', type: 'actor', color: '#2563EB', x: -32, y: 8, z: -10, size: 3.2 },
      { id: 'actor-inq', label: 'Actor: Inquilino', type: 'actor', color: '#059669', x: -28, y: -10, z: 22, size: 3.2 },
      { id: 'actor-adm', label: 'Actor: Administrador', type: 'actor', color: '#7C3AED', x: 34, y: 12, z: -12, size: 3.2 },
      { id: 'actor-sop', label: 'Actor: Soporte', type: 'actor', color: '#D97706', x: 32, y: -12, z: 20, size: 3.2 },
    ];

    const useCasesData: Node3DData[] = [
      { id: 'cu-01', label: 'CU-01: Registrar Inmueble', type: 'usecase', color: '#3B82F6', role: 'Propietario / Admin', epic: 'Épica 1', x: -18, y: 16, z: -25, size: 2.2 },
      { id: 'cu-02', label: 'CU-02: Consultar Ocupación', type: 'usecase', color: '#3B82F6', role: 'Propietario / Admin', epic: 'Épica 1', x: -38, y: 18, z: -18, size: 2.2 },
      { id: 'cu-03', label: 'CU-03: Ficha Detallada', type: 'usecase', color: '#3B82F6', role: 'Propietario / Admin', epic: 'Épica 1', x: -10, y: 22, z: -14, size: 2.2 },

      { id: 'cu-04', label: 'CU-04: Registrar Inquilino', type: 'usecase', color: '#8B5CF6', role: 'Administrador', epic: 'Épica 2', x: 18, y: 18, z: -28, size: 2.2 },
      { id: 'cu-05', label: 'CU-05: Asignar Fiador', type: 'usecase', color: '#8B5CF6', role: 'Administrador', epic: 'Épica 2', x: 38, y: 22, z: -22, size: 2.2 },
      { id: 'cu-15', label: 'CU-15: Actualizar Contacto', type: 'usecase', color: '#D97706', role: 'Soporte', epic: 'Épica 2', x: 44, y: -2, z: 12, size: 2.2 },

      { id: 'cu-06', label: 'CU-06: Radicar Contrato', type: 'usecase', color: '#60A5FA', role: 'Administrador', epic: 'Épica 3', x: 24, y: 8, z: -35, size: 2.2 },
      { id: 'cu-07', label: 'CU-07: Evaluar Riesgo', type: 'usecase', color: '#60A5FA', role: 'Administrador', epic: 'Épica 3', x: 42, y: 4, z: -28, size: 2.2 },

      { id: 'cu-08', label: 'CU-08: Generar Cobro', type: 'usecase', color: '#94A3B8', role: 'Admin / Propietario', epic: 'Épica 4', x: -14, y: 4, z: 32, size: 2.2 },
      { id: 'cu-09', label: 'CU-09: Resumen Financiero', type: 'usecase', color: '#94A3B8', role: 'Admin / Propietario', epic: 'Épica 4', x: 12, y: -4, z: 34, size: 2.2 },

      { id: 'cu-10', label: 'CU-10: Cargar Comprobante', type: 'usecase', color: '#10B981', role: 'Inquilino', epic: 'Épica 5', x: -36, y: -16, z: 30, size: 2.5 },
      { id: 'cu-11', label: 'CU-11: Conciliar Pagos', type: 'usecase', color: '#A78BFA', role: 'Administrador', epic: 'Épica 5', x: 22, y: -8, z: 28, size: 2.5 },
      { id: 'cu-12', label: 'CU-12: Recibo en PDF', type: 'usecase', color: '#10B981', role: 'Inquilino', epic: 'Épica 5', x: -18, y: -22, z: 24, size: 2.2 },
      { id: 'cu-16', label: 'CU-16: Devolver Ilegible', type: 'usecase', color: '#D97706', role: 'Soporte', epic: 'Épica 5', x: 40, y: -20, z: 24, size: 2.2 },

      { id: 'cu-13', label: 'CU-13: Semáforo Morosidad', type: 'usecase', color: '#F59E0B', role: 'Admin / Propietario', epic: 'Épica 6', x: -26, y: -2, z: -30, size: 2.2 },
      { id: 'cu-14', label: 'CU-14: Alerta WhatsApp', type: 'usecase', color: '#F59E0B', role: 'Admin / Propietario', epic: 'Épica 6', x: -8, y: -12, z: -32, size: 2.2 },
    ];

    const allNodes = [...actors, ...useCasesData];
    const meshMap = new Map<string, THREE.Mesh>();

    allNodes.forEach((node) => {
      const geo = new THREE.SphereGeometry(node.size, 24, 24);
      const isSelected = selectedCaseId === node.id;
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: isSelected ? 0.8 : 0.35,
        roughness: 0.3,
        metalness: 0.5,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = node;
      systemGroup.add(mesh);
      meshMap.set(node.id, mesh);
    });

    // 5. Connecting Lines (Graph Links)
    const linePairs: [string, string][] = [
      ['actor-prop', 'cu-01'],
      ['actor-prop', 'cu-02'],
      ['actor-prop', 'cu-08'],
      ['actor-prop', 'cu-13'],
      ['actor-inq', 'cu-10'],
      ['actor-inq', 'cu-12'],
      ['actor-adm', 'cu-01'],
      ['actor-adm', 'cu-03'],
      ['actor-adm', 'cu-04'],
      ['actor-adm', 'cu-05'],
      ['actor-adm', 'cu-06'],
      ['actor-adm', 'cu-07'],
      ['actor-adm', 'cu-08'],
      ['actor-adm', 'cu-09'],
      ['actor-adm', 'cu-11'],
      ['actor-sop', 'cu-15'],
      ['actor-sop', 'cu-16'],
      ['cu-11', 'cu-12'], // Include
      ['cu-16', 'cu-11'], // Extend
      ['cu-14', 'cu-13'], // Extend
    ];

    const linePoints: number[] = [];
    linePairs.forEach(([fromId, toId]) => {
      const fromNode = allNodes.find((n) => n.id === fromId);
      const toNode = allNodes.find((n) => n.id === toId);
      if (fromNode && toNode) {
        linePoints.push(fromNode.x, fromNode.y, fromNode.z);
        linePoints.push(toNode.x, toNode.y, toNode.z);
      }
    });

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.45,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    systemGroup.add(linesMesh);

    // 6. Interactive Raycasting & Mouse Controls
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        systemGroup.rotation.y += deltaX * 0.008;
        systemGroup.rotation.x += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(systemGroup.children);
      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData as Node3DData;
        if (hitData && hitData.id && hitData.id.startsWith('cu-')) {
          onSelectCaseId?.(hitData.id);
          const el = document.getElementById('doc-casos-uso');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('mousemove', onMouseMove);
    dom.addEventListener('click', onClick);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging) {
        systemGroup.rotation.y += delta * 0.15;
      }

      // Gentle floating core pulse
      const t = clock.getElapsedTime();
      coreMesh.scale.setScalar(1 + Math.sin(t * 2) * 0.05);

      // Raycast hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(systemGroup.children);

      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData as Node3DData;
        if (hitData && hitData.label) {
          setHoveredNode(hitData);
          dom.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode(null);
        dom.style.cursor = 'grab';
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };
    window.addEventListener('resize', onResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousemove', onMouseMove);
      dom.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (dom.parentElement === container) {
        container.removeChild(dom);
      }
    };
  }, [selectedCaseId, onSelectCaseId, isRotating]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-slate-900 shadow-xl select-none">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-[520px]" />

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 font-mono text-[11px] text-sky-400 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          Three.js v187 · Constelación 3D
        </span>
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs text-slate-300 backdrop-blur-md transition-colors hover:border-slate-500 hover:text-white"
        >
          {isRotating ? '⏸ Pausar rotación' : '▶ Reanudar rotación'}
        </button>
      </div>

      {/* Instructions & Node Counter */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-400 backdrop-blur-md">
        <span>Arrastra con el mouse para rotar en 3D</span>
      </div>

      {/* Hovered Node Overlay Card */}
      {hoveredNode && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 rounded-xl border border-sky-500/40 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-md transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              {hoveredNode.type === 'actor' ? 'Actor Externo' : hoveredNode.type === 'core' ? 'Núcleo Central' : 'Caso de Uso UML'}
            </span>
            {hoveredNode.epic && (
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {hoveredNode.epic}
              </span>
            )}
          </div>
          <h4 className="mt-1 text-sm font-semibold text-white">
            {hoveredNode.label}
          </h4>
          {hoveredNode.role && (
            <p className="mt-1 text-xs text-slate-300">
              Actor responsable: <strong className="text-white">{hoveredNode.role}</strong>
            </p>
          )}
          {hoveredNode.id.startsWith('cu-') && (
            <div className="mt-2 text-[11px] text-sky-300/80">
              ⚡ Haz clic para abrir la ficha técnica formal 6.3
            </div>
          )}
        </div>
      )}

      {/* Bottom Legend */}
      <div className="absolute bottom-3 right-4 z-10 hidden md:flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-400 backdrop-blur-md">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500" /> Propietario
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Inquilino
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-purple-500" /> Administrador
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> Soporte
        </span>
      </div>
    </div>
  );
}
