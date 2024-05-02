import { Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

function Button({ children, onPress, backgroundColor, disabled }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        { backgroundColor: backgroundColor },
        disabled && styles.disabled,
      ]}
      onPress={disabled ? null : onPress}
    >
      <View style={styles.btnRowContainer}>
        <Text style={styles.buttonText}>{children}</Text>
        <IconButton icon="log-in-outline" size={23} color="#fff" />
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  disabled: {
    opacity: 0.6,
  },

  btnRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 8,
  },
});
