import { useState } from "react";

const defaultPlanForm = {
  clientId: null,
  title: "",
  platform: "instagram",
  type: "Post",
  frequency: "Weekly",
  status: "planning",
  dueDate: "",
  notes: "",
};

export default function ClientPlanning({ clients, platforms, contentTypes, planStatuses, plans, onAddPlan }) {
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id ?? null);
  const [form, setForm] = useState({ ...defaultPlanForm, clientId: clients[0]?.id ?? null });
  const clientPlans = plans.filter((plan) => plan.clientId === Number(selectedClientId));

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title || !form.dueDate) return;

    onAddPlan({
      id: Date.now(),
      clientId: Number(form.clientId),
      ...form,
    });

    setForm({
      ...defaultPlanForm,
      clientId: form.clientId,
      platform: form.platform,
      type: form.type,
    });
  };

  return (
    <div className="card client-planning">
      <div className="card-header">
        <div>
          <p className="eyebrow">Client planning</p>
          <h2>Content roadmaps</h2>
        </div>
        <span className="badge">{clientPlans.length} items</span>
      </div>

      <div className="plan-filter">
        <label>
          <span>View plan for</span>
          <select value={selectedClientId} onChange={(e) => setSelectedClientId(Number(e.target.value))}>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form className="plan-form" onSubmit={handleSubmit}>
        <div className="plan-grid">
          <label>
            <span>Plan title</span>
            <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Campaign or content theme" required />
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
            <span>Frequency</span>
            <select value={form.frequency} onChange={(e) => handleChange("frequency", e.target.value)}>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Monthly">Monthly</option>
              <option value="One-time">One-time</option>
            </select>
          </label>

          <label>
            <span>Status</span>
            <select value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
              {planStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Due date</span>
            <input type="date" value={form.dueDate} onChange={(e) => handleChange("dueDate", e.target.value)} required />
          </label>
        </div>

        <label className="full-width">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} rows="3" placeholder="Client priorities, themes, or reminders" />
        </label>

        <button type="submit" className="button button--accent full-width">Add plan item</button>
      </form>

      <div className="plan-list">
        {clientPlans.length ? (
          clientPlans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-card-header">
                <strong>{plan.title}</strong>
                <span className="status-pill status-pill--active">{plan.status}</span>
              </div>
              <div className="plan-card-meta">
                <span>{platforms.find((item) => item.id === plan.platform)?.label || plan.platform}</span>
                <span>{plan.type}</span>
                <span>{plan.frequency}</span>
                <span>Due {plan.dueDate}</span>
              </div>
              {plan.notes && <p className="plan-card-notes">{plan.notes}</p>}
            </div>
          ))
        ) : (
          <p className="panel-copy">No plan items yet for this client. Use the form above to add a new roadmap item.</p>
        )}
      </div>
    </div>
  );
}
