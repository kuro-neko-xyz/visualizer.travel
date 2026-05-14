import ContainerTab from "@/components/ContainerTab";
import getDayAfter from "@/helpers/itinerary/getDayAfter";
import getDayBefore from "@/helpers/itinerary/getDayBefore";
import getSortedFlights from "@/helpers/itinerary/getSortedFlights";
import transformItinerary from "@/helpers/itinerary/transformItinerary";
import useStorage from "@/hooks/useStorage";
import { Text } from "react-native";

export default function ItineraryView() {
  const [flights] = useStorage("flights", []);

  const sortedFlights = getSortedFlights(flights);
  const dayBefore = getDayBefore(sortedFlights);
  const dayAfter = getDayAfter(sortedFlights);

  if (!dayBefore || !dayAfter) {
    return (
      <ContainerTab>
        <Text>No flights available to display the itinerary.</Text>
      </ContainerTab>
    );
  }

  const itinerary = transformItinerary(sortedFlights, dayBefore, dayAfter);

  console.log(itinerary);

  return (
    <ContainerTab>
      <Text>Itinerary Screen</Text>
    </ContainerTab>
  );
}
