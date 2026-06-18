/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

import React from "react";
import ReactDOM from "react-dom/client";
import { AIDiscoveryApp } from "./components/AIDiscoveryApp";
import "./styles.css";

// ============================================================
// DYNAMIC FAVICON - Replace Lovable icon with custom AI icon
// ============================================================
const faviconData = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%23052b66'/%3E%3Ctext x='50' y='65' font-family='Arial' font-size='45' font-weight='bold' fill='%2345cc42' text-anchor='middle'%3EAI%3C/text%3E%3C/svg%3E";

// Remove any existing favicon links
document.querySelectorAll('link[rel*="icon"]').forEach(el => el.remove());

// Create and add new favicon
const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/svg+xml';
link.href = faviconData;
document.head.appendChild(link);

// ============================================================
// RENDER APP
// ============================================================
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AIDiscoveryApp />
  </React.StrictMode>
);