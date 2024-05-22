import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const { height: windowHeight } = useWindowDimensions();
  const HEADER_HEIGHT = Math.max(190, windowHeight * 0.3);
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View style={{ height: HEADER_HEIGHT }}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../assets/SupportScreenIcon/customer support-bg.png")}
        >
          <View style={[styles.headerContainer, { paddingTop: top + 18 }]}>
            <TouchableOpacity
              style={{ zIndex: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.closeIcon}
                source={require("../../assets/SupportScreenIcon/Close (1).png")}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Help & Support</Text>
          </View>
          <View style={styles.finderLogoContainer}>
            <Image
              style={styles.finderLogo}
              source={require("../../assets/SupportScreenIcon/finder-support-logo.png")}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  closeIcon: {
    width: 22,
    height: 22,
    position: "absolute",
    bottom: "50%",
    left: 20,
    transform: [{ translateX: 0 }, { translateY: 11 }],
  },
  imageBackground: {
    height: 132,
    width: "100%",
  },

  headerContainer: {
    flexDirection: "row",
    position: "relative",
  },

  title: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
    fontSize: 16,
    fontFamily: "roboto-semi",
  },

  finderLogo: {
    width: 170,
    height: 170,
  },
  finderLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: 0 }, { translateY: -20 }],
  },
});
