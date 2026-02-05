import React from 'react';
import content from '../data/weddingContent.json';

const CeremonySection: React.FC = () => {
  const { ceremony } = content;
  return (
    <section className="ceremony-section">
      <h2>{ceremony.title}</h2>
      <div className="section-content">
        <p><strong>{ceremony.timeLabel}</strong> {ceremony.time}</p>
        <p><strong>{ceremony.locationLabel}</strong> {ceremony.location}</p>
        <p>{ceremony.description}</p>
      </div>
    </section>
  );
};

export default CeremonySection;
