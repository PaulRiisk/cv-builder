// top-level component, wires topbar + editor + preview together
// also owns the photo slot (kept in memory, never persisted) and the zoom state

import { useRef, useState } from "react";
import { Editor } from "./editor/Editor";
import { Preview } from "./preview/Preview";
import { PreviewToolbar } from "./preview/PreviewToolbar";
import { Topbar } from "./topbar/Topbar";
import { useCV, useCVDispatch } from "./state/CVContext";
import {
  clearLocalStorage,
  downloadJson,
  readJsonFile,
} from "./state/persistence";
import { exportCvPdf } from "./pdf/exportPdf";

function App() {
  // photo lives in app state only, not in the CV document
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // refs we need for export (preview DOM) and load (hidden file input)
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doc = useCV();
  const dispatch = useCVDispatch();

  const handleSave = () => {
    downloadJson(doc);
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleLoadFile = async (file: File) => {
    try {
      const loaded = await readJsonFile(file);
      dispatch({ type: "LOAD_DOCUMENT", doc: loaded });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load file.";
      window.alert(message);
    }
  };

  const handleReset = () => {
    if (
      !window.confirm(
        "Reset will discard the current document and clear saved data. Continue?",
      )
    ) {
      return;
    }
    clearLocalStorage();
    setPhotoUrl(null);
    dispatch({ type: "RESET" });
  };

  // export PDF, while temporarily hiding the overflow indicator and resetting zoom
  const handleExport = async () => {
    const el = previewRef.current;
    if (!el) return;
    el.classList.add("pdf-exporting");
    const prevZoom = el.style.getPropertyValue("--zoom");
    el.style.setProperty("--zoom", "1");
    try {
      await exportCvPdf(el, doc.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : "PDF export failed.";
      window.alert(message);
    } finally {
      el.classList.remove("pdf-exporting");
      if (prevZoom) el.style.setProperty("--zoom", prevZoom);
      else el.style.removeProperty("--zoom");
    }
  };

  return (
    <div className="app">
      <Topbar
        onSave={handleSave}
        onLoad={handleLoad}
        onReset={handleReset}
        onExport={handleExport}
      />

      {/* hidden file input, opened by the Load button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleLoadFile(file);
          e.target.value = "";
        }}
      />

      <main className="panes">
        <section className="editor-pane" aria-label="Editor">
          <Editor photoUrl={photoUrl} onPhotoChange={setPhotoUrl} />
        </section>
        <section className="preview-pane" aria-label="Preview">
          <PreviewToolbar zoom={zoom} onZoomChange={setZoom} />
          <Preview ref={previewRef} photoUrl={photoUrl} zoom={zoom} />
        </section>
      </main>
    </div>
  );
}

export default App;
