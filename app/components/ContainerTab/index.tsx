import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface ContainerTabProps {
  children: ReactNode;
}

const ContainerTab: FC<ContainerTabProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ContainerTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
