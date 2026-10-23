import { FC, ReactNode } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

interface ContainerTabProps {
  children: ReactNode;
}

const ContainerTab: FC<ContainerTabProps> = ({ children }) => {
  const scheme = useColorScheme();
  const isLight = scheme === "light";

  return (
    <View
      style={[styles.container, isLight ? styles.lightMode : styles.darkMode]}
    >
      {children}
    </View>
  );
};

export default ContainerTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lightMode: {
    backgroundColor: "#FCFBF8",
    color: "black",
  },
  darkMode: {
    backgroundColor: "#1D1D1F",
    color: "white",
  },
});
