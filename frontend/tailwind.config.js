/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#0f4d5c",
                "primary-light": "#1a6b7d",
                "background-light": "#f6f8f8",
                "background-dark": "#121d20",
                "surface-light": "#ffffff",
                "surface-dark": "#1a2629",
                "text-main": "#121617",
                "text-sub": "#657f86",
                "slate-900": "#121617",
                "slate-500": "#657f86",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "sans": ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
}
