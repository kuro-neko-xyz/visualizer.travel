const formatTime = (date: Date, timeZone: string) =>
  date.toLocaleTimeString([], { timeZone, hour: "2-digit", minute: "2-digit" });

export default formatTime;
