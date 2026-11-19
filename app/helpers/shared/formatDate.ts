const formatDate = (date: Date, timeZone: string) =>
  date.toLocaleDateString([], {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export default formatDate;
