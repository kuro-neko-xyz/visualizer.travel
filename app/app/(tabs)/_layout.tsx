import { Text } from "react-native";
import { Tabs } from "expo-router";
import useStorage from "@/hooks/useStorage";
import { createContext, Dispatch, SetStateAction } from "react";
import { Trips } from "@visualizer.travel/shared";

interface TripContextType {
  trips: Trips;
  setTrips: Dispatch<SetStateAction<Trips>>; // Matches the type of a standard useState setter
}

export const TripContext = createContext<TripContextType>({
  trips: [],
  setTrips: () => {},
});

export default function TabLayout() {
  const [trips, setTrips] = useStorage("trips", []);

  return (
    <TripContext.Provider value={{ trips, setTrips }}>
      <Tabs initialRouteName="flights" screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="flights"
          options={{ title: "Flights", tabBarIcon: () => <Text>✈️</Text> }}
        />
        <Tabs.Screen
          name="accommodations"
          options={{
            title: "Accommodations",
            tabBarIcon: () => <Text>🏨</Text>,
          }}
        />
        <Tabs.Screen
          name="itinerary"
          options={{ title: "Itinerary", tabBarIcon: () => <Text>🗓️</Text> }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </TripContext.Provider>
  );
}
