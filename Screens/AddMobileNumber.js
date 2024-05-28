import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import AuthButton from "../components/UI/AuthButton";
import { AuthContext } from "../store/auth-context";
import { addMobileNumber } from "../util/auth";

const AddMobileNumber = ({ navigation, route }) => {
  const { profileData = {} } = route.params || {};
  const { user } = useContext(AuthContext);
  const initialNumber = profileData.mobile ? `${profileData.mobile}` : "+880";

  const [isFocus, setIsFocus] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState(initialNumber);
  const [numberError, setNumberError] = useState("");

  useEffect(() => {
    const setShouldAddMobile = async () => {
      await AsyncStorage.setItem("shouldAddMobile", "true");
    };
    setShouldAddMobile();
  }, []);

  const numberChangeHandler = (enteredValue) => {
    if (numberError) setNumberError("");

    setEnteredNumber(enteredValue);
  };

  // Toast handler function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
    });
  };

  const submitNumberHandler = async () => {
    const trimmedNumber = enteredNumber.trim().slice(3);

    const regex = /^\d{11}$/;
    const validNumberregex = /^(013|017|018|016|015)\d{8}$/;

    let error = "";

    if (!trimmedNumber) {
      error = `Field can't empty`;
    } else if (trimmedNumber.length !== 11) {
      error = `Phone number must be exactly 11 digits`;
    } else if (!regex.test(trimmedNumber)) {
      error = `Only number is valid`;
    } else if (!validNumberregex.test(trimmedNumber)) {
      error = `Please enter a valid number`;
    }

    if (error) {
      setNumberError(error);
      return;
    }

    try {
      const fullNumber = `+88${trimmedNumber}`;
      const response = await addMobileNumber(fullNumber, user);
      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("shouldAddMobile", "false");
        Toast.show({
          type: "success",
          text1: data.message,
          position: "bottom",
          visibilityTime: 1500,
          onHide: () =>
            navigation.navigate("VerificationScreen", {
              mobile: fullNumber,
            }),
        });
      } else {
        if (response.status === 404) {
          showToast("Request not found");
        } else if (response.status === 500) {
          showToast("Server error");
        } else {
          if (data.message) {
            if (Array.isArray(data.message.verification_entity)) {
              showToast(
                data.message.verification_entity[0] || "An error occurred"
              );
            } else {
              showToast(data.message || "An error occurred");
            }
          } else {
            showToast("An error occurred");
          }
        }
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  useLayoutEffect(() => {
    const setMobileStorageAndNavigate = async () => {
      await AsyncStorage.setItem("shouldAddMobile", "false");
      navigation.replace("Drawer");
    };

    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#FFF",
      },
      headerTitle: "",
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: "#FAFAFA",
      },
      headerLeft: () => (
        <View style={{ marginLeft: 12 }}>
          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.7 }]}
            onPress={setMobileStorageAndNavigate}
          >
            <Image
              style={styles.closeIcon}
              source={require("../assets/VerificationScreenIcons/Close.png")}
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text style={styles.headerText}>
          {profileData && !profileData.mobile
            ? "Add a phone number"
            : "Verify phone number"}
        </Text>
      </View>
      <View style={{ marginVertical: 7 }}>
        <Text style={styles.subHeaderText}>
          Protect your account by adding a phone number. We'll use this number
          to verify it's you and contact you about your account or Finder
          services.
        </Text>
      </View>
      <View style={{ marginTop: 4 }}>
        <Text style={styles.subHeaderText}>
          You can update this number anytime in your account.
        </Text>
      </View>
      <View style={styles.mobileInputContainer}>
        <Text style={styles.mobileLabel}>Phone Number</Text>
        <TextInput
          onChangeText={numberChangeHandler}
          style={[
            styles.mobileInput,
            { borderColor: isFocus ? "#A0130F" : "#D6D6D6" },
          ]}
          keyboardType="number-pad"
          placeholderTextColor="#A3A3A3"
          placeholder="+880"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={enteredNumber}
        />
      </View>
      {numberError ? <Text style={styles.errorText}>{numberError}</Text> : ""}
      <View style={{ marginTop: numberError ? 14 : 20 }}>
        <AuthButton onPress={submitNumberHandler}>NEXT</AuthButton>
      </View>
      <View style={styles.footerTextContainer}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem("shouldAddMobile", "false");
            navigation.navigate("Drawer");
          }}
        >
          <Text style={styles.footerText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Toast />
      </View>
    </View>
  );
};

export default AddMobileNumber;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 3,
    fontFamily: "roboto-regular",
  },

  closeIcon: {
    width: 23,
    height: 23,
    marginTop: 8,
  },

  mobileLabel: {
    color: "#151312",
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "roboto-regular",
  },
  mobileInput: {
    paddingLeft: 17,
    height: 47,
    borderRadius: 7,
    fontSize: 13,
    borderWidth: 1.4,
    fontFamily: "roboto-regular",
  },

  mobileInputContainer: {
    marginTop: 12,
  },

  headerText: {
    color: "#151312",
    fontSize: 21,
    fontFamily: "roboto-bold",
  },

  subHeaderText: {
    color: "#7B7B7B",
    fontSize: 13,
    fontFamily: "roboto-regular",
    lineHeight: 17,
  },

  footerTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 32,
  },

  footerText: {
    fontSize: 13,
    color: "#6F717A",
    fontFamily: "roboto-semi",
  },
});
