import React, { useState } from 'react';

const RSVPSection: React.FC = () => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [allergies, setAllergies] = useState('');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ 
        "form-name": "rsvp", 
        name, 
        attending, 
        plusOne: hasPlusOne ? 'yes' : 'no',
        plusOneName,
        allergies 
      })
    })
      .then(() => {
        setSubmitted(true);
        const guestInfo = hasPlusOne ? ` (Plus one: ${plusOneName})` : '';
        const allergyInfo = allergies ? ` Allergies: ${allergies}` : ' No allergies reported.';
        alert(`Thank you ${name}! Your RSVP has been received.${guestInfo}${allergyInfo}`);
      })
      .catch((error) => alert(error));
  };

  if (submitted) {
    return (
      <section className="rsvp-section" style={{
        padding: '80px 20px',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'serif' }}>RSVP</h2>
        <div style={{ padding: '40px', backgroundColor: '#fdfbfb', maxWidth: '600px', margin: '0 auto', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>Thank you!</h3>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            We've received your RSVP. We can't wait to see you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp-section" style={{
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'serif' }}>RSVP</h2>
      <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>
        Please let us know if you can make it by July 1st, 2026.
      </p>
      <form 
        name="rsvp"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit} 
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
      >
        <input type="hidden" name="form-name" value="rsvp" />
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Will you be attending?</label>
          <select 
            name="attending"
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            style={{ width: '100%', padding: '10px' }}
          >
            <option value="yes">Yes, I'll be there!</option>
            <option value="no">Sadly, I can't make it</option>
          </select>
        </div>
        
        {attending === 'yes' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="plusOne"
                  checked={hasPlusOne}
                  onChange={(e) => setHasPlusOne(e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Bringing a guest?
              </label>
            </div>

            {hasPlusOne && (
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="plusOneName" style={{ display: 'block', marginBottom: '5px' }}>Guest's Full Name</label>
                <input 
                  type="text" 
                  id="plusOneName" 
                  name="plusOneName"
                  value={plusOneName}
                  onChange={(e) => setPlusOneName(e.target.value)}
                  required={hasPlusOne}
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="allergies" style={{ display: 'block', marginBottom: '5px' }}>Allergies / Dietary Requirements</label>
              <textarea 
                id="allergies" 
                name="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g. Vegetarian, Nut allergy..."
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </div>
          </>
        )}

        <button type="submit" style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: '#333', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Submit RSVP
        </button>
      </form>
    </section>
  );
};

export default RSVPSection;
