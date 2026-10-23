import { FC } from "react";
import { RenderItemProps } from "../Autocomplete";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const AirportOption: FC<RenderItemProps> = ({ item, onSelect }) => {
  const scheme = useColorScheme();
  const isLight = scheme === "light";

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(item)}>
      <Text
        style={[styles.title, isLight ? styles.labelLight : styles.labelDark]}
      >
        {item.title}
      </Text>
      <Text style={isLight ? styles.labelLight : styles.labelDark}>
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
  },
  labelLight: {
    color: "black",
  },
  labelDark: {
    color: "white",
  },
});

export default AirportOption;
