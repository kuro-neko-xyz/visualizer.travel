import { SelectOption, SelectOptions } from "@/models/SelectOption";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface SelectProps extends React.ComponentProps<typeof TouchableOpacity> {
  onChange?: (option: SelectOption) => void;
  options: SelectOptions;
  value?: SelectOption | null;
}

export default function Select({
  onChange,
  options,
  value,
  ...props
}: SelectProps) {
  if (value !== undefined && !onChange) {
    throw new Error("If value is provided, onChange must also be provided.");
  }

  if (value === undefined && onChange) {
    throw new Error("If onChange is provided, value must also be provided.");
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selected, setSelected] = useState<SelectOption | null>(null);

  const y = useSharedValue(0);
  const starting = useSharedValue(0);

  const gesture = Gesture.Pan();

  const updateSelectedIndex = (displacement: number) => {
    setSelectedIndex((prev) => {
      const newIndex = prev + displacement;
      if (newIndex < 0) {
        return options.length + newIndex;
      } else {
        return newIndex % options.length;
      }
    });
  };

  gesture.onUpdate((event) => {
    y.value = event.translationY - starting.value;
    if (Math.abs(y.value) >= 30) {
      Vibration.vibrate(10);
      starting.value += y.value;
      updateSelectedIndex(Math.sign(-y.value));
      y.value = 0;
    }
  });

  gesture.onEnd(() => {
    Vibration.vibrate(10);
    if (Math.abs(y.value) >= 15) {
      updateSelectedIndex(Math.sign(-y.value));
    }
    y.value = 0;
    starting.value = 0;
  });

  const animatedContainer = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  const animatedNegative1 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${22.5 - (y.value / 30) * 22.5}deg` }],
  }));

  const animatedNegative2 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${45 - (y.value / 30) * 22.5}deg` }],
  }));

  const animatedNegative3 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${67.5 - (y.value / 30) * 22.5}deg` }],
  }));

  const animatedNegative4 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${Math.min(90 - (y.value / 30) * 22.5, 90)}deg` }],
  }));

  const animatedCenter = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${-(y.value / 30) * 22.5}deg` }],
  }));

  const animatedPositive1 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${-22.5 - (y.value / 30) * 22.5}deg` }],
  }));

  const animatedPositive2 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${-45 - (y.value / 30) * 22.5}deg` }],
  }));

  const animatedPositive3 = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${-67.5 - (y.value / 30) * 22.5}deg` }],
  }));

  const animatedPositive4 = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${Math.max(-90 - (y.value / 30) * 22.5, -90)}deg` },
    ],
  }));

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectClick = () => {
    setSelected(options[selectedIndex]);
    onChange?.(options[selectedIndex]);
    handleCloseModal();
  };

  return (
    <View>
      <TouchableOpacity {...props} onPress={handleOpenModal}>
        <Text>{value?.label ?? selected?.label}</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}
          />
          <View style={styles.selector} />
          <GestureHandlerRootView>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.content, animatedContainer]}>
                <Animated.Text style={[styles.value, animatedNegative4]}>
                  {options.at(selectedIndex - 4)?.label ?? ""}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedNegative3]}>
                  {options.at(selectedIndex - 3)?.label ?? ""}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedNegative2]}>
                  {options.at(selectedIndex - 2)?.label ?? ""}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedNegative1]}>
                  {options.at(selectedIndex - 1)?.label ?? ""}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedCenter]}>
                  {options[selectedIndex].label}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedPositive1]}>
                  {options[(selectedIndex + 1) % options.length].label}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedPositive2]}>
                  {options[(selectedIndex + 2) % options.length].label}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedPositive3]}>
                  {options[(selectedIndex + 3) % options.length].label}
                </Animated.Text>
                <Animated.Text style={[styles.value, animatedPositive4]}>
                  {options[(selectedIndex + 4) % options.length].label}
                </Animated.Text>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
          <TouchableOpacity
            onPress={handleSelectClick}
            style={styles.selectButton}
          >
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 40,
    marginTop: "auto",
    maxHeight: "50%",
  },
  content: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 20,
    backgroundColor: "red",
    borderRadius: "50%",
  },
  selectButton: {
    alignItems: "center",
    backgroundColor: "limegreen",
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
  },
  selector: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    height: 30,
    position: "absolute",
    width: "100%",
    transform: [{ translateY: -8 }],
    top: "50%",
    left: 40,
  },
  value: {
    height: 30,
    verticalAlign: "middle",
  },
});
