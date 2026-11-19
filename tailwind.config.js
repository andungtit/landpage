/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // Tắt preflight để giữ nguyên 100% style gốc trong styles/oneplan.css
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        palette: {
          ink: withOpacity("--color-ink"),
          muted: withOpacity("--color-muted"),
          blue: withOpacity("--color-blue"),
          line: withOpacity("--color-line"),
        },
      },
      fontFamily: {
        montreal: "Montreal, Arial, sans-serif",
      },
    },
  },
  plugins: [],
};
