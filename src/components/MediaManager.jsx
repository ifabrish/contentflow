import { useRef } from "react";

export default function MediaManager({ mediaItems, selectedMediaIds, onUpload, onToggleSelect }) {
  const fileInputRef = useRef(null);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Media Library</p>
          <h2>Assets</h2>
        </div>
        <button className="button button--primary" onClick={() => fileInputRef.current?.click()}>
          Upload Asset
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />

      <div className="media-grid">
        {mediaItems.map((media) => (
          <button
            key={media.id}
            className={`media-card ${selectedMediaIds.includes(media.id) ? "media-card--selected" : ""}`}
            onClick={() => onToggleSelect(media.id)}
            type="button"
          >
            <div className="media-preview" aria-label={media.name}>
              {media.type === "image" ? (
                <img src={media.url} alt={media.name} />
              ) : (
                <div className="media-icon">🎬</div>
              )}
            </div>
            <div className="media-meta">
              <span>{media.name}</span>
              <small>{media.type}</small>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
