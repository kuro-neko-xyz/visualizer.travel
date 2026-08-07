import { Flights, TimeFrame } from "@visualizer.travel/shared";
import parseDateString from "../shared/parseDateString";

const getTimeFrame = (sortedFlights: Flights): TimeFrame | null => {
  const firstFlight = sortedFlights.get(0);
  const lastFlight = sortedFlights.get(-1);

  if (!firstFlight || !lastFlight) {
    return null;
  }

  const firstDeparture = parseDateString({
    dummyDate: new Date(firstFlight.origin.dateTime),
    timeZone: firstFlight.origin.timeZone,
    overrideHours: 0,
    overrideMinutes: 0,
  });

  const firstDay = new Date(firstDeparture.dateString);

  const lastArrival = parseDateString({
    dummyDate: new Date(lastFlight.origin.dateTime),
    timeZone: lastFlight.origin.timeZone,
    overrideHours: 23,
    overrideMinutes: 59,
  });

  const lastDay = new Date(lastArrival.dateString);

  const timeFrame = new TimeFrame(firstDay, lastDay);

  return timeFrame;
};

export default getTimeFrame;
