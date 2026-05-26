import { useCV } from "../state/CVContext";

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

  return (
    <aside className="sidebar">
      <img className="photo" src={photoUrl} alt={doc.name} />

      <h1 className="name">{renderName(doc.name)}</h1>
      <div className="title">
        <span className="caret">&gt;</span> {doc.title}
      </div>

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

      {doc.profile.trim() !== "" && (
        <>
          <h2 className="sec-label">// profile</h2>
          <p className="profile">{doc.profile}</p>
        </>
      )}

      {doc.skillGroups.map((group) => (
        <div key={group.id}>
          <h2 className="sec-label">// {group.heading}</h2>
          <div className="chips">
            {group.items.map((item, i) => (
              <span className="chip" key={i}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

      {doc.sidebarSections.map((section) => (
        <div key={section.id}>
          <h2 className="sec-label">// {section.heading}</h2>
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
