import { Flight, Flights } from "@/models/Flight";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteFlightParams {
  flightId: string;
  storeFlights: Dispatch<SetStateAction<Flights>>;
}

const handleDeleteFlight = ({
  flightId,
  storeFlights,
}: handleDeleteFlightParams) => {
  storeFlights((prevFlights: Flights) =>
    prevFlights.filter((flight: Flight) => flight.id !== flightId),
  );
};

export default handleDeleteFlight;
