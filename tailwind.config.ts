import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
    darkMode: ['class'],
    content: [
        `./components/**/*.{vue,js,ts}`,
        `./components/**/*.{vue,js,ts}`,
        `./Functions/**/*.{js,ts}`,
        `./layouts/**/*.vue`,
        `./pages/**/*.vue`,
        `./composables/**/*.{js,ts}`,
        `./plugins/**/*.{js,ts}`,
        `./presets/**/*.{js,ts}`,
        `./utils/**/*.{js,ts}`,
        `./App.{js,ts,vue}`,
        `./app.{js,ts,vue}`,
        `./Error.{js,ts,vue}`,
        `./error.{js,ts,vue}`,
        `./app.config.{js,ts}`,
    ],
    theme: {
        fontFamily: {
            sans: ['IBM Plex Sans Thai', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                primary: {
                    '50': '#fef2f3',
                    '100': '#fce7e8',
                    '200': '#f9d2d7',
                    '300': '#f4adb5',
                    '400': '#ed7f8e',
                    '500': '#e25169',
                    '600': '#cd3152',
                    '700': '#a52241',
                    '800': '#91203e',
                    '900': '#7c1f3b',
                    '950': '#450c1c',
                    default: '#a52241',
                    dark: {
                        50: '#fcf7fa',
                        100: '#faf2f6',
                        200: '#f5dfe8',
                        300: '#edccd8',
                        400: '#e0abb5',
                        500: '#d48a8f',
                        600: '#bf7176',
                        700: '#9e4d52',
                        800: '#803236',
                        900: '#5e1b1f',
                        950: '#3d0c0e',
                        default: '#d48a8f',
                    },
                },
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['disabled'],
            backgroundOpacity: ['disabled'],
            color: ['disabled'],
        },
    },
    plugins: [animate],
} satisfies Config;
