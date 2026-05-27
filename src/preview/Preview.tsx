// the A4 page itself, forwards a ref so App can grab the DOM for PDF export
// applies the accent color and zoom as CSS variables so the CSS does the work

import { forwardRef } from "react";
import { useCV } from "../state/CVContext";
import { PreviewSidebar } from "./PreviewSidebar";
import { PreviewMain } from "./PreviewMain";
import "./preview.css";

type Props = {
  photoUrl?: string | null;
  zoom?: number;
};

export const Preview = forwardRef<HTMLDivElement, Props>(function Preview(
  { photoUrl, zoom = 1 },
  ref,
) {
  const doc = useCV();
  // fall back to the bundled placeholder if no photo is uploaded
  const src = photoUrl ?? `${import.meta.env.BASE_URL}placeholder_cv.png`;

  return (
    <div
      ref={ref}
      className="cv-preview-root"
      data-mode={doc.mode}
      style={{
        ["--accent" as string]: doc.theme.accent,
        ["--zoom" as string]: zoom,
      }}
    >
      <main className="page">
        <PreviewSidebar photoUrl={src} />
        <PreviewMain />
      </main>
    </div>
  );
});
