import generateRandomColorFromCode from "@/helpers/shared/generateRandomColorFromCode";
import { ItineraryElement } from "@/models/Itinerary";
import TimeFrame from "@/models/TimeFrame";
import { getTimeZones } from "@vvo/tzdb";
import { FC } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface ItineraryViewProps {
  initialTimeZone: string;
  itinerary: ItineraryElement[];
  timeFrame: TimeFrame;
  timeZone: string;
}

const DAY_HEIGHT = 240;

const ItineraryView: FC<ItineraryViewProps> = ({
  initialTimeZone,
  itinerary,
  timeFrame,
  timeZone,
}) => {
  const { height } = useWindowDimensions();

  const timeZones = getTimeZones();

  const extendedInitialTimeZone = timeZones.find(
    (tz) => initialTimeZone === tz.name || tz.group.includes(initialTimeZone),
  );

  const extendedTimeZone = timeZones.find(
    (tz) => timeZone === tz.name || tz.group.includes(timeZone),
  );

  const difference =
    (extendedTimeZone?.currentTimeOffsetInMinutes ?? 0) -
    (extendedInitialTimeZone?.currentTimeOffsetInMinutes ?? 0);

  const padding = -Math.floor(difference / 1440);

  const displacement = (difference * DAY_HEIGHT) / 1440 + padding * DAY_HEIGHT;

  const heights = itinerary.map(
    (element) =>
      ((element.endDate.getTime() - element.startDate.getTime()) * DAY_HEIGHT) /
      86400000,
  );

  return (
    <View style={[styles.container, { minHeight: height - 280 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.itineraryContainer}>
          <View
            key={"origin"}
            style={{
              backgroundColor: generateRandomColorFromCode(
                itinerary[0].location,
              ),
              minHeight: displacement,
              maxHeight: displacement,
              overflowY: "hidden",
              width: 40,
            }}
          />
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
        <View>
          {[...timeFrame].map((timeFrameElement) => {
            return (
              <View
                key={timeFrameElement.toISOString()}
                style={styles.timeFrameElementContainer}
              >
                <View style={styles.timeFrameElement}>
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
                <View style={styles.timeScale}>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>00</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>01</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>02</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>03</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>04</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>05</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>06</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>07</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>08</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>09</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>10</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>11</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>12</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>13</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>14</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>15</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>16</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>17</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>18</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>19</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>20</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>21</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>22</Text>
                  </View>
                  <View style={styles.timeScaleElement}>
                    <Text style={styles.timeScaleLabel}>23</Text>
                  </View>
                </View>
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
