import { Trips } from "@/models/Trip";
import { Dispatch, SetStateAction } from "react";

interface handleHideTripParams {
  setTrips: Dispatch<SetStateAction<Trips>>;
  tripId: string;
}

const handleHideTrip = ({ setTrips, tripId }: handleHideTripParams) => {
  setTrips((prevTrips: Trips) =>
    prevTrips.map((trip) => {
      if (trip.uuid === tripId) {
        return {
          ...trip,
          isHidden: !trip.isHidden,
        };
      }
      return trip;
    }),
  );
};

export default handleHideTrip;
