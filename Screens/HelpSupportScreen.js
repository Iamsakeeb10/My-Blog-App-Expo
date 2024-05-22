import { openURL } from "expo-linking";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinkAlert from "../components/UI/LinkAlert";

const HelpSupportScreen = () => {
  const { height: windowHeight } = useWindowDimensions();
  const ICON_CONTAINER_HEIGHT = Math.max(155, windowHeight * 0.1);
  const DETAILS_TEXT_HEIGHT = Math.max(105, windowHeight * 0.1);

  const [titleAlert, setTitleAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [linkToOpen, setLinkToOpen] = useState("");
  console.log(alertVisible);

  const sendingCallHandler = async () => {
    const phoneNumber = "+8809678346337";

    try {
      await openURL(`tel:${phoneNumber}`);
    } catch (error) {
      Alert.alert(
        "Phone call not supported",
        "Your device does not support making phone calls"
      );
    }
  };
  const sendingWhatsappCallHandler = async () => {
    const whatsappNumber = "+8809678346337";

    try {
      await openURL(`whatsapp://send?phone=${whatsappNumber}`);
    } catch (error) {
      Alert.alert("Failed!", "Whatsapp is not installed on your device");
    }
  };
  const sendingEmailHandler = async () => {
    const email = "info@finder-lbs.com";

    try {
      await openURL(`mailto:${email}`);
    } catch (error) {
      Alert.alert(
        "Failed to send email",
        "Your device does not support sending emails"
      );
    }
  };

  const handleSocialMediaLink = async (
    appLink,
    browserLink,
    alertTitle,
    alertMessage
  ) => {
    try {
      await openURL(appLink);
    } catch (error) {
      setAlertVisible(true);
      setTitleAlert(alertTitle);
      setMessageAlert(alertMessage);
      setLinkToOpen(browserLink);
    }
  };

  const enterLinkHandler = async () => {
    try {
      closeFbAlertHandler();
      await openURL(linkToOpen);
    } catch (error) {
      Alert.alert("Error", "Cannot open browser link");
    }
  };

  const closeFbAlertHandler = () => {
    setAlertVisible(false);
  };

  return (
    <View style={[styles.rootContainer]}>
      <ScrollView style={styles.rootContainer}>
        <StatusBar barStyle="light-content" />
        <View>
          <Text style={styles.subHeaderText}>Finder GPS Tracker</Text>
        </View>
        <View
          style={[styles.mainIconContainer, { height: ICON_CONTAINER_HEIGHT }]}
        >
          <Pressable
            onPress={sendingCallHandler}
            style={{ alignSelf: "center" }}
          >
            <Image
              style={styles.mainIcon}
              source={require("../assets/SupportScreenIcon/icon-phone.png")}
            />
            <Text style={styles.iconText}>Phone</Text>
          </Pressable>
          <Pressable
            onPress={sendingWhatsappCallHandler}
            style={{ alignSelf: "center" }}
          >
            <Image
              style={styles.mainIcon}
              source={require("../assets/SupportScreenIcon/icon-whatsapp.png")}
            />
            <Text style={styles.iconText}>Whatsapp</Text>
          </Pressable>
          <Pressable
            onPress={sendingEmailHandler}
            style={{ alignSelf: "center" }}
          >
            <Image
              style={styles.mainIcon}
              source={require("../assets/SupportScreenIcon/icon-email.png")}
            />
            <Text style={styles.iconText}>Email</Text>
          </Pressable>
        </View>
        <View>
          <View
            style={{
              borderTopColor: "rgba(190,190,190, 0.07)",
              borderTopWidth: 2,
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: DETAILS_TEXT_HEIGHT,
            }}
          >
            <Text style={styles.detailsText}>MONICO BHABAN</Text>
            <Text style={styles.detailsText}>
              House No. 26-27, Ring Road, Adabor
            </Text>
            <Text style={styles.detailsText}>Dhaka - 1207, Bangladesh</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 4 }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "roboto-semi",
                color: "#A3A3A3",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              FOLLOW US ON:
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() =>
                  handleSocialMediaLink(
                    "fb://page/finder.vehicle.tracking",
                    "https://www.facebook.com/finder.vehicle.tracking",
                    "Facebook app not installed",
                    "Do you want to open in the browser?"
                  )
                }
              >
                <Image
                  style={styles.socialIcon}
                  source={require("../assets/SupportScreenIcon/facebook.png")}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  handleSocialMediaLink(
                    "twitter://user?screen_name=findertracking",
                    "https://twitter.com/findertracking",
                    "Twitter app not installed",
                    "Do you want to open in the browser?"
                  )
                }
              >
                <Image
                  style={styles.socialIcon}
                  source={require("../assets/SupportScreenIcon/twitter.png")}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  handleSocialMediaLink(
                    "instagram://user?username=findertracking",
                    "https://www.instagram.com/findertracking",
                    "Instagram app not installed",
                    "Do you want to open in the browser?"
                  )
                }
              >
                <Image
                  style={styles.socialIcon}
                  source={require("../assets/SupportScreenIcon/instagram.png")}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  handleSocialMediaLink(
                    "bd.linkedin.com/company/finder-gps-tracker",
                    "https://bd.linkedin.com/company/finder-gps-tracker",
                    "Linkedin app not installed",
                    "Do you want to open in the browser?"
                  )
                }
              >
                <Image
                  style={styles.socialIcon}
                  source={require("../assets/SupportScreenIcon/linkedin.png")}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  handleSocialMediaLink(
                    "vnd.youtube://channel/UCfFGk5kaVq22QQ6itfXEEZw",
                    "https://www.youtube.com/channel/UCfFGk5kaVq22QQ6itfXEEZw",
                    "Youtube app not installed",
                    "Do you want to open in the browser?"
                  )
                }
              >
                <Image
                  style={styles.socialIcon}
                  source={require("../assets/SupportScreenIcon/youtube.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View>
          <LinkAlert
            showAlert={alertVisible}
            title={titleAlert}
            message={messageAlert}
            enterLinkHandler={enterLinkHandler}
            hideAlertFunc={closeFbAlertHandler}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  subHeaderText: {
    fontSize: 21,
    fontFamily: "roboto-semi",
    textAlign: "center",
  },

  mainIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginBottom: 4,
  },

  mainIcon: {
    width: 76,
    height: 76,
  },

  iconText: {
    textAlign: "center",
    transform: [{ translateX: 0 }, { translateY: -8 }],
  },

  detailsText: {
    fontSize: 16,
    fontFamily: "roboto-semi",
    lineHeight: 22,
    color: "#151312",
  },

  socialIcon: {
    width: 34,
    height: 34,
  },
});
