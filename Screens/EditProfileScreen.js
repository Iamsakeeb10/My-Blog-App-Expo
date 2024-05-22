import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Alert from "../components/UI/Alert";
import AuthButton from "../components/UI/AuthButton";
import { AuthContext } from "../store/auth-context";
import { bottomSheetChangePassword, changeFullName } from "../util/auth";

const EditProfileScreen = ({ isBottomSheetOpenYet }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const route = useRoute();
  const { userProfile = {} } = route.params || {};
  const { user, fullNameDataFunc, fullNameData, updatedEmail } =
    useContext(AuthContext);

  const [snapPoints, setSnapPoints] = useState(["50%", "70%"]);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  // Input values state including full name, email and mobile number...
  const [inputValues, setInputValues] = useState({
    userFullName: userProfile && userProfile.name,
  });

  const [showPassword, setShowPassword] = useState("");

  // Bottom sheet open or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Bottom sheet email input state...
  const [bottomSheetPasswordInput, setBottomSheetPasswordInput] =
    useState("12345678");

  // Bottom sheet email input error state...
  const [bottomSheetPasswordInputError, setBottomSheetPasswordInputError] =
    useState("");

  // Error state
  const [nameError, setNameError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Matched password
  const [passwordMatched, setPasswordMatched] = useState(false);

  // Input focus state
  const [isFocus, setIsFocus] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
  });

  // Functions.....****

  // Showing alert
  const showAlertFunc = () => {
    setShowAlert(true);
  };

  // Closing alert
  const closeAlertFunc = () => {
    setShowAlert(false);
  };

  // Toast Function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
    });
  };

  const openBottomSheet = () => {
    setBottomSheetIndex(0);
    bottomSheetRef.current?.expand();
    isBottomSheetOpenYet(true);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIndex(-1);
    bottomSheetRef.current?.close();
    isBottomSheetOpenYet(false);
    setIsBottomSheetOpen(false);
  };

  const handleFocus = () => {
    setSnapPoints(["100%"]);
  };

  const handleBlur = () => {
    setSnapPoints(["50%"]);
  };

  const handleBottomSheetClose = () => {
    isBottomSheetOpenYet(false);
  };

  // Closing bottomsheet when navigating away...
  useEffect(() => {
    const unSubscribe = navigation.addListener("blur", () => {
      closeBottomSheet();
    });
  }, [navigation]);

  // Bottom sheet input handler...
  const bottomSheetEmailInputHandler = (enteredValue) => {
    setBottomSheetPasswordInput(enteredValue);

    if (bottomSheetPasswordInputError) {
      setBottomSheetPasswordInputError("");
    }
  };

  // Editing values input handler...
  const inputChangeHandler = (identifier, enteredValue) => {
    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: enteredValue,
      };
    });
  };

  // Input focus handler
  const inputFocusHandler = (identifier) => {
    setIsFocus((prevState) => {
      return {
        ...prevState,
        [identifier]: true,
      };
    });
  };

  // Input blur handler
  const inputBlurHandler = (identifier) => {
    setIsFocus((prevState) => {
      return {
        ...prevState,
        [identifier]: false,
      };
    });
  };

  function iconVisibilityHandler() {
    setShowPassword((prevPass) => !prevPass);
  }

  const editProfileDataHandler = async () => {
    const { userFullName } = inputValues;

    if (!userFullName.trim()) {
      setNameError(`Field can't be empty`);
      return;
    } else {
      setNameError("");
    }

    if (userProfile && userProfile.name.trim() === userFullName.trim()) {
      showToast("Name already in use");

      return;
    }

    try {
      const data = await changeFullName(userFullName, user);

      showAlertFunc();
      fullNameDataFunc(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Bottom sheet password change handler function
  const saveEnterPasswordHandler = async () => {
    if (!bottomSheetPasswordInput.trim()) {
      setBottomSheetPasswordInputError(`Password field can't be empty`);
    } else if (bottomSheetPasswordInput.trim().length < 6) {
      setBottomSheetPasswordInputError(
        `Password must be at least 6 characters`
      );
    } else if (bottomSheetPasswordInput.trim().length > 20) {
      setBottomSheetPasswordInputError(
        `Password must be less than 20 characters`
      );
    } else {
      setBottomSheetPasswordInputError("");
    }

    const password = bottomSheetPasswordInput.trim();
    if (!password || password.length < 6 || password.length > 20) {
      return;
    }

    try {
      const response = await bottomSheetChangePassword(password, user);

      const data = await response.json();

      if (data && data.message) {
        showToast(data.message);
      }

      if (response.ok) {
        navigation.navigate("ChangeEmailScreen", {
          userId: data.verification_id,
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          borderTopWidth: 2,
          borderTopColor: isBottomSheetOpen
            ? "rgba(0,0,0,0.1)"
            : "rgba(190,190,190, 0.2)",
        }}
      />
      <View style={styles.innerContainer}>
        {/* Full Name Input */}
        <View style={[styles.inputContainer, styles.specificStyles]}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            onChangeText={(enteredValue) => {
              inputChangeHandler("userFullName", enteredValue);
              if (nameError) {
                setNameError("");
              }
            }}
            style={[
              styles.input,
              {
                borderColor: isBottomSheetOpen
                  ? "rgba(0,0,0,0.1)"
                  : isFocus.name
                  ? "#A0130F"
                  : "rgba(214,214,214, 0.7)",
              },
            ]}
            placeholder={userProfile && userProfile.name ? "" : "Full Name"}
            placeholderTextColor="#7B7B7B"
            value={inputValues.userFullName}
            onFocus={() => inputFocusHandler("name")}
            onBlur={() => inputBlurHandler("name")}
          />
        </View>
        {/* Full name error */}
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : ""}
        {/* Email Input */}
        <View style={[styles.inputContainer, styles.specificStyles]}>
          <View style={styles.verifyRowContainer}>
            <Text style={styles.label}>Email</Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "roboto-semi",
                color: "#00AE11",
              }}
            >
              {userProfile &&
              userProfile.email &&
              !userProfile.is_email_verified
                ? "Verify"
                : ""}
            </Text>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isBottomSheetOpen
                    ? "rgba(0,0,0,0.1)"
                    : isFocus.email
                    ? "#A0130F"
                    : "rgba(214,214,214, 0.7)",
                  flex: 1,
                },
              ]}
              autoCapitalize="none"
              placeholder={userProfile && userProfile.email ? "" : "Email"}
              placeholderTextColor="#7B7B7B"
              value={updatedEmail}
              onFocus={() => inputFocusHandler("email")}
              onBlur={() => inputBlurHandler("email")}
            />
            <Pressable
              onPress={
                userProfile && userProfile.email ? openBottomSheet : null
              }
            >
              <Text style={[styles.rowEndText]}>
                {userProfile && userProfile.email ? "Change" : "Add Email"}
              </Text>
            </Pressable>
          </View>
        </View>
        {/* Phone Number Input */}
        <View style={[styles.inputContainer, styles.specificStyles]}>
          <View style={styles.verifyRowContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "roboto-semi",
                color: "#00AE11",
              }}
            >
              {userProfile &&
              userProfile.mobile &&
              !userProfile.is_mobile_verified
                ? "Verify"
                : ""}
            </Text>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isBottomSheetOpen
                    ? "rgba(0,0,0,0.1)"
                    : isFocus.mobile
                    ? "#A0130F"
                    : "rgba(214,214,214, 0.7)",
                  flex: 1,
                },
              ]}
              autoCapitalize="none"
              placeholder={userProfile && userProfile.mobile ? "" : "Mobile"}
              placeholderTextColor="#7B7B7B"
              value={userProfile.mobile}
              onFocus={() => inputFocusHandler("mobile")}
              onBlur={() => inputBlurHandler("mobile")}
            />
            <Text style={styles.rowEndText}>
              {userProfile && userProfile.mobile ? "Change" : "Add Number"}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainerOuter}>
          <View style={styles.bottomBorder} />
          <Pressable
            onPress={editProfileDataHandler}
            style={styles.btnContainerInner}
          >
            <Text style={styles.btnText}>SAVE</Text>
          </Pressable>
        </View>
        {/* ****************** */}

        <BottomSheet
          detached={false}
          index={bottomSheetIndex}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
          keyboardBehavior="interactive"
          onClose={handleBottomSheetClose}
        >
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <BottomSheetView style={{ paddingHorizontal: 18, flex: 1 }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#3A3A3F",
                    fontFamily: "roboto-regular",
                  }}
                >
                  Change Email!
                </Text>
                <Pressable onPress={closeBottomSheet}>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../assets/SheetIcon/Close.png")}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flex: 0,
                  marginTop: bottomSheetPasswordInputError ? "2" : 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 19,
                    textAlign: "center",
                    fontFamily: "roboto-semi",
                  }}
                >
                  Enter Password
                </Text>
              </View>
              <View style={{ flex: 0 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    fontFamily: "roboto-regular",
                    color: "#3A3A3F",
                  }}
                >
                  Enter the password for estiak@finder-lbs.com
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    textAlign: "center",
                    fontSize: 13,
                    fontFamily: "roboto-regular",
                    color: "#3A3A3F",
                  }}
                >
                  to change this email address
                </Text>
              </View>
              <View
                style={{ marginTop: bottomSheetPasswordInputError ? 2 : 10 }}
              >
                <Text
                  style={{ color: "#151312", marginBottom: 4, fontSize: 13 }}
                >
                  Password
                </Text>
                <View style={{ flexDirection: "row", position: "relative" }}>
                  <TextInput
                    onChangeText={bottomSheetEmailInputHandler}
                    style={{
                      flex: 1,
                      paddingLeft: 17,
                      height: 48,
                      borderRadius: 7,
                      fontSize: 13,
                      borderWidth: 1.6,
                      borderColor: isFocus.password ? "#A0130F" : "#DBDBDB",
                      fontFamily: "roboto-regular",
                    }}
                    placeholderTextColor="#A3A3A3"
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    onFocus={() => {
                      handleFocus();
                      inputFocusHandler("password");
                    }}
                    onBlur={() => {
                      inputBlurHandler("password");
                      handleBlur();
                    }}
                    value={bottomSheetPasswordInput}
                  />
                  <Pressable
                    onPress={() => iconVisibilityHandler("showNewPass")}
                  >
                    <Image
                      source={
                        !showPassword
                          ? require("../assets/images/hidden.png")
                          : require("../assets/images/visibility.png")
                      }
                      style={styles.eyeImg}
                    />
                  </Pressable>
                </View>
              </View>
              {bottomSheetPasswordInputError ? (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "roboto-regular",
                    color: "#D2042D",
                    marginTop: 3,
                  }}
                >
                  {bottomSheetPasswordInputError}
                </Text>
              ) : null}
              <View
                style={{
                  flex: 1,
                  marginTop: bottomSheetPasswordInputError ? 8 : 10,
                }}
              >
                <AuthButton onPress={saveEnterPasswordHandler}>NEXT</AuthButton>
              </View>
            </BottomSheetView>
          </KeyboardAvoidingView>
        </BottomSheet>

        {/* ****************** */}
        {/* Alert Container */}
        <View>
          <Alert
            title="Profile Updated"
            message="Your name has been changed successfully"
            showAlert={showAlert}
            hideAlertFunc={closeAlertFunc}
          />
        </View>
        {/* Toast Container */}
        <View style={{ zIndex: 1 }}>
          <Toast />
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  eyeImg: {
    width: 20,
    height: 20,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -10 }],
    right: 15,
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 2,
    paddingHorizontal: 22,
    fontFamily: "roboto-regular",
  },

  innerContainer: {
    paddingTop: 9,
    flex: 1,
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
  },

  specificStyles: {
    marginVertical: 6,
  },

  passwordContainer: {
    position: "relative",
    flexDirection: "row",
  },

  rowEndText: {
    position: "absolute",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -10 }],
    right: 12,
    color: "#7B7B7B",
    fontSize: 13,
    fontFamily: "roboto-regular",
  },

  btnContainerOuter: {
    flex: 2,
    justifyContent: "flex-end",
    marginVertical: 16,
  },

  btnContainerInner: {
    backgroundColor: "#E4342F",
    paddingVertical: 13.3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 22,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(190,190,190, 0.15)",
    marginBottom: 10,
  },

  verifyRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
