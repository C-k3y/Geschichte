/**
 * formatPrice
 * ---------------------------------------------------------------------------
 * Formats a whole-unit amount (no decimals — nobody prices a hoodie in
 * KES cents) into a display string, e.g. formatPrice(4500, 'KES') → "KSh 4,500".
 *
 * Falls back to a plain "CURRENCY amount" string if Intl can't format the
 * given currency code for some reason, so a typo in `currency` never crashes
 * the page.
 */
export function formatPrice(amount, currency = 'KES') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Number(amount).toLocaleString()}`;
  }
}
