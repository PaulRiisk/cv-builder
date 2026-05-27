// localStorage hydration + JSON file save/load
// the photo is never written here, photo lives only in app state

import type { CVDocument } from "../types";
import { newId } from "../types";

const STORAGE_KEY = "cv-builder-v1";

// loaded docs get fresh ids so react keys stay stable, and old fields
// missing from saved files fall back to sensible defaults
function regenerateIds(doc: CVDocument): CVDocument {
  return {
    ...doc,
    mode: doc.mode ?? "dev",
    photoEnabled: doc.photoEnabled ?? true,
    contact: doc.contact.map((row) => ({ ...row, id: newId() })),
    skillGroups: doc.skillGroups.map((g) => ({ ...g, id: newId() })),
    sidebarSections: doc.sidebarSections.map((s) => ({
      ...s,
      id: newId(),
      rows: s.rows.map((r) => ({ ...r, id: newId() })),
    })),
    entrySections: doc.entrySections.map((s) => ({
      ...s,
      id: newId(),
      entries: s.entries.map((e) => ({ ...e, id: newId() })),
    })),
  };
}

// loose shape check so junk in localStorage doesn't crash the app
function isValidDocument(value: unknown): value is CVDocument {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    v.version === 1 &&
    typeof v.name === "string" &&
    typeof v.title === "string" &&
    Array.isArray(v.contact) &&
    typeof v.profile === "string" &&
    Array.isArray(v.skillGroups) &&
    Array.isArray(v.sidebarSections) &&
    Array.isArray(v.entrySections) &&
    typeof v.theme === "object" &&
    v.theme !== null
  );
}

// localStorage handlers, all wrapped in try so private mode or quota errors
// don't take the app down
export function loadFromLocalStorage(): CVDocument | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidDocument(parsed)) return null;
    return regenerateIds(parsed);
  } catch {
    return null;
  }
}

export function saveToLocalStorage(doc: CVDocument): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
  } catch {
    // quota or disabled, silent fallback
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}

// turn a free-text name into a safe filename slug
function slugify(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "cv";
}

// trigger a browser download for the current document
export function downloadJson(doc: CVDocument): void {
  const blob = new Blob([JSON.stringify(doc, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugify(doc.name)}-cv-data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// read a user-picked JSON file and validate it as a CV document
export function readJsonFile(file: File): Promise<CVDocument> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!isValidDocument(parsed)) {
          reject(new Error("File is not a valid CV document (version 1)."));
          return;
        }
        resolve(regenerateIds(parsed));
      } catch {
        reject(new Error("File is not valid JSON."));
      }
    };
    reader.readAsText(file);
  });
}
