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
        <TextInput style={[styles.cell, styles.input]} placeholder="Origin airport code" />
        <TextInput style={[styles.cell, styles.input]} placeholder="Destination airport code" />
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Time Zone</Text>
        <TextInput style={[styles.cell, styles.input]} placeholder="Origin time zone" />
        <TextInput style={[styles.cell, styles.input]} placeholder="Destination time zone" />
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Date</Text>
        <TextInput style={[styles.cell, styles.input]} placeholder="Origin date" />
        <TextInput style={[styles.cell, styles.input]} placeholder="Destination date" />
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Time</Text>
        <TextInput style={[styles.cell, styles.input]} placeholder="Origin time" />
        <TextInput style={[styles.cell, styles.input]} placeholder="Destination time" />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text>Add Flight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
