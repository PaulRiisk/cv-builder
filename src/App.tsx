import { useRef, useState } from "react";
import { Editor } from "./editor/Editor";
import { Preview } from "./preview/Preview";
import { Topbar } from "./topbar/Topbar";
import { useCV, useCVDispatch } from "./state/CVContext";
import {
  clearLocalStorage,
  downloadJson,
  readJsonFile,
} from "./state/persistence";
import { exportCvPdf } from "./pdf/exportPdf";

function App() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
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

  const handleExport = async () => {
    const el = previewRef.current;
    if (!el) return;
    try {
      await exportCvPdf(el, doc.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : "PDF export failed.";
      window.alert(message);
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
          <Preview ref={previewRef} photoUrl={photoUrl} />
        </section>
      </main>
    </div>
  );
}

export default App;
