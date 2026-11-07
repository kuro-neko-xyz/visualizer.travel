import generateRandomColorFromCode from "@/helpers/shared/generateRandomColorFromCode";
import { Accommodations } from "@/models/Accommodation";
import { ItineraryElement } from "@/models/Itinerary";
import TimeFrame from "@/models/TimeFrame";
import { FC } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import TimeScale from "../TimeScale";
import { DAY_HEIGHT } from "@/constants/layout";

interface ItineraryViewProps {
  accommodations?: Accommodations;
  itinerary: ItineraryElement[];
  timeFrame: TimeFrame;
  timeZone: string;
}

const ItineraryView: FC<ItineraryViewProps> = ({
  accommodations,
  itinerary,
  timeFrame,
  timeZone,
}) => {
  const { height } = useWindowDimensions();

  const scheme = useColorScheme();
  const isLight = scheme === "light";

  const heights = itinerary.map(
    (element) =>
      ((element.endDate.getTime() - element.startDate.getTime()) * DAY_HEIGHT) /
      86400000,
  );

  return (
    <View
      style={[
        styles.container,
        isLight ? styles.containerLight : styles.containerDark,
        ,
        { minHeight: height - 290 },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerLabel}>🏨</Text>
        <Text style={styles.headerLabel}>✈️</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.itineraryContainer}>
          {itinerary.map((element, index) => {
            const height = heights[index];

            return (
              <View
                key={JSON.stringify(element)}
                style={{
                  backgroundColor: generateRandomColorFromCode(
                    element.location,
                  ),
                  minHeight: height,
                  maxHeight: height,
                  overflowY: "hidden",
                  width: 40,
                }}
              >
                <Text style={styles.locationLabel}>{element.location}</Text>
              </View>
            );
          })}
          <View
            key={"destination"}
            style={{
              backgroundColor: generateRandomColorFromCode(
                itinerary[itinerary.length - 1]?.location ?? "",
              ),
              minHeight:
                [...timeFrame].length * DAY_HEIGHT -
                heights.reduce((acc, cur) => acc + cur),
              overflowY: "hidden",
              width: 40,
            }}
          />
        </View>
        {accommodations && (
          <View style={styles.accommodationsContainer}>
            {accommodations.map((accommodation) => {
              const padding =
                ((new Date(accommodation.checkIn).getTime() -
                  itinerary[0].startDate.getTime()) *
                  DAY_HEIGHT) /
                86400000;

              const height =
                ((new Date(accommodation.checkOut).getTime() -
                  new Date(accommodation.checkIn).getTime()) *
                  DAY_HEIGHT) /
                86400000;

              return (
                <View
                  key={accommodation.id}
                  style={{
                    backgroundColor: generateRandomColorFromCode(
                      accommodation.airportCode,
                    ),
                    minHeight: height,
                    maxHeight: height,
                    position: "absolute",
                    top: padding,
                    overflowY: "hidden",
                    width: 40,
                  }}
                >
                  <Text style={styles.locationLabel}>
                    {accommodation.airportCode}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <View>
          {[...timeFrame].map((timeFrameElement) => {
            return (
              <View
                key={timeFrameElement.toISOString()}
                style={styles.timeFrameElementContainer}
              >
                <View
                  style={[
                    styles.timeFrameElement,
                    isLight
                      ? styles.timeFrameElementLight
                      : styles.timeFrameElementDark,
                  ]}
                >
                  <Text style={isLight ? styles.labelLight : styles.labelDark}>
                    {timeFrameElement.toLocaleString([], {
                      timeZone,
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
                <TimeScale />
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
    minWidth: "100%",
    maxWidth: "100%",
    paddingBottom: 20,
  },
  containerLight: {
    boxShadow: "0px -50px 50px -50px #AAAAAA inset",
  },
  containerDark: {
    boxShadow: "0px -50px 50px -50px #555555 inset",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    minWidth: "90%",
  },
  headerLabel: {
    width: 40,
    textAlign: "center",
  },
  labelLight: {
    color: "black",
  },
  labelDark: {
    color: "white",
  },
  itineraryContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    width: "90%",
  },
  accommodationsContainer: {
    position: "absolute",
    right: 60,
    display: "flex",
    alignItems: "flex-end",
    width: "90%",
  },
  locationLabel: {},
  content: {
    display: "flex",
    alignItems: "center",
  },
  timeFrameElementContainer: {
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
  timeFrameElementLight: {
    borderColor: "black",
  },
  timeFrameElementDark: {
    borderColor: "white",
  },
  timeScale: {
    width: 10,
    height: DAY_HEIGHT,
    position: "absolute",
    right: 10,
  },
  timeScaleElement: {
    width: "100%",
    height: DAY_HEIGHT / 24,
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  timeScaleLabel: {
    fontSize: 5,
    paddingLeft: 2,
  },
});

export default ItineraryView;
