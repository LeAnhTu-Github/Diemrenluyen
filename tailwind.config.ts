import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  presets: [require("@premieroctet/next-admin/dist/preset")],
  theme: {
    extend: {
      backgroundImage: {
        nav1: "url('/images/nav1.jpg')",
        nav2: "url('/images/nav2.jpg')",
        nav3: "url('/images/nav3.jpg')",
        noti: "url('/images/noti.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"),
  require("tw-elements-react/dist/plugin.cjs")
  ],
};
export default config;
