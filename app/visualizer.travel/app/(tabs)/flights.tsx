import styles from "@/styles/view";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FlightsView() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}></View>
        <Text style={styles.cell}>Origin</Text>
        <Text style={styles.cell}>Destination</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Airport Code</Text>
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Origin airport code"
          placeholderTextColor={"#0000"}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Destination airport code"
          placeholderTextColor={"#0000"}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Time Zone</Text>
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Origin time zone"
          placeholderTextColor={"#0000"}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Destination time zone"
          placeholderTextColor={"#0000"}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Date</Text>
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Origin date"
          placeholderTextColor={"#0000"}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Destination date"
          placeholderTextColor={"#0000"}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Time</Text>
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Origin time"
          placeholderTextColor={"#0000"}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Destination time"
          placeholderTextColor={"#0000"}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text>Add Flight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
