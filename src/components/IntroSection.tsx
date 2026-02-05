import React from 'react';
import content from '../data/weddingContent.json';

const IntroSection: React.FC = () => {
  const { intro } = content;
  return (
    <section className="intro-section">
      <h1>{intro.names}</h1>
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
