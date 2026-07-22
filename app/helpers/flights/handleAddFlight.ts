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
  const originExtendedTimeZone = timeZones.find(
    (tz) => originTimeZone === tz.name || tz.group.includes(originTimeZone),
  );

  const arrivalYear = arrivalDate.getFullYear();
  const arrivalMonth = String(arrivalDate.getMonth() + 1).padStart(2, "0");
  const arrivalDay = String(arrivalDate.getDate()).padStart(2, "0");
  const arrivalHours = String(arrivalDate.getHours()).padStart(2, "0");
  const arrivalMinutes = String(arrivalDate.getMinutes()).padStart(2, "0");
  const destinationExtendedTimeZone = timeZones.find(
    (tz) =>
      destinationTimeZone === tz.name || tz.group.includes(destinationTimeZone),
  );
  const flightData: Flight = {
    id: randomUUID(),
    origin: {
      airportCode: originAirport,
      dateTime: `${departureYear}-${departureMonth}-${departureDay}T${departureHours}:${departureMinutes}:00${originExtendedTimeZone?.currentTimeFormat.substring(0, 6)}`,
      timeZone: originExtendedTimeZone?.name || "",
    },
    destination: {
      airportCode: destinationAirport,
      dateTime: `${arrivalYear}-${arrivalMonth}-${arrivalDay}T${arrivalHours}:${arrivalMinutes}:00${destinationExtendedTimeZone?.currentTimeFormat.substring(0, 6)}`,
      timeZone: destinationExtendedTimeZone?.name || "",
    },
  };
  setFlights((prevFlights: Flights) => [...prevFlights, flightData]);
};

export default handleAddFlight;
