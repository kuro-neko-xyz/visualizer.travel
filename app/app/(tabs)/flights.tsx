import { FC, useContext, useState } from "react";
import FlightForm from "@/components/FlightForm";
import ContainerTab from "@/components/ContainerTab";
import FlightsContainer from "@/components/FlightsContainer";
import { TripContext } from "./_layout";
import { Trip } from "@/models/Trip";
import searchAirports from "@/helpers/flights/searchAirports";
import { AirportSearchResult } from "@/models/AirportSearch";

const FlightsView: FC = () => {
  const { trips, setTrips } = useContext(TripContext);

  const [originAirport, setOriginAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");

  const [originTimeZone, setOriginTimeZone] = useState("");
  const [destinationTimeZone, setDestinationTimeZone] = useState("");

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isDeparture, setIsDeparture] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  const [originOptions, setOriginOptions] = useState<AirportSearchResult>({
    ok: true,
    airports: [],
  });
  const [destinationOptions, setDestinationOptions] =
    useState<AirportSearchResult>({
      ok: true,
      airports: [],
    });

  const [currentTrip, setCurrentTrip] = useState("");
  const [currentTripName, setCurrentTripName] = useState("");

  const handleOriginChange = async (search: string) => {
    if (!search) {
      setOriginOptions({
        ok: true,
        airports: [],
      });
      setOriginAirport("");
    }

    const data = await searchAirports(search);

    setOriginOptions(data);
  };

  const handleDestinationChange = async (search: string) => {
    if (!search) {
      setDestinationOptions({
        ok: true,
        airports: [],
      });
      setDestinationAirport("");
    }

    const data = await searchAirports(search);

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
