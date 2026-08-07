import { ItineraryElement, TimeFrame } from "@visualizer.travel/shared";
import { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface ItineraryViewProps {
  itinerary: ItineraryElement[];
  timeFrame: TimeFrame;
}

const ItineraryView: FC<ItineraryViewProps> = ({ itinerary, timeFrame }) => {
  return (
    <View>
      <ScrollView style={styles.container}>
        {[...timeFrame].map((timeFrameElement) => (
          <View
            key={timeFrameElement.toISOString()}
            style={styles.timeFrameElement}
          >
            <Text>{timeFrameElement.toISOString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "90%",
  },
  timeFrameElement: {
    borderStyle: "solid",
    borderTopWidth: 1,
    minWidth: "100%",
    maxWidth: "100%",
    height: 50,
  },
});

export default ItineraryView;
