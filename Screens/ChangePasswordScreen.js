import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Alert from "../components/UI/Alert";
import { AuthContext } from "../store/auth-context";
import { changeUserPassword } from "../util/auth";

const ChangePasswordScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState({
    showCurPass: false,
    showNewPass: false,
    showConfirmNewPass: false,
  });

  const [passwordInputValues, setPasswordInputValues] = useState({
    curPassword: "",
    newPass: "",
    confirmNewPassword: "",
  });

  const [curPassError, setCurPassError] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [confirmNewPassError, setConfirmNewPassError] = useState("");
  const [isPasswordMatched, setPasswordMathced] = useState("");

  // On Focus input state
  const [isFocus, setIsFocused] = useState({
    currentPass: false,
    newPassword: false,
    confirmNewPass: false,
  });

  // Loader state
  const [loading, setLoading] = useState(false);

  // Managing alert state
  const [showAlert, setShowAlert] = useState(false);

  const showAlertFunc = () => {
    setShowAlert(true);
  };

  const hideAlertFunc = () => {
    setShowAlert(false);
  };

  // On Focus input handler
  const inputFocusHandler = (identifier) => {
    setIsFocused((prevState) => {
      return {
        ...prevState,
        [identifier]: true,
      };
    });
  };

  // On Blur input handler
  const inputBlurHandler = (identifier) => {
    setIsFocused((prevState) => {
      return {
        ...prevState,
        [identifier]: false,
      };
    });
  };

  function iconVisibilityHandler(identifier) {
    setShowPassword((prevPass) => {
      return {
        ...prevPass,
        [identifier]: !prevPass[identifier],
      };
    });
  }

  function passwordChangeHandler(identifier, textValue) {
    setPasswordInputValues((prevPasswordValues) => {
      const passwordValues = {
        ...prevPasswordValues,
        [identifier]: textValue,
      };

      return passwordValues;
    });
  }

  // Toast Function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
      visibilityTime: 1500,
    });
  };

  async function saveChangesHandler() {
    const { curPassword, newPass, confirmNewPassword } = passwordInputValues;

    if (!curPassword.trim()) {
      setCurPassError(`Current password field can't be empty`);
    } else if (curPassword.trim().length < 6) {
      setCurPassError(`Password must be at least 6 characters`);
    } else if (curPassword.trim().length >= 20) {
      setCurPassError(`Password must be less than 20 characters`);
    } else {
      setCurPassError("");
    }

    if (!newPass.trim()) {
      setNewPassError(`New password field can't be empty`);
    } else if (newPass.trim().length < 6) {
      setNewPassError("Password must be at least 6 characters");
    } else if (newPass.trim().length >= 20) {
      setNewPassError(`Password must be less than 20 characters`);
    } else {
      setNewPassError("");
    }

    if (!confirmNewPassword.trim()) {
      setConfirmNewPassError(`Confirm new password field can't be empty`);
    } else if (confirmNewPassword.trim().length < 6) {
      setConfirmNewPassError(`Password must be at least 6 characters`);
    } else if (confirmNewPassword.trim().length >= 20) {
      setConfirmNewPassError(`Password must be less than 20 characters`);
    } else {
      setConfirmNewPassError("");
    }

    if (curPassword.trim() && newPass.trim() && curPassword === newPass) {
      showToast(`Current password and new password can't be same`);
      setPasswordInputValues({
        curPassword: "",
        newPass: "",
        confirmNewPassword: "",
      });

      return;
    }

    if (newPass !== confirmNewPassword) {
      setPasswordMathced("Not matched");
    } else {
      setPasswordMathced("");
    }

    if (
      !curPassword.trim() ||
      !newPass.trim() ||
      !confirmNewPassword.trim() ||
      curPassError ||
      newPassError ||
      confirmNewPassError
    ) {
      return;
    }

    if (isPasswordMatched) {
      return;
    }

    try {
      setLoading(true);
      const response = await changeUserPassword(curPassword, newPass, user);
      const data = await response.json();
      if (response.ok) {
        showAlertFunc();
        setPasswordInputValues({
          curPassword: "",
          newPass: "",
          confirmNewPassword: "",
        });
      } else {
        showToast(data.message);

        setPasswordInputValues({
          curPassword: "",
          newPass: "",
          confirmNewPassword: "",
        });
      }

      console.log("data-----", data);
    } catch (error) {
      setPasswordInputValues({
        curPassword: "",
        newPass: "",
        confirmNewPassword: "",
      });
      console.log("errorr-------apiError12", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.borderStyle} />
      <View style={styles.innerContainer}>
        {/* Current Password Container */}
        <View style={[styles.inputContainer, styles.specificStyles]}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={(textValue) => {
                passwordChangeHandler("curPassword", textValue);
                if (curPassError) {
                  setCurPassError("");
                }
              }}
              style={[
                styles.input,
                {
                  borderColor: isFocus.currentPass
                    ? "#A0130F"
                    : "rgba(214,214,214, 0.7)",
                },
              ]}
              autoCapitalize="none"
              secureTextEntry={!showPassword.showCurPass}
              placeholder="Enter Password"
              placeholderTextColor="#BFBFBF"
              value={passwordInputValues.curPassword}
              onFocus={() => inputFocusHandler("currentPass")}
              onBlur={() => inputBlurHandler("currentPass")}
            />
            <Pressable
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 20 }}
              onPress={() => iconVisibilityHandler("showCurPass")}
            >
              <Image
                source={
                  !showPassword.showCurPass
                    ? require("../assets/images/hidden.png")
                    : require("../assets/images/visibility.png")
                }
                style={styles.eyeImg}
              />
            </Pressable>
          </View>
          {curPassError && <Text style={styles.errorText}>{curPassError}</Text>}
        </View>
        {/* New Password Container */}
        <View style={[styles.inputContainer, styles.specificStyles]}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={(textValue) => {
                passwordChangeHandler("newPass", textValue);

                if (newPassError) {
                  setNewPassError("");
                }
              }}
              style={[
                styles.input,
                {
                  borderColor: isFocus.newPass
                    ? "#A0130F"
                    : "rgba(214,214,214, 0.7)",
                },
              ]}
              autoCapitalize="none"
              secureTextEntry={!showPassword.showNewPass}
              placeholder="Enter Password"
              placeholderTextColor="#BFBFBF"
              value={passwordInputValues.newPass}
              onFocus={() => inputFocusHandler("newPass")}
              onBlur={() => inputBlurHandler("newPass")}
            />
            <Pressable
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 20 }}
              onPress={() => iconVisibilityHandler("showNewPass")}
            >
              <Image
                source={
                  !showPassword.showNewPass
                    ? require("../assets/images/hidden.png")
                    : require("../assets/images/visibility.png")
                }
                style={styles.eyeImg}
              />
            </Pressable>
          </View>
          {newPassError && <Text style={styles.errorText}>{newPassError}</Text>}
        </View>
        {/* Confirm New Password Container */}
        <View style={[styles.inputContainer, styles.specificStyles]}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={(textValue) => {
                passwordChangeHandler("confirmNewPassword", textValue);

                if (confirmNewPassError) {
                  setConfirmNewPassError("");
                }
              }}
              style={[
                styles.input,
                {
                  borderColor: isFocus.confirmNewPass
                    ? "#A0130F"
                    : "rgba(214,214,214, 0.7)",
                },
              ]}
              autoCapitalize="none"
              secureTextEntry={!showPassword.showConfirmNewPass}
              placeholder="Enter Password"
              placeholderTextColor="#BFBFBF"
              value={passwordInputValues.confirmNewPassword}
              onFocus={() => inputFocusHandler("confirmNewPass")}
              onBlur={() => inputBlurHandler("confirmNewPass")}
            />
            <Pressable
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 20 }}
              onPress={() => iconVisibilityHandler("showConfirmNewPass")}
            >
              <Image
                source={
                  !showPassword.showConfirmNewPass
                    ? require("../assets/images/hidden.png")
                    : require("../assets/images/visibility.png")
                }
                style={styles.eyeImg}
              />
            </Pressable>
          </View>
          {confirmNewPassError ? (
            <Text style={styles.errorText}>{confirmNewPassError}</Text>
          ) : (
            <Text style={styles.errorText}>{isPasswordMatched}</Text>
          )}
        </View>
        <View
          style={[
            styles.btnContainerOuter,
            {
              flex:
                isFocus.currentPass ||
                isFocus.newPassword ||
                isFocus.confirmNewPass
                  ? 0
                  : 2,
            },
          ]}
        >
          <View style={styles.bottomBorder} />
          <Pressable
            onPress={saveChangesHandler}
            style={({ pressed }) => [
              styles.btnContainerInner,
              pressed && styles.pressed,
              loading && styles.loadingBg,
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>SAVE CHANGES</Text>
            )}
          </Pressable>
        </View>
      </View>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      <View style={styles.alertContainer}>
        <Alert
          title="Password Updated"
          message="Your password has been changed successfully"
          showAlert={showAlert}
          hideAlertFunc={hideAlertFunc}
        />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  innerContainer: {
    paddingTop: 9,
    flex: 1,
  },

  borderStyle: {
    borderTopWidth: 2,
    borderTopColor: "rgba(190,190,190, 0.2)",
  },

  inputContainer: {
    marginVertical: 8,
    paddingHorizontal: 22,
  },

  label: {
    color: "#151312",
    marginBottom: 6,
    fontSize: 13,
    fontFamily: "roboto-regular",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 7,
    fontSize: 13,
    borderWidth: 1.2,
    flex: 1,
  },

  specificStyles: {
    marginVertical: 6,
  },

  passwordContainer: {
    position: "relative",
    flexDirection: "row",
  },

  eyeImg: {
    width: 20,
    height: 20,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -10 }],
    right: 15,
  },

  btnContainerOuter: {
    // flex: 2,
    justifyContent: "flex-end",
    marginVertical: 16,
  },

  btnContainerInner: {
    backgroundColor: "#D94638",
    paddingVertical: 13.3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 22,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "roboto-bold",
    fontSize: 13,
  },

  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(190,190,190, 0.15)",
    marginBottom: 10,
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 10,
    marginLeft: 3,
    fontFamily: "roboto-regular",
  },

  pressed: {
    opacity: 0.6,
  },

  loadingBg: {
    backgroundColor: "#A0130F",
  },
});
