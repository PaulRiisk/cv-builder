type Props = {
  photoUrl: string | null;
  onChange: (dataUrl: string | null) => void;
};

export function PhotoField({ photoUrl, onChange }: Props) {
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="editor-section">
      <h2>Profile photo</h2>
      <img
        className="photo-preview"
        src={photoUrl ?? "/placeholder_cv.png"}
        alt="Profile preview"
      />
      <p className="helper-text">
        Use a square image (1:1). Non-square images will be center-cropped to
        fit the circle. Photo is not saved with your data — re-upload after
        loading a saved file.
      </p>
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {photoUrl && (
        <button
          type="button"
          className="row-btn"
          style={{ marginLeft: 8 }}
          onClick={() => onChange(null)}
        >
          Remove photo
        </button>
      )}
    </div>
  );
}
