import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import handleAddFlight from "@/helpers/flights/handleAddFlight";
import CloseButton from "../CloseButton";
import Autocomplete from "../Autocomplete";
import AirportOption from "../AirportOption";
import { Airports } from "@/models/Airport";
import { SelectOptions } from "@/models/SelectOption";
import { Trips } from "@/models/Trip";
import { Picker } from "@react-native-picker/picker";

interface FlightFormProps {
  arrivalDate: Date;
  currentTrip: string;
  currentTripName: string;
  departureDate: Date;
  destinationAirport: string;
  destinationOptions: Airports;
  destinationTimeZone: string;
  handleDestinationChange: (search: string) => void;
  handleOriginChange: (search: string) => void;
  isDeparture?: boolean;
  isTime?: boolean;
  originAirport: string;
  originOptions: Airports;
  originTimeZone: string;
  setArrivalDate: Dispatch<SetStateAction<Date>>;
  setCurrentTrip: Dispatch<SetStateAction<string>>;
  setCurrentTripName: Dispatch<SetStateAction<string>>;
  setDepartureDate: Dispatch<SetStateAction<Date>>;
  setIsDeparture: Dispatch<SetStateAction<boolean | undefined>>;
  setIsTime: Dispatch<SetStateAction<boolean | undefined>>;
  setDestinationAirport: Dispatch<SetStateAction<string>>;
  setDestinationTimeZone: Dispatch<SetStateAction<string>>;
  setOriginAirport: Dispatch<SetStateAction<string>>;
  setOriginTimeZone: Dispatch<SetStateAction<string>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  showDatePicker: boolean;
  setTrips: Dispatch<SetStateAction<Trips>>;
  tripOptions: SelectOptions;
}

const FlightForm: FC<FlightFormProps> = ({
  arrivalDate,
  currentTrip,
  currentTripName,
  departureDate,
  destinationAirport,
  destinationOptions,
  destinationTimeZone,
  handleDestinationChange,
  handleOriginChange,
  isDeparture,
  isTime,
  originAirport,
  originOptions,
  originTimeZone,
  setArrivalDate,
  setCurrentTrip,
  setCurrentTripName,
  setDepartureDate,
  setIsDeparture,
  setIsTime,
  setDestinationAirport,
  setDestinationTimeZone,
  setOriginAirport,
  setOriginTimeZone,
  setShowDatePicker,
  showDatePicker,
  setTrips,
  tripOptions,
}) => {
  const [showModal, setShowModal] = useState(false);

  const scheme = useColorScheme();
  const isLight = scheme === "light";

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleOriginChange("");
    handleDestinationChange("");
    setCurrentTripName("");
    setCurrentTrip("");
  };

  const isFormValid =
    originAirport &&
    originTimeZone &&
    destinationAirport &&
    destinationTimeZone &&
    departureDate &&
    arrivalDate;

  const options = [
    {
      label: "New Trip",
      value: "",
    },
    ...tripOptions,
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Text style={isLight ? styles.labelLight : styles.labelDark}>
          ➕ Add Flight
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={showModal}>
        <View
          style={[
            styles.content,
            isLight ? styles.contentLight : styles.contentDark,
          ]}
        >
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
            <Picker
              dropdownIconColor={isLight ? "black" : "white"}
              style={[
                styles.picker,
                isLight ? styles.labelLight : styles.labelDark,
              ]}
              selectedValue={currentTrip}
              onValueChange={(trip) => setCurrentTrip(trip)}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
          {!currentTrip && (
            <>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.label,
                    isLight ? styles.labelLight : styles.labelDark,
                  ]}
                >
                  Trip Name
                </Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  autoCapitalize="words"
                  onChange={(event) =>
                    setCurrentTripName(event.nativeEvent.text)
                  }
                  style={[
                    styles.fullWidth,
                    styles.input,
                    isLight ? styles.inputLight : styles.inputDark,
                  ]}
                  value={currentTripName}
                />
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                isLight ? styles.labelLight : styles.labelDark,
              ]}
            >
              Origin
            </Text>
          </View>
          <View style={styles.row}>
            <Autocomplete
              autoCapitalize="characters"
              handleInputChange={handleOriginChange}
              onSelect={(item) => {
                setOriginAirport(item.id);
                setOriginTimeZone(item.meta.tz);
              }}
              options={originOptions.map((option) => ({
                id: option.iata?.trim() || option.icao,
                title: option.name,
                subtitle: `${option.iata?.trim() ? option.iata + " | " : ""}${option.icao} | ${option.city} | ${option.tz}`,
                meta: {
                  tz: option.tz,
                },
              }))}
              RenderItem={AirportOption}
              style={[
                styles.fullWidth,
                styles.input,
                isLight ? styles.inputLight : styles.inputDark,
              ]}
              value={originAirport}
            />
          </View>
          {originAirport && (
            <>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.label,
                    isLight ? styles.labelLight : styles.labelDark,
                  ]}
                >
                  Destination
                </Text>
              </View>
              <View style={styles.row}>
                <Autocomplete
                  autoCapitalize="characters"
                  handleInputChange={handleDestinationChange}
                  onSelect={(item) => {
                    setDestinationAirport(item.id);
                    setDestinationTimeZone(item.meta.tz);
                  }}
                  options={destinationOptions.map((option) => ({
                    id: option.iata?.trim() || option.icao,
                    title: option.name,
                    subtitle: `${option.iata?.trim() ? option.iata + " | " : ""}${option.icao} | ${option.city} | ${option.tz}`,
                    meta: {
                      tz: option.tz,
                    },
                  }))}
                  RenderItem={AirportOption}
                  style={[
                    styles.fullWidth,
                    styles.input,
                    isLight ? styles.inputLight : styles.inputDark,
                  ]}
                  value={destinationAirport}
                />
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                isLight ? styles.labelLight : styles.labelDark,
              ]}
            >
              Date (Dep./Arr.)
            </Text>
            <TouchableOpacity
              style={[
                styles.cell,
                styles.input,
                isLight ? styles.inputLight : styles.inputDark,
              ]}
              onPress={() => {
                setIsDeparture(true);
                setIsTime(false);
                setShowDatePicker(true);
              }}
            >
              <Text style={isLight ? styles.labelLight : styles.labelDark}>
                {departureDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cell,
                styles.input,
                isLight ? styles.inputLight : styles.inputDark,
              ]}
              onPress={() => {
                setIsDeparture(false);
                setIsTime(false);
                setShowDatePicker(true);
              }}
            >
              <Text style={isLight ? styles.labelLight : styles.labelDark}>
                {arrivalDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                isLight ? styles.labelLight : styles.labelDark,
              ]}
            >
              Time (Dep./Arr.)
            </Text>
            <TouchableOpacity
              style={[
                styles.cell,
                styles.input,
                isLight ? styles.inputLight : styles.inputDark,
              ]}
              onPress={() => {
                setIsDeparture(true);
                setIsTime(true);
                setShowDatePicker(true);
              }}
            >
              <Text style={isLight ? styles.labelLight : styles.labelDark}>
                {departureDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cell,
                styles.input,
                isLight ? styles.inputLight : styles.inputDark,
              ]}
              onPress={() => {
                setIsDeparture(false);
                setIsTime(true);
                setShowDatePicker(true);
              }}
            >
              <Text style={isLight ? styles.labelLight : styles.labelDark}>
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
              onPress={() => {
                handleAddFlight({
                  arrivalDate,
                  currentTrip,
                  currentTripName,
                  departureDate,
                  destinationAirport,
                  destinationTimeZone,
                  originAirport,
                  originTimeZone,
                  setTrips,
                });
                handleCloseModal();
              }}
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
    marginBottom: 50,
    position: "absolute",
  },
  labelLight: {
    color: "black",
  },
  labelDark: {
    color: "white",
  },
  content: {
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 40,
    marginTop: "auto",
    maxHeight: "95%",
  },
  contentLight: {
    backgroundColor: "white",
  },
  contentDark: {
    backgroundColor: "#1D1D1F",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  cell: {
    height: 40,
    width: 100,
    textAlign: "center",
    textAlignVertical: "center",
    marginHorizontal: 5,
  },
  fullWidth: {
    alignSelf: "stretch",
    height: 40,
    minWidth: "100%",
    maxWidth: "100%",
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
  inputLight: {
    color: "black",
    borderColor: "black",
  },
  inputDark: {
    color: "white",
    borderColor: "white",
  },
  label: {
    width: 100,
    textAlign: "center",
    textAlignVertical: "center",
    marginHorizontal: 5,
    marginTop: 10,
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
  picker: {
    color: "black",
    flex: 1,
  },
});
