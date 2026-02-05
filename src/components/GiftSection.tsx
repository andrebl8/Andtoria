import React from 'react';

const GiftSection: React.FC = () => {
  return (
    <section className="gift-section" style={{
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: '#fdfbfb'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'serif' }}>Gifts</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '20px' }}>
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
          we have a registry at the following store or a honeymoon fund contribution would be greatly appreciated.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="#" style={{ padding: '10px 20px', border: '1px solid #333', color: '#333', textDecoration: 'none' }}>View Registry</a>
          <a href="#" style={{ padding: '10px 20px', border: '1px solid #333', color: '#333', textDecoration: 'none' }}>Honeymoon Fund</a>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
