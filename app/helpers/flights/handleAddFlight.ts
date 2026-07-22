import { Flight, Flights } from "@/models/Flight";
import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";
import { getTimeZones } from "@vvo/tzdb";

interface HandleAddFlightParams {
  arrivalDate: Date;
  departureDate: Date;
  destinationAirport: string;
  destinationTimeZone: string;
  originAirport: string;
  originTimeZone: string;
  setFlights: Dispatch<SetStateAction<Flights>>;
}

const handleAddFlight = ({
  arrivalDate,
  departureDate,
  destinationAirport,
  destinationTimeZone,
  originAirport,
  originTimeZone,
  setFlights,
}: HandleAddFlightParams) => {
  const timeZones = getTimeZones();

  const departureYear = departureDate.getFullYear();
  const departureMonth = String(departureDate.getMonth() + 1).padStart(2, "0");
  const departureDay = String(departureDate.getDate()).padStart(2, "0");
  const departureHours = String(departureDate.getHours()).padStart(2, "0");
  const departureMinutes = String(departureDate.getMinutes()).padStart(2, "0");
  const originOffset = timeZones
    .find(
      (tz) => originTimeZone === tz.name || tz.group.includes(originTimeZone),
    )
    ?.currentTimeFormat.substring(0, 6);

  const arrivalYear = arrivalDate.getFullYear();
  const arrivalMonth = String(arrivalDate.getMonth() + 1).padStart(2, "0");
  const arrivalDay = String(arrivalDate.getDate()).padStart(2, "0");
  const arrivalHours = String(arrivalDate.getHours()).padStart(2, "0");
  const arrivalMinutes = String(arrivalDate.getMinutes()).padStart(2, "0");
  const destinationOffset = timeZones
    .find(
      (tz) =>
        destinationTimeZone === tz.name ||
        tz.group.includes(destinationTimeZone),
    )
    ?.currentTimeFormat.substring(0, 6);

  const flightData: Flight = {
    id: randomUUID(),
    origin: {
      airportCode: originAirport,
      dateTime: `${departureYear}-${departureMonth}-${departureDay}T${departureHours}:${departureMinutes}:00${originOffset}`,
    },
    destination: {
      airportCode: destinationAirport,
      dateTime: `${arrivalYear}-${arrivalMonth}-${arrivalDay}T${arrivalHours}:${arrivalMinutes}:00${destinationOffset}`,
    },
  };
  setFlights((prevFlights: Flights) => [...prevFlights, flightData]);
};

export default handleAddFlight;
