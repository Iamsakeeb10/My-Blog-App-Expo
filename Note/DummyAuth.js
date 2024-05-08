import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
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
import { loginUser } from "../../util/auth";
import AuthButton from "../UI/AuthButton";
import IconButton from "../UI/IconButton";

const AuthForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [validCredentials, setValidCredentials] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const { login, checkLoginStatus } = useContext(AuthContext);

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
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter email"
            placeholderTextColor="#BFBFBF"
            onChangeText={(value) => inputChangeHandler("email", value)}
            value={inputValues.email}
          />
          {invalidEmail && <Text style={styles.errorText}>{invalidEmail}</Text>}
        </View>
        {/* Password Input Container */}
        <View style={[styles.inputContainer, styles.passwordInputContainer]}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Enter password"
              placeholderTextColor="#BFBFBF"
              onChangeText={(value) => inputChangeHandler("password", value)}
              value={inputValues.password}
            />
            <Image
              source={require("../../assets/images/hidden.png")}
              style={styles.eyeImg}
            />
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
            onPress={validCredentials ? submitHandler : null}
            disabled={!validCredentials}
          >
            SIGN IN
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
              onPress={() => navigation.replace("ThirdScreen")}
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
  },

  toastContainer: {
    // marginTop: 150,
  },

  // text: {
  //   textDecorationLine: "underline",
  //   color: "#A0153E",
  //   fontSize: 15,
  // },

  // authScreenContainer: {
  //   alignItems: "center",
  //   rowGap: 6,
  // },
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
    marginBottom: 5,
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
    borderColor: "#DBDBDB",
  },

  passwordContainer: {
    position: "relative",
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
});