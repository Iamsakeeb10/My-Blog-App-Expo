// import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import IconButton from "../components/UI/IconButton";
import { emailVerificationForCreatingUser } from "../util/auth";

const ThirdScreen = ({ navigation }) => {
  // Initializing state...****
  const [showPassword, setShowPassword] = useState({
    password: false,
    reTypePassword: false,
  });

  const [inputValues, setInputValues] = useState({
    fullName: "",
    email: "",
    password: "",
    reTypePassword: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");
  const [userReTypePasswordError, setUserReTypePasswordError] = useState("");
  const [userPasswordMatched, setUserPasswordMatched] = useState("");

  // Icon visibility handler function...****
  const iconVisibilityHandler = (identifier) => {
    setShowPassword((prevPass) => {
      return { ...prevPass, [identifier]: !prevPass[identifier] };
    });
  };

  // Generic input change handler function...****
  const inputChangeHandler = (identifier, enteredValue) => {
    setNameError("");
    setEmailError("");
    setUserPasswordError("");
    setUserReTypePasswordError("");
    setUserPasswordMatched("");

    return setInputValues((prevInput) => {
      return {
        ...prevInput,
        [identifier]: enteredValue,
      };
    });
  };

  // Toast handler...****
  // Toast handler function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
    });
  };

  // Submit input handler function...
  const submitInputValuesHandler = async () => {
    const { fullName, email, password, reTypePassword } = inputValues;

    const validNameRegex = /^[a-zA-Z\s'-]+$/;
    const consecutiveSpecialCharsRegex = /[-'\s]{2,}/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedReTypePassword = reTypePassword.trim();

    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let reTypePasswordError = "";
    let passwordMatched = "";

    // Name validation
    if (!trimmedName) {
      nameError = `Field can't be empty`;
    } else if (trimmedName.length >= 32) {
      nameError = `Name must be less than 32 characters`;
    } else if (trimmedName.length < 2) {
      nameError = `Name must be at least 2 characters`;
    } else if (!validNameRegex.test(trimmedName)) {
      nameError = `Full name can only contain alphabetic characters, spaces, hyphens, and apostrophes`;
    } else if (consecutiveSpecialCharsRegex.test(trimmedName)) {
      nameError = `Full name cannot have consecutive special characters (spaces, hyphens, or apostrophes)`;
    }

    // Email validation
    if (!trimmedEmail) {
      emailError = `Field can't be empty`;
    } else if (!emailRegex.test(trimmedEmail)) {
      emailError = `Please enter a valid email address`;
    } else if (trimmedEmail.length >= 32) {
      emailError = `Email must be less than 32 characters`;
    }

    // Password validation....
    if (!trimmedPassword) {
      passwordError = `Field can't be empty`;
    } else if (trimmedPassword.length >= 20) {
      passwordError = `Password must be less than 20 characters`;
    } else if (trimmedPassword.length < 6) {
      passwordError = `Password must be at least 6 characters`;
    }

    // Re typed Password validation....
    if (!trimmedReTypePassword) {
      reTypePasswordError = `Field can't be empty`;
    } else if (trimmedReTypePassword.length >= 20) {
      reTypePasswordError = `Password must be less than 20 characters`;
    } else if (trimmedReTypePassword.length < 6) {
      reTypePasswordError = `Password must be at least 6 characters`;
    }

    // Password not matched validation...****

    if (trimmedPassword !== trimmedReTypePassword) {
      passwordMatched = `Password not matched`;
    }

    // Updating error state...****
    if (
      nameError ||
      emailError ||
      passwordError ||
      reTypePasswordError ||
      passwordMatched
    ) {
      setNameError(nameError);
      setEmailError(emailError);
      setUserPasswordError(passwordError);
      setUserReTypePasswordError(reTypePasswordError);
      setUserPasswordMatched(passwordMatched);
      return;
    } else {
      setNameError("");
      setEmailError("");
      setUserPasswordError("");
      setUserReTypePasswordError("");
      setUserPasswordMatched("");
    }

    // If validation succeeded....
    try {
      const response = await emailVerificationForCreatingUser(trimmedEmail);

      if (!response.ok) {
        if (response.status === 404) {
          showToast("Request not found");
        } else if (response.status === 500) {
          showToast("Server error");
        } else {
          const data = await response.json();
          showToast(data.message || "An error occurred");
        }
      } else {
        const data = await response.json();
        console.log(data);

        showToast(data.message);
        navigation.navigate("VerificationScreen", {
          fullName: trimmedName,
          email: trimmedEmail,
          password: trimmedReTypePassword,
          isRegistered: true,
        });
      }
    } catch (error) {
      showToast(error.message);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Go Back Icon Container */}
        <View>
          <IconButton
            onPress={() => navigation.navigate("Login")}
            icon="arrow-back-outline"
            size={29}
            color="#303030"
          />
        </View>
        <View style={styles.innerContainer}>
          {/* Header Container */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Create your account</Text>
          </View>
          {/* Email Input Container */}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              onChangeText={(enteredValue) =>
                inputChangeHandler("fullName", enteredValue)
              }
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#BFBFBF"
              value={inputValues.fullName}
            />
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : ""}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={(enteredValue) =>
                inputChangeHandler("email", enteredValue)
              }
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="#BFBFBF"
              value={inputValues.email}
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : ""}
          {/* Password Input Container */}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.passwordContainer, { flexDirection: "row" }]}>
              <TextInput
                onChangeText={(enteredValue) =>
                  inputChangeHandler("password", enteredValue)
                }
                style={[styles.input, { flex: 1 }]}
                autoCapitalize="none"
                secureTextEntry={!showPassword.password}
                placeholder="Enter password"
                placeholderTextColor="#BFBFBF"
                value={inputValues.password}
              />
              <Pressable onPress={() => iconVisibilityHandler("password")}>
                <Image
                  source={
                    !showPassword.password
                      ? require("../assets/images/hidden.png")
                      : require("../assets/images/visibility.png")
                  }
                  style={styles.eyeImg}
                />
              </Pressable>
            </View>
          </View>
          {userPasswordError ? (
            <Text style={styles.errorText}>{userPasswordError}</Text>
          ) : (
            ""
          )}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Retype Password</Text>
            <View style={[styles.passwordContainer, { flexDirection: "row" }]}>
              <TextInput
                onChangeText={(enteredValue) =>
                  inputChangeHandler("reTypePassword", enteredValue)
                }
                style={[styles.input, { flex: 1 }]}
                autoCapitalize="none"
                secureTextEntry={!showPassword.reTypePassword}
                placeholder="Enter password"
                placeholderTextColor="#BFBFBF"
                value={inputValues.reTypePassword}
              />
              <Pressable
                onPress={() => iconVisibilityHandler("reTypePassword")}
              >
                <Image
                  source={
                    !showPassword.reTypePassword
                      ? require("../assets/images/hidden.png")
                      : require("../assets/images/visibility.png")
                  }
                  style={styles.eyeImg}
                />
              </Pressable>
            </View>
          </View>
          {userReTypePasswordError ? (
            <Text style={styles.errorText}>{userReTypePasswordError}</Text>
          ) : (
            <Text style={styles.errorText}>{userPasswordMatched}</Text>
          )}

          {/* Policy Text */}
          <View style={styles.policyTextContainer}>
            <Text style={styles.policyText}>
              By signing up to create an account I accept Finder's
            </Text>
            <View style={styles.policyTextInnerContainer}>
              <Pressable>
                <Text style={[styles.policyText, styles.redText]}>
                  Terms of Services
                </Text>
              </Pressable>
              <Text style={styles.policyText}> and </Text>
              <Pressable>
                <Text style={[styles.policyText, styles.redText]}>
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Button */}
          <View style={styles.btnContainerOuter}>
            <Pressable
              onPress={submitInputValuesHandler}
              style={styles.btnContainerInner}
            >
              <Text style={styles.btnText}>CREATE ACCOUNT</Text>
            </Pressable>
          </View>

          {/* Alternative of Create Account */}
          <View style={styles.orContainer}>
            <View style={styles.dottedBorder} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.dottedBorder} />
          </View>
          <View>
            <Toast />
          </View>
          {/* Continue With */}
          <View style={styles.continueWithParentContainer}>
            <View style={styles.continueWithOuterContainer}>
              <View style={styles.continueWithInnerContainer}>
                <Image
                  source={require("../assets/images/search.png")}
                  style={styles.googleImg}
                />
                <Text style={styles.continueText}>Continue with Google</Text>
              </View>
            </View>
            <View style={styles.continueWithOuterContainer}>
              <View style={styles.continueWithInnerContainer}>
                <Image
                  source={require("../assets/images/apple-logo.png")}
                  style={styles.appleImg}
                />
                <Text style={styles.continueText}>Continue with Apple</Text>
              </View>
            </View>
          </View>

          {/* Footer Text Container */}
          <View style={styles.createNewContainer}>
            <View style={styles.createAccountContainer}>
              <Text style={styles.newToFinderText}>
                Already have an Account?{" "}
              </Text>
              <Pressable
                onPress={() => navigation.replace("Login")}
                style={({ pressed }) => [
                  styles.createAccountText,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.createNewLink}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ThirdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 3,
    fontFamily: "roboto-regular",
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
    marginBottom: 7,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#151312",
  },

  inputContainer: {
    marginVertical: 8,
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

  specificStyles: {
    marginVertical: 5,
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
    marginVertical: 15,
  },
  btnContainerInner: {
    backgroundColor: "#D94638",
    paddingVertical: 13.3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  createNewContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 16,
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

  policyText: {
    fontSize: 11,
    color: "#8B8B8B",
  },

  redText: {
    color: "#800020",
    textDecorationLine: "underline",
  },

  policyTextInnerContainer: {
    flexDirection: "row",
  },

  policyTextContainer: {
    marginTop: 8,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dottedBorder: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
    borderStyle: "dashed",
  },

  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: "#151312",
  },

  continueWithInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8,
  },

  continueWithOuterContainer: {
    borderWidth: 1,
    borderColor: "#DBDBDB",
    padding: 14,
    borderRadius: 100,
    marginVertical: 6,
  },

  googleImg: {
    width: 15,
    height: 15,
  },
  appleImg: {
    width: 15,
    height: 15,
  },

  continueText: {
    color: "#151312",
    fontSize: 13,
    fontWeight: "bold",
  },

  continueWithParentContainer: {
    marginVertical: 12,
  },
});
