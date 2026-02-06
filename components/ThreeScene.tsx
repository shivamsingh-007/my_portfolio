
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Lanyard from './LanyardProceduralCard';

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

const ThreeScene: React.FC = () => {
  // You can change this to the path of your anime image
  const cardImageUrl = '/anime-card.jpg'; // Place your anime image in the public folder
  
  return (
    <div className="absolute inset-0 -z-1 pointer-events-auto opacity-40">
      <Lanyard 
        position={[0, 0, 24]} 
        gravity={[0, -40, 0]} 
        cardImage={cardImageUrl}
      />
    </div>
  );
};

export default ThreeScene;
