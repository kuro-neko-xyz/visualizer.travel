import ContainerTab from "@/components/ContainerTab";
import Select from "@/components/Select";
import getTimeFrame from "@/helpers/itinerary/getTimeFrame";
import transformItinerary from "@/helpers/itinerary/transformItinerary";
import useStorage from "@/hooks/useStorage";
import {
  Flight,
  Flights,
  SelectOptions,
  Trip,
} from "@visualizer.travel/shared";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ItineraryContainer from "@/components/ItineraryView";

export default function ItineraryView() {
  const [trips] = useStorage("trips", []);
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.uuid);
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    trips[0]?.flights[0].origin.timeZone,
  );

  const options: SelectOptions = useMemo(() => {
    return trips.map((trip: Trip) => ({
      value: trip.uuid,
      label: trip.name,
    }));
  }, [trips]);

  const flights: Flights = useMemo(() => {
    return trips.find((trip: Trip) => trip.uuid === selectedTrip).flights;
  }, [trips, selectedTrip]);

  const timeZoneOptions = useMemo(() => {
    if (!flights) return [];

    const allTimeZones = flights.flatMap((flight: Flight) => [
      flight.origin.timeZone,
      flight.destination.timeZone,
    ]);

    return [...new Set(allTimeZones)].map((tz) => ({
      value: tz,
      label: tz,
    })) as SelectOptions;
  }, [flights]);

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
        <Text style={styles.label}>Select Trip</Text>
      </View>
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
      <View style={styles.row}>
        <Text style={styles.label}>Select Time Zone to Display Data</Text>
      </View>
      <View style={styles.row}>
        <Select
          onChange={(option) => setSelectedTimeZone(option.value)}
          options={timeZoneOptions}
          value={timeZoneOptions.find(
            (option) => option.value === selectedTimeZone,
          )}
          style={styles.select}
        >
          <Text style={styles.hint}>▼</Text>
        </Select>
      </View>
      <ItineraryContainer
        itinerary={itinerary}
        timeFrame={timeFrame}
        timeZone={selectedTimeZone}
      />
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
  label: {
    textAlign: "center",
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
