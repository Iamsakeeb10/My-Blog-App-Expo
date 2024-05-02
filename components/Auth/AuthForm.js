import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../store/auth-context";
import Button from "../UI/Button";
import { loginUser } from "../util/auth";
import Input from "./Input";

const AuthForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [validCredentials, setValidCredentials] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const { login, checkLoginStatus } = useContext(AuthContext);

  // Ctx obj...

  // Getting the Navigation object...
  const navigation = useNavigation();

  // Validating Email...
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setInvalidEmail(
      email.length > 32 ? "Email must be less than 32 characters" : null
    );
    return emailRegex.test(email);
  };

  // Validating Password...
  const validatePassword = (password) => {
    setInvalidPassword(
      password.length > 20 ? "Password must be less than 20 characters" : null
    );

    return password.length >= 6;
  };

  useEffect(() => {
    setValidCredentials(
      validateEmail(inputValues.email) && validatePassword(inputValues.password)
    );
  }, [inputValues]);

  // Toast handler function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
    });
  };

  // Checking login status...
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // const checkLoginStatus = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem("userData");
  //     const parsedUserData = JSON.parse(userData);

  //     if (parsedUserData && parsedUserData.access_token) {
  //       navigation.replace("Drawer");
  //     }
  //   } catch (error) {
  //     showToast(error.message);
  //   }
  // };

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  };

  // Submitting data...
  const submitHandler = async () => {
    if (invalidEmail || invalidPassword) {
      return;
    }

    const { email, password } = inputValues;

    try {
      const loginData = await loginUser(email, password);

      if (loginData && loginData.access_token) {
        // Successful login
        const parts = email.split("@");
        const userName = parts[0];
        const userData = {
          ...loginData,
          userName,
          email,
        };

        await login(userData);

        navigation.replace("Drawer"); // Navigating to My Blogs screen...
      } else if (loginData && loginData.message) {
        // Unsuccessful login
        showToast(loginData.message);
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  return (
    <View>
      <Input
        label="Email Address"
        keyboardType="email-address"
        onUpdateValue={(value) => inputChangeHandler("email", value)}
        value={inputValues.email}
      />
      {invalidEmail && <Text style={styles.errorText}>{invalidEmail}</Text>}
      <Input
        label="Password"
        secure
        onUpdateValue={(value) => inputChangeHandler("password", value)}
        value={inputValues.password}
      />
      {invalidPassword && (
        <Text style={styles.errorText}>{invalidPassword}</Text>
      )}
      <View
        style={[
          styles.btnContainer,
          !validCredentials && styles.btnContainerDisabled,
        ]}
      >
        <Button
          onPress={validCredentials ? submitHandler : null}
          disabled={!validCredentials}
          backgroundColor="#36454F"
        >
          Log In
        </Button>
      </View>
      <View style={styles.toastContainer}>
        <Toast />
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 12,
    justifyContent: "center",
    borderRadius: 6,
    width: "100%",
  },

  btnContainerDisabled: {
    opacity: 0.6,
  },

  errorText: {
    color: "#D2042D",
  },

  toastContainer: {
    marginTop: 260,
  },
});