import { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Trips } from "@visualizer.travel/shared";
import TripView from "../TripView";

interface FlightsContainerProps {
  trips: Trips;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const FlightsContainer: FC<FlightsContainerProps> = ({ trips, setTrips }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {trips.map((trip) => (
          <TripView key={trip.uuid} setTrips={setTrips} trip={trip} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    boxShadow: "0px -50px 50px -50px #AAAAAA inset",
    minWidth: "100%",
  },
  content: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    minHeight: "100%",
    minWidth: "100%",
    maxWidth: "100%",
    paddingBottom: 100,
  },
});

export default FlightsContainer;
