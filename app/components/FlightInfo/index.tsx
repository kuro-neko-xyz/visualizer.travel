import handleDeleteFlight from "@/helpers/flights/handleDeleteFlight";
import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import CloseButton from "../CloseButton";
import { Flight } from "@/models/Flight";
import { Trip, Trips } from "@/models/Trip";
import { LinearGradient } from "expo-linear-gradient";
import generateRandomColorFromCode from "@/helpers/shared/generateRandomColorFromCode";
import getCalendarDay from "@/helpers/shared/getCalendarDay";
import { MS_PER_DAY } from "@/constants/time";
import { MUTED_COLOR, TEXT_COLOR } from "@/constants/colors";
import formatTime from "@/helpers/shared/formatTime";
import formatDate from "@/helpers/shared/formatDate";
import formatFlightDuration from "@/helpers/shared/formatFlightDuration";
import Ionicons from "@expo/vector-icons/Ionicons";

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
  const departure = new Date(flight.origin.dateTime);
  const arrival = new Date(flight.destination.dateTime);

  const duration = formatFlightDuration(departure, arrival);

  const dayOffset = Math.round(
    (getCalendarDay(arrival, timeZone) - getCalendarDay(departure, timeZone)) /
      MS_PER_DAY,
  );
  const dayOffsetLabel =
    dayOffset > 0 ? `+${dayOffset}` : dayOffset < 0 ? `−${-dayOffset}` : null;

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`Flight from ${flight.origin.airportCode} at ${formatTime(
        departure,
        timeZone,
      )} ${formatDate(departure, timeZone)} to ${
        flight.destination.airportCode
      } at ${formatTime(arrival, timeZone)} ${formatDate(arrival, timeZone)}`}
    >
      <LinearGradient
        colors={[
          generateRandomColorFromCode(flight.origin.airportCode),
          generateRandomColorFromCode(flight.destination.airportCode),
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      />

      <View style={styles.row}>
        <View style={styles.endpoint}>
          <Text style={styles.code}>{flight.origin.airportCode}</Text>
          <Text style={styles.time}>{formatTime(departure, timeZone)}</Text>
          <Text style={styles.date}>{formatDate(departure, timeZone)}</Text>
        </View>

        <View style={styles.route}>
          <View style={styles.routeLine}>
            <View style={styles.line} />
            <Ionicons
              name="airplane"
              size={16}
              color={MUTED_COLOR}
              style={styles.plane}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <View style={styles.line} />
          </View>
          {!!duration && <Text style={styles.duration}>{duration}</Text>}
        </View>

        <View style={[styles.endpoint, styles.endpointEnd]}>
          <Text style={styles.code}>{flight.destination.airportCode}</Text>
          <View style={styles.timeRow}>
            <Text style={styles.time}>{formatTime(arrival, timeZone)}</Text>
            {dayOffsetLabel && (
              <Text style={styles.dayOffset}>{dayOffsetLabel}</Text>
            )}
          </View>
          <Text style={styles.date}>{formatDate(arrival, timeZone)}</Text>
        </View>
      </View>

      <CloseButton
        handleCloseModal={() => {
          handleDeleteFlight({ flightId: flight.id, setTrips });
          setSelectedTimeZone(trip.flights?.[0]?.origin.timeZone);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    maxWidth: 480,
    margin: 8,
    paddingTop: 28,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.12)",
    overflow: "hidden",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  endpoint: {
    alignItems: "flex-start",
    minWidth: 72,
  },
  endpointEnd: {
    alignItems: "flex-end",
  },
  code: {
    fontFamily: "sans",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 2,
    color: MUTED_COLOR,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  time: {
    fontFamily: "sans",
    fontWeight: "bold",
    fontSize: 22,
    color: TEXT_COLOR,
    fontVariant: ["tabular-nums"],
  },
  dayOffset: {
    fontFamily: "sans",
    fontWeight: "bold",
    fontSize: 11,
    color: TEXT_COLOR,
    marginLeft: 2,
    marginTop: 3,
  },
  date: {
    fontFamily: "sans",
    fontSize: 12,
    color: MUTED_COLOR,
  },
  route: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  plane: {
    marginHorizontal: 6,
  },
  duration: {
    fontFamily: "sans",
    fontSize: 12,
    color: MUTED_COLOR,
    marginTop: 4,
  },
});

export default FlightInfo;
