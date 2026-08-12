import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";
import parseDateString from "../shared/parseDateString";
import { Flight } from "@/models/Flight";
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
  const offsetInMinutes = new Date().getTimezoneOffset();

  const origin = parseDateString({
    addOffset: false,
    dummyDate: new Date(departureDate.getTime() - offsetInMinutes * 60 * 1000),
    timeZone: originTimeZone,
  });

  const destination = parseDateString({
    addOffset: false,
    dummyDate: new Date(arrivalDate.getTime() - offsetInMinutes * 60 * 1000),
    timeZone: destinationTimeZone,
  });

  const flightData: Flight = {
    id: randomUUID(),
    origin: {
      airportCode: originAirport,
      dateTime: origin.dateString,
      timeZone: origin.timeZone,
    },
    destination: {
      airportCode: destinationAirport,
      dateTime: destination.dateString,
      timeZone: destination.timeZone,
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
      return prevTrips.map((trip) => {
        if (trip.uuid !== currentTrip) {
          return trip;
        }

        return {
          ...trip,
          flights: [...trip.flights, flightData].sort(
            (a, b) =>
              new Date(a.origin.dateTime).getTime() -
              new Date(b.origin.dateTime).getTime(),
          ),
        };
      });
    });
  }
};

export default handleAddFlight;
