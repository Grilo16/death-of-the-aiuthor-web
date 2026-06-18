import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;

  if (diff < MINUTE) return `${Math.floor(diff / SECOND)}s ago`;
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`;
  if (diff < 2 * DAY) return "yesterday";
  return new Date(timestamp).toLocaleString();
}

function tickInterval(timestamp: number): number {
  const diff = Date.now() - timestamp;
  if (diff < MINUTE) return SECOND;
  if (diff < HOUR) return MINUTE;
  return HOUR;
}

// Re-renders on an interval so the relative label stays fresh; the label itself
// is derived during render (no setState in the effect body).
function useRelativeTime(timestamp: number | undefined): string {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!timestamp) return;
    const id = setInterval(
      () => setTick((t) => t + 1),
      tickInterval(timestamp),
    );
    return () => clearInterval(id);
  }, [timestamp]);

  return timestamp ? formatRelativeTime(timestamp) : "—";
}

interface LiveDataMetaProps {
  participantCount: number;
  timestamp: number | undefined;
  className?: string;
}

export function LiveDataMeta({
  participantCount,
  timestamp,
  className,
}: LiveDataMetaProps) {
  const lastUpdated = useRelativeTime(timestamp);

  return (
    <p
      className={`opacity-50 fst-italic mb-0 ${className ?? ""}`}
      style={{ fontSize: "0.85rem" }}
    >
      live data — {participantCount} participant
      {participantCount !== 1 && "s"} · last updated : {lastUpdated}
    </p>
  );
}
