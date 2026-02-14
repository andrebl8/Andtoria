import React from 'react';
import content from '../data/weddingContent.json';

const PartySection: React.FC = () => {
  const { party } = content;
  return (
    <section className="party-section">
      <h2>{party.title}</h2>
      <div className="decorative-divider">❧</div>
      <div className="section-content">
        <p><strong>{party.timeLabel}</strong> {party.time}</p>
        <p><strong>{party.locationLabel}</strong> {party.location}</p>
        <p>{party.description}</p>
      </div>
    </section>
  );
};

export default PartySection;
