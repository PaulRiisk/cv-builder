// right column of the A4 page: experience, education, and any extra entry sections

import { useCV } from "../state/CVContext";

export function PreviewMain() {
  const doc = useCV();
  const prefix = doc.mode === "dev" ? "// " : "";

  return (
    <section className="main">
      {doc.entrySections.map((section, sectionIndex) => (
        <div key={section.id}>
          {/* first heading has no top margin, all later ones do */}
          <h2
            className={`sec-label main-sec${sectionIndex > 0 ? " mt" : ""}`}
          >
            {prefix}
            {section.heading}
          </h2>
          {section.entries.map((entry) => (
            <article className="exp" key={entry.id}>
              <div className="exp-date">{entry.period}</div>
              <h3 className="exp-role">{entry.title}</h3>
              <div className="exp-company">{entry.place}</div>
              {/* skip empty lines so an in-progress textarea doesn't render gaps */}
              {entry.bullets
                .filter((b) => b.trim() !== "")
                .map((bullet, i) => (
                  <p className="bullet" key={i}>
                    {bullet}
                  </p>
                ))}
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}
