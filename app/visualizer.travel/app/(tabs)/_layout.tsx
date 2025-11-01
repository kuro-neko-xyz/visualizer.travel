import { Text } from "react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="flights"
        options={{ title: "Flights", tabBarIcon: () => <Text>✈️</Text> }}
      />
      <Tabs.Screen
        name="accommodations"
        options={{ title: "Accommodations", tabBarIcon: () => <Text>🏨</Text> }}
      />
      <Tabs.Screen
        name="itinerary"
        options={{ title: "Itinerary", tabBarIcon: () => <Text>🗓️</Text> }}
      />
    </Tabs>
  );
}
