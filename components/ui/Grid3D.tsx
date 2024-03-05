import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from "three";

const division = 20;
const limit = 100;

const moveable: number[] = [];
for (let i = 0; i <= division; i++) {
  moveable.push(1, 1, 0, 0);
}

const vertexShader = `
  uniform float offset;
  uniform vec2 limits;

  attribute float moveable;

  varying vec3 vColor;

  void main() {
    vColor = color;
    float limLen = limits.y - limits.x;
    vec3 pos = position;
    if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1
      float currPos = mod((pos.z + offset) - limits.x, limLen) + limits.x;
      pos.z = currPos;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const fragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.);
  }
`;

const Grid3DScene = () => {
  const gridRef = useRef<THREE.GridHelper>(null!);
  const time = useRef(0);

  const uniforms = useMemo(
    () => ({
      offset: {
        value: 0,
      },
      limits: {
        value: new THREE.Vector2(-limit, limit),
      },
    }),
    []
  );

  useFrame((state) => {
    time.current += state.clock.getDelta();
    (gridRef as any).current.material.uniforms.offset.value += time.current;
  })

  return (
    <gridHelper ref={gridRef} args={[limit * 2, division, "#A3F5AA", "#A3F5AA"]}>
      <bufferAttribute attach="geometry-attributes-moveable" args={[new Uint8Array(moveable), 1]} />
      <shaderMaterial attach="material" uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} vertexColors={true} />
    </gridHelper>
  )
}

const Grid3D = () => {
  return (
    <Canvas camera={{ position: [0, 10, 50] }}>
      <Grid3DScene />
    </Canvas>
  );
};

export default Grid3D;
