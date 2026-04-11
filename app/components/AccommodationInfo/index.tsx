import handleDeleteAccommodation from "@/helpers/accommodations/handleDeleteAccommodation";
import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import CloseButton from "../CloseButton";
import { Accommodation, Accommodations } from "@/models/Accommodation";

interface AccommodationInfoProps {
  accommodation: Accommodation;
  storeAccommodations: Dispatch<SetStateAction<Accommodations>>;
}

const AccommodationInfo: FC<AccommodationInfoProps> = ({
  accommodation,
  storeAccommodations,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{`${accommodation.airportCode} 🏨`}</Text>
        <View style={styles.details}>
          <Text style={styles.header}>Check-in</Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkIn).toLocaleDateString()}
          </Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkIn).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.header}>Check-out</Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkOut).toLocaleDateString()}
          </Text>
          <Text style={styles.data}>
            {new Date(accommodation.checkOut).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
      <CloseButton
        handleCloseModal={() =>
          handleDeleteAccommodation({
            accommodationId: accommodation.id,
            storeAccommodations,
          })
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
    position: "relative",
  },
  title: {
    position: "absolute",
    top: -20,
    left: 10,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Nunito",
    letterSpacing: 1,
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
    fontSize: 12,
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
