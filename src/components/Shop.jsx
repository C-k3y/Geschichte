import { products, shopCopy } from '../data/content.js';
import ProductCard from './ProductCard.jsx';
import SeamDivider from './SeamDivider.jsx';
import { useInView } from '../hooks/useInView.js';
import { useCart } from '../context/CartContext.jsx';

/**
 * Shop
 * ---------------------------------------------------------------------------
 * Rendered in place of the old LiveSection once the countdown hits zero.
 * This is the real, functioning shop: real product photography, size and
 * quantity selection, and a working order flow — no external domain, no
 * dead links. `#shop` is what every "Shop now" CTA on the site points to.
 */
export default function Shop() {
  const [headerRef, headerInView] = useInView();
  const { itemCount, openCart } = useCart();

  return (
    <section id="shop" className="relative py-24 md:py-36 bg-charcoal overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-champagne/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700
                      ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="flex items-center gap-2 text-xs tracking-widest3 uppercase text-champagne">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne" />
            </span>
            {shopCopy.eyebrow}
          </p>
          <h2 className="mt-6 font-display font-medium text-4xl md:text-5xl stone-fill">
            {shopCopy.heading}
          </h2>
          <p className="mt-3 text-sm text-ash max-w-sm">{shopCopy.intro}</p>

          {itemCount > 0 && (
            <button
              type="button"
              onClick={openCart}
              className="mt-6 text-xs tracking-widest2 uppercase text-champagne border-b border-champagne/40
                         pb-px hover:text-champagne-bright hover:border-champagne-bright transition-colors"
            >
              View my collection ({itemCount}) →
            </button>
          )}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-ash max-w-md mx-auto leading-relaxed">
          {shopCopy.paymentNote}
        </p>
      </div>

      <div className="mt-24 md:mt-32 px-6 md:px-10">
        <SeamDivider />
      </div>
    </section>
  );
}
