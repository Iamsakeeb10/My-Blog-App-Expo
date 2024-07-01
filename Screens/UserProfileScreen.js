import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { PermissionStatus } from "expo-image-picker";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import IconButton from "../components/UI/IconButton";
import { AuthContext } from "../store/auth-context";
import {
  deleteImageFromAPI,
  fetchProfileData,
  uploadImageToApi,
} from "../util/auth";

const UserProfileScreen = ({ navigation, drawerScreenBottomSheetHandler }) => {
  const { user, fullNameData, getProfileData, getUploadedImage, profileData } =
    useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  // Alert state
  // Bottomsheet
  const bottomSheetRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState(["35%"]);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  // Bottom sheet open or not

  const [loading, setIsLoading] = useState(true);
  const [cameraPermissionInformation, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [GalleryPermissionInformation, galleryRequestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.access_token) {
        const data = await fetchProfileData(user);

        if (data) {
          await getProfileData(data);
        }
        setUserProfile(data);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (userProfile && fullNameData) {
      setUserProfile((prevData) => {
        return {
          ...prevData,
          name: fullNameData,
        };
      });
    }
  }, [fullNameData]);

  const openBottomSheet = () => {
    setBottomSheetIndex(0);
    bottomSheetRef.current?.expand();
    setIsOpen(true);
    drawerScreenBottomSheetHandler(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIndex(-1);
    bottomSheetRef.current?.close();
    setIsOpen(false);
    drawerScreenBottomSheetHandler(false);
  };

  // Toast handler function
  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      position: "bottom",
      visibilityTime: 1500,
    });
  };

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

  // Taking permission to take image from gallery...

  async function verifyPermissions() {
    if (GalleryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await galleryRequestPermission();

      return permissionResponse.granted;
    }

    if (GalleryPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant gallery permissions to use this app"
      );

      // await requestPermission();

      return false;
    }

    return true;
  }

  // Function to take image from gallery
  const pickFromGallery = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const response = await uploadImageToApi(result.assets[0].uri, user);
        const data = await response.text();
        console.log(data);

        if (response.status >= 200 && response.status < 300) {
          // Updating context state...
          getUploadedImage(result.assets[0].uri);
          setPickedImage(result.assets[0].uri);
        } else {
          showToast(data.message || "An error occurred");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Taking permission for camera...
  async function verifyCameraPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant gallery permissions to use this app"
      );

      // await requestPermission();

      return false;
    }

    return true;
  }

  // Taking photo from camera
  const pickFromCamera = async () => {
    const hasPermission = await verifyCameraPermissions();

    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const response = await uploadImageToApi(result.assets[0].uri, user);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          // Updating context state...
          getUploadedImage(result.assets[0].uri);
          setPickedImage(result.assets[0].uri);
        } else {
          showToast("An error occurred!");
        }
      } catch (error) {
        showToast(error.message);
      }
    }
  };

  // Delete photo handler....
  const deleteUploadedPhotoHandler = async () => {
    try {
      const response = await deleteImageFromAPI("", user);
      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        // Updating context state...
        getUploadedImage(null);
        setPickedImage(null);
      } else {
        showToast("An error occurred!");
      }
    } catch (error) {
      showToast(error.response);
    }
  };

  // Logic to change profile image...
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
        <Text style={styles.profileName}>{userProfile.name}</Text>
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
        <Text style={styles.profileName}>{userProfile.name}</Text>
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
        <Text style={styles.profileName}>{userProfile.name}</Text>
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
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <View style={{ alignItems: "center" }}>
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
        <Text style={styles.profileName}>{userProfile.name}</Text>
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
          {userProfile
            ? userProfile.name?.charAt(0).toUpperCase() +
              userProfile.name?.slice(1)
            : ""}
        </Text>
        <Text style={emailIsValid}>{userProfile.email}</Text>
        <Text style={mobileIsValid}>{userProfile.mobile}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileImgContainer}>
        <View style={styles.profileIconContainer}>
          <Pressable onPress={openBottomSheet}>
            <Image
              style={styles.profileIcon}
              source={require("../assets/UserProfileScreenImages/Group 626007.png")}
            />
          </Pressable>
        </View>
        <ImageBackground
          style={styles.bgImg}
          source={require("../assets/UserProfileScreenImages/pattern-image.png")}
        >
          {pickedImage ? (
            <Image style={styles.profileImg} source={{ uri: pickedImage }} />
          ) : (
            profileImg
          )}
        </ImageBackground>
      </View>
      {/* ************** */}
      {profileNotVerified}
      {/* ***************** */}
      <View style={styles.footerContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate("EditProfileScreen", {
              userProfile: userProfile,
            })
          }
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
        <View>
          <Toast />
        </View>
      </View>
      <BottomSheet
        detached={false}
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "#ccc" }}
        keyboardBehavior="interactive"
        onClose={closeBottomSheet}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View style={styles.bottomSheetContainer}>
            <Pressable
              onPress={pickFromCamera}
              style={styles.bottomSheetRowContainer}
            >
              <Image
                style={styles.bottomSheetIcon}
                source={require("../assets/UserProfileScreenImages/camera.png")}
              />
              <Text style={styles.bottomSheetText}>Take a Photo</Text>
            </Pressable>
            <Pressable
              onPress={pickFromGallery}
              style={styles.bottomSheetRowContainer}
            >
              <Image
                style={styles.bottomSheetIcon}
                source={require("../assets/UserProfileScreenImages/image.png")}
              />
              <Text style={styles.bottomSheetText}>Upload from Gallery</Text>
            </Pressable>
            <Pressable
              onPress={deleteUploadedPhotoHandler}
              style={styles.bottomSheetRowContainer}
            >
              <Image
                style={styles.bottomSheetIcon}
                source={require("../assets/UserProfileScreenImages/trash.png")}
              />
              <Text style={styles.bottomSheetText}>Remove Photo</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  bottomSheetIcon: {
    width: 26,
    height: 26,
  },

  bottomSheetContainer: {
    paddingLeft: 18,
    flex: 1,
    justifyContent: "center",
  },

  bottomSheetRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 6,
  },

  bottomSheetText: {
    fontFamily: "roboto-regular",
    fontSize: 15,
    color: "#151312",
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
    borderRadius: 120 / 2,
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
