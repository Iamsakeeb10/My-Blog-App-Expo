import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthButton from "../components/UI/AuthButton";
import CustomToast from "../components/UI/CustomToast";
import { resetUserPassword } from "../util/auth";

const ForgotScreen = ({ navigation }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [emailError, setEmailError] = useState("");

  const emailChangeHandler = (enteredValue) => {
    setEnteredEmail(enteredValue);

    if (emailError) setEmailError("");
  };

  const showToast = (text) => {
    Toast.show({
      position: "top",
      topOffset: 0,
      type: "tomatoToast",
      text1: text,
      props: { uuid: "12345" },
      autoHide: true, // Automatically hide the toast after visibilityTime
      visibilityTime: 2500, // Duration in milliseconds (3000ms = 3 seconds)
    });
  };

  // Validating Email...
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const resetPasswordHandler = async () => {
    const trimmedEmail = enteredEmail.trim();
    const isValidEmail = validateEmail(trimmedEmail);

    let emailError = "";

    if (!trimmedEmail) {
      emailError = "Email field can't be empty";
    } else if (trimmedEmail.length >= 32) {
      emailError = "Email must be less than 32 characters";
    } else if (!isValidEmail) {
      emailError = "Please enter a valid email address";
    }

    if (emailError) {
      setEmailError(emailError);
      return;
    } else {
      setEmailError("");
    }

    // Sending api req...
    try {
      const response = await resetUserPassword(trimmedEmail);
      console.log(response.data);

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

        showToast(
          `A password reset link will be sent shortly if your email address is registered`
        );
      }
    } catch (error) {
      showToast(error.response);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={{ zIndex: 1 }}>
        <CustomToast />
      </View>

      <View
        style={{
          borderTopWidth: 2,
          borderTopColor: "rgba(190,190,190, 0.25)",
        }}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Reset Password</Text>
      </View>
      <View>
        <Text style={styles.smallText}>
          How would you like to reset your password?
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>
            Enter the email address you registered wit Finder. We'll send you an
            email in order to let you choose a new password.
          </Text>
        </View>
        <View style={styles.emailInputContainer}>
          <Text style={styles.emailLabel}>Email</Text>
          <TextInput
            style={[
              styles.emailInput,
              {
                borderColor: isFocus ? "#A0130F" : "#D6D6D6",
              },
            ]}
            placeholderTextColor="#A3A3A3"
            placeholder="Email address"
            onChangeText={emailChangeHandler}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : ""}
        <View style={{ marginTop: 16 }}>
          <AuthButton onPress={resetPasswordHandler}>RESET PASSWORD</AuthButton>
        </View>
      </View>
      {/* Footer text */}
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: "#E4342F", fontFamily: "roboto-semi" }}>
            Return to Finder Sign In
          </Text>
        </Pressable>
        <View style={{ backgroundColor: "#F5F7F7", width: "100%", padding: 4 }}>
          <Text
            style={{
              color: "#3A3A3F",
              fontSize: 12,
              textAlign: "center",
              fontFamily: "roboto-semi",
            }}
          >
            Need Help
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 3,
    fontFamily: "roboto-regular",
  },

  titleText: {
    textAlign: "center",
    color: "#151312",
    fontSize: 23,
    fontFamily: "roboto-semi",
  },

  titleContainer: {
    marginTop: 16,
  },

  smallText: {
    textAlign: "center",
    marginTop: 3,
    color: "#7B7B7B",
    fontFamily: "roboto-regular",
  },

  mainText: {
    color: "#7B7B7B",
    lineHeight: 18,
  },

  mainTextContainer: {
    alignItems: "center",
    marginVertical: 20,
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
    borderColor: "#D6D6D6",
  },

  emailInputContainer: {
    marginTop: 12,
  },
});
