import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <section className="intro-section" style={{
      textAlign: 'center',
      padding: '100px 20px',
      background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px', fontFamily: 'serif' }}>John & Jane</h1>
      <p style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>Are getting married!</p>
      <div style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <span>August 24, 2026</span>
        <span style={{ margin: '0 15px' }}>|</span>
        <span>Stockholm, Sweden</span>
      </div>
    </section>
  );
};

export default IntroSection;
