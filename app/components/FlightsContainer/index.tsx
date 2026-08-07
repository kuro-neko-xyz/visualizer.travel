import { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Trips } from "@visualizer.travel/shared";
import TripView from "../TripView";

interface FlightsContainerProps {
  trips: Trips;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const FlightsContainer: FC<FlightsContainerProps> = ({ trips, setTrips }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {trips.map((trip) => (
        <TripView key={trip.uuid} setTrips={setTrips} trip={trip} />
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
});

export default FlightsContainer;
