import type {
  CVDocument,
  ContactRow,
  Direction,
  Entry,
  EntrySection,
  SidebarRow,
  SidebarSection,
  SkillGroup,
  ThemePreset,
} from "../types";
import { newId } from "../types";
import { createDefaultDocument } from "../defaults";

export type Action =
  | { type: "SET_NAME"; value: string }
  | { type: "SET_TITLE"; value: string }
  | { type: "SET_PROFILE"; value: string }
  | { type: "ADD_CONTACT" }
  | { type: "UPDATE_CONTACT"; id: string; patch: Partial<Omit<ContactRow, "id">> }
  | { type: "REMOVE_CONTACT"; id: string }
  | { type: "MOVE_CONTACT"; id: string; direction: Direction }
  | { type: "ADD_SKILL_GROUP" }
  | { type: "RENAME_SKILL_GROUP"; id: string; heading: string }
  | { type: "REMOVE_SKILL_GROUP"; id: string }
  | { type: "MOVE_SKILL_GROUP"; id: string; direction: Direction }
  | { type: "ADD_SKILL"; groupId: string; item: string }
  | { type: "REMOVE_SKILL"; groupId: string; index: number }
  | { type: "MOVE_SKILL"; groupId: string; index: number; direction: Direction }
  | { type: "ADD_SIDEBAR_SECTION" }
  | { type: "RENAME_SIDEBAR_SECTION"; id: string; heading: string }
  | { type: "REMOVE_SIDEBAR_SECTION"; id: string }
  | { type: "MOVE_SIDEBAR_SECTION"; id: string; direction: Direction }
  | { type: "ADD_SIDEBAR_ROW"; sectionId: string }
  | {
      type: "UPDATE_SIDEBAR_ROW";
      sectionId: string;
      rowId: string;
      patch: Partial<Omit<SidebarRow, "id">>;
    }
  | { type: "REMOVE_SIDEBAR_ROW"; sectionId: string; rowId: string }
  | {
      type: "MOVE_SIDEBAR_ROW";
      sectionId: string;
      rowId: string;
      direction: Direction;
    }
  | { type: "ADD_ENTRY_SECTION" }
  | { type: "RENAME_ENTRY_SECTION"; id: string; heading: string }
  | { type: "REMOVE_ENTRY_SECTION"; id: string }
  | { type: "MOVE_ENTRY_SECTION"; id: string; direction: Direction }
  | { type: "ADD_ENTRY"; sectionId: string }
  | {
      type: "UPDATE_ENTRY";
      sectionId: string;
      entryId: string;
      patch: Partial<Omit<Entry, "id">>;
    }
  | { type: "REMOVE_ENTRY"; sectionId: string; entryId: string }
  | {
      type: "MOVE_ENTRY";
      sectionId: string;
      entryId: string;
      direction: Direction;
    }
  | { type: "SET_THEME_PRESET"; preset: ThemePreset; accent: string }
  | { type: "SET_ACCENT"; accent: string }
  | { type: "LOAD_DOCUMENT"; doc: CVDocument }
  | { type: "RESET" };

function move<T>(list: T[], index: number, direction: Direction): T[] {
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= list.length) return list;
  const next = list.slice();
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function moveById<T extends { id: string }>(
  list: T[],
  id: string,
  direction: Direction,
): T[] {
  const index = list.findIndex((it) => it.id === id);
  if (index < 0) return list;
  return move(list, index, direction);
}

export function cvReducer(state: CVDocument, action: Action): CVDocument {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_TITLE":
      return { ...state, title: action.value };
    case "SET_PROFILE":
      return { ...state, profile: action.value };

    case "ADD_CONTACT":
      return {
        ...state,
        contact: [...state.contact, { id: newId(), label: "", value: "" }],
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contact: state.contact.map((row) =>
          row.id === action.id ? { ...row, ...action.patch } : row,
        ),
      };
    case "REMOVE_CONTACT":
      return {
        ...state,
        contact: state.contact.filter((row) => row.id !== action.id),
      };
    case "MOVE_CONTACT":
      return {
        ...state,
        contact: moveById(state.contact, action.id, action.direction),
      };

    case "ADD_SKILL_GROUP": {
      const group: SkillGroup = { id: newId(), heading: "new group", items: [] };
      return { ...state, skillGroups: [...state.skillGroups, group] };
    }
    case "RENAME_SKILL_GROUP":
      return {
        ...state,
        skillGroups: state.skillGroups.map((g) =>
          g.id === action.id ? { ...g, heading: action.heading } : g,
        ),
      };
    case "REMOVE_SKILL_GROUP":
      return {
        ...state,
        skillGroups: state.skillGroups.filter((g) => g.id !== action.id),
      };
    case "MOVE_SKILL_GROUP":
      return {
        ...state,
        skillGroups: moveById(state.skillGroups, action.id, action.direction),
      };

    case "ADD_SKILL": {
      const item = action.item.trim();
      if (!item) return state;
      return {
        ...state,
        skillGroups: state.skillGroups.map((g) =>
          g.id === action.groupId ? { ...g, items: [...g.items, item] } : g,
        ),
      };
    }
    case "REMOVE_SKILL":
      return {
        ...state,
        skillGroups: state.skillGroups.map((g) =>
          g.id === action.groupId
            ? { ...g, items: g.items.filter((_, i) => i !== action.index) }
            : g,
        ),
      };
    case "MOVE_SKILL":
      return {
        ...state,
        skillGroups: state.skillGroups.map((g) =>
          g.id === action.groupId
            ? { ...g, items: move(g.items, action.index, action.direction) }
            : g,
        ),
      };

    case "ADD_SIDEBAR_SECTION": {
      const section: SidebarSection = {
        id: newId(),
        heading: "new section",
        rows: [],
      };
      return { ...state, sidebarSections: [...state.sidebarSections, section] };
    }
    case "RENAME_SIDEBAR_SECTION":
      return {
        ...state,
        sidebarSections: state.sidebarSections.map((s) =>
          s.id === action.id ? { ...s, heading: action.heading } : s,
        ),
      };
    case "REMOVE_SIDEBAR_SECTION":
      return {
        ...state,
        sidebarSections: state.sidebarSections.filter((s) => s.id !== action.id),
      };
    case "MOVE_SIDEBAR_SECTION":
      return {
        ...state,
        sidebarSections: moveById(
          state.sidebarSections,
          action.id,
          action.direction,
        ),
      };

    case "ADD_SIDEBAR_ROW":
      return {
        ...state,
        sidebarSections: state.sidebarSections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                rows: [...s.rows, { id: newId(), label: "", value: "" }],
              }
            : s,
        ),
      };
    case "UPDATE_SIDEBAR_ROW":
      return {
        ...state,
        sidebarSections: state.sidebarSections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                rows: s.rows.map((r) =>
                  r.id === action.rowId ? { ...r, ...action.patch } : r,
                ),
              }
            : s,
        ),
      };
    case "REMOVE_SIDEBAR_ROW":
      return {
        ...state,
        sidebarSections: state.sidebarSections.map((s) =>
          s.id === action.sectionId
            ? { ...s, rows: s.rows.filter((r) => r.id !== action.rowId) }
            : s,
        ),
      };
    case "MOVE_SIDEBAR_ROW":
      return {
        ...state,
        sidebarSections: state.sidebarSections.map((s) =>
          s.id === action.sectionId
            ? { ...s, rows: moveById(s.rows, action.rowId, action.direction) }
            : s,
        ),
      };

    case "ADD_ENTRY_SECTION": {
      const section: EntrySection = {
        id: newId(),
        heading: "other",
        entries: [],
      };
      return { ...state, entrySections: [...state.entrySections, section] };
    }
    case "RENAME_ENTRY_SECTION":
      return {
        ...state,
        entrySections: state.entrySections.map((s) =>
          s.id === action.id ? { ...s, heading: action.heading } : s,
        ),
      };
    case "REMOVE_ENTRY_SECTION":
      return {
        ...state,
        entrySections: state.entrySections.filter((s) => s.id !== action.id),
      };
    case "MOVE_ENTRY_SECTION":
      return {
        ...state,
        entrySections: moveById(
          state.entrySections,
          action.id,
          action.direction,
        ),
      };

    case "ADD_ENTRY":
      return {
        ...state,
        entrySections: state.entrySections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                entries: [
                  ...s.entries,
                  {
                    id: newId(),
                    period: "Period",
                    title: "Role",
                    place: "Organization · City",
                    bullets: [],
                  },
                ],
              }
            : s,
        ),
      };
    case "UPDATE_ENTRY":
      return {
        ...state,
        entrySections: state.entrySections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                entries: s.entries.map((e) =>
                  e.id === action.entryId ? { ...e, ...action.patch } : e,
                ),
              }
            : s,
        ),
      };
    case "REMOVE_ENTRY":
      return {
        ...state,
        entrySections: state.entrySections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                entries: s.entries.filter((e) => e.id !== action.entryId),
              }
            : s,
        ),
      };
    case "MOVE_ENTRY":
      return {
        ...state,
        entrySections: state.entrySections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                entries: moveById(s.entries, action.entryId, action.direction),
              }
            : s,
        ),
      };

    case "SET_THEME_PRESET":
      return {
        ...state,
        theme: { preset: action.preset, accent: action.accent },
      };
    case "SET_ACCENT":
      return { ...state, theme: { ...state.theme, accent: action.accent } };

    case "LOAD_DOCUMENT":
      return action.doc;
    case "RESET":
      return createDefaultDocument();
  }
}
