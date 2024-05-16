import React from "react";
import { StyleSheet, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

const Alert = ({ title, message, showAlert, hideAlertFunc }) => {
  return (
    <View style={{ flex: 1 }}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="Okay"
        onCancelPressed={hideAlertFunc}
        onConfirmPressed={hideAlertFunc}
        alertContainerStyle={{
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        titleStyle={{
          color: "#151312",
          fontSize: 20,
          fontFamily: "roboto-semi",
        }}
        messageStyle={{
          color: "#7B7B7B",
          fontSize: 14,
          fontFamily: "roboto-regular",
          textAlign: "center",
        }}
        contentContainerStyle={{
          borderRadius: 17,
        }}
        confirmButtonStyle={{
          backgroundColor: "transparent",
        }}
        confirmButtonTextStyle={{
          color: "#D94638",
          fontSize: 17,
          fontFamily: "roboto-semi",
        }}
      />
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({});
