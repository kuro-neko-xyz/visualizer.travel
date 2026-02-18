import { Airport } from "@/models/Airport";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import airports from "@/assets/json/airports.json";

export default function DataList({ ...props }) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Airport | null>(null);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <View>
      <TouchableOpacity {...props} onPress={handleOpenModal}>
        <Text>{selected?.iata || selected?.icao}</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}
          />
          <TextInput style={styles.input} />
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              padding: 40,
            }}
          ></ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "75%",
    marginTop: "auto",
    backgroundColor: "white",
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
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 100,
  },
});
