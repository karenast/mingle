export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "mingle-bg-start":    "#DBE4FF",
        "mingle-bg-page":     "#F1F1FD",
        "mingle-bg-content":  "#DBE4FF",
        "mingle-dark":        "#0F0D1F",
        "mingle-gray":        "#676576",  /* was #797688 — darkened to pass WCAG AA (5.2:1 on white) */
        "mingle-white":       "#FFFFFF",
        "mingle-white2":      "#F0F0F7",
        "mingle-accent":      "#4A74C7",
        "mingle-purple":      "#5319C4",
        "mingle-positive-bg": "#E0F5E5",
        "mingle-positive":    "#2E8F61",

        // Grape persona — purple-tinted variants of the base tokens (from Figma 03-Mascot-v2)
        "grape-bg-page":    "#E9E5FC",  // Page bg  (base: mingle-bg-page #F1F1FD)
        "grape-bg-content": "#DAD0EF",  // Badge / track bg  (base: mingle-bg-content #DBE4FF)
        "grape-panel":      "#F1F1FD",  // Card / panel bg  (base: mingle-white2 #F0F0F7)
        "grape-gray":       "#6B6680",  // Secondary text  (base: mingle-gray #676576)
        "grape-bar":        "#A790FF",  // Filled progress bar (no base equivalent)
        "grape-grad-start": "#ECE8FD",  // Gradient top stop
        "grape-grad-end":   "#D6D6FF",  // Gradient bottom stop
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        phone: "40px",
        card:  "12px",
        pill:  "24px",
        badge: "9px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    logs: false,
  },
};
