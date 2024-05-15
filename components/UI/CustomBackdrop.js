import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const CustomBackdrop = ({ onPress }) => {
  return <TouchableOpacity style={styles.backdrop} onPress={onPress} />;
};

export default CustomBackdrop;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // default backdrop color
  },
});
