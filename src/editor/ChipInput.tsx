import { useState } from "react";
import type { Direction } from "../types";

type Props = {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, direction: Direction) => void;
};

export function ChipInput({ items, onAdd, onRemove, onMove }: Props) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft("");
  };

  return (
    <div>
      <div className="chip-input-row">
        <input
          type="text"
          value={draft}
          placeholder="Add skill"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button type="button" className="row-btn" onClick={submit}>
          Add
        </button>
      </div>
      <div className="chip-list">
        {items.map((item, i) => (
          <span className="chip-edit" key={i}>
            <button
              type="button"
              className="chip-move"
              disabled={i === 0}
              onClick={() => onMove(i, "up")}
              aria-label="Move left"
              title="Move left"
            >
              ◀
            </button>
            <button
              type="button"
              className="chip-move"
              disabled={i === items.length - 1}
              onClick={() => onMove(i, "down")}
              aria-label="Move right"
              title="Move right"
            >
              ▶
            </button>
            {item}
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label="Remove"
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
