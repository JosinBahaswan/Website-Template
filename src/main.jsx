import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import Prism.js untuk syntax highlighting
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

// Konfigurasi Prism
Prism.plugins.NormalizeWhitespace.setDefaults({
  "remove-trailing": true,
  "remove-indent": true,
  "left-trim": true,
  "right-trim": true,
});

// Inisialisasi Prism.js setelah render
setTimeout(() => {
  Prism.highlightAll();
}, 100);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
