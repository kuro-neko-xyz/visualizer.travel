import { Accommodation, Accommodations } from "@/models/Accommodation";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteAccommodationParams {
  accommodationId: string;
  setAccommodations: Dispatch<SetStateAction<Accommodations>>;
}

const handleDeleteAccommodation = ({
  accommodationId,
  setAccommodations,
}: handleDeleteAccommodationParams) => {
  setAccommodations((prevAccommodations: Accommodations) =>
    prevAccommodations.filter(
      (accommodation: Accommodation) => accommodation.id !== accommodationId,
    ),
  );
};

export default handleDeleteAccommodation;
