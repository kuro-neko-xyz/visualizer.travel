import handleDeleteAccommodation from "@/helpers/accommodations/handleDeleteAccommodation";
import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import CloseButton from "../CloseButton";
import { Accommodation } from "@/models/Accommodation";
import { Trip, Trips } from "@/models/Trip";
import generateRandomColorFromCode from "@/helpers/shared/generateRandomColorFromCode";

interface AccommodationInfoProps {
  accommodation: Accommodation;
  setSelectedTimeZone: Dispatch<SetStateAction<string>>;
  setTrips: Dispatch<SetStateAction<Trips>>;
  timeZone: string;
  trip: Trip;
}

const AccommodationInfo: FC<AccommodationInfoProps> = ({
  accommodation,
  setSelectedTimeZone,
  setTrips,
  timeZone,
  trip,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: generateRandomColorFromCode(
            accommodation.airportCode,
          ),
        },
      ]}
    >
      <View style={styles.info}>
        <Text>{`${accommodation.airportCode} 🏨`}</Text>
        <View style={styles.details}>
          <Text style={styles.header}>Check-in</Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkIn).toLocaleDateString([], {
              timeZone,
            })}
          </Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkIn).toLocaleTimeString([], {
              timeZone,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.header}>Check-out</Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkOut).toLocaleDateString([], {
              timeZone,
            })}
          </Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkOut).toLocaleTimeString([], {
              timeZone,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
      <CloseButton
        handleCloseModal={() => {
          handleDeleteAccommodation({
            accommodationId: accommodation.id,
            setTrips,
          });
          setSelectedTimeZone(trip.accommodations?.[0]?.timeZone);
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

export default AccommodationInfo;
