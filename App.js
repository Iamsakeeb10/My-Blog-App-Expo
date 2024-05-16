import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AboutScreen from "./Screens/AboutScreen";
import ChangePasswordScreen from "./Screens/ChangePasswordScreen";
import DrawerContent from "./Screens/CustomDrawer/DrawerContent";
import DriverScreen from "./Screens/DriverScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import FirstScreen from "./Screens/FirstScreen";
import GeoFenceScreen from "./Screens/GeoFenceScreen";
import HelpSupportScreen from "./Screens/HelpSupportScreen";
import HomeScreen from "./Screens/HomeScreen";
import LiveTrackScreen from "./Screens/LiveTrackScreen";
import RateScreen from "./Screens/RateScreen";
import ReferScreen from "./Screens/ReferScreen";
import SettingScreen from "./Screens/SettingScreen";
import ShopScreen from "./Screens/ShopScreen";
import ThirdScreen from "./Screens/ThirdScreen";
import UserProfileScreen from "./Screens/UserProfileScreen";
import VerificationScreen from "./Screens/VerificationScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import AuthContentScreen from "./components/Auth/AuthContentScreen";
import BlogDetails from "./components/BlogDetail/BlogDetails";
import DrawerItem from "./components/UI/DrawerItem";
import IconButton from "./components/UI/IconButton";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await logout();
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#153448",
        },
        headerTintColor: "#fff",
        sceneContainerStyle: {
          backgroundColor: "#B6C4B6",
        },

        drawerActiveBackgroundColor: "#fff",
      }}
    >
      <Drawer.Screen name="MyBlogs" component={HomeScreen} />
      <Drawer.Screen
        options={{
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                icon="log-out-outline"
                size={26}
                color="#303030"
                onPress={logoutHandler}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#FAFAFA",
            elevation: 0,
          },
          headerTintColor: "#000",
          headerTitleAlign: "center",
          headerTitle: "My Profile",
          headerTitleStyle: {
            fontSize: 18.6,
            fontFamily: "roboto-semi",
            color: "#151312",
          },
        }}
        name="User"
        component={UserProfileScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Settings"
              icon={require("./assets/DrawerIcons/Settings.png")}
            />
          ),
        })}
        name="SettingScreen"
        component={SettingScreen}
      />

      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Live Tracking"
              icon={require("./assets/DrawerIcons/live-tracking.png")}
            />
          ),
        })}
        name="LiveTrackScreen"
        component={LiveTrackScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Geo Fence"
              icon={require("./assets/DrawerIcons/geo-fence.png")}
            />
          ),
        })}
        name="GeoFenceScreen"
        component={GeoFenceScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Driver"
              icon={require("./assets/DrawerIcons/driver.png")}
            />
          ),
        })}
        name="DriverScreen"
        component={DriverScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Shop"
              icon={require("./assets/DrawerIcons/Shop.png")}
            />
          ),
        })}
        name="ShopScreen"
        component={ShopScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Refer a Friend"
              icon={require("./assets/DrawerIcons/feedback.png")}
            />
          ),
        })}
        name="ReferScreen"
        component={ReferScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Help & Support"
              icon={require("./assets/DrawerIcons/help & Support.png")}
            />
          ),
        })}
        name="HelpSupportScreen"
        component={HelpSupportScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="Rate Us"
              icon={require("./assets/DrawerIcons/feedback.png")}
            />
          ),
        })}
        name="RateScreen"
        component={RateScreen}
      />
      <Drawer.Screen
        options={() => ({
          drawerLabel: () => (
            <DrawerItem
              label="About"
              icon={require("./assets/DrawerIcons/About Finder.png")}
            />
          ),
        })}
        name="AboutScreen"
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    "roboto-semi": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
  });

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState();

  const bottomSheetHandler = (open) => {
    setIsBottomSheetOpen(open);
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <StatusBar style="light" />
        <View style={styles.rootContainer}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#153448",
                },
                contentStyle: {
                  backgroundColor: "#B6C4B6",
                },
                headerTitleStyle: {
                  color: "#EEEEEE",
                  fontSize: 21,
                },
                headerTintColor: "#EEEEEE",
              }}
            >
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "#fff",
                  },
                }}
              />
              <Stack.Screen
                name="FirstScreen"
                component={FirstScreen}
                options={{
                  headerShown: false,
                  headerTitle: "First Screen",
                  contentStyle: {
                    backgroundColor: "#fff",
                  },
                }}
              />
              <Stack.Screen
                name="Login"
                component={AuthContentScreen}
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: "#fff",
                  },
                  contentStyle: {
                    backgroundColor: "#fff",
                  },
                }}
              />
              <Stack.Screen
                name="Drawer"
                options={{
                  headerShown: false,
                }}
              >
                {() => <DrawerNavigator />}
              </Stack.Screen>
              <Stack.Screen
                name="ThirdScreen"
                component={ThirdScreen}
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: "#fff",
                  },
                  contentStyle: {
                    backgroundColor: "#fff",
                  },
                }}
              />
              <Stack.Screen
                name="BlogDetails"
                component={BlogDetails}
                options={({ navigation }) => ({
                  headerLeft: ({ tintColor }) => (
                    <IconButton
                      icon="return-up-back-outline"
                      size={24}
                      color={tintColor}
                      onPress={() => navigation.goBack()}
                    />
                  ),
                  headerTitleAlign: "center",
                  title: "Blog Insights",
                })}
              />
              <Stack.Screen
                name="EditProfileScreen"
                options={({ navigation }) => ({
                  headerStyle: {
                    backgroundColor: isBottomSheetOpen
                      ? "rgba(0,0,0,0.4)"
                      : "#FFF",
                  },

                  headerTitleStyle: {
                    color: "#1E1F20",
                    fontSize: 15,
                    fontFamily: "roboto-semi",
                  },

                  headerShadowVisible: false,

                  headerTitle: "Edit Profile",

                  headerTitleAlign: "center",

                  contentStyle: {
                    backgroundColor: isBottomSheetOpen
                      ? "rgba(0,0,0,0.4)"
                      : "#FAFAFA",
                  },

                  headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                      <Image
                        style={styles.arrowIcon}
                        source={require("./assets/UserProfileScreenImages/EditProfileScreenIcons/left-arrow.png")}
                      />
                    </Pressable>
                  ),
                })}
              >
                {() => (
                  <EditProfileScreen
                    isBottomSheetOpenYet={bottomSheetHandler}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
                options={({ navigation }) => ({
                  headerStyle: {
                    backgroundColor: "#FFF",
                  },

                  headerTitleStyle: {
                    color: "#1E1F20",
                    fontSize: 15,
                    fontFamily: "roboto-semi",
                  },

                  headerShadowVisible: false,

                  headerTitle: "Change Password",

                  headerTitleAlign: "center",

                  contentStyle: {
                    backgroundColor: "#FAFAFA",
                  },

                  headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                      <Image
                        style={styles.arrowIcon}
                        source={require("./assets/UserProfileScreenImages/EditProfileScreenIcons/left-arrow.png")}
                      />
                    </Pressable>
                  ),
                })}
              />

              {/* Disabled screen till now - Need to add navigate or replace to navigate to this screen.... */}
              <Stack.Screen
                name="VerificationScreen"
                component={VerificationScreen}
                options={({ navigation }) => ({
                  headerStyle: {
                    backgroundColor: "#FFF",
                  },

                  headerTitle: "",

                  headerShadowVisible: false,

                  contentStyle: {
                    backgroundColor: "#FAFAFA",
                  },

                  headerLeft: () => (
                    <View>
                      <Pressable
                        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                        onPress={() => navigation.goBack()}
                      >
                        <Image
                          style={styles.closeIcon}
                          source={require("./assets/VerificationScreenIcons/Close.png")}
                        />
                      </Pressable>
                    </View>
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  pressed: {
    opacity: 0.7,
  },

  drawerIcon: {
    width: 23,
    height: 23,
  },

  arrowIcon: {
    width: 23,
    height: 23,
  },

  closeIcon: {
    width: 23,
    height: 23,
    marginTop: 8,
  },
});

// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import React, { useRef, useState } from "react";
// import {
//   Button,
//   Image,
//   KeyboardAvoidingView,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import AuthButton from "./components/UI/AuthButton";

// const App = () => {
//   const bottomSheetRef = useRef(null);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [snapPoints, setSnapPoints] = useState(["25%", "50%"]);

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.expand();
//     setIsBottomSheetOpen(true);
//   };

//   const closeBottomSheet = () => {
//     bottomSheetRef.current?.close();
//     setIsBottomSheetOpen(false);
//   };

//   const handleFocus = () => {
//     setSnapPoints(["80%"]);
//   };

//   const handleBlur = () => {
//     setSnapPoints(["25%", "50%"]);
//   };

//   return (
//     <GestureHandlerRootView
//       style={{ flex: 1, backgroundColor: isBottomSheetOpen ? "#ccc" : "#fff" }}
//     >
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
//       </View>
//       <BottomSheet
//         detached={false}
//         index={0}
//         snapPoints={snapPoints}
//         ref={bottomSheetRef}
//         enablePanDownToClose={true}
//         handleIndicatorStyle={{ backgroundColor: "#fff" }}
//         keyboardBehavior="interactive"
//       >
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//           <BottomSheetView style={{ paddingHorizontal: 18, flex: 1 }}>
//             <View
//               style={{
//                 flex: 0,
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 15,
//                   color: "#3A3A3F",
//                   fontFamily: "roboto-regular",
//                 }}
//               >
//                 Change Email!
//               </Text>
//               <Image
//                 style={{ width: 25, height: 25 }}
//                 source={require("./assets/SheetIcon/Close.png")}
//               />
//             </View>
//             <View style={{ flex: 0, marginTop: 6 }}>
//               <Text
//                 style={{
//                   fontSize: 19,
//                   textAlign: "center",
//                   fontFamily: "roboto-semi",
//                 }}
//               >
//                 Enter Password
//               </Text>
//             </View>
//             <View style={{ flex: 0, marginTop: 6 }}>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontSize: 13,
//                   fontFamily: "roboto-regular",
//                   color: "#3A3A3F",
//                 }}
//               >
//                 Enter the password for estiak@finder-lbs.com
//               </Text>
//             </View>
//             <View
//               style={{
//                 flex: 0,
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   textAlign: "center",
//                   fontSize: 13,
//                   fontFamily: "roboto-regular",
//                   color: "#3A3A3F",
//                 }}
//               >
//                 to change this email address
//               </Text>
//             </View>
//             <View style={{ marginTop: 12 }}>
//               <Text style={{ color: "#151312", marginBottom: 4, fontSize: 13 }}>
//                 New Email Address
//               </Text>
//               <TextInput
//                 style={{
//                   paddingLeft: 17,
//                   width: 312,
//                   height: 48,
//                   borderRadius: 7,
//                   fontSize: 13,
//                   borderWidth: 1.6,
//                   borderColor: "#DBDBDB",
//                   fontFamily: "roboto-regular",
//                 }}
//                 placeholderTextColor="#A3A3A3"
//                 placeholder="Enter new email"
//                 onFocus={handleFocus}
//                 // onBlur={handleBlur}
//               />
//             </View>
//             <View style={{ flex: 1, marginTop: 10 }}>
//               <AuthButton>NEXT</AuthButton>
//             </View>
//           </BottomSheetView>
//         </KeyboardAvoidingView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// export default App;
