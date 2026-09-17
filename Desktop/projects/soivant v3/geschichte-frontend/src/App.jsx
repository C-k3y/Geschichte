import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Manifesto from './components/Manifesto.jsx';
import CollectionPreview from './components/CollectionPreview.jsx';
import WaitlistSection from './components/WaitlistSection.jsx';
import LiveSection from './components/LiveSection.jsx';
import Footer from './components/Footer.jsx';
import GrainOverlay from './components/GrainOverlay.jsx';
import { useCountdown } from './hooks/useCountdown.js';
import { launchDate } from './data/content.js';

/**
 * App
 * ---------------------------------------------------------------------------
 * Composition root. The countdown lives here so `isLive` can be passed as a
 * single prop to every section that needs to switch behaviour — no context,
 * no global state, just props.
 *
 * Pre-launch layout:  Hero (coming soon) → Manifesto → Collection → Waitlist
 * Post-launch layout: Hero (we're live)  → Manifesto → Collection → LiveSection
 *
 * When the backend ships, update `brand.storeUrl` in data/content.js and
 * flip `locked: false` on the products — no structural changes needed here.
 */
export default function App() {
  const { isComplete: isLive } = useCountdown(launchDate);

  return (
    <div className="relative min-h-screen bg-ink text-bone overflow-x-hidden">
      <GrainOverlay />
      <div className="relative z-10">
        <Navbar isLive={isLive} />
        <main>
          <Hero isLive={isLive} />
          <Manifesto />
          <CollectionPreview isLive={isLive} />
          {isLive ? <LiveSection /> : <WaitlistSection />}
        </main>
        <Footer />
      </div>
    </div>
  );
}
