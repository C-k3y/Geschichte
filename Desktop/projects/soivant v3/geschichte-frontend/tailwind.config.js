/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ---- GESCHICHTE brand tokens ----------------------------------------
        // Derived from the Geschichte teaser poster: near-black ground,
        // weathered stone display type, a champagne-gold stitch/script
        // accent, and a warm off-white for the torn-paper "seam" motif.
        ink: {
          DEFAULT: '#0B0A08', // primary background — deep, near-black
          soft: '#111009',
        },
        charcoal: {
          DEFAULT: '#17140F', // panel / card background, one step up from ink
          light: '#1F1B14',
        },
        stone: {
          DEFAULT: '#C9C2B4', // weathered display headline fill
          dim: '#9A9484',
        },
        bone: '#EDE8DC', // high-contrast body / heading text on dark
        champagne: {
          DEFAULT: '#B99A66', // gold stitch, script accent, hover states
          bright: '#D4B989',
          muted: '#8C7350',
        },
        ash: '#6E655A', // secondary / muted copy
        seam: '#F2EEE3', // torn-paper crack line, hairline dividers
      },
      fontFamily: {
        // Display serif — the weathered "GESCHICHTE" / "GESCHICHTE" wordmarks
        display: ['"Bodoni Moda"', 'Georgia', 'serif'],
        // Brush/script accent — echoes the "Soon" cursive on the poster
        script: ['"Marck Script"', 'cursive'],
        // Utility sans — nav, labels, body copy, letter-spaced like the poster
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
        widest3: '0.5em',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
        flicker: 'flicker 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
