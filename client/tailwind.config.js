// Import shared Tailwind configuration from root
import sharedConfig from '../tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  // Override content paths for client-specific build
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../shared/**/*.{js,ts,jsx,tsx}",
  ],
};
