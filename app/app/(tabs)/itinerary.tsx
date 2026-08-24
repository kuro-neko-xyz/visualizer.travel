import ContainerTab from "@/components/ContainerTab";
import getTimeFrame from "@/helpers/itinerary/getTimeFrame";
import transformItinerary from "@/helpers/itinerary/transformItinerary";
import { useContext, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ItineraryContainer from "@/components/ItineraryView";
import { TripContext } from "./_layout";
import { Flights, Flight } from "@/models/Flight";
import { SelectOptions } from "@/models/SelectOption";
import { Trip } from "@/models/Trip";
import { Picker } from "@react-native-picker/picker";

export default function ItineraryView() {
  const { trips } = useContext(TripContext);

  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.uuid);
  const [initialTimeZone, setInitialTimeZone] = useState(
    trips[0]?.flights?.[0].origin.timeZone,
  );

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
          <Text style={styles.label}>Trip:</Text>
          <Picker
            dropdownIconColor="black"
            style={styles.picker}
            selectedValue={selectedTrip}
            onValueChange={(trip) => {
              setSelectedTrip(trip);

              const tempTimeZone =
                trips.find((t) => t.uuid === trip)?.flights[0].origin
                  .timeZone ?? "";

              setSelectedTimeZone(tempTimeZone);
              setInitialTimeZone(tempTimeZone);
            }}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time Zone:</Text>
          <Picker
            dropdownIconColor="black"
            style={styles.picker}
            selectedValue={selectedTimeZone}
            onValueChange={(tz) => setSelectedTimeZone(tz)}
          >
            {timeZoneOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
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
    fontSize: 16,
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
  picker: {
    color: "black",
    flex: 1,
    maxWidth: "70%",
  },
});
