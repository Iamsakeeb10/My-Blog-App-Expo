import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 9,
  },

  pressed: {
    opacity: 0.7,
  },

  blogItem: {
    borderRadius: 8,
    backgroundColor: "#153448",
    padding: 12,
    elevation: 8,
    marginHorizontal: 12,
  },

  title: {
    color: "#D6DAC8",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginBottom: 5,
  },
  desc: {
    color: "#ccc",
    fontSize: 14,
  },
});
