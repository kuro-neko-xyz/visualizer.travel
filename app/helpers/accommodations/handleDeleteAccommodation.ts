import { Accommodation, Accommodations } from "@/models/Accommodation";
import { Dispatch, SetStateAction } from "react";

interface handleDeleteAccommodationParams {
  accommodationId: string;
  storeAccommodations: Dispatch<SetStateAction<Accommodations>>;
}

const handleDeleteAccommodation = ({
  accommodationId,
  storeAccommodations,
}: handleDeleteAccommodationParams) => {
  storeAccommodations((prevAccommodations: Accommodations) =>
    prevAccommodations.filter(
      (accommodation: Accommodation) => accommodation.id !== accommodationId,
    ),
  );
};

export default handleDeleteAccommodation;
