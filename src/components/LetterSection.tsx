import React, { useState, useEffect } from 'react';
import content from '../data/weddingContent.json';

const LetterSection: React.FC = () => {
  const { letter } = content;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      const progress = Math.min(scrollY / threshold, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transforms based on progress
  const flapRotation = Math.min(scrollProgress * 2.5 * 180, 180); // Open flap faster
  const letterY = scrollProgress > 0.3 ? Math.max((scrollProgress - 0.3) * -500, -250) : 0; 
  const opacity = scrollProgress > 0.8 ? 1 - (scrollProgress - 0.8) * 5 : 1;
  const scale = 1 + scrollProgress * 0.2;

  if (scrollProgress >= 1) return null; // Hide completely when done

  return (
    <div className="letter-wrapper" style={{ opacity }}>
      <div className="letter-container" style={{ transform: `scale(${scale})` }}>
        <div className="envelope">
          <div 
            className="envelope-flap" 
            style={{ 
              transform: `rotateX(${flapRotation}deg)`,
              zIndex: flapRotation > 90 ? 1 : 5
            }}
          ></div>
          <div className="envelope-paper" style={{ transform: `translateY(${letterY}px)` }}>
            <div className="paper-content">
              <h2>{letter.envelopeText}</h2>
              <p>{letter.subText}</p>
            </div>
          </div>
          <div className="envelope-base"></div>
        </div>
        <div className="scroll-prompt" style={{ opacity: 1 - scrollProgress * 2 }}>
          <p>{letter.scrollPrompt}</p>
          <div className="arrow">↓</div>
        </div>
      </div>
    </div>
  );
};

export default LetterSection;
