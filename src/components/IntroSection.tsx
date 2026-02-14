import React from 'react';
import content from '../data/weddingContent.json';

interface IntroSectionProps {
  guestName?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ guestName }) => {
  const { intro } = content;
  return (
    <section className="intro-section">
      <p className="guest-greeting">
        Kjære <span className="guest-name">{guestName}</span>
      </p>
      <div className="ingensteds-title">
        <h1>{intro.names}</h1>
      </div>
      <div className="decorative-divider">❦</div>
      <p>{intro.tagline}</p>
      <div className="intro-info-list">
        <p><span>Dato:</span> <span className="value">{intro.date}</span></p>
        <p><span>Sted:</span> <span className="value">{intro.location}</span></p>
        <p><span>Tid:</span> <span className="value">{intro.time}</span></p>
      </div>
    </section>
  );
};

export default IntroSection;
