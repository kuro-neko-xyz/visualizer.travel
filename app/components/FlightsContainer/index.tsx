import { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import FlightInfo from "../FlightInfo";
import { Trips } from "@/models/Trip";

interface FlightsContainerProps {
  trips: Trips;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const FlightsContainer: FC<FlightsContainerProps> = ({ trips, setTrips }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {trips.map((trip) => (
        <View key={trip.uuid}>
          <Text style={styles.label}>{trip.name}</Text>
          <View style={styles.flightsContainer}>
            {trip.flights.map((flight) => (
              <FlightInfo key={flight.id} flight={flight} setTrips={setTrips} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    minHeight: "100%",
  },
  label: {
    textAlign: "center",
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
});

export default FlightsContainer;
