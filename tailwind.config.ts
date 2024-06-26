import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
