export default function DraftPosts({ drafts, platforms, clients, onRemoveDraft }) {
  const findPlatformLabel = (platformId) => platforms.find((item) => item.id === platformId)?.label || platformId;
  const findClientName = (clientId) => clients.find((item) => item.id === Number(clientId))?.name || "Client";

  return (
    <div className="card draft-posts">
      <div className="card-header">
        <div>
          <p className="eyebrow">Draft posts</p>
          <h2>Saved assistant drafts</h2>
        </div>
        <span className="badge">{drafts.length}</span>
      </div>

      {drafts.length ? (
        <div className="draft-list">
          {drafts.map((draft) => (
            <div key={draft.id} className="draft-card">
              <div className="draft-card-header">
                <strong>{draft.title || `Draft for ${findClientName(draft.clientId)}`}</strong>
                <button type="button" className="button button--secondary" onClick={() => onRemoveDraft(draft.id)}>
                  Remove
                </button>
              </div>
              <div className="draft-meta">
                <span>{findClientName(draft.clientId)}</span>
                <span>{findPlatformLabel(draft.platform)}</span>
                <span>{draft.type}</span>
              </div>
              <p className="draft-text">{draft.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="panel-copy">Save a generated assistant response to keep it handy for later scheduling.</p>
      )}
    </div>
  );
}
