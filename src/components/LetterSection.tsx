import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Float, Environment } from '@react-three/drei';
import confetti from 'canvas-confetti';
import content from '../data/weddingContent.json';
import ThreeLetter from './ThreeLetter';

interface LetterSectionProps {
  guestName?: string;
}

const LetterSection: React.FC<LetterSectionProps> = ({ guestName }) => {
  const { letter } = content;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const hasFiredConfetti = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 1.5;
      const progress = Math.min(scrollY / threshold, 1);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Trigger confetti when letter is about 75-80% open (0.75 threshold)
    if (scrollProgress >= 0.75 && !hasFiredConfetti.current) {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#121212', '#8B5E3C', '#FFFFFF', '#5D6D5E', '#A4947B'] // Ingensteds palette: Black, Wood, White, Green, Muted Brown
      };

      const fire = (particleRatio: number, opts: any) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      hasFiredConfetti.current = true;
    }

    // Reset confetti trigger if user scrolls back up significantly
    if (scrollProgress < 0.3) {
      hasFiredConfetti.current = false;
    }
  }, [scrollProgress]);

  const opacity = scrollProgress > 0.5 ? 1 - (scrollProgress - 0.5) * 5 : 1;
  const cameraZ = isMobile ? 12 : 8;

  if (scrollProgress >= 1) return null;

  return (
    <div className="letter-wrapper" style={{ opacity }}>
      <div className="canvas-container">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={50} />
          {/* Brighter, softer fill so the envelope doesn't go muddy */}
          <ambientLight intensity={1.0} />
          <hemisphereLight intensity={0.75} color="#ffffff" groundColor="#d8cfc2" />

          {/* One strong key light + a gentler rim */}
          <directionalLight
            position={[6, 8, 10]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-6, 4, -6]} intensity={0.6} />

          {/* The HDRI is great for reflections, but can darken perceived albedo if it's too strong */}
          <Environment preset="studio" environmentIntensity={0.35} />

          <Float 
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
            enabled={scrollProgress < 0.1} // Only float when not scrolling much
          >
            <ThreeLetter 
              scrollProgress={scrollProgress} 
              content={letter} 
              isMobile={isMobile} 
              guestName={guestName}
            />
          </Float>
        </Canvas>
      </div>
      
      <div className="scroll-prompt" style={{ opacity: 1 - scrollProgress * 5 }}>
        <p>{letter.scrollPrompt}</p>
        <div className="arrow">↓</div>
      </div>
    </div>
  );
};

export default LetterSection;
