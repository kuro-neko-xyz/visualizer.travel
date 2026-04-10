import { Flights } from "@/models/Flight";
import { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FlightInfo from "../FlightInfo";

interface FlightsContainerProps {
  flights: Flights;
  storeFlights: Dispatch<SetStateAction<Flights>>;
}

const FlightsContainer: FC<FlightsContainerProps> = ({
  flights,
  storeFlights,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {flights.map((flight) => (
        <FlightInfo
          key={flight.id}
          flight={flight}
          storeFlights={storeFlights}
        />
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
