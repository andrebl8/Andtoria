import React, { useState, useEffect } from 'react';
import content from '../data/weddingContent.json';

interface RSVPSectionProps {
  guestNames?: string[];
}

const RSVPSection: React.FC<RSVPSectionProps> = ({ guestNames = [] }) => {
  const { rsvp } = content;
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [allergies, setAllergies] = useState('');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (guestNames.length > 0) {
      setName(guestNames[0]);
      
      if (guestNames.length > 1) {
        setHasPlusOne(true);
        const others = guestNames.slice(1);
        const joinedOthers = others.length === 1 
          ? others[0] 
          : others.slice(0, -1).join(', ') + ' & ' + others[others.length - 1];
        setPlusOneName(joinedOthers);
      }
    }
  }, [guestNames]);

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
          <h3>{rsvp.thankYouTitle}</h3>
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
      <div className="decorative-divider">❧</div>
      <div className="section-content">
        <p className="deadline-text">
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
        <div className={hasPlusOne ? "rsvp-names-group" : ""}>
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

          {hasPlusOne && (
            <div className="form-group">
              <label htmlFor="plusOneName">{rsvp.fullNameLabel}</label>
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
            {guestNames.length !== 1 && guestNames.length !== 2 && (
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
