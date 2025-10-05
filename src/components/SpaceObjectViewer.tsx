import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { SpaceObject } from '../types';
import SphereMesh from './SphereMesh';

interface Props {
  object: SpaceObject;
  showOrbit?: boolean;
  timeScale?: number;
}

export default function SpaceObjectViewer({ object, showOrbit = false, timeScale = 1 }: Props) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <SphereMesh object={object} timeScale={timeScale} showOrbit={showOrbit} />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
