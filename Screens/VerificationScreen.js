import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import Alert from "../components/UI/Alert";
import { AuthContext } from "../store/auth-context";
import {
  creatingUser,
  fetchProfileData,
  verifyEmail,
  verifyMobileNumber,
} from "../util/auth";
import AuthButton from "./../components/UI/AuthButton";

const CELL_COUNT = 6;

const VerificationScreen = ({ route, navigation }) => {
  const [value, setValue] = useState("");
  const [codeError, setCodeError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showMobileAlert, setShowMobileAlert] = useState(false);

  const { updatedEmail, user, getProfileData } = useContext(AuthContext);

  // Necessary for sending api req....
  const {
    userId = {},
    fullName,
    email,
    password,
    isRegistered,
    mobile,
  } = route.params || {};

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Alert
  const showAlertHandler = async () => {
    setShowAlert(true);

    if (user) {
      const profileData = await fetchProfileData(user);
      if (profileData) {
        await getProfileData(profileData);
      }
    }
  };

  const showMobileAlertHandler = async () => {
    setShowMobileAlert(true);
    if (user) {
      const profileData = await fetchProfileData(user);
      if (profileData) {
        await getProfileData(profileData);
      }
    }
  };
  const closeAlertHandler = () => {
    navigation.replace("EditProfileScreen");
  };
  const closeMobileAlertHandler = () => {
    navigation.replace("Drawer");
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

  const codeChangeHandler = (enteredValue) => {
    setValue(enteredValue);

    if (codeError) {
      setCodeError("");
    }
  };

  const handleVerificationCode = async (code) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setCodeError(`Field can't be empty`);
      return;
    }

    if (trimmedValue.length !== 6) {
      setCodeError("Empty field found");
      return;
    }

    const isValid = /^\d+$/.test(value);

    if (!isValid) {
      setCodeError("Numbers required");
      return;
    }

    setCodeError("");
    try {
      const response = await creatingUser(fullName, email, code, password);

      if (!response.ok) {
        const data = await response.json();
        console.log("not okay----", data);

        showToast(data.message || "An error occurred");
      } else {
        const data = await response.json();
        console.log(data);

        showToast(data.message);
        navigation.navigate("Login");
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  // Email verification
  const verifyCodeForEmailChange = async () => {
    const trimmedValue = value.trim();

    try {
      const response = await verifyEmail(
        updatedEmail,
        trimmedValue,
        userId,
        user
      );

      if (!response.ok) {
        const data = await response.json();
        showToast(data.message || "Verification failed");
      } else {
        showAlertHandler();
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  // Mobile verification
  const verifyMobileHandler = async (code) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setCodeError(`Field can't be empty`);
      return;
    }

    if (trimmedValue.length !== 6) {
      setCodeError("Empty field found");
      return;
    }

    const isValid = /^\d+$/.test(value);

    if (!isValid) {
      setCodeError("Numbers required");
      return;
    }

    setCodeError("");

    try {
      const response = await verifyMobileNumber(mobile, code, user);
      const data = await response.json();
      console.log("data---", data);

      if (!response.ok) {
        showToast(data.message || "Verification failed");
      } else {
        showMobileAlertHandler();
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  // Auth Button....
  const verifyCodeHandler = async () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setCodeError(`Field can't be empty`);
      return;
    }

    if (trimmedValue.length !== 6) {
      setCodeError("Empty field found");
      return;
    }

    const isValid = /^\d+$/.test(value);

    if (!isValid) {
      setCodeError("Numbers required");
      return;
    }

    setCodeError("");

    verifyCodeForEmailChange();
  };

  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.verificationText}>Verify email</Text>
      </View>
      <View style={{ marginTop: 2 }}>
        <Text style={styles.verificationTextSmall}>
          We sent a security code to{" "}
          <Text>{updatedEmail ? email : mobile}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.verificationTextSmall}>
          You may need to check your junk or Spam folder
        </Text>
      </View>
      <View
        style={[
          styles.otpFieldContainer,
          { marginVertical: codeError ? 20 : 26 },
        ]}
      >
        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={codeChangeHandler}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused ? styles.focusCell : null,
                  index < value.length && /^\d+$/.test(value[index])
                    ? styles.validCell
                    : index === value.length && /^\d+$/.test(symbol)
                    ? styles.pendingCell
                    : symbol
                    ? styles.errorCell
                    : styles.defaultCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (!codeError && isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {codeError ? <Text style={styles.errorText}>{codeError}</Text> : ""}
        </View>
      </View>
      <View>
        <AuthButton
          onPress={() => {
            if (isRegistered) {
              handleVerificationCode(value.trim());
            } else if (mobile && value.trim()) {
              verifyMobileHandler(value.trim());
            } else {
              verifyCodeHandler();
            }
          }}
        >
          VERIFY
        </AuthButton>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Didn't receive code?
          <Text style={styles.footerTextSpecific}> Resend</Text>
        </Text>
      </View>
      <View>
        <Alert
          title="Email Updated"
          message="Your email has been changed successfully"
          showAlert={showAlert}
          hideAlertFunc={closeAlertHandler}
        />
      </View>
      <View>
        <Alert
          title="Updated!"
          message="Your phone number has been successfully verified"
          showAlert={showMobileAlert}
          hideAlertFunc={closeMobileAlertHandler}
        />
      </View>
      <View style={{ marginTop: 260 }}>
        <Toast />
      </View>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },

  validCell: {
    borderColor: "green",
  },
  pendingCell: {
    borderColor: "#D6D6D6",
  },
  errorCell: {
    borderColor: "#E87B09",
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 3,
    fontFamily: "roboto-regular",
    textAlign: "center",
  },

  verificationText: {
    fontFamily: "roboto-semi",
    fontSize: 21,
    color: "#151312",
  },

  otpFieldContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerContainer: {
    alignItems: "center",
    marginTop: 18,
  },

  verificationTextSmall: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    color: "#7B7B7B",
  },

  footerText: {
    color: "#6F717A",
    fontSize: 13,
    fontFamily: "roboto-regular",
  },

  footerTextSpecific: {
    color: "#6F717A",
    fontSize: 13,
    fontFamily: "roboto-semi",
    color: "#E4342F",
  },

  cell: {
    width: 36,
    height: 45,
    borderColor: "#D6D6D6",
    borderWidth: 0.7,
    borderRadius: 9,
    lineHeight: 46,
    color: "#151312",
    fontFamily: "roboto-semi",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 4,
  },

  focusCell: {
    borderColor: "#A0130F",
    borderWidth: 1,
  },
});
