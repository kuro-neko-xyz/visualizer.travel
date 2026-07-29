import { Trip, Trips } from "@/models/Trip";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Select from "../Select";
import FlightInfo from "../FlightInfo";

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
        <Text style={styles.label}>Select Time Zone to Display Data</Text>
      </View>
      <View style={styles.row}>
        <Select
          onChange={(option) => setSelectedTimeZone(option.value)}
          options={options}
          value={options.find((option) => option.value === selectedTimezone)}
          style={styles.select}
        >
          <Text style={styles.hint}>▼</Text>
        </Select>
      </View>
      <View style={styles.flightsContainer}>
        {trip.flights.map((flight) => (
          <FlightInfo
            key={flight.id}
            flight={flight}
            setTrips={setTrips}
            timeZone={selectedTimezone}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
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
  select: {
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 25,
    borderRadius: 5,
  },
  hint: {
    position: "absolute",
    right: 2,
    top: 5,
  },
});

export default TripView;
