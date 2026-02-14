import React from 'react';
import content from '../data/weddingContent.json';

interface IntroSectionProps {
  guestName?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ guestName }) => {
  const { intro } = content;
  return (
    <section className="intro-section">
      <div className="section-content">
        <p className="guest-greeting">
          Kjære {guestName?.includes(' & ') ? (
            <span className="guest-name multi-line">
              {guestName.split(' & ').map((part, index, array) => (
                <React.Fragment key={index}>
                  <span>{part}</span>
                  {index < array.length - 1 && <span className="ampersand">&</span>}
                </React.Fragment>
              ))}
            </span>
          ) : (
            <span className="guest-name">{guestName}</span>
          )}
        </p>
        <div className="ingensteds-title">
          <h1>{intro.names}</h1>
          <p>{intro.tagline}</p>
        </div>
        <div className="decorative-divider">❦</div>

        <div className="intro-info-list">
          <p><span>Dato:</span> <span className="value">{intro.date}</span></p>
          <p><span>Sted:</span> <span className="value">{intro.location}</span></p>
          <p><span>Tid:</span> <span className="value">{intro.time}</span></p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
