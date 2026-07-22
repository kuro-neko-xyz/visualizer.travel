import { Flight } from "@/models/Flight";
import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";
import { getTimeZones } from "@vvo/tzdb";
import { Trips } from "@/models/Trip";

interface HandleAddFlightParams {
  arrivalDate: Date;
  currentTrip: string;
  currentTripName: string;
  departureDate: Date;
  destinationAirport: string;
  destinationTimeZone: string;
  originAirport: string;
  originTimeZone: string;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const handleAddFlight = ({
  arrivalDate,
  currentTrip,
  currentTripName,
  departureDate,
  destinationAirport,
  destinationTimeZone,
  originAirport,
  originTimeZone,
  setTrips,
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
  if (currentTrip === "") {
    setTrips((prevTrips: Trips) => [
      ...prevTrips,
      {
        uuid: randomUUID(),
        name: currentTripName,
        flights: [flightData],
      },
    ]);
  } else {
    setTrips((prevTrips: Trips) => {
      const trip = prevTrips.find((trip) => trip.uuid === currentTrip);
      if (trip) {
        trip.flights = [...trip.flights, flightData];
      }
      return prevTrips;
    });
  }
};

export default handleAddFlight;
