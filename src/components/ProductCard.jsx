import { useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import { useCart, buildWhatsAppQuickOrderUrl } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/formatPrice.js';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.505 3.6 1.382 5.09L2 22l5.06-1.36A9.94 9.94 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.18a8.15 8.15 0 0 1-4.166-1.14l-.298-.177-3.006.807.808-2.938-.194-.302A8.15 8.15 0 1 1 20.15 12a8.16 8.16 0 0 1-8.15 8.18z" />
    </svg>
  );
}

/**
 * ProductCard (Shop)
 * ---------------------------------------------------------------------------
 * The real, purchasable card shown in the live Shop section. Distinct from
 * CollectionPreview's teaser card — this one has size/quantity selection
 * and two ways to act on a product:
 *
 *  - "Add to collection" → adds this line to the cart (CartContext), so the
 *    visitor can build a multi-item order and check out once via the drawer.
 *  - "Order now" → skips the cart entirely and opens WhatsApp immediately
 *    with just this one item, for someone who knows exactly what they want.
 *
 * Both paths currently resolve to a WhatsApp message. Swapping to a real
 * checkout later (M-Pesa Daraja first, then cards/PayPal/crypto) only
 * touches CartContext's buildWhatsAppOrderUrl / buildWhatsAppQuickOrderUrl —
 * this component doesn't need to change.
 */
export default function ProductCard({ product }) {
  const [ref, inView] = useInView();
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCollection = () => {
    addItem(product, size, quantity);
    setJustAdded(true);
    setQuantity(1);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden border border-white/10 bg-ink transition-all duration-700
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div
        className={`aspect-[4/5] bg-gradient-to-br ${product.swatch} relative flex items-center
                    justify-center p-6 overflow-hidden`}
      >
        {product.badge && (
          <span
            className="absolute top-3 left-3 z-10 text-[10px] tracking-widest2 uppercase
                       bg-champagne text-ink px-2.5 py-1 font-medium"
          >
            {product.badge}
          </span>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]
                       transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="font-display italic text-6xl text-white/[0.06] select-none">G</span>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-bone">{product.name}</h3>
          <span className="font-display text-lg text-champagne-bright whitespace-nowrap">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
        <p className="mt-1 text-xs text-ash leading-relaxed">{product.detail}</p>

        {/* Size selection */}
        <div className="mt-5">
          <p className="text-[11px] tracking-widest2 uppercase text-ash mb-2">Size</p>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`w-10 h-10 text-xs tracking-wide uppercase border transition-colors
                            ${
                              size === s
                                ? 'border-champagne bg-champagne text-ink'
                                : 'border-white/15 text-bone hover:border-champagne-muted'
                            }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-3">
          <p className="text-[11px] tracking-widest2 uppercase text-ash">Qty</p>
          <div className="flex items-center border border-white/15">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-8 h-8 text-bone hover:text-champagne disabled:opacity-30 transition-colors"
            >
              −
            </button>
            <span className="w-9 text-center text-sm text-bone">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
              className="w-8 h-8 text-bone hover:text-champagne disabled:opacity-30 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleAddToCollection}
            className="w-full bg-champagne text-ink text-xs tracking-widest2 uppercase font-medium
                       px-6 py-3 hover:bg-champagne-bright transition-colors"
          >
            {justAdded ? 'Added ✓' : 'Add to Collection'}
          </button>

          <a
            href={buildWhatsAppQuickOrderUrl(product, size, quantity)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-[#25D366]/50
                       text-[#25D366] text-xs tracking-widest2 uppercase font-medium px-6 py-3
                       hover:bg-[#25D366]/10 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Order Now
          </a>
        </div>
      </div>
    </article>
  );
}
