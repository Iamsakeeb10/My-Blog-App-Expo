import React from "react";
import { StyleSheet, View } from "react-native";
import AuthForm from "./AuthForm";

const AuthContentScreen = () => {
  return (
    <View style={styles.authContent}>
      <AuthForm />
    </View>
  );
};

export default AuthContentScreen;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 30,
    marginHorizontal: 32,
  },
});
