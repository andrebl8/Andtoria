import './App.css'
import LetterSection from './components/LetterSection'
import IntroSection from './components/IntroSection'
import CeremonySection from './components/CeremonySection'
import PartySection from './components/PartySection'
import GiftSection from './components/GiftSection'
import RSVPSection from './components/RSVPSection'

function App() {
  return (
    <div className="wedding-app">
      <LetterSection />
      <div className="scroll-spacer" style={{ height: '150vh' }}></div>
      <IntroSection />
      <CeremonySection />
      <PartySection />
      <GiftSection />
      <RSVPSection />
    </div>
  )
}

export default App
