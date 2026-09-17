import { products } from '../data/content.js';
import SeamDivider from './SeamDivider.jsx';
import { useInView } from '../hooks/useInView.js';

function LockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ProductCard({ product, isLive }) {
  const [ref, inView] = useInView();
  const isUnlocked = isLive || !product.locked;

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden border border-white/10 transition-all duration-700
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Garment swatch — swap for <img> when photography is ready */}
      <div
        className={`aspect-[4/5] bg-gradient-to-br ${product.swatch} flex items-center justify-center
                    transition-transform duration-700 group-hover:scale-[1.03]`}
        role="img"
        aria-label={product.alt}
      >
        <span className="font-display italic text-6xl text-white/[0.06] select-none">G</span>
      </div>

      {/* Pre-launch lock scrim — hidden when live */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-ink/55 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3">
          <LockIcon className="w-6 h-6 text-champagne-bright" />
          <span className="text-[11px] tracking-widest2 uppercase text-champagne-bright">
            Unlocks at launch
          </span>
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 bg-gradient-to-t from-ink via-ink/80 to-transparent">
        <h3 className="font-display text-xl text-bone">{product.name}</h3>
        <p className="mt-1 text-xs text-ash">{product.detail}</p>

        {/* Shop link — visible only when live */}
        {isUnlocked && (
          <a
            href={product.href}
            className="mt-3 inline-block text-[11px] tracking-widest2 uppercase text-champagne
                       border-b border-champagne/40 pb-px hover:text-champagne-bright hover:border-champagne-bright
                       transition-colors"
          >
            View product →
          </a>
        )}
      </div>
    </article>
  );
}

export default function CollectionPreview({ isLive }) {
  const [headerRef, headerInView] = useInView();

  return (
    <section id="collection" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4
                      transition-all duration-700
                      ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div>
            <p className="text-xs tracking-widest3 uppercase text-champagne">The collection</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-bone">
              {isLive ? 'Shop the drop.' : 'A first look, kept close.'}
            </h2>
          </div>
          <p className="text-sm text-ash max-w-xs">
            {isLive
              ? 'GESCHICHTE is live. Explore the two pieces from the opening drop.'
              : 'Two pieces from the opening drop — full imagery and pricing unlock the moment we launch.'}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isLive={isLive} />
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-32 px-6 md:px-10">
        <SeamDivider />
      </div>
    </section>
  );
}
