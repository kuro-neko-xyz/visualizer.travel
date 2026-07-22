import useStorage from "@/hooks/useStorage";
import { FC, useState } from "react";
import FlightForm from "@/components/FlightForm";
import ContainerTab from "@/components/ContainerTab";
import FlightsContainer from "@/components/FlightsContainer";
import { Airports } from "@/models/Airport";
import { Trip } from "@/models/Trip";

const FlightsView: FC = () => {
  const [trips, setTrips] = useStorage("trips", []);

  const [originAirport, setOriginAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");

  const [originTimeZone, setOriginTimeZone] = useState("");
  const [destinationTimeZone, setDestinationTimeZone] = useState("");

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isDeparture, setIsDeparture] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  const [originOptions, setOriginOptions] = useState<Airports>([]);
  const [destinationOptions, setDestinationOptions] = useState<Airports>([]);

  const [currentTrip, setCurrentTrip] = useState("");
  const [currentTripName, setCurrentTripName] = useState("");

  const handleOriginChange = async (search: string) => {
    if (!search) {
      setOriginOptions([]);
      setOriginAirport("");
    }

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}airports?search=${search}`,
    );

    const data = await response.json();

    setOriginOptions(data);
  };

  const handleDestinationChange = async (search: string) => {
    if (!search) {
      setDestinationOptions([]);
      setDestinationAirport("");
    }

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}airports?search=${search}`,
    );

    const data = await response.json();

    setDestinationOptions(data);
  };

  return (
    <ContainerTab>
      <FlightsContainer trips={trips} setTrips={setTrips} />
      <FlightForm
        arrivalDate={arrivalDate}
        currentTrip={currentTrip}
        currentTripName={currentTripName}
        departureDate={departureDate}
        destinationAirport={destinationAirport}
        destinationOptions={destinationOptions}
        destinationTimeZone={destinationTimeZone}
        handleDestinationChange={handleDestinationChange}
        handleOriginChange={handleOriginChange}
        isDeparture={isDeparture}
        isTime={isTime}
        originAirport={originAirport}
        originOptions={originOptions}
        originTimeZone={originTimeZone}
        setArrivalDate={setArrivalDate}
        setCurrentTrip={setCurrentTrip}
        setCurrentTripName={setCurrentTripName}
        setDepartureDate={setDepartureDate}
        setDestinationAirport={setDestinationAirport}
        setDestinationTimeZone={setDestinationTimeZone}
        setIsDeparture={setIsDeparture}
        setIsTime={setIsTime}
        setOriginAirport={setOriginAirport}
        setOriginTimeZone={setOriginTimeZone}
        setShowDatePicker={setShowDatePicker}
        setTrips={setTrips}
        showDatePicker={showDatePicker}
        tripOptions={trips.map((trip: Trip) => ({
          label: trip.name,
          value: trip.uuid,
        }))}
      />
    </ContainerTab>
  );
};

export default FlightsView;
