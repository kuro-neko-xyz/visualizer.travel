import { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Trips } from "@/models/Trip";
import TripView from "../TripView";

interface AccommodationContainerProps {
  trips: Trips;
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const AccommodationsContainer: FC<AccommodationContainerProps> = ({
  trips,
  setTrips,
}) => {
  const scheme = useColorScheme();
  const isLight = scheme === "light";

  return (
    <View
      style={[
        styles.container,
        isLight ? styles.containerLight : styles.containerDark,
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {trips.map((trip) => (
          <TripView
            key={trip.uuid}
            mode="accommodations"
            setTrips={setTrips}
            trip={trip}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    maxWidth: "100%",
  },
  containerLight: {
    boxShadow: "0px -50px 50px -50px #AAAAAA inset",
  },
  containerDark: {
    boxShadow: "0px -50px 50px -50px #555555 inset",
  },
  content: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    minHeight: "100%",
    minWidth: "100%",
    maxWidth: "100%",
    paddingBottom: 100,
  },
});

export default AccommodationsContainer;
