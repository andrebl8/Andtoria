import React from 'react';
import content from '../data/weddingContent.json';

const GiftSection: React.FC = () => {
  const { gifts } = content;
  return (
    <section className="gift-section">
      <h2>{gifts.title}</h2>
      <div className="section-content">
        <p>{gifts.description}</p>
        <div className="gift-links">
          <a href={gifts.registryUrl} className="gift-button">{gifts.registryButton}</a>
          <a href={gifts.honeymoonUrl} className="gift-button">{gifts.honeymoonButton}</a>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
