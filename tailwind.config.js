/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',       // Deep Blue
        primaryDark: '#1E40AF',   // Darker Blue
        secondary: '#9333EA',     // Violet
        accent: '#F59E0B',        // Amber
        neutral: '#64748B',       // Cool Gray
        light: '#F3F4F6',         // Light Gray
        dark: '#1F2937',          // Dark Gray
        error: '#EF4444',         // Red
        success: '#10B981',       // Green
      },
      boxShadow: {
        'custom-light': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 10px 15px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
      }
    },
  },
  plugins: [],
};

