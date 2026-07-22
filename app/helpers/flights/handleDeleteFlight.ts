import { Flight } from "@/models/Flight";
import { Trips } from "@/models/Trip";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteFlightParams {
  flightId: string;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const handleDeleteFlight = ({
  flightId,
  setTrips,
}: handleDeleteFlightParams) => {
  setTrips((prevTrips: Trips) =>
    prevTrips
      .map((trip) => {
        const flights = trip.flights.filter(
          (flight: Flight) => flight.id !== flightId,
        );
        return {
          ...trip,
          flights,
        };
      })
      .filter((trip) => trip.flights.length),
  );
};

export default handleDeleteFlight;
