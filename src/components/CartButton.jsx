import { useCart } from '../context/CartContext.jsx';

function BagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export default function CartButton({ className = '' }) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open my collection${itemCount > 0 ? ` (${itemCount} items)` : ''}`}
      className={`relative text-bone hover:text-champagne transition-colors ${className}`}
    >
      <BagIcon className="w-5 h-5" />
      {itemCount > 0 && (
        <span
          className="absolute -top-2 -right-2 flex items-center justify-center h-4 min-w-4 px-1
                     rounded-full bg-champagne text-ink text-[10px] font-medium leading-none"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
