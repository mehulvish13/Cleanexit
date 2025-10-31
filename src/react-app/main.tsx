/**
 * MAIN ENTRY POINT FOR REACT APP
 * 
 * This is where our React application starts. It:
 * 1. Finds the #root div in index.html
 * 2. Creates a React root there
 * 3. Renders our App component inside StrictMode
 * 
 * StrictMode helps catch common bugs during development by:
 * - Running effects twice to find missing cleanup
 * - Warning about deprecated APIs
 * - Detecting unexpected side effects
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/react-app/index.css";  // Tailwind CSS styles
import App from "@/react-app/App.tsx";

// Find the root element and mount our React app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
