import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '../types';

interface DomeGalleryProps {
  projects: Project[];
  fit?: number;
  minRadius?: number;
  maxVerticalRotationDeg?: number;
  segments?: number;
  dragDampening?: number;
  grayscale?: boolean;
}

interface DomeProps {
  projects: Project[];
  fit: number;
  minRadius: number;
  maxVerticalRotationDeg: number;
  segments: number;
  dragDampening: number;
  grayscale: boolean;
}

const Dome: React.FC<DomeProps> = ({
  projects,
  fit,
  minRadius,
  maxVerticalRotationDeg,
  segments,
  dragDampening,
  grayscale,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const dragStart = useRef({ x: 0, rotation: 0 });
  const { size, camera } = useThree();

  // Position projects in a dome/hemisphere
  const projectPositions = useMemo(() => {
    const radius = minRadius;
    const positions: Array<{ position: [number, number, number]; rotation: [number, number, number]; project: Project }> = [];
    
    projects.forEach((project, i) => {
      const angle = (i / projects.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0; // Keep flat for now
      
      positions.push({
        position: [x, y, z],
        rotation: [0, -angle, 0],
        project,
      });
    });
    
    return positions;
  }, [projects, minRadius]);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      const currentRotation = groupRef.current.rotation.y;
      const diff = targetRotation - currentRotation;
      groupRef.current.rotation.y += diff * 0.1;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      rotation: targetRotation,
    };
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.current.x;
    const rotationDelta = (deltaX / size.width) * Math.PI * 2 / dragDampening;
    setTargetRotation(dragStart.current.rotation + rotationDelta);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {projectPositions.map(({ position, rotation, project }, index) => (
        <ProjectPanel
          key={project.id}
          position={position}
          rotation={rotation}
          project={project}
          grayscale={grayscale}
        />
      ))}
    </group>
  );
};

interface ProjectPanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  project: Project;
  grayscale: boolean;
}

const ProjectPanel: React.FC<ProjectPanelProps> = ({ position, rotation, project, grayscale }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  // Create texture from project image
  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Initial background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 512, 512);
    
    // Border
    ctx.strokeStyle = '#5227FF';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, 492, 492);
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(project.title, 256, 256);
    
    // Tech stack
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px Arial';
    const techText = project.techStack.join(' • ');
    ctx.fillText(techText, 256, 320);
    
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.needsUpdate = true;
    setTexture(newTexture);
    
    return () => {
      newTexture.dispose();
    };
  }, [project, grayscale])

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[300, 400]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        emissive={hovered ? '#5227FF' : '#000000'}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
};

const DomeGallery: React.FC<DomeGalleryProps> = ({
  projects,
  fit = 0.8,
  minRadius = 600,
  maxVerticalRotationDeg = 0,
  segments = 34,
  dragDampening = 2,
  grayscale = false,
}) => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#020202' }}>
      <Canvas
        camera={{ position: [0, 0, 800], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Dome
          projects={projects}
          fit={fit}
          minRadius={minRadius}
          maxVerticalRotationDeg={maxVerticalRotationDeg}
          segments={segments}
          dragDampening={dragDampening}
          grayscale={grayscale}
        />
      </Canvas>
    </div>
  );
};

export default DomeGallery;
