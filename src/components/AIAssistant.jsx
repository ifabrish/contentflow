import { useState } from "react";

const defaultPrompt = "Write a full client-ready media strategy for social growth, viral video content, and music remix campaigns in a professional tone.";

const AI_PROVIDERS = [
  { id: "openai", label: "OpenAI / ChatGPT", description: "Use ChatGPT-style generation for conversational, client-ready copy." },
  { id: "claude", label: "Anthropic Claude", description: "Use Claude-style generation for coherent business and planning language." },
];

export default function AIAssistant({ platforms, contentTypes, clients, onSaveDraft, onSavePlan }) {
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id ?? null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]?.id ?? "");
  const [selectedType, setSelectedType] = useState(contentTypes[0] ?? "Post");
  const [tone, setTone] = useState("friendly");
  const [selectedProvider, setSelectedProvider] = useState(AI_PROVIDERS[0].id);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [response, setResponse] = useState("");

  const selectedClient = clients.find((client) => client.id === Number(selectedClientId));

  const generateResponse = (action) => {
    const platformLabel = platforms.find((item) => item.id === selectedPlatform)?.label || "social channel";
    const clientName = selectedClient?.name || "your client";
    const contentType = selectedType;
    const providerName = AI_PROVIDERS.find((provider) => provider.id === selectedProvider)?.label || "AI provider";

    if (action === "brief") {
      return `Create a ${tone} campaign brief for ${clientName} on ${platformLabel}. The content type is ${contentType}, and the goal is to support client growth, clarify messaging, and make scheduling easier. Include audience, key message, and suggested publishing cadence.`;
    }

    if (action === "formalBrief") {
      return `Create a formal client-facing media plan for ${clientName} on ${platformLabel}. Structure the document with sections for Executive Summary, Goals, Target Audience, Content Approach, Timeline, and Recommendations. Use a professional tone and make the output easy for clients to review.`;
    }

    if (action === "caption") {
      return `Draft a ${tone} caption for a ${contentType} on ${platformLabel} for ${clientName}. Mention strong benefits, a clear call to action, and relevant hashtags that support client engagement.`;
    }

    if (action === "socialGrowth") {
      return `Create a professional social media growth plan for ${clientName} on ${platformLabel}. Include follower growth tactics, content pillars, posting cadence, and engagement strategies for a high-impact launch.`;
    }

    if (action === "viralVideo") {
      return `Draft a viral video editing brief for ${clientName} on ${platformLabel}. Include hook ideas, recommended pacing, caption text, and format advice for maximum reach across TikTok, Instagram, and YouTube.`;
    }

    if (action === "musicRemix") {
      return `Create a music remix content plan for ${clientName} that supports YouTube channel growth. Include remix concept ideas, audio treatment notes, and distribution suggestions for remix videos and clone music content.`;
    }

    if (action === "schedule") {
      return `Recommend a weekly schedule for ${clientName} across ${platformLabel}. Include the best days and suggested post types to keep the audience engaged and provide reliable media planning support.`;
    }

    if (action === "autoResponse") {
      return `Create a full client-facing response for ${clientName} on ${platformLabel} using ${providerName}. Include:
- A formal executive summary
- The main content strategy
- Social growth tactics
- Recommended video format and remix ideas
- A posting schedule overview
- A clear next-step client action plan

Use a professional, persuasive tone and make the response suitable for presenting directly to the client.`;
    }

    return `Using the prompt: ${prompt}\n\nCreate a helpful response for ${clientName} on ${platformLabel} that supports strong media management and client delivery. This output should reflect ${providerName} style when available.`;
  };

  const createDraft = () => {
    const text = response || generateResponse("custom");
    const title = text.split("\n")[0].slice(0, 60) || `${selectedType} idea`;

    return {
      id: Date.now(),
      clientId: Number(selectedClientId),
      platform: selectedPlatform,
      type: selectedType,
      tone,
      title,
      text,
    };
  };

  const handleGenerate = (action) => {
    setResponse(generateResponse(action));
  };

  const handleCustomSubmit = (event) => {
    event.preventDefault();
    setResponse(generateResponse("custom"));
  };

  const handleSaveDraft = () => {
    if (!response) return;
    onSaveDraft(createDraft());
  };

  const handleSaveAsPlan = () => {
    if (!response) return;
    onSavePlan({
      id: Date.now(),
      clientId: Number(selectedClientId),
      title: `AI ${selectedType} for ${selectedClient?.name || "client"}`,
      platform: selectedPlatform,
      type: selectedType,
      frequency: "Weekly",
      status: "planning",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      notes: response,
    });
  };

  return (
    <div className="card ai-assistant">
      <div className="card-header">
        <div>
          <p className="eyebrow">AI Assistant</p>
          <h2>Media manager support</h2>
        </div>
        <span className="badge">Client-ready</span>
      </div>

      <p className="panel-copy">Automatic AI assistant system for client-ready media plans, social growth strategies, and professional content execution.</p>

      <div className="assistant-grid">
        <label>
          <span>Client</span>
          <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)}>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Platform</span>
          <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Content type</span>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Provider</span>
          <select value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
            {AI_PROVIDERS.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="provider-info">
        <p className="panel-copy">
          {AI_PROVIDERS.find((provider) => provider.id === selectedProvider)?.description}
        </p>
      </div>

      <form className="assistant-prompt" onSubmit={handleCustomSubmit}>
        <label className="full-width">
          <span>Custom prompt</span>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="4" />
        </label>

        <div className="assistant-actions">
          <button type="button" className="button button--primary" onClick={() => handleGenerate("brief")}>Create brief</button>
          <button type="button" className="button button--accent" onClick={() => handleGenerate("formalBrief")}>Formal client plan</button>
          <button type="button" className="button button--secondary" onClick={() => handleGenerate("socialGrowth")}>Social growth plan</button>
          <button type="button" className="button button--secondary" onClick={() => handleGenerate("viralVideo")}>Viral video brief</button>
          <button type="button" className="button button--secondary" onClick={() => handleGenerate("musicRemix")}>Music remix plan</button>
          <button type="button" className="button button--secondary" onClick={() => handleGenerate("schedule")}>Plan schedule</button>
          <button type="button" className="button button--secondary" onClick={() => handleGenerate("autoResponse")}>Auto full response</button>
          <button type="submit" className="button button--primary">Generate</button>
        </div>
      </form>

      <div className="assistant-response">
        <div className="assistant-response-controls">
          <button type="button" className="button button--secondary" onClick={handleSaveDraft} disabled={!response}>
            Save draft
          </button>
          <button type="button" className="button button--accent" onClick={handleSaveAsPlan} disabled={!response}>
            Save as plan item
          </button>
        </div>
        <h3>Assistant preview</h3>
        <p>{response || "Generate a helpful response to support the client and media workflow."}</p>
      </div>
    </div>
  );
}
