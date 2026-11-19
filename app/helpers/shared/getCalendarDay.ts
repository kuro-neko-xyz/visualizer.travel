const getCalendarDay = (date: Date, timeZone: string) => {
  const [month, day, year] = date
    .toLocaleDateString("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .map(Number);

  return Date.UTC(year, month - 1, day);
};

export default getCalendarDay;
