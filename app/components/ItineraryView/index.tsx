import generateRandomColorFromCode from "@/helpers/shared/generateRandomColorFromCode";
import { ItineraryElement, TimeFrame } from "@visualizer.travel/shared";
import { FC } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface ItineraryViewProps {
  itinerary: ItineraryElement[];
  timeFrame: TimeFrame;
  timeZone: string;
}

const DAY_HEIGHT = 240;

const ItineraryView: FC<ItineraryViewProps> = ({
  itinerary,
  timeFrame,
  timeZone,
}) => {
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { minHeight: height - 302 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.itineraryContainer}>
          {itinerary.map((element) => (
            <View
              key={JSON.stringify(element)}
              style={{
                backgroundColor: generateRandomColorFromCode(element.location),
                height:
                  ((element.endDate.getTime() - element.startDate.getTime()) *
                    DAY_HEIGHT) /
                  86400000,
                width: 40,
              }}
            >
              <Text style={styles.locationLabel}>{element.location}</Text>
            </View>
          ))}
        </View>
        <View>
          {[...timeFrame].map((timeFrameElement) => {
            return (
              <View
                key={timeFrameElement.toISOString()}
                style={styles.timeFrameElement}
              >
                <Text>
                  {timeFrameElement.toLocaleString([], {
                    timeZone,
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    maxHeight: "70%",
    boxShadow: "0px -50px 50px -50px #AAAAAA inset",
    minWidth: "100%",
    maxWidth: "100%",
    paddingBottom: 20,
  },
  itineraryContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    width: "90%",
  },
  locationLabel: {},
  content: {
    display: "flex",
    alignItems: "center",
  },
  timeFrameElement: {
    borderStyle: "solid",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 4,
    minWidth: "90%",
    maxWidth: "90%",
    height: DAY_HEIGHT,
  },
});

export default ItineraryView;
