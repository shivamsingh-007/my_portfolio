
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const points = useRef<THREE.Points>(null!);
  const count = 5000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const FloatingCore = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f5ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          emissive="#00f5ff"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-1 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00f5ff" />
        <FloatingCore />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
