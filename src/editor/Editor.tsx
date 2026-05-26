import { useCV, useCVDispatch } from "../state/CVContext";
import { TextField } from "./TextField";
import { TextAreaField } from "./TextAreaField";
import { KeyValueList } from "./KeyValueList";
import { SkillGroups } from "./SkillGroups";
import { SidebarSections } from "./SidebarSections";
import { EntrySections } from "./EntrySections";
import { PhotoField } from "./PhotoField";
import "./editor.css";

type Props = {
  photoUrl: string | null;
  onPhotoChange: (dataUrl: string | null) => void;
};

export function Editor({ photoUrl, onPhotoChange }: Props) {
  const doc = useCV();
  const dispatch = useCVDispatch();

  return (
    <div className="editor">
      <PhotoField photoUrl={photoUrl} onChange={onPhotoChange} />

      <div className="editor-section">
        <h2>Name &amp; title</h2>
        <TextField
          label="Name"
          value={doc.name}
          placeholder="Name Surname"
          onChange={(value) => dispatch({ type: "SET_NAME", value })}
        />
        <p className="helper-text">
          Two words will render on two lines (e.g. "Name / Surname"). Use a
          literal line break for finer control.
        </p>
        <TextField
          label="Title"
          value={doc.title}
          placeholder="your.title / role"
          onChange={(value) => dispatch({ type: "SET_TITLE", value })}
        />
      </div>

      <div className="editor-section">
        <h2>Contact</h2>
        <KeyValueList
          rows={doc.contact}
          labelPlaceholder="label"
          valuePlaceholder="value"
          addLabel="Add contact row"
          onUpdate={(id, patch) =>
            dispatch({ type: "UPDATE_CONTACT", id, patch })
          }
          onRemove={(id) => dispatch({ type: "REMOVE_CONTACT", id })}
          onMove={(id, direction) =>
            dispatch({ type: "MOVE_CONTACT", id, direction })
          }
          onAdd={() => dispatch({ type: "ADD_CONTACT" })}
        />
      </div>

      <div className="editor-section">
        <h2>Profile</h2>
        <TextAreaField
          label="About me"
          value={doc.profile}
          placeholder="Short profile text..."
          onChange={(value) => dispatch({ type: "SET_PROFILE", value })}
          rows={5}
        />
      </div>

      <SkillGroups />
      <SidebarSections />
      <EntrySections />
    </div>
  );
}
