import handleDeleteFlight from "@/helpers/flights/handleDeleteFlight";
import { Flight, Flights } from "@/models/Flight";
import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import CloseButton from "../CloseButton";

interface FlightInfoProps {
  flight: Flight;
  storeFlights: Dispatch<SetStateAction<Flights>>;
}

const FlightInfo: FC<FlightInfoProps> = ({ flight, storeFlights }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.details}>
          <Text style={styles.header}>{flight.origin.airportCode}</Text>
          <Text style={styles.data}>
            {new Date(flight.origin.dateTime).toLocaleDateString()}
          </Text>
          <Text style={styles.data}>
            {new Date(flight.origin.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Text>✈️</Text>
        <View style={styles.details}>
          <Text style={styles.header}>{flight.destination.airportCode}</Text>
          <Text style={styles.data}>
            {new Date(flight.destination.dateTime).toLocaleDateString()}
          </Text>
          <Text style={styles.data}>
            {new Date(flight.destination.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
      <CloseButton
        handleCloseModal={() =>
          handleDeleteFlight({ flightId: flight.id, storeFlights })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    width: 150,
    height: 100,
    margin: 10,
  },
  info: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    marginTop: 25,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Nunito",
    letterSpacing: 1,
  },
  data: {
    fontSize: 10,
    fontFamily: "Nunito",
    letterSpacing: 1,
  },
});

export default FlightInfo;
