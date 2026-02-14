import React from 'react';
import content from '../data/weddingContent.json';

const LandingSection: React.FC = () => {
  const { landing, intro } = content;
  return (
    <section className="landing-section">
      <div className="landing-content">
        <h1>{landing.title}</h1>
        <div className="decorative-divider">❦</div>
        <h2 className={intro.names.includes(' & ') ? 'multi-line' : ''}>
        {intro.names.split(' & ').map((part, index, array) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < array.length - 1 && <span className="ampersand">&</span>}
          </React.Fragment>
        ))}
        </h2>
        <h3>{intro.date}</h3>
        <div className="scroll-indicator">
          <div className="arrow">↓</div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
