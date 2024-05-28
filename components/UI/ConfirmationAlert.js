import React from "react";
import { View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

const ConfirmationAlert = ({
  title,
  message,
  showAlert,
  hideAlertFunc,
  enterLinkHandler,
  onCloseAlert,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <AwesomeAlert
        onDismiss={onCloseAlert}
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        showCancelButton={true}
        cancelText="Cancel"
        confirmText="Okay"
        onCancelPressed={hideAlertFunc}
        onConfirmPressed={enterLinkHandler}
        alertContainerStyle={{
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        titleStyle={{
          color: "#151312",
          fontSize: 18,
          fontFamily: "roboto-semi",
          textAlign: "center",
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
          color: "#2A629A",
          fontSize: 16,
          fontFamily: "roboto-semi",
        }}
        cancelButtonStyle={{
          backgroundColor: "transparent",
        }}
        cancelButtonTextStyle={{
          color: "#EE4E4E",
          fontSize: 16,
          fontFamily: "roboto-semi",
        }}
      />
    </View>
  );
};

export default ConfirmationAlert;
