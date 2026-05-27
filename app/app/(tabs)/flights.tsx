import useStorage from "@/hooks/useStorage";
import { FC, useState } from "react";
import FlightForm from "@/components/FlightForm";
import ContainerTab from "@/components/ContainerTab";
import FlightsContainer from "@/components/FlightsContainer";
import { Airports } from "@/models/Airport";

const FlightsView: FC = () => {
  const [flights, setFlights] = useStorage("flights", []);

  const [originAirport, setOriginAirport] = useState("");

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isDeparture, setIsDeparture] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  const [originOptions, setOriginOptions] = useState<Airports>([]);

  const handleOriginChange = async (search: string) => {
    if (!search) {
      setOriginOptions([]);
    }

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}airports?search=${search}`,
    );

    const data = await response.json();

    setOriginOptions(data);
  };

  return (
    <ContainerTab>
      <FlightsContainer flights={flights} setFlights={setFlights} />
      <FlightForm
        arrivalDate={arrivalDate}
        departureDate={departureDate}
        handleOriginChange={handleOriginChange}
        isDeparture={isDeparture}
        isTime={isTime}
        originAirport={originAirport}
        originOptions={originOptions}
        setArrivalDate={setArrivalDate}
        setDepartureDate={setDepartureDate}
        setIsDeparture={setIsDeparture}
        setIsTime={setIsTime}
        setOriginAirport={setOriginAirport}
        setShowDatePicker={setShowDatePicker}
        showDatePicker={showDatePicker}
      />
    </ContainerTab>
  );
};

export default FlightsView;
