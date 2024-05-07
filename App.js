import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import FirstScreen from "./Screens/FirstScreen";
import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
import ThirdScreen from "./Screens/ThirdScreen";
import UserProfile from "./Screens/UserProfileScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import AuthContentScreen from "./components/Auth/AuthContentScreen";
import BlogDetails from "./components/BlogDetail/BlogDetails";
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
      screenOptions={{
        headerStyle: {
          backgroundColor: "#153448",
        },
        headerTintColor: "#fff",
        sceneContainerStyle: {
          backgroundColor: "#B6C4B6",
        },
        drawerStyle: {
          backgroundColor: "#ccc",
        },
        drawerActiveBackgroundColor: "#3C486B",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        options={() => ({
          title: "My Blogs",
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <IconButton icon="home-outline" size={21} color={color} />
          ),
        })}
        name="MyBlogs"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "My Profile",
          drawerIcon: ({ color }) => (
            <IconButton icon="person-outline" size={21} color={color} />
          ),
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
                color="#fff"
                onPress={logoutHandler}
              />
            </View>
          ),
          headerTitle: "My Profile",
        }}
        name="User"
        component={UserProfile}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  // const [selectedOption, setSelectedOption] = useState("");

  // const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // function toggleDropdown() {
  //   setIsOpenDropdown(!isOpenDropdown);
  // }

  // function handleOptionChange(itemValue) {
  //   setSelectedOption(itemValue);
  //   setIsOpenDropdown(false);
  // }

  return (
    <View style={styles.rootContainer}>
      <StatusBar style="light" />
      <AuthContextProvider>
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

            {/* First, Second & Third Screen... */}
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
              name="SecondScreen"
              component={SecondScreen}
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
              name="Drawer"
              component={DrawerNavigator}
              options={{
                headerShown: false,
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
      </AuthContextProvider>
    </View>
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

  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 14,
  },
  dropdown: {
    backgroundColor: "#ccc",
    elevation: 8,
    borderRadius: 5,
  },
  picker: {
    width: 120,
    borderRadius: 5,
    elevation: 8,
  },
});
