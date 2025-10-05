import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { SpaceObject } from '../types';
import SphereMesh from './SphereMesh';

interface Props {
  object1: SpaceObject;
  object2: SpaceObject;
  mode: 'side-by-side' | 'overlay';
  timeScale?: number;
}

export default function ComparisonView({ object1, object2, mode, timeScale = 1 }: Props) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {mode === 'side-by-side' ? (
          <>
            <group position={[-3, 0, 0]}>
              <SphereMesh object={object1} timeScale={timeScale} showOrbit={false} />
            </group>
            <group position={[3, 0, 0]}>
              <SphereMesh object={object2} timeScale={timeScale} showOrbit={false} />
            </group>
          </>
        ) : (
          <>
            <SphereMesh object={object1} timeScale={timeScale} showOrbit={false} opacity={0.5} />
            <SphereMesh object={object2} timeScale={timeScale} showOrbit={false} opacity={0.5} />
          </>
        )}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
