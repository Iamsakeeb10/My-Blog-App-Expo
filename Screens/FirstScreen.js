import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SwitchToggler from "../components/UI/SwitchToggler";

const FirstScreen = () => {
  // const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../assets/images/photo_2024-05-04_09-47-25.jpg")}
          />
          <View style={styles.switchContainer}>
            <SwitchToggler />
          </View>
        </View>
        {/* Header Container */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Start Monitoring your Vehicle</Text>
        </View>
        {/* Sub Header Container */}
        <View style={styles.subHeaderTextContainer}>
          <Text style={styles.subHeaderText}>
            It is simple, affordable, easy-to-use GPS
          </Text>
          <Text style={styles.subHeaderText}>tracking stystem</Text>
        </View>
        {/* Continue With */}
        {/* Wrapper With Padding */}
        <View style={styles.wrapperWithPadding}>
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
          {/* Alternative of Create Account */}
          <View style={styles.orContainer}>
            <View style={styles.dottedBorder} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.dottedBorder} />
          </View>
          {/* Button Container */}
          <View style={styles.btnContainerOuter}>
            <Pressable style={styles.btnContainerInner}>
              <Text style={styles.btnText}>SIGN IN WITH EMAIL</Text>
            </Pressable>
          </View>
          {/* Footer Text Container */}
          <View style={styles.createNewContainer}>
            <View>
              <Text style={[styles.helpDemoText, styles.createNewLink]}>
                Help Demo
              </Text>
            </View>
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
      </ScrollView>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    width: "100%",
    position: "relative",
  },

  switchContainer: {
    position: "absolute",
    top: 40,
    right: 20,
  },

  img: {
    height: "100%",
    resizeMode: "stretch",
  },

  headerContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#151312",
  },

  subHeaderTextContainer: {
    marginTop: 7,
  },
  subHeaderText: {
    color: "#7B7B7B",
    fontSize: 13,
    textAlign: "center",
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
    padding: 12,
    borderRadius: 100,
    marginVertical: 6,
  },

  wrapperWithPadding: {
    marginHorizontal: 39,
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
    marginTop: 12,
    marginBottom: 6,
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

  btnContainerOuter: {
    marginTop: 14,
    marginBottom: 9,
  },
  btnContainerInner: {
    backgroundColor: "#D94638",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  createNewContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: 7,
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

  helpDemoText: {
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
