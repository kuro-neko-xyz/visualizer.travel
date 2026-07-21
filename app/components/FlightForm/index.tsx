import { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
// import handleAddFlight from "@/helpers/flights/handleAddFlight";
import CloseButton from "../CloseButton";
import Autocomplete from "../Autocomplete";
import { Airports } from "@/models/Airport";
import AirportOption from "../AirportOption";

interface FlightFormProps {
  arrivalDate: Date;
  departureDate: Date;
  destinationAirport: string;
  destinationOptions: Airports;
  handleDestinationChange: (search: string) => void;
  handleOriginChange: (search: string) => void;
  isDeparture?: boolean;
  isTime?: boolean;
  originAirport: string;
  originOptions: Airports;
  setArrivalDate: Dispatch<SetStateAction<Date>>;
  setDepartureDate: Dispatch<SetStateAction<Date>>;
  setIsDeparture: Dispatch<SetStateAction<boolean | undefined>>;
  setIsTime: Dispatch<SetStateAction<boolean | undefined>>;
  setDestinationAirport: Dispatch<SetStateAction<string>>;
  setOriginAirport: Dispatch<SetStateAction<string>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  showDatePicker: boolean;
  // setFlights: Dispatch<SetStateAction<Flights>>;
}

const FlightForm: FC<FlightFormProps> = ({
  arrivalDate,
  departureDate,
  destinationAirport,
  destinationOptions,
  handleDestinationChange,
  handleOriginChange,
  isDeparture,
  isTime,
  originAirport,
  originOptions,
  setArrivalDate,
  setDepartureDate,
  setIsDeparture,
  setIsTime,
  setDestinationAirport,
  setOriginAirport,
  setShowDatePicker,
  showDatePicker,
  // setFlights,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleOriginChange("");
    handleDestinationChange("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Text>➕ Add Flight</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={showModal}>
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
            <Text style={styles.label}>Origin</Text>
          </View>
          <View style={styles.row}>
            <Autocomplete
              autoCapitalize="characters"
              handleInputChange={handleOriginChange}
              onSelect={(item) => {
                setOriginAirport(item.id);
              }}
              options={originOptions.map((option) => ({
                id: option.iata?.trim() || option.icao,
                title: option.name,
                subtitle: `${option.iata?.trim() ? option.iata + " | " : ""}${option.icao} | ${option.city} | ${option.tz}`,
              }))}
              RenderItem={AirportOption}
              style={[styles.fullWidth, styles.input]}
              value={originAirport}
            />
          </View>
          {originAirport && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Destination</Text>
              </View>
              <View style={styles.row}>
                <Autocomplete
                  autoCapitalize="characters"
                  handleInputChange={handleDestinationChange}
                  onSelect={(item) => {
                    setDestinationAirport(item.id);
                  }}
                  options={destinationOptions.map((option) => ({
                    id: option.iata?.trim() || option.icao,
                    title: option.name,
                    subtitle: `${option.iata?.trim() ? option.iata + " | " : ""}${option.icao} | ${option.city} | ${option.tz}`,
                  }))}
                  RenderItem={AirportOption}
                  style={[styles.fullWidth, styles.input]}
                  value={destinationAirport}
                />
              </View>
            </>
          )}
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
          {/* <View style={styles.row}>
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
                  setFlights,
                })
              }
              style={[
                styles.button,
                isFormValid ? styles.enabled : styles.disabled,
              ]}
            >
              <Text>Add Flight</Text>
            </TouchableOpacity>
          </View> */}
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
});
