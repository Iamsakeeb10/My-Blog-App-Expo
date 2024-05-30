import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../store/auth-context";
import { fetchProfileData, loginUser } from "../../util/auth";
import AuthButton from "../UI/AuthButton";
import IconButton from "../UI/IconButton";

const AuthForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "shakib18@test.com",
    password: "123456",
  });

  const [validCredentials, setValidCredentials] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, checkLoginStatus, user, getProfileData } =
    useContext(AuthContext);

  // On Focus input state
  const [isFocus, setIsFocused] = useState({
    email: false,
    password: false,
  });

  // Getting the Navigation object...
  const navigation = useNavigation();

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

  // Validating Email...
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setInvalidEmail(
      email.length >= 32 ? "Email must be less than 32 characters" : null
    );

    return emailRegex.test(email);
  };

  // Validating Password...
  const validatePassword = (password) => {
    setInvalidPassword(
      password.length >= 20 ? "Password must be less than 20 characters" : null
    );

    return password.length >= 6;
  };

  useEffect(() => {
    setValidCredentials(
      validateEmail(inputValues.email) || validatePassword(inputValues.password)
    );
  }, [inputValues]);

  // Toast handler function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
      visibilityTime: 1500,
    });
  };

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((curInputValues) => {
      const updatedValues = {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };

      return updatedValues;
    });
  };

  // Submitting data...
  const submitHandler = async () => {
    const { email, password } = inputValues;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setInvalidEmail("Please enter a valid email address");
    } else {
      setInvalidEmail("");
    }

    if (!isPasswordValid) {
      setInvalidPassword("Password must be at least 6 characters long");
    } else {
      setInvalidPassword("");
    }

    // Check if email and password are not empty
    if (!email.trim()) {
      setInvalidEmail(`Email field can't be empty`);
    }

    if (!password.trim()) {
      setInvalidPassword("Password field can't be empty");
    }

    // If any error messages are set, return without submitting
    if (
      !isEmailValid ||
      !isPasswordValid ||
      !email.trim() ||
      !password.trim()
    ) {
      return;
    }

    try {
      setLoading(true);
      const loginData = await loginUser(email, password);
      console.log(loginData);

      if (loginData) {
        if (loginData.access_token) {
          // Successful login
          const parts = email.split("@");
          const userName = parts[0];
          const userData = {
            ...loginData,
            userName,
            email,
          };

          await login(userData);

          const profileData = await fetchProfileData(loginData);

          if (profileData) {
            await getProfileData(profileData);
          }

          await checkLoginStatus();

          if (
            (profileData && !profileData.mobile) ||
            !profileData.is_mobile_verified
          ) {
            navigation.replace("AddMobileNumberScreen"); // Navigating to Add phone number screen...
          } else {
            navigation.replace("Drawer"); // Navigating to My Blogs screen...
          }
        } else if (loginData.message) {
          // Unsuccessful login
          showToast(loginData.message);
        }
      } else {
        // Handle null loginData
        showToast(loginData.message);
      }
    } catch (error) {
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Go Back Icon Container */}
      <View>
        <IconButton
          onPress={() => navigation.replace("FirstScreen")}
          icon="arrow-back-outline"
          size={29}
          color="#303030"
        />
      </View>
      <View style={styles.innerContainer}>
        {/* Header Container With Text And Kcon */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Hi</Text>
          {/* <IconButton icon="hand-right-outline" size={24} color="yellow" /> */}
          <Image
            source={require("../../assets/images/icons8-waving-hand-emoji-48.png")}
            style={styles.headerImg}
          />
        </View>
        {/* Sub Header Text Container */}
        <View style={styles.subHeaderTextContainer}>
          <Text style={styles.subHeaderText}>
            Welcome back, Sign in to continue your account
          </Text>
        </View>
        {/* Email Input Container */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isFocus.email ? "#A0130F" : "#DBDBDB" },
            ]}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter email"
            placeholderTextColor="#BFBFBF"
            onChangeText={(value) => inputChangeHandler("email", value)}
            value={inputValues.email}
            onFocus={() => inputFocusHandler("email")}
            onBlur={() => inputBlurHandler("email")}
          />
          {invalidEmail && <Text style={styles.errorText}>{invalidEmail}</Text>}
        </View>
        {/* Password Input Container */}
        <View style={[styles.inputContainer, styles.passwordInputContainer]}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                {
                  borderColor: isFocus.password ? "#A0130F" : "#DBDBDB",
                },
              ]}
              autoCapitalize="none"
              secureTextEntry={!showPass}
              placeholder="Enter password"
              placeholderTextColor="#BFBFBF"
              onChangeText={(value) => inputChangeHandler("password", value)}
              value={inputValues.password}
              onFocus={() => inputFocusHandler("password")}
              onBlur={() => inputBlurHandler("password")}
            />
            <Pressable
              style={{ backgroundColor: "coral" }}
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 20 }}
              onPress={() => setShowPass(!showPass)}
            >
              <Image
                source={
                  !showPass
                    ? require("../../assets/images/hidden.png")
                    : require("../../assets/images/visibility.png")
                }
                style={styles.eyeImg}
              />
            </Pressable>
          </View>
          {invalidPassword && (
            <Text style={styles.errorText}>{invalidPassword}</Text>
          )}
        </View>

        {/* Button Container */}
        <View
          style={[
            invalidPassword ? { marginVertical: 10 } : styles.btnContainerOuter,
          ]}
        >
          <AuthButton
            style={loading && styles.loadingBg}
            onPress={submitHandler}
            loading={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "SIGN IN"
            )}
          </AuthButton>
        </View>
        {/* Forgot Password Text Container */}
        <View style={styles.forgotTextContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </View>
        {/* Footer Text Container */}
        <View style={styles.createNewContainer}>
          <View style={styles.createAccountContainer}>
            <Text style={styles.newToFinderText}>New to Finder? </Text>
            <Pressable
              onPress={() => navigation.navigate("ThirdScreen")}
              style={({ pressed }) => [
                styles.createAccountText,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.createNewLink}>Create Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.toastContainer}>
        <Toast />
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 10,
    marginLeft: 3,
    fontFamily: "roboto-regular",
  },

  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  innerContainer: {
    marginTop: 10,
    marginHorizontal: 3,
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#151312",
  },

  headerImg: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },

  subHeaderTextContainer: {
    marginTop: 4,
    marginBottom: 10,
  },
  subHeaderText: {
    color: "#7B7B7B",
    fontSize: 13,
  },

  inputContainer: {
    marginVertical: 8,
  },

  passwordInputContainer: {
    marginVertical: 4,
  },

  label: {
    color: "#151312",
    marginBottom: 6,
    fontSize: 13,
  },
  input: {
    paddingVertical: 7,
    paddingHorizontal: 17,
    borderRadius: 8,
    fontSize: 13,
    borderWidth: 1.6,
  },

  passwordContainer: {
    position: "relative",
    flexDirection: "row",
  },

  passwordInput: {
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

  btnContainerOuter: {
    marginVertical: 14,
  },

  forgotTextContainer: {
    alignItems: "flex-end",
    marginVertical: 6,
  },
  forgotText: {
    color: "#545458",
    fontSize: 13,
  },

  createNewContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  newToFinderText: {
    color: "#535357",
    fontSize: 13,
  },
  createNewLink: {
    color: "#D94638",
    fontWeight: "bold",
  },

  createAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.7,
  },

  loadingBg: {
    backgroundColor: "#A0130F",
  },
});
