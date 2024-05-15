import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButton from "../components/UI/IconButton";
import { AuthContext } from "../store/auth-context";
import { fetchProfileData } from "../util/auth";

const UserProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.access_token) {
        const data = await fetchProfileData(user);
        setUserProfile(data);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size={40} color="#5C0300" />
      </View>
    );
  }

  let profileImg = (
    <Image
      style={styles.profileImg}
      source={require("../assets/UserProfileScreenImages/profile picture.png")}
    />
  );

  if (userProfile && userProfile.profile_picture) {
    profileImg = (
      <Image
        style={styles.profileImg}
        source={{
          uri: `http://dev23.finder.com.bd/api/v1/${userProfile.profile_picture}`,
        }}
      />
    );
  }

  // *********************
  // Checking and giving color to not verified credentials...
  let emailIsValid = styles.profileEmail;

  if (!userProfile.is_email_verified) {
    emailIsValid = [styles.profileEmail, { color: "yellow" }];
  }

  let mobileIsValid = styles.profileNumber;

  if (!userProfile.is_mobile_verified) {
    mobileIsValid = [styles.profileNumber, { color: "#FFAA33" }];
  }

  // **********************
  let profileNotVerified;

  // If email is found but not verified...
  if (userProfile && userProfile.email && !userProfile.is_email_verified) {
    profileNotVerified = (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>Estiak Ahmed</Text>
        <Text
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <Text
            style={{
              color: "#FFAA33",
              fontSize: 11,
              fontFamily: "roboto-semi",
            }}
          >
            {userProfile.email}
          </Text>
          <Text
            style={{
              color: "#FFAA33",
              fontSize: 11,
              fontFamily: "roboto-semi",
            }}
          >
            Email is not verified
          </Text>
        </Text>
      </View>
    );
  }
  // If mobile is found but not verified...
  if (userProfile && userProfile.mobile && !userProfile.is_mobile_verified) {
    profileNotVerified = (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>Estiak Ahmed</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <View>
            <Text
              style={{
                color: "#FFAA33",
                fontSize: 11,
                fontFamily: "roboto-semi",
              }}
            >
              {userProfile.mobile}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#FFAA33",
                fontSize: 11,
                fontFamily: "roboto-semi",
              }}
            >
              Mobile is not verified
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // If mobile and email found but both are not verified...
  if (
    userProfile &&
    userProfile.mobile &&
    !userProfile.is_mobile_verified &&
    userProfile.email &&
    !userProfile.is_email_verified
  ) {
    profileNotVerified = (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>Estiak Ahmed</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <View>
            <Text
              style={{
                color: "#FFAA33",
                fontSize: 11,
                fontFamily: "roboto-semi",
              }}
            >
              {userProfile.mobile}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#FFAA33",
                fontSize: 11,
                fontFamily: "roboto-semi",
              }}
            >
              {userProfile.email}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // If email is found but mobile is not found...
  if (
    userProfile &&
    userProfile.email &&
    userProfile.is_email_verified &&
    !userProfile.mobile
  ) {
    profileNotVerified = (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>Estiak Ahmed</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <View>
            <Text style={emailIsValid}>{userProfile.email}</Text>
          </View>
          <View>
            <Text
              style={{
                color: "#FFAA33",
                fontSize: 11,
                fontFamily: "roboto-semi",
              }}
            >
              Mobile number not found
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // If mobile is found but email is not found...
  if (
    userProfile &&
    userProfile.mobile &&
    userProfile.is_mobile_verified &&
    !userProfile.email
  ) {
    profileNotVerified = (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>Estiak Ahmed</Text>
        <Text style={[styles.verificationText]}>
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
          >
            <View>
              <Text style={emailIsValid}>{userProfile.mobile}</Text>
            </View>
            <View>
              <Text style={emailIsValid}>Email not found</Text>
            </View>
          </View>
        </Text>
      </View>
    );
  }

  // If userProfile, email, mobile and name is found...
  if (
    userProfile &&
    userProfile.email &&
    userProfile.mobile &&
    userProfile.name
  ) {
    profileNotVerified = (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>
          {userProfile.name.charAt(0).toUpperCase() + userProfile.name.slice(1)}
        </Text>
        <Text style={emailIsValid}>{userProfile.email}</Text>
        <Text style={mobileIsValid}>{userProfile.mobile}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileImgContainer}>
        <View style={styles.profileIconContainer}>
          <Image
            style={styles.profileIcon}
            source={require("../assets/UserProfileScreenImages/Group 626007.png")}
          />
        </View>
        <ImageBackground
          style={styles.bgImg}
          source={require("../assets/UserProfileScreenImages/pattern-image.png")}
        >
          {profileImg}
        </ImageBackground>
      </View>
      {/* ************** */}
      {profileNotVerified}
      {/* ***************** */}
      <View style={styles.footerContainer}>
        <Pressable
          onPress={() => navigation.navigate("EditProfileScreen")}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.drawerItemContainer}>
            <View style={styles.drawerItemInnerContainer}>
              <Image
                style={styles.drawerIcon}
                source={require("../assets/UserProfileScreenImages/user.png")}
              />
              <Text style={styles.drawerLabel}>Edit Profile</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon="chevron-forward-outline"
                size={20}
                color="#6F717A"
              />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ChangePasswordScreen")}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.drawerItemContainer}>
            <View style={styles.drawerItemInnerContainer}>
              <Image
                style={styles.drawerIcon}
                source={require("../assets/UserProfileScreenImages/icon.png")}
              />
              <Text style={styles.drawerLabel}>Change Password</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon="chevron-forward-outline"
                size={20}
                color="#6F717A"
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  profileImgContainer: {
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },

  profileIconContainer: {
    position: "absolute",
    bottom: "-18%",
    top: "88%",
    right: "40%",
    zIndex: 1,
  },

  profileNameContainer: {
    alignItems: "center",
    marginTop: 24,
  },

  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2,
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 6,
  },

  drawerItemInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 13,
  },

  footerContainer: {
    marginTop: 34,
  },

  profileName: {
    fontSize: 20,
    fontFamily: "roboto-bold",
    color: "#151312",
  },
  verificationText: {
    fontSize: 11,
    fontFamily: "roboto-regular",
    color: "rgba(232, 123, 9, 0.9)",
  },
  verificationTextSpecific: {
    fontFamily: "roboto-semi",
    color: "#00AE11",
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  bgImg: {
    width: 280,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },

  drawerIcon: {
    width: 24,
    height: 24,
  },

  drawerLabel: {
    fontSize: 13,
    color: "#3A3A3F",
    fontFamily: "roboto-regular",
  },

  profileIcon: {
    width: 31,
    height: 31,
  },

  profileEmail: {
    fontFamily: "roboto-bold",
    fontSize: 11,
    color: "#6F717A",
    marginVertical: 6,
  },
  profileNumber: {
    fontFamily: "roboto-semi",
    fontSize: 11,
    color: "#6F717A",
  },
});
