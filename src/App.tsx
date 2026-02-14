import { useMemo } from 'react'
import './App.css'
import LetterSection from './components/LetterSection'
import IntroSection from './components/IntroSection'
import CeremonySection from './components/CeremonySection'
import PartySection from './components/PartySection'
import GiftSection from './components/GiftSection'
import RSVPSection from './components/RSVPSection'

function App() {
  const { guestNames, joinedGuestNames } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const names = params.getAll('guest')
      .map(name => name.trim())
      .filter(name => name !== '');
    
    if (names.length === 0) return { guestNames: [], joinedGuestNames: '' };
    if (names.length === 1) return { guestNames: names, joinedGuestNames: names[0] };
    
    const joined = names.length === 2 
      ? `${names[0]} & ${names[1]}`
      : names.slice(0, -1).join(', ') + ' & ' + names[names.length - 1];
      
    return { guestNames: names, joinedGuestNames: joined };
  }, []);

  return (
    <div className="wedding-app">
      {/* <LetterSection guestName={joinedGuestNames} />
      <div className="scroll-spacer" style={{ height: '150vh' }}></div> */}
      <IntroSection guestName={joinedGuestNames} />
      <CeremonySection />
      <PartySection />
      <GiftSection />
      <RSVPSection guestNames={guestNames} />
    </div>
  )
}

export default App
