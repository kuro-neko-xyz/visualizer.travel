import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import CloseButton from "../CloseButton";
import { storage } from "@/app/_layout";
import { File, Paths } from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { getDocumentAsync } from "expo-document-picker";
import { Trips } from "@/models/Trip";

const exportData = async () => {
  try {
    const tripsData = storage.getString("trips");

    const data = JSON.stringify(
      tripsData ? JSON.parse(tripsData) : [],
      null,
      2,
    );

    const file = new File(Paths.cache, "travel-data.json");

    if (file.exists) {
      file.delete();
    }

    file.create();
    file.write(data);

    await shareAsync(file.uri, {
      mimeType: "application/json",
      UTI: "public.json",
    });

    Alert.alert("Exported data successfully!");
  } catch (error) {
    console.error("Error exporting data:", error);
    Alert.alert("Export failed.");
  }
};

interface SettingsModalProps {
  setTrips: Dispatch<SetStateAction<Trips>>;
}

const SettingsModal: FC<SettingsModalProps> = ({ setTrips }) => {
  const [showModal, setShowModal] = useState(false);

  const scheme = useColorScheme();
  const isLight = scheme === "light";

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const importData = async () => {
    try {
      const result = await getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = new File(result.assets[0].uri);
      const data = JSON.parse(await file.text());

      setTrips(data);

      Alert.alert("Imported data successfully!");
    } catch (error) {
      console.error("Error importing data:", error);
      Alert.alert("Import failed", "The file could not be read as travel data");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleOpenModal}
        >
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent visible={showModal}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.content,
              isLight ? styles.contentLight : styles.contentDark,
            ]}
          >
            <CloseButton handleCloseModal={handleCloseModal} />
            <Text style={[isLight ? styles.labelLight : styles.labelDark]}>
              Data
            </Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => importData()}
                style={styles.button}
              >
                <Text>Import</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => exportData()}
                style={styles.button}
              >
                <Text>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
    display: "flex",
    alignItems: "flex-end",
  },
  labelLight: {
    color: "black",
  },
  labelDark: {
    color: "white",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  settingsButton: {
    padding: 15,
    marginTop: 25,
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#1D1D1F44",
  },
  content: {
    alignItems: "center",
    borderRadius: 30,
    flex: 1,
    padding: 40,
    maxHeight: "80%",
    width: "80%",
  },
  contentLight: {
    backgroundColor: "white",
  },
  contentDark: {
    backgroundColor: "#1D1D1F",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    margin: 10,
  },
});

export default SettingsModal;
