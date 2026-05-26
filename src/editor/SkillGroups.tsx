import { useCV, useCVDispatch } from "../state/CVContext";
import { ChipInput } from "./ChipInput";

export function SkillGroups() {
  const { skillGroups } = useCV();
  const dispatch = useCVDispatch();

  return (
    <div className="editor-section">
      <h2>Skills</h2>
      {skillGroups.map((group, i) => (
        <div className="skill-group" key={group.id}>
          <div className="skill-group-header">
            <input
              type="text"
              value={group.heading}
              placeholder="group heading"
              onChange={(e) =>
                dispatch({
                  type: "RENAME_SKILL_GROUP",
                  id: group.id,
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
                  type: "MOVE_SKILL_GROUP",
                  id: group.id,
                  direction: "up",
                })
              }
              title="Move group up"
            >
              ↑
            </button>
            <button
              type="button"
              className="row-btn"
              disabled={i === skillGroups.length - 1}
              onClick={() =>
                dispatch({
                  type: "MOVE_SKILL_GROUP",
                  id: group.id,
                  direction: "down",
                })
              }
              title="Move group down"
            >
              ↓
            </button>
            <button
              type="button"
              className="row-btn danger"
              onClick={() =>
                dispatch({ type: "REMOVE_SKILL_GROUP", id: group.id })
              }
              title="Remove group"
            >
              ×
            </button>
          </div>
          <ChipInput
            items={group.items}
            onAdd={(item) =>
              dispatch({ type: "ADD_SKILL", groupId: group.id, item })
            }
            onRemove={(index) =>
              dispatch({ type: "REMOVE_SKILL", groupId: group.id, index })
            }
            onMove={(index, direction) =>
              dispatch({
                type: "MOVE_SKILL",
                groupId: group.id,
                index,
                direction,
              })
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => dispatch({ type: "ADD_SKILL_GROUP" })}
      >
        + Add skill group
      </button>
    </div>
  );
}
