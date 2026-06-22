import { useState } from "react";

const defaultForm = {
  title: "",
  platform: "instagram",
  type: "Post",
  assignee: "1",
  status: "draft",
  scheduleDate: "",
  scheduleTime: "",
  caption: "",
};

export default function ContentScheduler({ platforms, contentTypes, teamMembers, statusOptions, selectedMediaIds, mediaItems, onSchedule }) {
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState("");

  const selectedMedia = mediaItems.filter((item) => selectedMediaIds.includes(item.id));

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSchedule({
      ...form,
      assignee: Number(form.assignee),
      platforms: [form.platform],
      mediaIds: selectedMediaIds,
      createdAt: new Date().toISOString(),
    });
    setForm(defaultForm);
    setMessage("Content item scheduled successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Scheduler</p>
          <h2>Create post</h2>
        </div>
        <span className="badge">{selectedMedia.length} assets selected</span>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Campaign headline"
            required
          />
        </label>

        <label>
          <span>Platform</span>
          <select value={form.platform} onChange={(e) => handleChange("platform", e.target.value)}>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Content type</span>
          <select value={form.type} onChange={(e) => handleChange("type", e.target.value)}>
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Assigned to</span>
          <select value={form.assignee} onChange={(e) => handleChange("assignee", e.target.value)}>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Status</span>
          <select value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Schedule date</span>
          <input
            type="date"
            value={form.scheduleDate}
            onChange={(e) => handleChange("scheduleDate", e.target.value)}
            required
          />
        </label>

        <label>
          <span>Schedule time</span>
          <input
            type="time"
            value={form.scheduleTime}
            onChange={(e) => handleChange("scheduleTime", e.target.value)}
            required
          />
        </label>

        <label className="full-width">
          <span>Caption / notes</span>
          <textarea
            value={form.caption}
            onChange={(e) => handleChange("caption", e.target.value)}
            placeholder="Draft caption, hashtags, or content notes"
            rows="4"
          />
        </label>

        <button className="button button--accent full-width" type="submit" disabled={!selectedMedia.length}>
          Schedule content
        </button>
      </form>

      {message && <p className="alert">{message}</p>}

      <div className="summary-panel">
        <h3>Up next</h3>
        <p>{selectedMedia.length ? `${selectedMedia.length} asset(s) will publish with this post.` : "Select assets from the media panel to attach them."}</p>
      </div>
    </div>
  );
}
