import ContainerTab from "@/components/ContainerTab";
import Select from "@/components/Select";
import getTimeFrame from "@/helpers/itinerary/getTimeFrame";
import transformItinerary from "@/helpers/itinerary/transformItinerary";
import {
  Flight,
  Flights,
  SelectOptions,
  Trip,
} from "@visualizer.travel/shared";
import { useContext, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ItineraryContainer from "@/components/ItineraryView";
import { TripContext } from "./_layout";

export default function ItineraryView() {
  const { trips: traps } = useContext(TripContext);

  const trips = traps.reverse();

  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.uuid);
  const [initialTimeZone] = useState(trips[0]?.flights?.[0].origin.timeZone);

  const options: SelectOptions = useMemo(() => {
    return trips.map((trip: Trip) => ({
      value: trip.uuid,
      label: trip.name,
    }));
  }, [trips]);

  const flights: Flights = useMemo(() => {
    return (
      trips.find((trip: Trip) => trip.uuid === selectedTrip)?.flights ?? []
    );
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

  const [selectedTimeZone, setSelectedTimeZone] = useState(
    timeZoneOptions[0].value,
  );

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
      <View style={styles.container}>
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
          initialTimeZone={initialTimeZone}
          itinerary={itinerary}
          timeFrame={timeFrame}
          timeZone={selectedTimeZone}
        />
      </View>
    </ContainerTab>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    minHeight: "100%",
    paddingTop: 100,
  },
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
