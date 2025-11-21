import { SelectOption, SelectOptions } from "@/models/SelectOption";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SelectProps extends React.ComponentProps<typeof TouchableOpacity> {
  options: SelectOptions;
}

export default function Select({ options, ...props }: SelectProps) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<SelectOption | null>(null);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <View>
      <TouchableOpacity {...props} onPress={handleOpenModal}>
        <Text>{selected?.label}</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}
          />
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              padding: 40,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                style={styles.value}
                key={option.value}
                onPress={() => {
                  setSelected(option);
                  handleCloseModal();
                }}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "50%",
    marginTop: "auto",
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
  value: {
    padding: 8,
  },
});
