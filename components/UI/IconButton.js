import { Ionicons } from "@expo/vector-icons";
import React from "react";

const IconButton = ({ icon, size, color, onPress }) => {
  return <Ionicons name={icon} size={size} color={color} onPress={onPress} />;
};

export default IconButton;
