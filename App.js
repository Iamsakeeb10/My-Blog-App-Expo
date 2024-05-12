import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AboutScreen from "./Screens/AboutScreen";
import DrawerContent from "./Screens/CustomDrawer/DrawerContent";
import DriverScreen from "./Screens/DriverScreen";
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

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
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
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AuthContextProvider>
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
});
