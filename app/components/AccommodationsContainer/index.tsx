import { Accommodations } from "@/models/Accommodation";
import { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleSheet } from "react-native";
import AccommodationInfo from "../AccommodationInfo";

interface AccommodationContainerProps {
  accommodations: Accommodations;
  storeAccommodations: Dispatch<SetStateAction<Accommodations>>;
}

const AccommodationsContainer: FC<AccommodationContainerProps> = ({
  accommodations,
  storeAccommodations,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {accommodations.map((accommodation) => (
        <AccommodationInfo
          key={accommodation.id}
          accommodation={accommodation}
          storeAccommodations={storeAccommodations}
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

export default AccommodationsContainer;
