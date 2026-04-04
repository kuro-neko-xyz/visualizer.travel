import useFlights from "@/hooks/useFlights";
import { SelectOption } from "@/models/SelectOption";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import FlightInfo from "@/components/FlightInfo";
import FlightForm from "@/components/FlightForn";

export default function FlightsView() {
  const [flights, storeFlights] = useFlights();

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
    <View style={styles.container}>
      {flights.map((flight) => (
        <FlightInfo
          key={flight.id}
          flight={flight}
          storeFlights={storeFlights}
        />
      ))}
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
        storeFlights={storeFlights}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
