import { Flights } from "@/models/Flight";

const getSortedFlights = (flights: Flights): Flights => {
  return flights.sort((a, b) => {
    const aDeparture = new Date(a.origin.dateTime);
    const bDeparture = new Date(b.origin.dateTime);

    return aDeparture.getTime() - bDeparture.getTime();
  });
};

export default getSortedFlights;
