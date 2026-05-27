// top bar: mode, theme, save/load/reset, PDF export, light/dark toggle
// most controls have their own component, this is just the layout

import { ThemePresets } from "./ThemePresets";
import { ColorPicker } from "./ColorPicker";
import { ModeSwitcher } from "./ModeSwitcher";
import { useUiTheme } from "./useUiTheme";
import "./topbar.css";

type Props = {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  onExport: () => void;
};

export function Topbar({ onSave, onLoad, onReset, onExport }: Props) {
  // UI theme (light/dark for the app chrome, not the CV preview)
  const [uiTheme, toggleUiTheme] = useUiTheme();
  const isDark = uiTheme === "dark";

  return (
    <header className="topbar">
      <h1>CV Builder</h1>
      <ModeSwitcher />
      <span className="topbar-divider" />
      <ThemePresets />
      <span className="topbar-divider" />
      <ColorPicker />
      <span className="topbar-divider" />
      {/* file + export actions */}
      <button type="button" onClick={onSave}>
        Save
      </button>
      <button type="button" onClick={onLoad}>
        Load
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onExport}>
        Export PDF
      </button>
      {/* sun/moon toggle for light/dark UI */}
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleUiTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? "☀" : "☾"}
      </button>
    </header>
  );
}
