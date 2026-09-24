import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { brand } from '../data/content.js';
import { formatPrice } from '../utils/formatPrice.js';

const STORAGE_KEY = 'geschichte:cart';
const MAX_QUANTITY_PER_LINE = 10;

/**
 * CartContext
 * ---------------------------------------------------------------------------
 * "Add to collection" state for the shop — this is the wishlist/cart/order
 * builder the client asked for. Each line is keyed by product + size, so
 * the same hoodie in two sizes shows as two separate lines.
 *
 * Persistence: cart contents are saved to localStorage so a visitor's
 * selections survive a page refresh. This is a real deployed site (not a
 * Claude artifact preview), so localStorage is the right tool here — it's
 * per-browser, which is exactly what we want for a shopping cart.
 *
 * Checkout: `buildWhatsAppOrderUrl()` is the ONE place that turns cart
 * contents into an order today. When the M-Pesa Daraja / card backend is
 * ready, this is the function to swap (or extend with a real checkout
 * call) — nothing else in the cart UI needs to change.
 */

function lineKey(productId, size) {
  return `${productId}::${size}`;
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.items;

    case 'ADD_ITEM': {
      const { product, size, quantity } = action;
      const key = lineKey(product.id, size);
      const existing = state.find((line) => line.key === key);

      if (existing) {
        return state.map((line) =>
          line.key === key
            ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QUANTITY_PER_LINE) }
            : line
        );
      }

      return [
        ...state,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          currency: product.currency,
          size,
          quantity: Math.min(quantity, MAX_QUANTITY_PER_LINE),
        },
      ];
    }

    case 'UPDATE_QUANTITY': {
      const quantity = Math.max(1, Math.min(action.quantity, MAX_QUANTITY_PER_LINE));
      return state.map((line) => (line.key === action.key ? { ...line, quantity } : line));
    }

    case 'REMOVE_ITEM':
      return state.filter((line) => line.key !== action.key);

    case 'CLEAR':
      return [];

    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load any saved cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {
      // Corrupt or inaccessible storage — start with an empty cart rather
      // than breaking the page.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change, once initial hydration has happened (so we
  // don't overwrite a saved cart with an empty one before it's loaded).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full/unavailable — cart still works for this session,
      // it just won't survive a refresh. Not worth interrupting the user.
    }
  }, [items, hydrated]);

  const addItem = (product, size, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, size, quantity });
    setIsOpen(true);
  };
  const updateQuantity = (key, quantity) => dispatch({ type: 'UPDATE_QUANTITY', key, quantity });
  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', key });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const itemCount = useMemo(() => items.reduce((sum, line) => sum + line.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items]
  );

  const value = {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

/**
 * Builds a wa.me link with a pre-filled, human-readable order message.
 * This is today's "checkout" — opening it hands the whole order to a real
 * person on WhatsApp to confirm stock and take payment.
 */
export function buildWhatsAppOrderUrl(items, { currency = 'KES' } = {}) {
  const lines = items.map(
    (line) =>
      `• ${line.name} (Size ${line.size}) × ${line.quantity} — ${formatPrice(
        line.price * line.quantity,
        line.currency || currency
      )}`
  );
  const total = items.reduce((sum, line) => sum + line.price * line.quantity, 0);

  const message = [
    `Hi ${brand.name}! I'd like to place an order:`,
    '',
    ...lines,
    '',
    `Total: ${formatPrice(total, currency)}`,
    '',
    'Please confirm availability and how to pay.',
  ].join('\n');

  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Builds a wa.me link for a single, immediate "Order now" from a product card. */
export function buildWhatsAppQuickOrderUrl(product, size, quantity) {
  const message = [
    `Hi ${brand.name}! I'd like to order:`,
    '',
    `• ${product.name} (Size ${size}) × ${quantity} — ${formatPrice(
      product.price * quantity,
      product.currency
    )}`,
    '',
    'Please confirm availability and how to pay.',
  ].join('\n');

  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
