import { useEffect } from 'react';
import { useCart, buildWhatsAppOrderUrl } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/formatPrice.js';

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.505 3.6 1.382 5.09L2 22l5.06-1.36A9.94 9.94 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.18a8.15 8.15 0 0 1-4.166-1.14l-.298-.177-3.006.807.808-2.938-.194-.302A8.15 8.15 0 1 1 20.15 12a8.16 8.16 0 0 1-8.15 8.18z" />
    </svg>
  );
}

/**
 * CartDrawer
 * ---------------------------------------------------------------------------
 * Mounted once at the app root; visibility is entirely driven by
 * CartContext's `isOpen`, so any button anywhere (Navbar, ProductCard) can
 * open it with `openCart()` with no prop drilling.
 */
export default function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  // Close on Escape, lock background scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your collection"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-charcoal border-l border-white/10
                    flex flex-col transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="font-display text-xl text-bone">
            My Collection {itemCount > 0 && <span className="text-champagne">({itemCount})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close"
            className="text-ash hover:text-bone transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="text-sm text-ash">
              Your collection is empty. Add a piece from the shop to start your order.
            </p>
          ) : (
            <ul className="space-y-6">
              {items.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <div className="w-20 h-24 shrink-0 bg-ink border border-white/10 flex items-center justify-center overflow-hidden">
                    {line.image ? (
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="font-display italic text-2xl text-white/10">G</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base text-bone truncate">{line.name}</p>
                        <p className="text-xs text-ash mt-0.5">Size {line.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.key)}
                        aria-label={`Remove ${line.name}`}
                        className="text-ash hover:text-champagne-bright transition-colors shrink-0"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-white/15">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          disabled={line.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 text-bone hover:text-champagne disabled:opacity-30 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm text-bone">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          disabled={line.quantity >= 10}
                          aria-label="Increase quantity"
                          className="w-7 h-7 text-bone hover:text-champagne disabled:opacity-30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-champagne-bright">
                        {formatPrice(line.price * line.quantity, line.currency)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ash">Subtotal</span>
              <span className="font-display text-lg text-bone">
                {formatPrice(subtotal, items[0]?.currency)}
              </span>
            </div>

            <a
              href={buildWhatsAppOrderUrl(items, { currency: items[0]?.currency })}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-ink text-xs
                         tracking-widest2 uppercase font-medium px-6 py-4 hover:brightness-95
                         transition-[filter]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Complete order on WhatsApp
            </a>

            <p className="text-[11px] text-ash text-center leading-relaxed">
              You&apos;ll confirm sizing, stock and payment directly with us on WhatsApp.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
