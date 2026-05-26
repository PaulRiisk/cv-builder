import { ThemePresets } from "./ThemePresets";
import { ColorPicker } from "./ColorPicker";
import "./topbar.css";

type Props = {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  onExport: () => void;
};

export function Topbar({ onSave, onLoad, onReset, onExport }: Props) {
  return (
    <header className="topbar">
      <h1>CV Builder</h1>
      <ThemePresets />
      <span className="topbar-divider" />
      <ColorPicker />
      <span className="topbar-divider" />
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
    </header>
  );
}
