import React from 'react';

const CeremonySection: React.FC = () => {
  return (
    <section className="ceremony-section" style={{
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: '#fdfbfb'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'serif' }}>The Ceremony</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}><strong>Time:</strong> 2:00 PM</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}><strong>Location:</strong> City Hall Chapel</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Please join us as we exchange our vows in an intimate ceremony. 
          The chapel is located in the heart of the city with beautiful views of the water.
        </p>
      </div>
    </section>
  );
};

export default CeremonySection;
