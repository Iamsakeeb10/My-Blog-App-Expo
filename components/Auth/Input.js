import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ label, secure, keyboardType, value, onUpdateValue }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 7,
  },
  label: {
    color: "#303030",
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#36454F",
  },
});
