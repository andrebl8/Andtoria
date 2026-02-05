import React from 'react';

const PartySection: React.FC = () => {
  return (
    <section className="party-section" style={{
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'serif' }}>The Celebration</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}><strong>Time:</strong> 6:00 PM - Late</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}><strong>Location:</strong> Grand Ballroom, The Grand Hotel</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          After the ceremony, we'll move to the Grand Hotel for dinner, drinks, and dancing! 
          Be ready to party the night away with us.
        </p>
      </div>
    </section>
  );
};

export default PartySection;
