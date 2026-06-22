export default function ProfessionalServices() {
  const services = [
    {
      id: "social-growth",
      title: "Social Media Growth",
      description: "Create high-engagement campaigns and content plans that grow followers and boost visibility across platforms.",
      highlights: ["Audience growth strategy", "Platform-specific posting plans", "Performance tracking recommendations"],
    },
    {
      id: "viral-video-editing",
      title: "Viral Video Editing",
      description: "Produce eye-catching short-form and long-form videos tailored for TikTok, Instagram, YouTube, and Reels.",
      highlights: ["Trend-driven editing", "Captions and hooks optimization", "Platform-ready video formats"],
    },
    {
      id: "music-remix",
      title: "Music Remix & YouTube Content",
      description: "Support YouTube growth with music cloning, remix video production, and channel-ready audio content.",
      highlights: ["Remix concept development", "YouTube audio-visual optimization", "Creative music mashups"],
    },
    {
      id: "media-manager",
      title: "Media Management",
      description: "Organize assets, schedule campaigns, and keep media workflows aligned with your business goals.",
      highlights: ["Upload and categorize assets", "Schedule social content", "Manage brand media library"],
    },
  ];

  return (
    <div className="card services-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Professional services</p>
          <h2>Web development support</h2>
        </div>
        <span className="badge">3 service areas</span>
      </div>

      <p className="panel-copy">Empower your brand with social media growth, viral video editing, music remix content, and streamlined media management.</p>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <button type="button" className="button button--primary">Explore {service.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
