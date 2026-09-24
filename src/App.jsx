import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Manifesto from './components/Manifesto.jsx';
import CollectionPreview from './components/CollectionPreview.jsx';
import WaitlistSection from './components/WaitlistSection.jsx';
import Shop from './components/Shop.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import GrainOverlay from './components/GrainOverlay.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { useCountdown } from './hooks/useCountdown.js';
import { launchDate } from './data/content.js';

/**
 * App
 * ---------------------------------------------------------------------------
 * Composition root. The countdown lives here so `isLive` can be passed as a
 * single prop to every section that needs to switch behaviour — no context,
 * no global state for that part, just props.
 *
 * Pre-launch layout:  Hero (coming soon) → Manifesto → Collection (teaser) → Waitlist
 * Post-launch layout: Hero (we're live)  → Manifesto → Shop (the full, real product grid)
 *
 * The pre-launch "Shop the Drop" teaser (CollectionPreview) intentionally
 * disappears once live — Shop is the single, real product destination at
 * that point, so there's no redundant locked-preview grid sitting above it.
 *
 * CartProvider wraps the whole tree so the Navbar's cart icon, every
 * ProductCard, and the CartDrawer all share one cart with no prop drilling.
 * CartDrawer is mounted once here — its visibility is controlled entirely
 * by CartContext, so any "Add to Collection" button anywhere can open it.
 */
export default function App() {
  const { isComplete: isLive } = useCountdown(launchDate);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-ink text-bone overflow-x-hidden">
        <GrainOverlay />
        <div className="relative z-10">
          <Navbar isLive={isLive} />
          <main>
            <Hero isLive={isLive} />
            <Manifesto />
            {isLive ? (
              <Shop />
            ) : (
              <>
                <CollectionPreview isLive={isLive} />
                <WaitlistSection />
              </>
            )}
          </main>
          <Footer />
        </div>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
