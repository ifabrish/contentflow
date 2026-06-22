import { useMemo, useState } from "react";

const nicheSuggestions = [
  {
    title: "Creative AI Content for Entrepreneurs",
    details: "Use AI-generated business tips, trending short-form videos, and client success stories to attract business owners.",
  },
  {
    title: "Music Remix Content for YouTube Growth",
    details: "Publish remix videos, behind-the-scenes production content, and music marketing insights to build a loyal audience.",
  },
  {
    title: "Visual Storytelling for Brand Launches",
    details: "Create cinematic campaign videos, launch teasers, and polished brand narratives that resonate with modern social audiences.",
  },
];

export default function BusinessGrowthPlan({ platforms }) {
  const [businessName, setBusinessName] = useState("My Business");
  const [niche, setNiche] = useState(nicheSuggestions[0].title);
  const [platform, setPlatform] = useState(platforms[0]?.label || "Instagram");
  const [goal, setGoal] = useState("Grow followers and engagement");
  const [audience, setAudience] = useState("Young professionals and creators");

  const selectedNiche = useMemo(
    () => nicheSuggestions.find((item) => item.title === niche) || nicheSuggestions[0],
    [niche]
  );

  const planSummary = useMemo(() => {
    return `Business: ${businessName}\nNiche: ${niche}\nPlatform: ${platform}\nGoal: ${goal}\nAudience: ${audience}\n\nContent strategy: Focus on consistent, high-value content with a clear hook, branded visual style, and frequent posting. Use platform-specific formats and remix music/video ideas to increase reach. Measure performance weekly and refine the plan based on engagement.`;
  }, [businessName, niche, platform, goal, audience]);

  return (
    <div className="card growth-plan-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Growth plan</p>
          <h2>Best niche and content strategy</h2>
        </div>
        <span className="badge">Clear business focus</span>
      </div>

      <p className="panel-copy">Define a strong niche, align the content plan to your audience, and use best-in-class social media strategy to grow your brand.</p>

      <div className="plan-grid">
        <label>
          <span>Business name</span>
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        </label>

        <label>
          <span>Niche</span>
          <select value={niche} onChange={(e) => setNiche(e.target.value)}>
            {nicheSuggestions.map((suggestion) => (
              <option key={suggestion.title} value={suggestion.title}>
                {suggestion.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Platform</span>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {platforms.map((platformItem) => (
              <option key={platformItem.id} value={platformItem.label}>
                {platformItem.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Primary goal</span>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} />
        </label>

        <label className="full-width">
          <span>Audience</span>
          <textarea value={audience} onChange={(e) => setAudience(e.target.value)} rows="3" />
        </label>
      </div>

      <div className="growth-details">
        <div className="growth-card">
          <h3>Top niche focus</h3>
          <p>{selectedNiche.details}</p>
        </div>
        <div className="growth-card">
          <h3>100% content clarity</h3>
          <p>Use consistent themes, branded visuals, and direct calls to action. Every post should support the business goal and make the audience feel connected.</p>
        </div>
      </div>

      <div className="growth-summary">
        <h3>Strategy summary</h3>
        <pre>{planSummary}</pre>
      </div>
    </div>
  );
}
