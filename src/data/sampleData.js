export const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "X / Twitter" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "tiktok", label: "TikTok" },
  { id: "facebook", label: "Facebook" },
  { id: "youtube", label: "YouTube" },
];

export const CONTENT_TYPES = ["Post", "Story", "Reel", "Thread", "Video", "Article", "Newsletter"];

export const TEAM_MEMBERS = [
  { id: 1, name: "Alex Rivera" },
  { id: 2, name: "Sam Chen" },
  { id: 3, name: "Jordan Park" },
  { id: 4, name: "Morgan Lee" },
  { id: 5, name: "Taylor Brooks" },
];

export const STATUS_OPTIONS = ["draft", "review", "approved", "scheduled", "published"];

export const initialMediaItems = [
  { id: 1, name: "Launch Visual.png", type: "image", url: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Teaser Clip.mp4", type: "video", url: "https://via.placeholder.com/400x300?text=Video+Clip" },
  { id: 3, name: "Brand Asset.jpg", type: "image", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80" },
];

export const initialScheduledPosts = [
  {
    id: 1,
    title: "Summer campaign launch",
    platform: "instagram",
    type: "Post",
    assignee: 1,
    status: "approved",
    scheduleDate: "2026-06-22",
    scheduleTime: "10:00",
  },
  {
    id: 2,
    title: "Behind the scenes reel",
    platform: "tiktok",
    type: "Reel",
    assignee: 2,
    status: "review",
    scheduleDate: "2026-06-23",
    scheduleTime: "15:00",
  },
];

export const initialConnectedAccounts = [
  { platformId: "instagram", name: "InstaBrand", connected: true },
  { platformId: "twitter", name: "X Brand", connected: false },
  { platformId: "linkedin", name: "Brand Page", connected: false },
  { platformId: "tiktok", name: "TikTok Channel", connected: false },
  { platformId: "facebook", name: "FB Page", connected: false },
  { platformId: "youtube", name: "YouTube Channel", connected: false },
];

export const CLIENTS = [
  { id: 1, name: "Atlas Creative" },
  { id: 2, name: "Pulse Retreat" },
  { id: 3, name: "Vivid Wellness" },
  { id: 4, name: "Bright Brand Co." },
];

export const PLAN_STATUSES = ["planning", "in progress", "review", "ready", "completed"];

export const initialClientPlans = [
  {
    id: 101,
    clientId: 1,
    title: "Launch announcement series",
    platform: "instagram",
    type: "Post",
    frequency: "Weekly",
    status: "planning",
    dueDate: "2026-07-01",
    notes: "Align with product launch visuals, include client testimonials.",
  },
  {
    id: 102,
    clientId: 2,
    title: "Wellness tips campaign",
    platform: "linkedin",
    type: "Article",
    frequency: "Biweekly",
    status: "planning",
    dueDate: "2026-07-05",
    notes: "Target professional audience with agency services and event invites.",
  },
];
