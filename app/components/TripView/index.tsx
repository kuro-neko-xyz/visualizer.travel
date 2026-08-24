import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FlightInfo from "../FlightInfo";
import { Trips, Trip } from "@/models/Trip";
import { Picker } from "@react-native-picker/picker";

interface TripViewProps {
  setTrips: Dispatch<SetStateAction<Trips>>;
  trip: Trip;
}

const TripView: FC<TripViewProps> = ({ setTrips, trip }) => {
  const [selectedTimezone, setSelectedTimeZone] = useState(
    trip.flights[0].origin.timeZone,
  );

  const options = useMemo(() => {
    if (!trip?.flights) return [];

    const allTimeZones = trip.flights.flatMap((flight) => [
      flight.origin.timeZone,
      flight.destination.timeZone,
    ]);

    return [...new Set(allTimeZones)].map((tz) => ({
      value: tz,
      label: tz,
    }));
  }, [trip.flights]);

  return (
    <View key={trip.uuid}>
      <Text style={[styles.label, styles.header]}>{trip.name}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Time Zone:</Text>
        <Picker
          dropdownIconColor="black"
          style={styles.picker}
          selectedValue={selectedTimezone}
          onValueChange={(tz) => setSelectedTimeZone(tz)}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.flightsContainer}>
        {trip.flights.map((flight) => (
          <FlightInfo
            key={flight.id}
            flight={flight}
            setSelectedTimeZone={setSelectedTimeZone}
            setTrips={setTrips}
            timeZone={selectedTimezone}
            trip={trip}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    fontSize: 16,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
  flightsContainer: {
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  picker: {
    color: "black",
    flex: 1,
  },
});

export default TripView;
