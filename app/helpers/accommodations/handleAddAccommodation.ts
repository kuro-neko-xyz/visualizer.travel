import { Accommodation } from "@/models/Accommodation";
import { Trips } from "@/models/Trip";
import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";
import parseDateString from "../shared/parseDateString";

interface HandleAddAccommodationProps {
  accommodationAirport: string;
  accommodationTimeZone: string;
  checkInDate: Date;
  checkOutDate: Date;
  currentTrip: string;
  currentTripName: string;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const handleAddAccommodation = ({
  accommodationAirport,
  accommodationTimeZone,
  checkInDate,
  checkOutDate,
  currentTrip,
  currentTripName,
  setTrips,
}: HandleAddAccommodationProps) => {
  const offsetInMinutes = new Date().getTimezoneOffset();

  const checkIn = parseDateString({
    addOffset: false,
    dummyDate: new Date(checkInDate.getTime() - offsetInMinutes * 60 * 1000),
    timeZone: accommodationTimeZone,
  });

  const checkOut = parseDateString({
    addOffset: false,
    dummyDate: new Date(checkOutDate.getTime() - offsetInMinutes * 60 * 1000),
    timeZone: accommodationTimeZone,
  });

  const accommodationData: Accommodation = {
    id: randomUUID(),
    airportCode: accommodationAirport,
    checkIn: checkIn.dateString,
    checkOut: checkOut.dateString,
    timeZone: accommodationTimeZone,
  };

  if (currentTrip === "") {
    setTrips((prevTrips: Trips) => [
      ...prevTrips,
      {
        uuid: randomUUID(),
        name: currentTripName,
        accommodations: [accommodationData],
        flights: [],
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
          accommodations: [
            ...(trip.accommodations ?? []),
            accommodationData,
          ].sort(
            (a, b) =>
              new Date(a.checkIn).getTime() - new Date(a.checkOut).getTime(),
          ),
        };
      });
    });
  }
};

export default handleAddAccommodation;
