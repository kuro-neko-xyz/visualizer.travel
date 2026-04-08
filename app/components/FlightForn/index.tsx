import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Select from "@/components/Select";
import { timeZones } from "@/constants/timeZones";
import handleAddFlight from "@/helpers/flights/handleAddFlight";
import setAirportCode from "@/helpers/flights/handleSetAirportCode";
import { SelectOption } from "@/models/SelectOption";
import { Flights } from "@/models/Flight";
import CloseButton from "../CloseButton";

interface FlightFormProps {
  arrivalDate: Date;
  departureDate: Date;
  destinationAirportCode: string;
  destinationTimeZone: SelectOption | null;
  isDeparture?: boolean;
  isTime?: boolean;
  originAirportCode: string;
  originTimeZone: SelectOption | null;
  setArrivalDate: Dispatch<SetStateAction<Date>>;
  setDepartureDate: Dispatch<SetStateAction<Date>>;
  setDestinationAirportCode: Dispatch<SetStateAction<string>>;
  setDestinationTimeZone: Dispatch<SetStateAction<SelectOption | null>>;
  setIsDeparture: Dispatch<SetStateAction<boolean | undefined>>;
  setIsTime: Dispatch<SetStateAction<boolean | undefined>>;
  setOriginAirportCode: Dispatch<SetStateAction<string>>;
  setOriginTimeZone: Dispatch<SetStateAction<SelectOption | null>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  showDatePicker: boolean;
  storeFlights: (args: Flights | ((flights: Flights) => Flights)) => void;
}

const FlightForm: FC<FlightFormProps> = ({
  arrivalDate,
  departureDate,
  destinationAirportCode,
  destinationTimeZone,
  isDeparture,
  isTime,
  originAirportCode,
  originTimeZone,
  setArrivalDate,
  setDepartureDate,
  setDestinationAirportCode,
  setDestinationTimeZone,
  setIsDeparture,
  setIsTime,
  setOriginAirportCode,
  setOriginTimeZone,
  setShowDatePicker,
  showDatePicker,
  storeFlights,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isFormValid =
    originAirportCode &&
    destinationAirportCode &&
    originTimeZone &&
    destinationTimeZone;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Text>➕ Add Flight</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.content}>
          <CloseButton handleCloseModal={handleCloseModal} wide />
          <DatePicker
            date={isDeparture ? departureDate : arrivalDate}
            modal
            mode={isTime ? "time" : "date"}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            onConfirm={(date) => {
              if (isDeparture) {
                setDepartureDate(date);
              } else {
                setArrivalDate(date);
              }
              setShowDatePicker(false);
            }}
            open={showDatePicker}
          />
          <View style={styles.row}>
            <View style={styles.cell}></View>
            <Text style={styles.cell}>Origin</Text>
            <Text style={styles.cell}>Destination</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Airport Code</Text>
            <TextInput
              autoCapitalize="characters"
              onChangeText={(code) =>
                setAirportCode(code, setOriginAirportCode)
              }
              placeholder="Origin airport code"
              placeholderTextColor={"#0000"}
              style={[styles.cell, styles.input]}
              value={originAirportCode}
            />
            <TextInput
              autoCapitalize="characters"
              onChangeText={(code) =>
                setAirportCode(code, setDestinationAirportCode)
              }
              placeholder="Destination airport code"
              placeholderTextColor={"#0000"}
              style={[styles.cell, styles.input]}
              value={destinationAirportCode}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Time Zone</Text>
            <Select
              style={[styles.cell, styles.input]}
              onChange={setOriginTimeZone}
              options={timeZones}
              value={originTimeZone}
            />
            <Select
              style={[styles.cell, styles.input]}
              onChange={setDestinationTimeZone}
              options={timeZones}
              value={destinationTimeZone}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Date (Dep./Arr.)</Text>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsDeparture(true);
                setIsTime(false);
                setShowDatePicker(true);
              }}
            >
              <Text>{departureDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsDeparture(false);
                setIsTime(false);
                setShowDatePicker(true);
              }}
            >
              <Text>{arrivalDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Time (Dep./Arr.)</Text>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsDeparture(true);
                setIsTime(true);
                setShowDatePicker(true);
              }}
            >
              <Text>
                {departureDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsDeparture(false);
                setIsTime(true);
                setShowDatePicker(true);
              }}
            >
              <Text>
                {arrivalDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              disabled={!isFormValid}
              onPress={() =>
                handleAddFlight({
                  arrivalDate,
                  departureDate,
                  destinationAirportCode,
                  destinationTimeZone,
                  originAirportCode,
                  originTimeZone,
                  storeFlights,
                })
              }
              style={[
                styles.button,
                isFormValid ? styles.enabled : styles.disabled,
              ]}
            >
              <Text>Add Flight</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FlightForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    padding: 10,
    margin: 10,
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 40,
    marginTop: "auto",
    maxHeight: "75%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cell: {
    height: 40,
    width: 100,
    textAlign: "center",
    textAlignVertical: "center",
    marginHorizontal: 5,
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  enabled: {
    backgroundColor: "#007AFF",
  },
  disabled: {
    backgroundColor: "#CCCCCC",
  },
});
