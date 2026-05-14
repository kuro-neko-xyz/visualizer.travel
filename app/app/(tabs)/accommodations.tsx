import AccommodationForm from "@/components/AccommodationForm";
import AccommodationsContainer from "@/components/AccommodationsContainer";
import ContainerTab from "@/components/ContainerTab";
import useStorage from "@/hooks/useStorage";
import { SelectOption } from "@/models/SelectOption";
import { useState } from "react";

export default function AccommodationsView() {
  const [accommodations, setAccommodations] = useStorage("accommodations", []);

  const [airportCode, setAirportCode] = useState<string>("");

  const [timeZone, setTimeZone] = useState<SelectOption | null>(null);

  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isCheckIn, setIsCheckIn] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  return (
    <ContainerTab>
      <AccommodationsContainer
        accommodations={accommodations}
        setAccommodations={setAccommodations}
      />
      <AccommodationForm
        accommodationAirportCode={airportCode}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        isCheckIn={isCheckIn}
        isTime={isTime}
        setAccommodationAirportCode={setAirportCode}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setIsCheckIn={setIsCheckIn}
        setIsTime={setIsTime}
        setShowDatePicker={setShowDatePicker}
        setTimeZone={setTimeZone}
        showDatePicker={showDatePicker}
        timeZone={timeZone}
        setAccommodations={setAccommodations}
      />
    </ContainerTab>
  );
}
