import { Flights } from "@/models/Flight";

const getDayBefore = (sortedFlights: Flights): Date | null => {
  if (sortedFlights.length === 0) {
    return null;
  }

  const firstDeparture = new Date(sortedFlights[0].origin.dateTime);
  const dayBefore = new Date(firstDeparture);
  dayBefore.setDate(firstDeparture.getDate() - 1);
  dayBefore.setHours(0, 0, 0, 0);

  return dayBefore;
};

export default getDayBefore;
