// left column of the A4 page: photo, name, title, contact, profile, skills,
// custom sidebar sections

import { useCV } from "../state/CVContext";

// name splits onto two lines: explicit \n wins, otherwise split a two-word name
function renderName(name: string) {
  if (name.includes("\n")) {
    const parts = name.split("\n");
    return parts.flatMap((part, i) =>
      i === 0 ? [part] : [<br key={i} />, part],
    );
  }
  const words = name.trim().split(/\s+/);
  if (words.length === 2) {
    return [words[0], <br key="br" />, words[1]];
  }
  return name;
}

export function PreviewSidebar({ photoUrl }: { photoUrl: string }) {
  const doc = useCV();

  // dev mode adds the > caret and // prefix, classic mode drops them
  const isDev = doc.mode === "dev";
  const prefix = isDev ? "// " : "";

  return (
    <aside className="sidebar">
      {doc.photoEnabled && (
        <img className="photo" src={photoUrl} alt={doc.name} />
      )}

      <h1 className="name">{renderName(doc.name)}</h1>
      <div className="title">
        {isDev && <span className="caret">&gt;</span>}
        {isDev ? " " : ""}
        {doc.title}
      </div>

      {/* contact rows, label on the left, value on the right */}
      {doc.contact.length > 0 && (
        <div className="contact">
          {doc.contact.map((row) => (
            <div key={row.id}>
              <span className="contact-label">{row.label}</span>
              {row.value}
            </div>
          ))}
        </div>
      )}

      {/* short profile paragraph, hidden if empty */}
      {doc.profile.trim() !== "" && (
        <>
          <h2 className="sec-label">{prefix}profile</h2>
          <p className="profile">{doc.profile}</p>
        </>
      )}

      {/* skill groups render as chip rows under their heading */}
      {doc.skillGroups.map((group) => (
        <div key={group.id}>
          <h2 className="sec-label">
            {prefix}
            {group.heading}
          </h2>
          <div className="chips">
            {group.items.map((item, i) => (
              <span className="chip" key={i}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* free-form sidebar sections like languages */}
      {doc.sidebarSections.map((section) => (
        <div key={section.id}>
          <h2 className="sec-label">
            {prefix}
            {section.heading}
          </h2>
          {section.rows.map((row) => (
            <div className="lang" key={row.id}>
              <span className="lang-key">{row.label}:</span>{" "}
              <span className="mono">{row.value}</span>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
