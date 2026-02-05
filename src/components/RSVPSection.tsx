import React, { useState } from 'react';
import content from '../data/weddingContent.json';

const RSVPSection: React.FC = () => {
  const { rsvp } = content;
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
      })
      .catch((error) => alert(error));
  };

  if (submitted) {
    return (
      <section className="rsvp-section">
        <h2>{rsvp.title}</h2>
        <div className="submitted-message">
          <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>{rsvp.thankYouTitle}</h3>
          <p>
            {rsvp.thankYouMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp-section">
      <h2>{rsvp.title}</h2>
      <div className="section-content">
        <p style={{ marginBottom: '30px' }}>
          {rsvp.deadlineText}
        </p>
      </div>
      <form 
        name="rsvp"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit} 
        className="rsvp-form"
      >
        <input type="hidden" name="form-name" value="rsvp" />
        <div className="form-group">
          <label htmlFor="name">{rsvp.fullNameLabel}</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>{rsvp.attendingLabel}</label>
          <select 
            name="attending"
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
          >
            <option value="yes">{rsvp.attendingYes}</option>
            <option value="no">{rsvp.attendingNo}</option>
          </select>
        </div>
        
        {attending === 'yes' && (
          <>
            <div className="form-group">
              <label className="checkbox-group">
                <input 
                  type="checkbox" 
                  name="plusOne"
                  checked={hasPlusOne}
                  onChange={(e) => setHasPlusOne(e.target.checked)}
                />
                {rsvp.plusOneLabel}
              </label>
            </div>

            {hasPlusOne && (
              <div className="form-group">
                <label htmlFor="plusOneName">{rsvp.guestNameLabel}</label>
                <input 
                  type="text" 
                  id="plusOneName" 
                  name="plusOneName"
                  value={plusOneName}
                  onChange={(e) => setPlusOneName(e.target.value)}
                  required={hasPlusOne}
                />
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="allergies">{rsvp.allergiesLabel}</label>
              <textarea 
                id="allergies" 
                name="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder={rsvp.allergiesPlaceholder}
              />
            </div>
          </>
        )}

        <button type="submit" className="submit-button">
          {rsvp.submitButton}
        </button>
      </form>
    </section>
  );
};

export default RSVPSection;
