import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CloseButtonProps {
  handleCloseModal: () => void;
  wide?: boolean;
}

const CloseButton: FC<CloseButtonProps> = ({ handleCloseModal, wide }) => {
  return (
    <TouchableOpacity
      onPress={handleCloseModal}
      style={[styles.container, wide ? styles.wide : styles.narrow]}
    >
      <Text>❌</Text>
    </TouchableOpacity>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
  },
  narrow: {
    top: 0,
    right: 0,
  },
  wide: {
    top: 10,
    right: 10,
  },
});
