import React from 'react';
import content from '../data/weddingContent.json';

interface IntroSectionProps {
  guestName?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ guestName }) => {
  const { intro } = content;
  return (
    <section className="intro-section subway-tile">
      {guestName && (
        <p style={{ 
          fontSize: '1.4rem', 
          marginBottom: '0', 
          color: 'var(--accent)',
          fontStyle: 'italic'
        }}>
          Hi {guestName}!
        </p>
      )}
      <div className="ingensteds-title">
        <h1>{intro.names}</h1>
      </div>
      <p>{intro.tagline}</p>
      <div className="intro-details">
        <span>{intro.date}</span>
        <span className="divider">|</span>
        <span>{intro.location}</span>
      </div>
    </section>
  );
};

export default IntroSection;
