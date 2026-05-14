import { Flight, Flights } from "@/models/Flight";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteFlightParams {
  flightId: string;
  setFlights: Dispatch<SetStateAction<Flights>>;
}

const handleDeleteFlight = ({
  flightId,
  setFlights,
}: handleDeleteFlightParams) => {
  setFlights((prevFlights: Flights) =>
    prevFlights.filter((flight: Flight) => flight.id !== flightId),
  );
};

export default handleDeleteFlight;
