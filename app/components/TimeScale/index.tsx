import { FC } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { DAY_HEIGHT } from "../ItineraryView";

const TimeScale: FC = () => {
  const scheme = useColorScheme();
  const isLight = scheme === "light";

  return (
    <View style={styles.timeScale}>
      {Array.from({ length: 24 }, (_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.timeScaleElement,
              isLight
                ? styles.timeFrameElementLight
                : styles.timeFrameElementDark,
            ]}
          >
            <Text
              style={[
                styles.timeScaleLabel,
                isLight ? styles.labelLight : styles.labelDark,
              ]}
            >
              {String(i).padStart(2, "0")}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  labelLight: {
    color: "black",
  },
  labelDark: {
    color: "white",
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

export default TimeScale;
