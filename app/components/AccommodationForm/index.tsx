import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CloseButton from "../CloseButton";
import DatePicker from "react-native-date-picker";
import handleAddAccommodation from "@/helpers/accommodations/handleAddAccommodation";
import Autocomplete from "../Autocomplete";
import { Airports } from "@/models/Airport";
import AirportOption from "../AirportOption";
import { Picker } from "@react-native-picker/picker";
import { SelectOptions } from "@/models/SelectOption";
import { Trips } from "@/models/Trip";

interface AccommodationFormProps {
  accommodationAirport: string;
  accommodationOptions: Airports;
  accommodationTimeZone: string;
  checkInDate: Date;
  checkOutDate: Date;
  currentTrip: string;
  currentTripName: string;
  handleAccommodationChange: (search: string) => void;
  isCheckIn?: boolean;
  isTime?: boolean;
  setAccommodationAirport: Dispatch<SetStateAction<string>>;
  setAccommodationTimeZone: Dispatch<SetStateAction<string>>;
  setCheckInDate: Dispatch<SetStateAction<Date>>;
  setCheckOutDate: Dispatch<SetStateAction<Date>>;
  setCurrentTrip: Dispatch<SetStateAction<string>>;
  setCurrentTripName: Dispatch<SetStateAction<string>>;
  setIsCheckIn: Dispatch<SetStateAction<boolean | undefined>>;
  setIsTime: Dispatch<SetStateAction<boolean | undefined>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  setTrips: Dispatch<SetStateAction<Trips>>;
  showDatePicker: boolean;
  tripOptions: SelectOptions;
}

const AccommodationForm: FC<AccommodationFormProps> = ({
  accommodationAirport,
  accommodationOptions,
  accommodationTimeZone,
  checkInDate,
  checkOutDate,
  currentTrip,
  currentTripName,
  handleAccommodationChange,
  isCheckIn,
  isTime,
  setAccommodationAirport,
  setCheckInDate,
  setCheckOutDate,
  setIsCheckIn,
  setIsTime,
  setAccommodationTimeZone,
  setCurrentTrip,
  setCurrentTripName,
  setShowDatePicker,
  setTrips,
  showDatePicker,
  tripOptions,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isFormValid = accommodationAirport;

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
        <Text>➕ Add Accommodation</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={showModal}>
        <View style={styles.content}>
          <CloseButton handleCloseModal={handleCloseModal} wide />
          <DatePicker
            date={isCheckIn ? checkInDate : checkOutDate}
            modal
            mode={isTime ? "time" : "date"}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            onConfirm={(date) => {
              if (isCheckIn) {
                setCheckInDate(date);
              } else {
                setCheckOutDate(date);
              }
              setShowDatePicker(false);
            }}
            open={showDatePicker}
          />
          <View style={styles.row}>
            <Picker
              dropdownIconColor="black"
              style={styles.picker}
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
                <Text style={styles.label}>Trip Name</Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  autoCapitalize="words"
                  onChange={(event) =>
                    setCurrentTripName(event.nativeEvent.text)
                  }
                  style={[styles.fullWidth, styles.input]}
                  value={currentTripName}
                />
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Nearest Airport</Text>
          </View>
          <View style={styles.row}>
            <Autocomplete
              autoCapitalize="characters"
              handleInputChange={handleAccommodationChange}
              onSelect={(item) => {
                setAccommodationAirport(item.id);
                setAccommodationTimeZone(item.meta.tz);
              }}
              options={accommodationOptions.map((option) => ({
                id: option.iata?.trim() || option.icao,
                title: option.name,
                subtitle: `${option.iata?.trim() ? option.iata + " | " : ""}${option.icao} | ${option.city} | ${option.tz}`,
                meta: {
                  tz: option.tz,
                },
              }))}
              RenderItem={AirportOption}
              style={[styles.fullWidth, styles.input]}
              value={accommodationAirport}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Time Zone</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Check-in Date</Text>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsCheckIn(true);
                setIsTime(false);
                setShowDatePicker(true);
              }}
            >
              <Text>{checkInDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Check-in Time</Text>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsCheckIn(true);
                setIsTime(true);
                setShowDatePicker(true);
              }}
            >
              <Text>
                {checkInDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Check-out Date</Text>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsCheckIn(false);
                setIsTime(false);
                setShowDatePicker(true);
              }}
            >
              <Text>{checkOutDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Check-out Time</Text>
            <TouchableOpacity
              style={[styles.cell, styles.input]}
              onPress={() => {
                setIsCheckIn(false);
                setIsTime(true);
                setShowDatePicker(true);
              }}
            >
              <Text>
                {checkOutDate.toLocaleTimeString([], {
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
                handleAddAccommodation({
                  accommodationAirport,
                  accommodationTimeZone,
                  checkInDate,
                  checkOutDate,
                  currentTrip,
                  currentTripName,
                  setTrips,
                });
                handleCloseModal();
              }}
              style={[
                styles.button,
                isFormValid ? styles.enabled : styles.disabled,
              ]}
            >
              <Text>Add Accommodation</Text>
            </TouchableOpacity>
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
  addButton: {
    padding: 10,
    margin: 10,
    marginBottom: 50,
    position: "absolute",
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 40,
    marginTop: "auto",
    maxHeight: "95%",
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
    color: "black",
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

export default AccommodationForm;
