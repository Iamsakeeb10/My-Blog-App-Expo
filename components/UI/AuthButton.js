import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const AuthButton = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btnContainerInner,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{children}</Text>
    </Pressable>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  btnContainerInner: {
    backgroundColor: "#D94638",
    paddingVertical: 13.3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  pressed: {
    opacity: 0.7,
  },
});
