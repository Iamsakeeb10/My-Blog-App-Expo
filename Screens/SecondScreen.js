// import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import IconButton from "../components/UI/IconButton";

const SecondScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Go Back Icon Container */}
      <View>
        <IconButton
          onPress={() => navigation.goBack()}
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
            source={require("../assets/images/icons8-waving-hand-emoji-48.png")}
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
            secureTextEntry={true}
            placeholder="Enter email"
            placeholderTextColor="#BFBFBF"
          />
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
            />
            <Image
              source={require("../assets/images/hidden.png")}
              style={styles.eyeImg}
            />
          </View>
        </View>
        {/* Button Container */}
        <View style={styles.btnContainerOuter}>
          <Pressable style={styles.btnContainerInner}>
            <Text style={styles.btnText}>SIGN IN</Text>
          </Pressable>
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
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
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
  btnContainerInner: {
    // backgroundColor: "#D94638",
    backgroundColor: "rgba(217,70,56, 0.55)",
    // paddingVertical: 14,
    paddingVertical: 13.3,
    paddingHorizontal: 8,
    borderRadius: 6,
    // opacity: 0.6,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
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
