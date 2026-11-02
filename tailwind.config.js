/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        surface: '#FAFAFF',
        'surface-subtle': '#F8FAFC',
        'border-light': '#E2E8F0',
        'border-subtle': '#F1F5F9',
        charcoal: '#0F172A',
        'charcoal-muted': '#64748B',
        'charcoal-light': '#94A3B8',
        'pastel-violet': '#7C3AED',
        'pastel-violet-subtle': '#F5F3FF',
        'pastel-violet-border': '#EDE9FE',
        'powder-blue': '#3B82F6',
        'powder-blue-subtle': '#EFF6FF',
        'powder-blue-border': '#DBEAFE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 8px 28px -4px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'soft-hover': '0 12px 32px -4px rgba(124, 58, 237, 0.07), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
