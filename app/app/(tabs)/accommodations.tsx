import AccommodationForm from "@/components/AccommodationForm";
import AccommodationsContainer from "@/components/AccommodationsContainer";
import ContainerTab from "@/components/ContainerTab";
import { useContext, useState } from "react";
import { TripContext } from "./_layout";
import { Trip } from "@/models/Trip";
import searchAirports from "@/helpers/flights/searchAirports";
import { AirportSearchResult } from "@/models/AirportSearch";

export default function AccommodationsView() {
  const { trips, setTrips } = useContext(TripContext);

  const [accommodationAirport, setAccommodationAirport] = useState("");

  const [accommodationTimeZone, setAccommodationTimeZone] = useState("");

  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isCheckIn, setIsCheckIn] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  const [accommodationOptions, setAccommodationOptions] =
    useState<AirportSearchResult>({
      ok: true,
      airports: [],
    });

  const [currentTrip, setCurrentTrip] = useState("");
  const [currentTripName, setCurrentTripName] = useState("");

  const handleAccommodationChange = async (search: string) => {
    if (!search) {
      setAccommodationOptions({
        ok: true,
        airports: [],
      });
      setAccommodationAirport("");
    }

    const data = await searchAirports(search);

    setAccommodationOptions(data);
  };

  return (
    <ContainerTab>
      <AccommodationsContainer trips={trips} setTrips={setTrips} />
      <AccommodationForm
        accommodationAirport={accommodationAirport}
        accommodationOptions={accommodationOptions}
        accommodationTimeZone={accommodationTimeZone}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        currentTrip={currentTrip}
        currentTripName={currentTripName}
        handleAccommodationChange={handleAccommodationChange}
        isCheckIn={isCheckIn}
        isTime={isTime}
        setAccommodationAirport={setAccommodationAirport}
        setAccommodationTimeZone={setAccommodationTimeZone}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setCurrentTrip={setCurrentTrip}
        setCurrentTripName={setCurrentTripName}
        setIsCheckIn={setIsCheckIn}
        setIsTime={setIsTime}
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
}
