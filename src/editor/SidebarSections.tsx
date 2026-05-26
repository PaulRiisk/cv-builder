import { useCV, useCVDispatch } from "../state/CVContext";
import { KeyValueList } from "./KeyValueList";

export function SidebarSections() {
  const { sidebarSections } = useCV();
  const dispatch = useCVDispatch();

  return (
    <div className="editor-section">
      <h2>Sidebar sections</h2>
      {sidebarSections.map((section, i) => (
        <div className="skill-group" key={section.id}>
          <div className="skill-group-header">
            <input
              type="text"
              value={section.heading}
              placeholder="section heading"
              onChange={(e) =>
                dispatch({
                  type: "RENAME_SIDEBAR_SECTION",
                  id: section.id,
                  heading: e.target.value,
                })
              }
            />
            <button
              type="button"
              className="row-btn"
              disabled={i === 0}
              onClick={() =>
                dispatch({
                  type: "MOVE_SIDEBAR_SECTION",
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
              disabled={i === sidebarSections.length - 1}
              onClick={() =>
                dispatch({
                  type: "MOVE_SIDEBAR_SECTION",
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
                dispatch({ type: "REMOVE_SIDEBAR_SECTION", id: section.id })
              }
              title="Remove section"
            >
              ×
            </button>
          </div>

          <KeyValueList
            rows={section.rows}
            addLabel="Add row"
            onUpdate={(rowId, patch) =>
              dispatch({
                type: "UPDATE_SIDEBAR_ROW",
                sectionId: section.id,
                rowId,
                patch,
              })
            }
            onRemove={(rowId) =>
              dispatch({
                type: "REMOVE_SIDEBAR_ROW",
                sectionId: section.id,
                rowId,
              })
            }
            onMove={(rowId, direction) =>
              dispatch({
                type: "MOVE_SIDEBAR_ROW",
                sectionId: section.id,
                rowId,
                direction,
              })
            }
            onAdd={() =>
              dispatch({ type: "ADD_SIDEBAR_ROW", sectionId: section.id })
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => dispatch({ type: "ADD_SIDEBAR_SECTION" })}
      >
        + Add sidebar section
      </button>
    </div>
  );
}
