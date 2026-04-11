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
import setAirportCode from "@/helpers/flights/handleSetAirportCode";
import Select from "../Select";
import { timeZones } from "@/constants/timeZones";
import { SelectOption } from "@/models/SelectOption";
import handleAddAccommodation from "@/helpers/accommodations/handleAddAccommodation";
import { Accommodations } from "@/models/Accommodation";

interface AccommodationFormProps {
  accommodationAirportCode: string;
  checkInDate: Date;
  checkOutDate: Date;
  isCheckIn?: boolean;
  isTime?: boolean;
  setAccommodationAirportCode: Dispatch<SetStateAction<string>>;
  setCheckInDate: Dispatch<SetStateAction<Date>>;
  setCheckOutDate: Dispatch<SetStateAction<Date>>;
  setIsCheckIn: Dispatch<SetStateAction<boolean | undefined>>;
  setIsTime: Dispatch<SetStateAction<boolean | undefined>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  setTimeZone: Dispatch<SetStateAction<SelectOption | null>>;
  showDatePicker: boolean;
  storeAccommodations: Dispatch<SetStateAction<Accommodations>>;
  timeZone: SelectOption | null;
}

const AccommodationForm: FC<AccommodationFormProps> = ({
  accommodationAirportCode,
  checkInDate,
  checkOutDate,
  isCheckIn,
  isTime,
  setAccommodationAirportCode,
  setCheckInDate,
  setCheckOutDate,
  setIsCheckIn,
  setIsTime,
  setShowDatePicker,
  setTimeZone,
  showDatePicker,
  storeAccommodations,
  timeZone,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isFormValid = accommodationAirportCode && timeZone;

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
            <View style={styles.cell}></View>
            <Text style={styles.cell}>Accom.</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Airport Code</Text>
            <TextInput
              autoCapitalize="characters"
              onChangeText={(code) =>
                setAirportCode(code, setAccommodationAirportCode)
              }
              placeholder="Origin airport code"
              placeholderTextColor={"#0000"}
              style={[styles.cell, styles.input]}
              value={accommodationAirportCode}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Time Zone</Text>
            <Select
              style={[styles.cell, styles.input]}
              onChange={setTimeZone}
              options={timeZones}
              title="Select Origin Time Zone"
              value={timeZone}
            />
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
              onPress={() =>
                handleAddAccommodation({
                  accommodationAirportCode,
                  checkInDate,
                  checkOutDate,
                  timeZone,
                  storeAccommodations,
                })
              }
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

export default AccommodationForm;
