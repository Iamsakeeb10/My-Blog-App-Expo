import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const navigation = useNavigation();
  const { checkLoginStatus } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await checkLoginStatus();
        const userData = await AsyncStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData);

        if (parsedUserData && parsedUserData.access_token) {
          navigation.replace("Drawer");
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="#153448" />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
