// light/dark mode for the app chrome only, never for the CV preview
// state is persisted in localStorage under its own key

import { useEffect, useState } from "react";

export type UiTheme = "light" | "dark";

const STORAGE_KEY = "cv-builder-ui-theme";

// read a previous choice from localStorage if there is one
function readStored(): UiTheme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

// fall back to the OS preference on first visit
function systemPreference(): UiTheme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export function useUiTheme(): [UiTheme, () => void] {
  const [theme, setTheme] = useState<UiTheme>(
    () => readStored() ?? systemPreference(),
  );

  // mirror the choice to the html data-theme attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // no-op
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}
