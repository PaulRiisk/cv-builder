// write the accent color onto a DOM root as a CSS variable
// kept around for completeness; live preview sets --accent inline in JSX

export function applyAccent(root: HTMLElement, accent: string): void {
  root.style.setProperty("--accent", accent);
}
