import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const navigation = useNavigation();
  const { checkLoginStatus, profileData } = useContext(AuthContext);

  useEffect(() => {
    const checkForLogin = async () => {
      const userData = await checkLoginStatus();

      try {
        if (userData && userData.access_token) {
          const shouldAddMobile = await AsyncStorage.getItem("shouldAddMobile");
          if (shouldAddMobile === "true") {
            navigation.replace("AddMobileNumberScreen");
          } else if (shouldAddMobile === "false") {
            navigation.replace("Drawer");
          }
        } else {
          navigation.replace("FirstScreen");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkForLogin();
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
