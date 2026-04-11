import { PLANE_CODE } from "@/constants/lanes";
import { Flights } from "@/models/Flight";
import { ItineraryElement } from "@/models/Itinerary";

const transformItinerary = (
  sortedFlights: Flights,
  dayBefore: Date,
  dayAfter: Date,
) => {
  return sortedFlights.reduce<ItineraryElement[]>((acc, flight, index) => {
    if (index === 0) {
      acc.push({
        location: flight.origin.airportCode,
        startDate: dayBefore,
        endDate: new Date(flight.origin.dateTime),
      });
    }

    acc.push({
      location: PLANE_CODE,
      startDate: new Date(flight.origin.dateTime),
      endDate: new Date(flight.destination.dateTime),
    });

    if (index < sortedFlights.length - 1) {
      const nextFlight = sortedFlights[index + 1];
      acc.push({
        location: nextFlight.origin.airportCode,
        startDate: new Date(flight.destination.dateTime),
        endDate: new Date(nextFlight.origin.dateTime),
      });
    }

    if (index === sortedFlights.length - 1) {
      acc.push({
        location: flight.destination.airportCode,
        startDate: new Date(flight.destination.dateTime),
        endDate: dayAfter,
      });
    }

    return acc;
  }, []);
};

export default transformItinerary;
