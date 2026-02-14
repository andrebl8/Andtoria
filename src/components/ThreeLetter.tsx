import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeLetterProps {
  scrollProgress: number;
  content: {
    envelopeText: string;
    subText: string;
  };
  isMobile: boolean;
  guestName?: string;
}

const ThreeLetter: React.FC<ThreeLetterProps> = ({ scrollProgress, content, isMobile, guestName }) => {
  const flapRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Group>(null);
  const envelopeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (flapRef.current) {
      // Flap opens from 0 to -Math.PI (180 deg)
      // Open between progress 0 and 0.4
      const flapProg = Math.min(scrollProgress / 0.4, 1);
      flapRef.current.rotation.x = -flapProg * Math.PI;
    }

    if (paperRef.current) {
      // Paper slides out between 0.3 and 0.8
      const paperProg = Math.max(0, Math.min((scrollProgress - 0.3) / 0.5, 1));
      paperRef.current.position.y = paperProg * 3.5;
      // Start at 0.01 (inside pocket) and slide forward to 0.5
      paperRef.current.position.z = 0.01 + paperProg * 0.5;
    }

    if (envelopeRef.current) {
      // Zoom in and rotate slightly as we scroll
      // More zoom on mobile to make it feel more intimate
      const baseScale = isMobile ? 0.9 : 1;
      const zoomFactor = isMobile ? 1.0 : 0.5;
      const scale = baseScale + scrollProgress * zoomFactor;
      
      envelopeRef.current.scale.set(scale, scale, scale);
      envelopeRef.current.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.1;
    }
  });
  return (
    <group ref={envelopeRef}>
      {/* Envelope Back */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[5, 3.5]} />
        <meshStandardMaterial color="#FFFFFF" side={THREE.DoubleSide} />
      </mesh>

      {/* Envelope Front (Left) */}
      <mesh position={[-1.25, 0, 0.05]} rotation={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -1.25, 1.75, 0,
              1.25, 0, 0,
              -1.25, -1.75, 0
            ]), 3]}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#B5A58C" side={THREE.DoubleSide} />
      </mesh>

      {/* Envelope Front (Right) */}
      <mesh position={[1.25, 0, 0.05]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              1.25, 1.75, 0,
              1.25, -1.75, 0,
              -1.25, 0, 0
            ]), 3]}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#B5A58C" side={THREE.DoubleSide} />
      </mesh>

      {/* Envelope Front (Bottom) */}
      <mesh position={[0, -0.875, 0.06]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -2.5, -0.875, 0,
              2.5, -0.875, 0,
              0, 1.75, 0
            ]), 3]}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#A4947B" side={THREE.DoubleSide} />
      </mesh>

      {/* Envelope Flap */}
      <group ref={flapRef} position={[0, 1.75, 0.07]}>
        <mesh position={[0, -0.875, 0]} rotation={[0, 0, Math.PI]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                -2.5, -0.875, 0,
                2.5, -0.875, 0,
                0, 1.75, 0
              ]), 3]}
            />
          </bufferGeometry>
          <meshStandardMaterial color="#C5B69C" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Paper Letter */}
      <group ref={paperRef} position={[0, 0, 0.01]}>
        <mesh>
          <planeGeometry args={[4.5, 3.2]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0}
            colorWrite={false}
          />
          <Html
            transform
            occlude
            distanceFactor={5}
            position={[0, 0.5, 0.01]}
          >
            <div
              className="three-paper-content"
              style={{
                // Start showing when the letter is ~80% open (scrollProgress ≈ 0.7 based on paper slide window 0.3→0.8)
                opacity: Math.max(0, (scrollProgress - 0.7) * 10, 1),
                //opacity: Math.max(0, Math.min((scrollProgress - 0.7) * 10, 1)),
                transition: 'opacity 0.2s',
              }}
            >
              {guestName && <p style={{ marginBottom: '10px', fontStyle: 'italic', color: 'var(--accent)' }}>Dear {guestName},</p>}
              <h2>{content.envelopeText}</h2>
              <p>{content.subText}</p>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
};

export default ThreeLetter;
