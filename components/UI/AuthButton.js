import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const AuthButton = ({ children, onPress, disabled }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btnContainerInner,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={disabled ? null : onPress}
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

  disabled: {
    backgroundColor: "rgba(217,70,56, 0.55)",
  },
});
