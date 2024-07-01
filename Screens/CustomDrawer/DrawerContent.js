import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DrawerItem from "../../components/UI/DrawerItem";
import IconButton from "../../components/UI/IconButton";
import { AuthContext } from "../../store/auth-context";

const DrawerContent = (props) => {
  const navigation = useNavigation();

  const { profileData, user, uploadedImage, fullNameData } =
    useContext(AuthContext);

  const nonVerifiedText = (
    <Text style={{ color: "#fff", fontSize: 11, fontFamily: "roboto-regular" }}>
      Phone not verified yet!
      <Text style={{ fontFamily: "roboto-bold" }}> Verify now</Text>
    </Text>
  );

  return (
    <View style={styles.rootContainer}>
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 0,
        }}
        {...props}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../assets/images/Frame 26085538.png")}
        >
          <Pressable
            onPress={() => navigation.navigate("User")}
            style={({ pressed }) => [
              styles.imgRootContainer,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.imgOuterContainer}>
              <View style={[styles.verifyIconContainer]}>
                <Image
                  style={styles.verifyIcon}
                  source={
                    profileData &&
                    profileData.name &&
                    profileData.email &&
                    profileData.is_email_verified &&
                    profileData.mobile &&
                    profileData.is_mobile_verified
                      ? require("../../assets/UserProfileScreenImages/profile verified.png")
                      : require("../../assets/UserProfileScreenImages/verifyImg.png")
                  }
                />
              </View>

              {uploadedImage ? (
                <Image
                  style={[styles.img, { borderRadius: 100 }]}
                  source={{ uri: uploadedImage }}
                />
              ) : (
                <Image
                  style={[styles.img, { borderRadius: 100 }]}
                  source={
                    profileData && profileData.profile_picture !== null
                      ? {
                          uri: `http://dev23.finder.com.bd/api/v1/${profileData.profile_picture}`,
                        }
                      : require("../../assets/UserProfileScreenImages/profile picture.png")
                  }
                />
              )}
              <View>
                <Text style={styles.userName}>
                  {fullNameData ? fullNameData : profileData.name}
                </Text>
                <View style={styles.verificationContainer}>
                  <Text
                    style={[
                      !profileData?.mobile || !profileData.is_mobile_verified
                        ? {
                            color: "#fff",
                            fontSize: 11,
                            fontFamily: "roboto-regular",
                          }
                        : styles.profileMobile,
                    ]}
                  >
                    {profileData?.mobile
                      ? profileData.is_mobile_verified
                        ? profileData.mobile
                        : nonVerifiedText
                      : "Mobile not found"}
                  </Text>
                  <IconButton
                    icon="chevron-forward-outline"
                    size={15}
                    color="#F5F5DC"
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </ImageBackground>

        <View style={styles.drawerItemContainer}>
          <View style={styles.drawerItem}>
            <DrawerItem
              label="Settings"
              icon={require("../../assets/DrawerIcons/Settings.png")}
            />
            <View style={styles.drawerItemSpecific}></View>
          </View>

          <DrawerItem
            onPress={() => navigation.navigate("Drawer")}
            label="Blogs"
            icon={require("../../assets/DrawerIcons/payment.png")}
            on
          />
          <View style={styles.drawerItem}>
            <DrawerItem
              label="Live Tracking"
              icon={require("../../assets/DrawerIcons/live-tracking.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              onPress={() => navigation.navigate("GeoFence")}
              label="Geo Fence"
              icon={require("../../assets/DrawerIcons/geo-fence.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              label="Driver"
              icon={require("../../assets/DrawerIcons/driver.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              label="Shop"
              icon={require("../../assets/DrawerIcons/Shop.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              label="Refer a Friend"
              icon={require("../../assets/DrawerIcons/Invite-friends.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              onPress={() => navigation.navigate("HelpSupportScreen")}
              label="Help & Support"
              icon={require("../../assets/DrawerIcons/help & Support.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              label="Rate Us"
              icon={require("../../assets/DrawerIcons/feedback.png")}
            />
          </View>
          <View style={styles.drawerItem}>
            <DrawerItem
              label="About"
              icon={require("../../assets/DrawerIcons/About Finder.png")}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  drawerItemContainer: {
    flex: 1,
  },

  profileMobile: {
    fontFamily: "roboto-semi",
    fontSize: 11,
    color: "#fff",
  },

  imgRootContainer: {
    flex: 1,
  },
  imgOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    flex: 1,
    marginTop: 15,
    marginLeft: 16,
    position: "relative",
  },

  verifyIconContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: "20%",
    right: "84%",
  },

  verificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 3,
  },

  drawerItemContainer: {
    marginVertical: 7,
  },

  imageBackground: {
    width: "100%",
    height: 106,
    resizeMode: "cover",
  },

  img: {
    width: 45,
    height: 45,
  },

  verifyIcon: {
    width: 18,
    height: 18,
  },

  userName: {
    color: "#FFF",
    fontFamily: "roboto-semi",
    fontSize: 20,
  },

  userText: {
    fontSize: 12,
    color: "#F5F5DC",
    fontFamily: "roboto-regular",
  },

  userTextBold: {
    fontFamily: "roboto-semi",
  },

  drawerItem: {
    borderBottomColor: "rgba(214,214,214,0.5)",
    borderBottomWidth: 0.6,
  },

  drawerItemSpecific: {
    borderBottomColor: "rgba(192, 192, 192, 0.14)",
    borderBottomWidth: 5,
  },

  pressed: {
    opacity: 0.6,
  },
});
