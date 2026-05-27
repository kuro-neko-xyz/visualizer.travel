import { FC } from "react";
import { RenderItemProps } from "../Autocomplete";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AirportOption: FC<RenderItemProps> = ({ item, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.subtitle}</Text>
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
});

export default AirportOption;
