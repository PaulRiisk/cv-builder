export type ContactRow = {
  id: string;
  label: string;
  value: string;
};

export type SkillGroup = {
  id: string;
  heading: string;
  items: string[];
};

export type SidebarRow = {
  id: string;
  label: string;
  value: string;
};

export type SidebarSection = {
  id: string;
  heading: string;
  rows: SidebarRow[];
};

export type Entry = {
  id: string;
  period: string;
  title: string;
  place: string;
  bullets: string[];
};

export type EntrySection = {
  id: string;
  heading: string;
  entries: Entry[];
};

export type ThemePreset = "blue" | "teal" | "rust";

export type Theme = {
  preset: ThemePreset;
  accent: string;
};

export type CVDocument = {
  version: 1;
  name: string;
  title: string;
  contact: ContactRow[];
  profile: string;
  skillGroups: SkillGroup[];
  sidebarSections: SidebarSection[];
  entrySections: EntrySection[];
  theme: Theme;
};

export type Direction = "up" | "down";

export function newId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID().slice(0, 8);
  }
  return Math.random().toString(36).slice(2, 10);
}
