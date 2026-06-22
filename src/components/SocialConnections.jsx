export default function SocialConnections({ platforms, connectedAccounts, onToggleConnection }) {
  const connectedCount = connectedAccounts.filter((account) => account.connected).length;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Social accounts</p>
          <h2>Connected networks</h2>
        </div>
        <span className="badge">{connectedCount} connected</span>
      </div>

      <p className="panel-copy">Connect your social channels for easier scheduling and post management.</p>

      <div className="connection-grid">
        {platforms.map((platform) => {
          const account = connectedAccounts.find((item) => item.platformId === platform.id);
          const connected = account?.connected;
          const label = account?.name || "Not connected";

          return (
            <div key={platform.id} className="connection-card">
              <div>
                <p className="platform-name">{platform.label}</p>
                <p className="connection-label">{label}</p>
              </div>
              <div className="connection-actions">
                <span className={`status-pill ${connected ? "status-pill--active" : "status-pill--inactive"}`}>
                  {connected ? "Connected" : "Disconnected"}
                </span>
                <button
                  type="button"
                  className={`button button--secondary ${connected ? "button--muted" : "button--primary"}`}
                  onClick={() => onToggleConnection(platform.id)}
                >
                  {connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
