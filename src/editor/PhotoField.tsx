import { useCV, useCVDispatch } from "../state/CVContext";

type Props = {
  photoUrl: string | null;
  onChange: (dataUrl: string | null) => void;
};

export function PhotoField({ photoUrl, onChange }: Props) {
  const { photoEnabled } = useCV();
  const dispatch = useCVDispatch();

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
      <div className="photo-header">
        <h2>Profile photo</h2>
        <label className="photo-toggle">
          <input
            type="checkbox"
            checked={photoEnabled}
            onChange={(e) =>
              dispatch({
                type: "SET_PHOTO_ENABLED",
                enabled: e.target.checked,
              })
            }
          />
          Show photo on CV
        </label>
      </div>

      {photoEnabled && (
        <>
          <img
            className="photo-preview"
            src={photoUrl ?? `${import.meta.env.BASE_URL}placeholder_cv.png`}
            alt="Profile preview"
          />
          <p className="helper-text">
            Use a square image (1:1). Non-square images will be center-cropped
            to fit the circle. Photo is not saved with your data — re-upload
            after loading a saved file.
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
        </>
      )}
    </div>
  );
}
