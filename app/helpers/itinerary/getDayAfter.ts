import { Flights } from "@/models/Flight";

const getDayAfter = (sortedFlights: Flights): Date | null => {
  if (sortedFlights.length === 0) {
    return null;
  }

  const lastArrival = new Date(
    sortedFlights[sortedFlights.length - 1].destination.dateTime,
  );
  const dayAfter = new Date(lastArrival);
  dayAfter.setDate(lastArrival.getDate() + 1);
  dayAfter.setHours(23, 59, 59, 999);

  return dayAfter;
};

export default getDayAfter;
