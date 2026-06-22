import { useMemo } from "react";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView({ scheduledPosts, platforms, selectedDate, onSelectDay }) {
  const eventsByDate = useMemo(() => {
    return scheduledPosts.reduce((acc, post) => {
      if (!post.scheduleDate) return acc;
      acc[post.scheduleDate] = [...(acc[post.scheduleDate] || []), post];
      return acc;
    }, {});
  }, [scheduledPosts]);

  const days = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 14 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const iso = date.toISOString().slice(0, 10);
      return {
        iso,
        label: `${dayNames[date.getDay()]} ${date.getDate()}`,
        events: eventsByDate[iso] || [],
      };
    });
  }, [eventsByDate]);

  const findPlatformLabel = (platformId) => platforms.find((item) => item.id === platformId)?.label || platformId;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2>Publishing timeline</h2>
        </div>
      </div>

      <div className="calendar-grid">
        {days.map((day) => (
          <button
            key={day.iso}
            type="button"
            className={`calendar-day ${day.events.length ? "calendar-day--busy" : ""}`}
            onClick={() => onSelectDay(day.iso)}
          >
            <div className="calendar-day-label">{day.label}</div>
            <div className="calendar-day-count">{day.events.length} planned</div>
            <div className="calendar-day-events">
              {day.events.slice(0, 2).map((event) => (
                <div key={event.id} className="calendar-event">
                  <span className="event-platform">{findPlatformLabel(event.platform)}</span>
                  <span>{event.title}</span>
                </div>
              ))}
              {day.events.length > 2 && <span className="calendar-more">+{day.events.length - 2} more</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
