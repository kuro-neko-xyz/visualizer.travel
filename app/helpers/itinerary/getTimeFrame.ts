import { Flights } from "@/models/Flight";
import TimeFrame from "@/models/TimeFrame";
import parseDateString from "../shared/parseDateString";

const getTimeFrame = (
  sortedFlights: Flights,
  selectedTimeZone: string,
): TimeFrame | null => {
  const firstFlight = sortedFlights[0];
  const lastFlight = sortedFlights[sortedFlights.length - 1];

  if (!firstFlight || !lastFlight) {
    return null;
  }

  const firstDeparture = parseDateString({
    dummyDate: new Date(firstFlight.origin.dateTime),
    timeZone: selectedTimeZone,
    overrideHours: 0,
    overrideMinutes: 0,
  });

  const firstDay = new Date(firstDeparture.dateString);

  const lastArrival = parseDateString({
    dummyDate: new Date(lastFlight.destination.dateTime),
    timeZone: selectedTimeZone,
    overrideHours: 23,
    overrideMinutes: 59,
  });

  const lastDay = new Date(lastArrival.dateString);

  const timeFrame = new TimeFrame(firstDay, lastDay);

  return timeFrame;
};

export default getTimeFrame;
