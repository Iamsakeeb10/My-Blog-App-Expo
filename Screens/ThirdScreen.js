// import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
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
import IconButton from "../components/UI/IconButton";

const ThirdScreen = ({ navigation }) => {
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
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#BFBFBF"
            />
          </View>
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="#BFBFBF"
            />
          </View>
          {/* Password Input Container */}
          <View style={[styles.inputContainer, styles.specificStyles]}>
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
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Retype Password</Text>
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
            <Pressable style={styles.btnContainerInner}>
              <Text style={styles.btnText}>CREATE ACCOUNT</Text>
            </Pressable>
          </View>
          {/* Alternative of Create Account */}
          <View style={styles.orContainer}>
            <View style={styles.dottedBorder} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.dottedBorder} />
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
