import { Accommodation, Accommodations } from "@/models/Accommodation";
import { SelectOption } from "@/models/SelectOption";
import { randomUUID } from "expo-crypto";
import { Dispatch, SetStateAction } from "react";

interface HandleAddAccommodationProps {
  accommodationAirportCode: string;
  checkInDate: Date;
  checkOutDate: Date;
  timeZone: SelectOption | null;
  storeAccommodations: Dispatch<SetStateAction<Accommodations>>;
}

const handleAddAccommodation = ({
  accommodationAirportCode,
  checkInDate,
  checkOutDate,
  timeZone,
  storeAccommodations,
}: HandleAddAccommodationProps) => {
  const checkInYear = checkInDate.getFullYear();
  const checkInMonth = String(checkInDate.getMonth() + 1).padStart(2, "0");
  const checkInDay = String(checkInDate.getDate()).padStart(2, "0");
  const checkInHours = String(checkInDate.getHours()).padStart(2, "0");
  const checkInMinutes = String(checkInDate.getMinutes()).padStart(2, "0");

  const checkOutYear = checkOutDate.getFullYear();
  const checkOutMonth = String(checkOutDate.getMonth() + 1).padStart(2, "0");
  const checkOutDay = String(checkOutDate.getDate()).padStart(2, "0");
  const checkOutHours = String(checkOutDate.getHours()).padStart(2, "0");
  const checkOutMinutes = String(checkOutDate.getMinutes()).padStart(2, "0");

  const accommodationData: Accommodation = {
    id: randomUUID(),
    airportCode: accommodationAirportCode,
    checkIn: `${checkInYear}-${checkInMonth}-${checkInDay}T${checkInHours}:${checkInMinutes}:00${timeZone?.value}`,
    checkOut: `${checkOutYear}-${checkOutMonth}-${checkOutDay}T${checkOutHours}:${checkOutMinutes}:00${timeZone?.value}`,
  };
  storeAccommodations((prevAccommodations: Accommodations) => [
    ...prevAccommodations,
    accommodationData,
  ]);
};

export default handleAddAccommodation;
