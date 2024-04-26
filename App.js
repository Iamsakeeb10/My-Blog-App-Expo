import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import BlogDetails from "./components/BlogDetails";
import HomeScreen from "./components/HomeScreen";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();

const App = () => {
  const [selectedOption, setSelectedOption] = useState("");
  // const selectedOptionRef = useRef("postAscending");

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  function toggleDropdown() {
    setIsOpenDropdown(!isOpenDropdown);
  }

  function handleOptionChange(itemValue) {
    setSelectedOption(itemValue);
    setIsOpenDropdown(false);
  }

  return (
    <View style={styles.rootContainer}>
      <StatusBar style="light" />
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
            headerRight: () => (
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdown}>
                  {isOpenDropdown && (
                    <Picker
                      style={styles.picker}
                      selectedValue={selectedOption}
                      onValueChange={(itemValue) =>
                        handleOptionChange(itemValue)
                      }
                    >
                      <Picker.Item label="Id" value="postId" />
                      <Picker.Item label="Ascending" value="postAscending" />
                      <Picker.Item label="Descending" value="postDescending" />
                    </Picker>
                  )}
                </View>
                <Pressable
                  onPress={toggleDropdown}
                  style={({ pressed }) => pressed && styles.pressed}
                >
                  <Ionicons name="filter-outline" color="#fff" size={24} />
                </Pressable>
              </View>
            ),
            headerTintColor: "#EEEEEE",
          }}
        >
          <Stack.Screen
            name="MyBlogs"
            // component={HomeScreen}
            options={{
              title: "My Blogs",
            }}
          >
            {() => <HomeScreen selectedDropdownOptionRef={selectedOption} />}
          </Stack.Screen>
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
