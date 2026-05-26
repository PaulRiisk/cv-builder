import html2pdf from "html2pdf.js";

function slugify(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "cv";
}

export function exportCvPdf(previewEl: HTMLElement, name: string): Promise<void> {
  const options = {
    filename: `${slugify(name)}-cv.pdf`,
    margin: 0,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: null },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  return html2pdf()
    .set(options as Record<string, unknown>)
    .from(previewEl)
    .save();
}
