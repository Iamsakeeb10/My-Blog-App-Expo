// ToastConfig.js
import React from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const toastConfig = {
  tomatoToast: ({ text1 }) => (
    <View
      style={{
        height: "100%",
        width: "95%",
        backgroundColor: "#4a934a",
        backgroundColor: "#4a934a",
        justifyContent: "flex-end",
        padding: 12,
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        elevation: 8,
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 10,
        }}
      >
        <Image
          style={{ width: 18, height: 18 }}
          source={require("../../assets/images/success.png")}
        />
      </View>
      <Text
        style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text1}
      </Text>
    </View>
  ),
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

export default CustomToast;
