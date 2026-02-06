import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface Lanyard3DProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
}

const Lanyard3D: React.FC<Lanyard3DProps> = ({ 
  position = [0, 0, 20], 
  gravity = [0, -40, 0] 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<THREE.Vector3>(new THREE.Vector3());
  
  const [springs, api] = useSpring(() => ({
    position: position,
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 180, friction: 12 }
  }));

  useFrame((state) => {
    if (groupRef.current && !isDragging) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    const point = e.point as THREE.Vector3;
    if (groupRef.current) {
      setDragOffset(point.clone().sub(groupRef.current.position));
    }
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && groupRef.current) {
      const point = e.point as THREE.Vector3;
      const newPos = point.clone().sub(dragOffset);
      api.start({ position: [newPos.x, newPos.y, newPos.z] });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <animated.group
      ref={groupRef}
      position={springs.position as any}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Lanyard String */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {/* Card */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Card Border */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[1.9, 2.9]} />
        <meshStandardMaterial 
          color="#00f5ff" 
          emissive="#00f5ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Holographic Effect */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.8, 2.8]} />
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Attachment Point */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.8} />
      </mesh>
    </animated.group>
  );
};

export default Lanyard3D;
