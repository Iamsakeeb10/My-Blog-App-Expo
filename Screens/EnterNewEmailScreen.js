import React, { useContext, useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthButton from "../components/UI/AuthButton";
import { AuthContext } from "../store/auth-context";
import { changeUserEmail } from "../util/auth";

const EnterNewEmailScreen = ({ navigation, route }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { user, getUpdatedEmail } = useContext(AuthContext);
  const { userId = {} } = route.params || {};

  const emailInputChangeHandler = (enteredValue) => {
    setEnteredEmail(enteredValue);

    if (emailError) {
      setEmailError("");
    }
  };

  // Toast handler function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
      visibilityTime: 1500,
    });
  };

  // Validating Email...
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const submitEmailHandler = async () => {
    const trimmedEmail = enteredEmail.trim();
    const isValidEmail = validateEmail(trimmedEmail);

    let emailError = "";

    if (!trimmedEmail) {
      emailError = "Email field can't be empty";
    } else if (trimmedEmail.length >= 32) {
      emailError = "Email must be less than 32 characters";
    } else if (!isValidEmail) {
      emailError = "Please enter a valid email address";
    } else if (user.email === trimmedEmail) {
      emailError = "Email already in use";
    }

    if (emailError) {
      setEmailError(emailError);
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await changeUserEmail(trimmedEmail, user);

      if (!response.status >= 200 && !response.status < 300) {
        if (response.status === 404) {
          showToast("Request not found");
        } else if (response.status === 500) {
          showToast("Server error");
        } else {
          const data = response.data;
          showToast(data.message || "An error occurred");
        }
      } else {
        const data = response.data;

        showToast(data.message);
        getUpdatedEmail(trimmedEmail);
        // navigation.pop();
        navigation.navigate("VerificationScreen", {
          userId: userId,
        });
      }
    } catch (error) {
      showToast(error.response);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingHorizontal: 22 }}>
        <View>
          <Text style={styles.enterEmailText}>Enter New Email</Text>
        </View>
        <View style={styles.subHeaderTextContainer}>
          <Text style={styles.subHeaderText}>
            This email is used to log into your account in the app and on
            Finder. To change it, enter a new email below.
          </Text>
        </View>
        <View style={styles.emailInputContainer}>
          <Text style={styles.emailLabel}>New Email Address</Text>
          <TextInput
            onChangeText={emailInputChangeHandler}
            style={[
              styles.emailInput,
              { borderColor: isFocus ? "#A0130F" : "#D6D6D6" },
            ]}
            placeholderTextColor="#A3A3A3"
            placeholder="Enter new email"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={enteredEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : ""}
        <View style={{ marginTop: emailError ? 12 : 24 }}>
          <AuthButton onPress={submitEmailHandler}>NEXT</AuthButton>
        </View>
      </View>
      <View style={{ marginTop: 270 }}>
        <Toast />
      </View>
    </View>
  );
};

export default EnterNewEmailScreen;

const styles = StyleSheet.create({
  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 3,
    fontFamily: "roboto-regular",
  },

  enterEmailText: {
    fontSize: 21,
    fontFamily: "roboto-semi",
    color: "#151312",
  },

  subHeaderTextContainer: {
    maxWidth: 275,
    marginTop: 7,
  },

  subHeaderText: {
    color: "#7B7B7B",
    fontSize: 13,
    fontFamily: "roboto-regular",
    lineHeight: 18,
  },

  emailLabel: {
    color: "#151312",
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "roboto-regular",
  },
  emailInput: {
    paddingLeft: 17,
    width: 312,
    height: 48,
    borderRadius: 7,
    fontSize: 13,
    borderWidth: 1.4,
    fontFamily: "roboto-regular",
  },

  emailInputContainer: {
    marginTop: 12,
  },
});
