import { MS_PER_MINUTE } from "@/constants/time";

const formatFlightDuration = (start: Date, end: Date) => {
  const minutes = Math.round((end.getTime() - start.getTime()) / MS_PER_MINUTE);
  if (!Number.isFinite(minutes) || minutes < 0) return null;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (!hours) return `${rest}m`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
};

export default formatFlightDuration;
