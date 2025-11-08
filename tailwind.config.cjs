/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        fastsaas: {
          primary: '#2563EB',
          'primary-content': '#FFFFFF',
          secondary: '#F97316',
          'secondary-content': '#1B1400',
          accent: '#0EA5E9',
          'accent-content': '#022C42',
          neutral: '#101828',
          'neutral-content': '#F5F7FD',
          'base-100': '#FFFFFF',
          'base-200': '#F3F5FB',
          'base-300': '#E2E8F0',
          'base-content': '#1F2937',
          info: '#0284C7',
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626'
        },
        'fastsaas-dark': {
          primary: '#60A5FA',
          'primary-content': '#0B1220',
          secondary: '#FBBF24',
          'secondary-content': '#0F172A',
          accent: '#38BDF8',
          'accent-content': '#012B3C',
          neutral: '#0B1220',
          'neutral-content': '#E5E7EB',
          'base-100': '#0B1220',
          'base-200': '#111827',
          'base-300': '#1F2937',
          'base-content': '#F3F4F6',
          info: '#38BDF8',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#F87171'
        }
      },
      'light',
      'dark'
    ]
  },
};

export default config;
