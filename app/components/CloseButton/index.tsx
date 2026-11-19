import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

interface CloseButtonProps {
  accessibilityLabel?: string;
  color?: string;
  handleCloseModal: () => void;
  wide?: boolean;
}

const CloseButton: FC<CloseButtonProps> = ({
  accessibilityLabel = "Close",
  color,
  handleCloseModal,
  wide,
}) => {
  const iconColor = color ?? "red";

  return (
    <Pressable
      onPress={handleCloseModal}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.container,
        wide ? styles.wide : styles.narrow,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name="close" size={20} color={iconColor} />
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    padding: 8,
    borderRadius: 999,
  },
  narrow: { top: 0, right: 0 },
  wide: { top: 10, right: 10 },
  pressed: {
    opacity: 0.5,
    backgroundColor: "rgba(128, 128, 128, 0.2)",
  },
});
