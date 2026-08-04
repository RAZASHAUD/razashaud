/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		container: { center: true, padding: '1.5rem', screens: { '2xl': '1280px' } },
		extend: {
			fontFamily: {
				display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
			colors: {
				ink: 'rgb(var(--ink) / <alpha-value>)',
				panel: 'rgb(var(--panel) / <alpha-value>)',
				line: 'rgb(var(--line) / <alpha-value>)',
				fg: 'rgb(var(--fg) / <alpha-value>)',
				muted: 'rgb(var(--muted) / <alpha-value>)',
				trace: 'rgb(var(--trace) / <alpha-value>)',
				live: 'rgb(var(--live) / <alpha-value>)',
				border: 'rgb(var(--line) / <alpha-value>)',
				input: 'rgb(var(--line) / <alpha-value>)',
				ring: 'rgb(var(--trace) / <alpha-value>)',
				background: 'rgb(var(--ink) / <alpha-value>)',
				foreground: 'rgb(var(--fg) / <alpha-value>)',
				primary: { DEFAULT: 'rgb(var(--trace) / <alpha-value>)', foreground: 'rgb(var(--ink) / <alpha-value>)' },
				secondary: { DEFAULT: 'rgb(var(--panel) / <alpha-value>)', foreground: 'rgb(var(--fg) / <alpha-value>)' },
				destructive: { DEFAULT: 'rgb(239 68 68 / <alpha-value>)', foreground: 'rgb(255 255 255 / <alpha-value>)' },
				muted2: { DEFAULT: 'rgb(var(--panel) / <alpha-value>)', foreground: 'rgb(var(--muted) / <alpha-value>)' },
				accent: { DEFAULT: 'rgb(var(--panel) / <alpha-value>)', foreground: 'rgb(var(--fg) / <alpha-value>)' },
				popover: { DEFAULT: 'rgb(var(--panel) / <alpha-value>)', foreground: 'rgb(var(--fg) / <alpha-value>)' },
				card: { DEFAULT: 'rgb(var(--panel) / <alpha-value>)', foreground: 'rgb(var(--fg) / <alpha-value>)' },
			},
			borderRadius: { lg: '10px', md: '8px', sm: '6px' },
			keyframes: {
				'accordion-down': { from: { height: 0 }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: 0 } },
				sweep: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				sweep: 'sweep 3.2s linear infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
