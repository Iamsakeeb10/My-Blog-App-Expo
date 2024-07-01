import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AboutScreen from "./Screens/AboutScreen";
import AddMobileNumber from "./Screens/AddMobileNumber";
import BottomTabOne from "./Screens/BottomTabOne";
import BottomTabThree from "./Screens/BottomTabThree";
import BottomTabTwo from "./Screens/BottomTabTwo";
import ChangePasswordScreen from "./Screens/ChangePasswordScreen";
import DrawerContent from "./Screens/CustomDrawer/DrawerContent";
import CustomTab from "./Screens/CustomTab/CustomTab";
import DriverScreen from "./Screens/DriverScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import EnterNewEmailScreen from "./Screens/EnterNewEmailScreen";
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
import Header from "./components/CustomHeader/Header";
import DrawerItem from "./components/UI/DrawerItem";
import IconButton from "./components/UI/IconButton";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: "none",
        },
      }}
      tabBar={(props) => <CustomTab {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: "My Blogs",
          headerTitleAlign: "center",
          headerTitleStyle: {
            marginBottom: 4,
            fontSize: 18,
            fontFamily: "roboto-semi",
          },
          tabBarLabel: "TRACKING",
          headerStyle: {
            backgroundColor: "#153448",
          },
          headerTintColor: "#fff",
          sceneContainerStyle: {
            backgroundColor: "#B6C4B6",
          },
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={{
                  position: "absolute",
                  left: 12,
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("./assets/HamIcon/menu.png")}
                />
              </Pressable>
            );
          },
        })}
      />
      <Tab.Screen
        name="TabOne"
        component={BottomTabOne}
        options={{
          title: "MY VEHICLE",
        }}
      />
      <Tab.Screen
        name="TabTwo"
        component={BottomTabTwo}
        options={{
          title: "ALERTS",
        }}
      />
      <Tab.Screen
        name="TABTHREE"
        component={BottomTabThree}
        options={{
          title: "MORE",
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const [drawerScreenBottomSheetOpen, setDrawerScreenBottomSheetOpen] =
    useState(false);

  const drawerScreenBottomSheetHandler = (open) => {
    setDrawerScreenBottomSheetOpen(open);
  };

  const logoutHandler = () => {
    Alert.alert(
      "Logout",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Okay",
          onPress: async () => {
            try {
              await logout();
              navigation.replace("Login");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: true } // This makes the alert dismissible by tapping outside
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#153448",
        },
        headerTintColor: "#fff",
        sceneContainerStyle: {
          backgroundColor: "#B6C4B6",
        },

        drawerActiveBackgroundColor: "#fff",
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={{
                position: "absolute",
                left: 12,
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require("./assets/HamIcon/menu-black.png")}
              />
            </Pressable>
          );
        },
      })}
    >
      <Drawer.Screen
        name="Bottom Tab"
        component={BottomTab}
        options={() => ({
          headerTitle: "MyBlogs",
          headerShown: false,
        })}
      />

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
            backgroundColor: drawerScreenBottomSheetOpen
              ? "rgba(30,30,30,0.4)"
              : "#FAFAFA",
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
        // component={UserProfileScreen}
      >
        {(props) => (
          <UserProfileScreen
            {...props}
            drawerScreenBottomSheetHandler={drawerScreenBottomSheetHandler}
          />
        )}
      </Drawer.Screen>
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
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#FFF",
          },

          headerTitleStyle: {
            color: "#1E1F20",
            fontSize: 16,
            fontFamily: "roboto-semi",
          },

          headerShadowVisible: false,

          headerTitle: "Geofence",

          headerTitleAlign: "center",

          sceneContainerStyle: {
            backgroundColor: "#FAFAFA",
          },

          headerLeft: () => (
            <Pressable
              style={{ position: "absolute", left: 15 }}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.arrowIcon}
                source={require("./assets/UserProfileScreenImages/left-arrow.png")}
              />
            </Pressable>
          ),
        })}
        name="GeoFence"
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
          sceneContainerStyle: {
            backgroundColor: "#FAFAFA",
          },
          header: () => <Header />,
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
      {
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
                  options={({ navigation }) => ({
                    headerStyle: {
                      backgroundColor: "#fff",
                    },
                    headerShadowVisible: false,
                    contentStyle: {
                      backgroundColor: "#fff",
                    },
                    title: "",
                    headerLeft: () => {
                      return (
                        <View>
                          <IconButton
                            onPress={() => navigation.pop()}
                            icon="arrow-back-outline"
                            size={29}
                            color="#303030"
                          />
                        </View>
                      );
                    },
                  })}
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
                          source={require("./assets/UserProfileScreenImages/left-arrow.png")}
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
                  name="ChangeEmailScreen"
                  component={EnterNewEmailScreen}
                  options={({ navigation }) => ({
                    headerStyle: {
                      backgroundColor: "#FAFAFA",
                    },
                    headerShadowVisible: false,
                    contentStyle: {
                      backgroundColor: "#FAFAFA",
                    },
                    headerTitle: "",
                    headerLeft: () => (
                      <View style={{ paddingLeft: 5 }}>
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
                {/* Verification screen.... */}
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
                            style={styles.closeIconVerify}
                            source={require("./assets/VerificationScreenIcons/Close.png")}
                          />
                        </Pressable>
                      </View>
                    ),
                  })}
                />
                <Stack.Screen
                  name="AddMobileNumberScreen"
                  component={AddMobileNumber}
                />
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
                          source={require("./assets/UserProfileScreenImages/left-arrow.png")}
                        />
                      </Pressable>
                    ),
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </AuthContextProvider>
      }
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
  closeIconVerify: {
    width: 23,
    height: 23,
    marginTop: 8,
    marginLeft: 4,
  },
});
