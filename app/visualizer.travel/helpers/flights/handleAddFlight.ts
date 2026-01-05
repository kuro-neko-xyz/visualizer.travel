import { Flight, Flights } from "@/models/Flight";
import { SelectOption } from "@/models/SelectOption";
import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";

interface HandleAddFlightParams {
  arrivalDate: Date;
  departureDate: Date;
  destinationAirportCode: string;
  destinationTimeZone: SelectOption | null;
  originAirportCode: string;
  originTimeZone: SelectOption | null;
  storeFlights: Dispatch<SetStateAction<Flights>>;
}

const handleAddFlight = ({
  arrivalDate,
  departureDate,
  destinationAirportCode,
  destinationTimeZone,
  originAirportCode,
  originTimeZone,
  storeFlights,
}: HandleAddFlightParams) => {
  const departureYear = departureDate.getFullYear();
  const departureMonth = String(departureDate.getMonth() + 1).padStart(2, "0");
  const departureDay = String(departureDate.getDate()).padStart(2, "0");
  const departureHours = String(departureDate.getHours()).padStart(2, "0");
  const departureMinutes = String(departureDate.getMinutes()).padStart(2, "0");

  const arrivalYear = arrivalDate.getFullYear();
  const arrivalMonth = String(arrivalDate.getMonth() + 1).padStart(2, "0");
  const arrivalDay = String(arrivalDate.getDate()).padStart(2, "0");
  const arrivalHours = String(arrivalDate.getHours()).padStart(2, "0");
  const arrivalMinutes = String(arrivalDate.getMinutes()).padStart(2, "0");

  const flightData: Flight = {
    id: randomUUID(),
    origin: {
      airportCode: originAirportCode,
      dateTime: `${departureYear}-${departureMonth}-${departureDay}T${departureHours}:${departureMinutes}:00${originTimeZone?.value}`,
    },
    destination: {
      airportCode: destinationAirportCode,
      dateTime: `${arrivalYear}-${arrivalMonth}-${arrivalDay}T${arrivalHours}:${arrivalMinutes}:00${destinationTimeZone?.value}`,
    },
  };
  storeFlights((prevFlights: Flights) => [...prevFlights, flightData]);
};

export default handleAddFlight;
