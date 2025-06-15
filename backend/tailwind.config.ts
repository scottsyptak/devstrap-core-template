// backend/tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  // content: ["./app/static/build/**/*.{jinja,j2,html}"],
  content: ["./app/templates/**/*.{jinja,j2,html}", "./app/static/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
