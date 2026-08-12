import handleDeleteFlight from "@/helpers/flights/handleDeleteFlight";
import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import CloseButton from "../CloseButton";
import { Flight } from "@/models/Flight";
import { Trip, Trips } from "@/models/Trip";
import { LinearGradient } from "expo-linear-gradient";
import generateRandomColorFromCode from "@/helpers/shared/generateRandomColorFromCode";

interface FlightInfoProps {
  flight: Flight;
  setSelectedTimeZone: Dispatch<SetStateAction<string>>;
  setTrips: Dispatch<SetStateAction<Trips>>;
  timeZone: string;
  trip: Trip;
}

const FlightInfo: FC<FlightInfoProps> = ({
  flight,
  setSelectedTimeZone,
  setTrips,
  timeZone,
  trip,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          generateRandomColorFromCode(flight.origin.airportCode),
          generateRandomColorFromCode(flight.destination.airportCode),
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      />
      <View style={styles.info}>
        <View style={styles.details}>
          <Text style={styles.header}>{flight.origin.airportCode}</Text>
          <Text style={styles.data}>
            {new Date(flight.origin.dateTime).toLocaleDateString([], {
              timeZone,
            })}
          </Text>
          <Text style={styles.data}>
            {new Date(flight.origin.dateTime).toLocaleTimeString([], {
              timeZone,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Text>✈️</Text>
        <View style={styles.details}>
          <Text style={styles.header}>{flight.destination.airportCode}</Text>
          <Text style={styles.data}>
            {new Date(flight.destination.dateTime).toLocaleDateString([], {
              timeZone,
            })}
          </Text>
          <Text style={styles.data}>
            {new Date(flight.destination.dateTime).toLocaleTimeString([], {
              timeZone,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
      <CloseButton
        handleCloseModal={() => {
          handleDeleteFlight({ flightId: flight.id, setTrips });
          setSelectedTimeZone(trip.flights[0].origin.timeZone);
        }}
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
    width: "90%",
    height: 100,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
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
