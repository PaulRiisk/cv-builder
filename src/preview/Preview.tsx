import { forwardRef } from "react";
import { useCV } from "../state/CVContext";
import { PreviewSidebar } from "./PreviewSidebar";
import { PreviewMain } from "./PreviewMain";
import "./preview.css";

type Props = { photoUrl?: string | null };

export const Preview = forwardRef<HTMLDivElement, Props>(function Preview(
  { photoUrl },
  ref,
) {
  const doc = useCV();
  const src = photoUrl ?? `${import.meta.env.BASE_URL}placeholder_cv.png`;

  return (
    <div
      ref={ref}
      className="cv-preview-root"
      data-mode={doc.mode}
      style={{ ["--accent" as string]: doc.theme.accent }}
    >
      <main className="page">
        <PreviewSidebar photoUrl={src} />
        <PreviewMain />
      </main>
    </div>
  );
});
