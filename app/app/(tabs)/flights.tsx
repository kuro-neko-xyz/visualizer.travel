import useStorage from "@/hooks/useStorage";
import { SelectOption } from "@/models/SelectOption";
import { FC, useState } from "react";
import FlightForm from "@/components/FlightForm";
import ContainerTab from "@/components/ContainerTab";
import FlightsContainer from "@/components/FlightsContainer";

const FlightsView: FC = () => {
  const [flights, setFlights] = useStorage("flights", []);

  const [originAirportCode, setOriginAirportCode] = useState<string>("");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("");

  const [originTimeZone, setOriginTimeZone] = useState<SelectOption | null>(
    null,
  );
  const [destinationTimeZone, setDestinationTimeZone] =
    useState<SelectOption | null>(null);

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isDeparture, setIsDeparture] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  return (
    <ContainerTab>
      <FlightsContainer flights={flights} setFlights={setFlights} />
      <FlightForm
        arrivalDate={arrivalDate}
        departureDate={departureDate}
        destinationAirportCode={destinationAirportCode}
        destinationTimeZone={destinationTimeZone}
        isDeparture={isDeparture}
        isTime={isTime}
        originAirportCode={originAirportCode}
        originTimeZone={originTimeZone}
        setArrivalDate={setArrivalDate}
        setDepartureDate={setDepartureDate}
        setDestinationAirportCode={setDestinationAirportCode}
        setDestinationTimeZone={setDestinationTimeZone}
        setIsDeparture={setIsDeparture}
        setIsTime={setIsTime}
        setOriginAirportCode={setOriginAirportCode}
        setOriginTimeZone={setOriginTimeZone}
        setShowDatePicker={setShowDatePicker}
        showDatePicker={showDatePicker}
        setFlights={setFlights}
      />
    </ContainerTab>
  );
};

export default FlightsView;
