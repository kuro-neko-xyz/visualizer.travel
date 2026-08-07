import { Flight, Trips } from "@visualizer.travel/shared";
import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";
import parseDateString from "../shared/parseDateString";

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
  const origin = parseDateString({
    dummyDate: departureDate,
    timeZone: originTimeZone,
  });

  const destination = parseDateString({
    dummyDate: arrivalDate,
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
      const trip = prevTrips.find((trip) => trip.uuid === currentTrip);
      if (trip) {
        trip.flights = [...trip.flights, flightData].sort((a, b) => {
          return (
            new Date(a.origin.dateTime).getTime() -
            new Date(b.origin.dateTime).getTime()
          );
        });
      }
      return prevTrips;
    });
  }
};

export default handleAddFlight;
