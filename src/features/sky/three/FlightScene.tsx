import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Center, Sparkles, Text3D } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  DoubleSide,
  Group,
  TextureLoader,
  SRGBColorSpace,
  InstancedMesh,
  Object3D,
} from "three";

import paperUrl from "../assets/paper-texture.svg?no-inline";
const faces = [
  [135, 202, 0, 507, 97, 12, 259, 260, 23],
  [259, 260, 23, 507, 97, 12, 287, 340, -16],
  [287, 340, -16, 507, 97, 12, 315, 295, 3],
  [275, 260, 18, 507, 97, 12, 348, 328, 17],
];
const colors = ["#f6e5ca", "#b99782", "#825b53", "#e4cdb2"];
function CloudBank() {
  const ref = useRef<InstancedMesh>(null);
  useEffect(() => {
    const sample = new Object3D();
    const clouds = [
      [-215, -53, 0, 8],
      [-205, -48, 0, 12],
      [-193, -53, 0, 9],
      [162, 87, 0, 6],
      [170, 90, 0, 9],
      [179, 87, 0, 6],
    ];
    clouds.forEach(([x, y, z, r], i) => {
      sample.position.set(x, y, z);
      sample.scale.set(r * 1.45, r * 0.66, r);
      sample.updateMatrix();
      ref.current?.setMatrixAt(i, sample.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 6]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#a16a79" flatShading roughness={0.8} />
    </instancedMesh>
  );
}
export type FlightControl = {
  yaw: number;
  pitch: number;
  paused: boolean;
  dragging: boolean;
};
function Aircraft({ control }: { control: React.RefObject<FlightControl> }) {
  const group = useRef<Group>(null);
  const size = useThree((s) => s.viewport);
  const source = useLoader(TextureLoader, paperUrl);
  const paper = useMemo(() => {
    const texture = source.clone();
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [source]);
  useEffect(() => () => paper.dispose(), [paper]);
  useEffect(() => {
    const atlas = document.querySelector(".atlas");
    atlas?.classList.add("has-plane");
    return () => atlas?.classList.remove("has-plane");
  }, []);
  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y =
        (control.current?.yaw ?? 0) +
        (control.current?.paused
          ? 0
          : Math.sin(clock.elapsedTime * 0.45) * 0.11 + pointer.x * 0.09);
      group.current.rotation.x =
        (control.current?.pitch ?? 0) + (control.current?.paused ? 0 : pointer.y * 0.08);
      group.current.position.y =
        (((control.current?.paused ? 0 : Math.sin(clock.elapsedTime * 0.8) * 7) +
          Math.min(scrollY, 700) * 0.09) *
          size.width) /
        620;
    }
  });
  return (
    <group ref={group} scale={size.width / 620}>
      <group position={[0, -12, -20]} rotation={[1.07, 0, -0.45]}>
        <mesh>
          <torusGeometry args={[156, 43, 14, 64]} />
          <meshBasicMaterial color="#c9a66b" wireframe transparent opacity={0.68} />
        </mesh>
        <mesh rotation={[0.35, 0.3, 0]}>
          <torusGeometry args={[246, 0.45, 4, 130]} />
          <meshBasicMaterial color="#c9a66b" transparent opacity={0.45} />
        </mesh>
      </group>
      {faces.map((face, i) => (
        <mesh key={i} renderOrder={10 + i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  face.map((n, j) => (j % 3 === 0 ? n - 310 : j % 3 === 1 ? 265 - n : n)),
                ),
                3,
              ]}
            />
            <bufferAttribute
              attach="attributes-uv"
              args={[
                new Float32Array(
                  face.flatMap((n, j) =>
                    j % 3 === 0 ? [n / 620, 1 - face[j + 1] / 530] : [],
                  ),
                ),
                2,
              ]}
            />
          </bufferGeometry>
          <meshBasicMaterial
            // Draw the paper folds over the wire orbit at every viewing angle.
            transparent
            depthTest={false}
            depthWrite={false}
            map={paper}
            color={i === 0 || i === 3 ? "white" : colors[i]}
            side={DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh position={[164, -46, 12]}>
        <sphereGeometry args={[13, 32, 24]} />
        <meshStandardMaterial color="#ae5364" metalness={0.42} roughness={0.24} />
      </mesh>
      <mesh position={[-169, 102, 2]} rotation={[0.4, 0.5, 0.6]}>
        <boxGeometry args={[14, 14, 14]} />
        <meshStandardMaterial color="#b18a69" />
      </mesh>
      <CloudBank />
      <Sparkles
        count={34}
        size={1.8}
        speed={0.12}
        scale={[520, 360, 30]}
        color="#f6d2ab"
      />
    </group>
  );
}
function Title() {
  const ref = useRef<Group>(null);
  useFrame(({ clock, camera }) => {
    const lift = Math.min(1, Math.max(0, (clock.elapsedTime - 1.5) / 1.1));
    camera.position.z = 6 + lift * 1.4;
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime) * 0.13;
      ref.current.position.y = Math.sin(clock.elapsedTime) * 0.08;
    }
  });
  return (
    <group ref={ref}>
      <Center>
        <Text3D
          font="/assets/fonts/helvetiker_bold.typeface.json"
          size={0.58}
          height={0.09}
          bevelEnabled
          bevelSize={0.008}
          bevelThickness={0.008}
        >
          <meshStandardMaterial color="#f5ebdd" roughness={0.25} />
          TECH OVER SKY
        </Text3D>
      </Center>
      <Sparkles count={40} scale={[8, 2, 2]} />
    </group>
  );
}
export default function FlightScene({
  title = false,
  control,
}: {
  title?: boolean;
  control?: React.RefObject<FlightControl>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!host.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(host.current);
    return () => io.disconnect();
  }, []);
  return (
    <div className="flight-canvas" ref={host} aria-hidden="true">
      <ErrorBoundary fallback={null}>
        <Canvas
          orthographic={!title}
          camera={
            title
              ? { position: [0, 0, 6], fov: 36 }
              : { position: [0, 0, 400], zoom: 1, far: 1000 }
          }
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
          frameloop={visible ? "always" : "never"}
        >
          <ambientLight intensity={1.65} />
          <directionalLight intensity={3} position={[-2, 4, 5]} />
          <Suspense fallback={null}>
            {title ? <Title /> : control && <Aircraft control={control} />}
          </Suspense>
          {title && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.1} luminanceThreshold={0.85} />
              <Vignette darkness={0.15} />
            </EffectComposer>
          )}
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
