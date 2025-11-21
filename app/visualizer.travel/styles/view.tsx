import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    borderRadius: 5,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default styles;
