import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import MediaManager from "./components/MediaManager.jsx";
import ContentScheduler from "./components/ContentScheduler.jsx";
import SocialConnections from "./components/SocialConnections.jsx";
import CalendarView from "./components/CalendarView.jsx";
import AIAssistant from "./components/AIAssistant.jsx";
import ClientPlanning from "./components/ClientPlanning.jsx";
import DraftPosts from "./components/DraftPosts.jsx";
import ProfessionalServices from "./components/ProfessionalServices.jsx";
import BusinessGrowthPlan from "./components/BusinessGrowthPlan.jsx";
import {
  PLATFORMS,
  CONTENT_TYPES,
  TEAM_MEMBERS,
  STATUS_OPTIONS,
  initialMediaItems,
  initialScheduledPosts,
  initialConnectedAccounts,
  CLIENTS,
  PLAN_STATUSES,
  initialClientPlans,
} from "./data/sampleData.js";

export default function App() {
  const [mediaItems, setMediaItems] = useState(initialMediaItems);
  const [scheduledPosts, setScheduledPosts] = useState(initialScheduledPosts);
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState(initialConnectedAccounts);
  const [selectedDate, setSelectedDate] = useState("");
  const [drafts, setDrafts] = useState([]);

  const handleUpload = (file) => {
    const nextId = mediaItems.length + 1;
    const newMedia = {
      id: nextId,
      name: file.name,
      type: file.type.split("/")[0] || "media",
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    };
    setMediaItems([newMedia, ...mediaItems]);
  };

  const toggleMediaSelection = (id) => {
    setSelectedMediaIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleSchedule = (post) => {
    setScheduledPosts((current) => [{ id: current.length + 1, ...post }, ...current]);
  };

  const [clientPlans, setClientPlans] = useState(initialClientPlans);

  const toggleConnection = (platformId) => {
    setConnectedAccounts((current) =>
      current.map((account) =>
        account.platformId === platformId
          ? {
              ...account,
              connected: !account.connected,
              name: account.connected ? account.name : `${PLATFORMS.find((platform) => platform.id === platformId)?.label} account`,
            }
          : account
      )
    );
  };

  const handleAddPlan = (plan) => {
    setClientPlans((current) => [plan, ...current]);
  };

  const handleAddDraft = (draft) => {
    setDrafts((current) => [draft, ...current]);
  };

  const handleRemoveDraft = (draftId) => {
    setDrafts((current) => current.filter((draft) => draft.id !== draftId));
  };

  const handleSelectDay = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Analytics />
      <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">ContentFlow</p>
          <h1>Media Manager + Scheduling</h1>
          <p className="subtitle">Automatic AI assistant for client-ready media strategy, social growth, and business planning.</p>
        </div>
        <div className="status-summary">
          <div>
            <p>Assets</p>
            <strong>{mediaItems.length}</strong>
          </div>
          <div>
            <p>Scheduled items</p>
            <strong>{scheduledPosts.length}</strong>
          </div>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel panel--wide">
          <ContentScheduler
            platforms={PLATFORMS}
            contentTypes={CONTENT_TYPES}
            teamMembers={TEAM_MEMBERS}
            statusOptions={STATUS_OPTIONS}
            selectedMediaIds={selectedMediaIds}
            mediaItems={mediaItems}
            onSchedule={handleSchedule}
          />
          <CalendarView
            scheduledPosts={scheduledPosts}
            platforms={PLATFORMS}
            selectedDate={selectedDate}
            onSelectDay={handleSelectDay}
          />
        </section>

        <section className="panel">
          <SocialConnections
            platforms={PLATFORMS}
            connectedAccounts={connectedAccounts}
            onToggleConnection={toggleConnection}
          />
          <AIAssistant
            platforms={PLATFORMS}
            contentTypes={CONTENT_TYPES}
            clients={CLIENTS}
            onSaveDraft={handleAddDraft}
            onSavePlan={handleAddPlan}
          />
          <DraftPosts
            drafts={drafts}
            platforms={PLATFORMS}
            clients={CLIENTS}
            onRemoveDraft={handleRemoveDraft}
          />
          <BusinessGrowthPlan platforms={PLATFORMS} />
          <ProfessionalServices />
          <ClientPlanning
            clients={CLIENTS}
            platforms={PLATFORMS}
            contentTypes={CONTENT_TYPES}
            planStatuses={PLAN_STATUSES}
            plans={clientPlans}
            onAddPlan={handleAddPlan}
          />
          <MediaManager
            mediaItems={mediaItems}
            selectedMediaIds={selectedMediaIds}
            onUpload={handleUpload}
            onToggleSelect={toggleMediaSelection}
          />
        </section>
      </main>
    </div>
    </>
  );
}
