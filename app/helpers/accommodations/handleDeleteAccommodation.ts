import { Accommodation } from "@/models/Accommodation";
import { Trips } from "@/models/Trip";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteAccommodationParams {
  accommodationId: string;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const handleDeleteAccommodation = ({
  accommodationId,
  setTrips,
}: handleDeleteAccommodationParams) => {
  setTrips((prevTrips: Trips) =>
    prevTrips
      .map((trip) => {
        const accommodations = trip.accommodations.filter(
          (accommodation: Accommodation) =>
            accommodation.id !== accommodationId,
        );
        return {
          ...trip,
          accommodations,
        };
      })
      .filter((trip) => trip.accommodations?.length || trip.flights?.length),
  );
};

export default handleDeleteAccommodation;
