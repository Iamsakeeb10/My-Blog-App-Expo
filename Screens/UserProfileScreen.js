// import React, { useContext } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { AuthContext } from "../store/auth-context";

// const UserProfileScreen = () => {
//   const { getUserData } = useContext(AuthContext);

//   const userData = getUserData();

//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <View style={styles.infoContainer}>
//           <Text style={styles.userName}>Name: {userData.userName}</Text>
//           <Text style={styles.userEmail}>Email: {userData.email}</Text>
//         </View>
//       ) : (
//         <Text>Loading user data...</Text>
//       )}
//     </View>
//   );
// };

// export default UserProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   infoContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   userName: {
//     textAlign: "center",
//     fontSize: 24,
//   },

//   userEmail: {
//     alignSelf: "center",
//     fontSize: 22,
//   },
// });

import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButton from "../components/UI/IconButton";

const UserProfileScreen = () => {
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
          <Image
            style={styles.profileImg}
            source={require("../assets/UserProfileScreenImages/profile picture.png")}
          />
        </ImageBackground>
      </View>
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>Estiak Ahmed</Text>
        <Text style={styles.verificationText}>
          Profile Not Verified!
          <Text style={styles.verificationTextSpecific}> Verify Now</Text>
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
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
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
          <View style={styles.drawerItemContainer}>
            <View style={styles.drawerItemInnerContainer}>
              <Image
                style={styles.drawerIcon}
                source={require("../assets/UserProfileScreenImages/icon.png")}
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
});
