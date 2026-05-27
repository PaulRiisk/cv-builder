// fresh placeholder document, used on first load and on reset
// no personal data here, all values are generic stand-ins

import type { CVDocument } from "./types";
import { newId } from "./types";

export function createDefaultDocument(): CVDocument {
  return {
    version: 1,
    name: "Name Surname",
    title: "your.title / role",
    contact: [
      { id: newId(), label: "email", value: "mail.mail@mail.com" },
      { id: newId(), label: "github", value: "github.com/username" },
      { id: newId(), label: "linkedin", value: "linkedin.com/in/username" },
      { id: newId(), label: "location", value: "City, Country" },
    ],
    profile:
      "Short profile text describing your background, interests, and what you are looking for. Keep it to one or two sentences.",
    skillGroups: [
      { id: newId(), heading: "development", items: [] },
      { id: newId(), heading: "tools", items: [] },
    ],
    sidebarSections: [
      {
        id: newId(),
        heading: "languages",
        rows: [{ id: newId(), label: "english", value: "C1" }],
      },
    ],
    entrySections: [
      {
        id: newId(),
        heading: "experience",
        entries: [
          {
            id: newId(),
            period: "Period",
            title: "Role",
            place: "Organization · City",
            bullets: [],
          },
        ],
      },
      {
        id: newId(),
        heading: "education",
        entries: [
          {
            id: newId(),
            period: "Period",
            title: "Degree",
            place: "Organization · City",
            bullets: [],
          },
        ],
      },
    ],
    theme: {
      preset: "blue",
      accent: "#2046c6",
    },
    mode: "dev",
    photoEnabled: true,
  };
}
