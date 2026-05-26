import { useCV, useCVDispatch } from "../state/CVContext";
import { EntryEditor } from "./EntryEditor";

export function EntrySections() {
  const { entrySections } = useCV();
  const dispatch = useCVDispatch();

  return (
    <>
      {entrySections.map((section, sectionIndex) => (
        <div className="editor-section" key={section.id}>
          <div className="entry-section-header">
            <input
              type="text"
              value={section.heading}
              placeholder="section heading"
              onChange={(e) =>
                dispatch({
                  type: "RENAME_ENTRY_SECTION",
                  id: section.id,
                  heading: e.target.value,
                })
              }
            />
            <button
              type="button"
              className="row-btn"
              disabled={sectionIndex === 0}
              onClick={() =>
                dispatch({
                  type: "MOVE_ENTRY_SECTION",
                  id: section.id,
                  direction: "up",
                })
              }
              title="Move section up"
            >
              ↑
            </button>
            <button
              type="button"
              className="row-btn"
              disabled={sectionIndex === entrySections.length - 1}
              onClick={() =>
                dispatch({
                  type: "MOVE_ENTRY_SECTION",
                  id: section.id,
                  direction: "down",
                })
              }
              title="Move section down"
            >
              ↓
            </button>
            <button
              type="button"
              className="row-btn danger"
              onClick={() =>
                dispatch({ type: "REMOVE_ENTRY_SECTION", id: section.id })
              }
              title="Remove section"
            >
              ×
            </button>
          </div>

          {section.entries.map((entry, entryIndex) => (
            <EntryEditor
              key={entry.id}
              entry={entry}
              isFirst={entryIndex === 0}
              isLast={entryIndex === section.entries.length - 1}
              onUpdate={(patch) =>
                dispatch({
                  type: "UPDATE_ENTRY",
                  sectionId: section.id,
                  entryId: entry.id,
                  patch,
                })
              }
              onRemove={() =>
                dispatch({
                  type: "REMOVE_ENTRY",
                  sectionId: section.id,
                  entryId: entry.id,
                })
              }
              onMoveUp={() =>
                dispatch({
                  type: "MOVE_ENTRY",
                  sectionId: section.id,
                  entryId: entry.id,
                  direction: "up",
                })
              }
              onMoveDown={() =>
                dispatch({
                  type: "MOVE_ENTRY",
                  sectionId: section.id,
                  entryId: entry.id,
                  direction: "down",
                })
              }
            />
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() =>
              dispatch({ type: "ADD_ENTRY", sectionId: section.id })
            }
          >
            + Add entry
          </button>
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => dispatch({ type: "ADD_ENTRY_SECTION" })}
      >
        + Add entry section
      </button>
    </>
  );
}
