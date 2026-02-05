import './App.css'
import IntroSection from './components/IntroSection'
import CeremonySection from './components/CeremonySection'
import PartySection from './components/PartySection'
import GiftSection from './components/GiftSection'
import RSVPSection from './components/RSVPSection'

function App() {
  return (
    <div className="wedding-app">
      <IntroSection />
      <CeremonySection />
      <PartySection />
      <GiftSection />
      <RSVPSection />
    </div>
  )
}

export default App
