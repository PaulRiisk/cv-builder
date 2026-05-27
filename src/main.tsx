// app entry, mounts react and wraps everything in the CV provider

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// self-hosted fonts so we don't hit google's CDN at runtime
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./index.css";
import App from "./App.tsx";
import { CVProvider } from "./state/CVContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </StrictMode>,
);
