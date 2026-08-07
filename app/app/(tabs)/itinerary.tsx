import ContainerTab from "@/components/ContainerTab";
import Select from "@/components/Select";
import getTimeFrame from "@/helpers/itinerary/getTimeFrame";
import transformItinerary from "@/helpers/itinerary/transformItinerary";
import useStorage from "@/hooks/useStorage";
import { Flights, SelectOptions, Trip } from "@visualizer.travel/shared";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ItineraryContainer from "@/components/ItineraryView";

export default function ItineraryView() {
  const [trips] = useStorage("trips", []);
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.uuid);

  const options: SelectOptions = useMemo(() => {
    return trips.map((trip: Trip) => ({
      value: trip.uuid,
      label: trip.name,
    }));
  }, [trips]);

  const flights: Flights = useMemo(() => {
    return trips.find((trip: Trip) => trip.uuid === selectedTrip).flights;
  }, [trips, selectedTrip]);

  if (!selectedTrip) {
    return (
      <ContainerTab>
        <Text>No trips available to display the itinerary.</Text>
      </ContainerTab>
    );
  }

  const timeFrame = getTimeFrame(flights);

  if (!timeFrame) {
    return (
      <ContainerTab>
        <Text>No flights available to display the itinerary.</Text>
      </ContainerTab>
    );
  }

  const itinerary = transformItinerary(flights, timeFrame);

  return (
    <ContainerTab>
      <View style={styles.row}>
        <Select
          onChange={(option) => setSelectedTrip(option.value)}
          options={options}
          value={options.find((trip) => trip.value === selectedTrip)}
          style={styles.select}
        >
          <Text style={styles.hint}>▼</Text>
        </Select>
      </View>
      <ItineraryContainer itinerary={itinerary} timeFrame={timeFrame} />
    </ContainerTab>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  select: {
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 25,
    borderRadius: 5,
  },
  hint: {
    position: "absolute",
    right: 2,
    top: 5,
  },
});
