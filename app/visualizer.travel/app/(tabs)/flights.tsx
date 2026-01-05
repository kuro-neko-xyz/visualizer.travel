import Select from "@/components/Select";
import { timeZones } from "@/constants/timeZones";
import useFlights from "@/hooks/useFlights";
import { SelectOption } from "@/models/SelectOption";
import styles from "@/styles/view";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import handleAddFlight from "@/helpers/flights/handleAddFlight";
import setAirportCode from "@/helpers/flights/handleSetAirportCode";
import FlightInfo from "@/components/FlightInfo";

export default function FlightsView() {
  const [flights, storeFlights] = useFlights();

  const [originAirportCode, setOriginAirportCode] = useState<string>("");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("");

  const [originTimeZone, setOriginTimeZone] = useState<SelectOption | null>(
    null,
  );
  const [destinationTimeZone, setDestinationTimeZone] =
    useState<SelectOption | null>(null);

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isDeparture, setIsDeparture] = useState<boolean>();
  const [isTime, setIsTime] = useState<boolean>();

  return (
    <View style={styles.container}>
      {flights.map((flight) => (
        <FlightInfo
          key={flight.id}
          flight={flight}
          storeFlights={storeFlights}
        />
      ))}
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
          onChangeText={(code) => setAirportCode(code, setOriginAirportCode)}
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
          style={styles.button}
        >
          <Text>Add Flight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
