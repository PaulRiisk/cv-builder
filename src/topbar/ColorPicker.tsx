// native color input wired to the accent token

import { useCV, useCVDispatch } from "../state/CVContext";

export function ColorPicker() {
  const { theme } = useCV();
  const dispatch = useCVDispatch();

  return (
    <label className="color-picker" title="Accent color">
      <span>Accent</span>
      <input
        type="color"
        value={theme.accent}
        onChange={(e) =>
          dispatch({ type: "SET_ACCENT", accent: e.target.value })
        }
      />
    </label>
  );
}
