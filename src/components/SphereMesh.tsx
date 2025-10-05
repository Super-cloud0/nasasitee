import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { SpaceObject } from '../types';

interface Props {
  object: SpaceObject;
  timeScale: number;
  showOrbit: boolean;
  opacity?: number;
}

export default function SphereMesh({ object, timeScale, showOrbit, opacity = 1 }: Props) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && timeScale > 0) {
      meshRef.current.rotation.y += 0.001 * timeScale;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} scale={object.scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={object.color}
          transparent={opacity < 1}
          opacity={opacity}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {showOrbit && object.physics.orbital_period && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4, 128]} />
          <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
        </mesh>
      )}
    </group>
  );
}
