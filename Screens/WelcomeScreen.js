import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const navigation = useNavigation();
  const { checkLoginStatus, user } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = () => {
      try {
        checkLoginStatus();

        if (user.access_token) {
          navigation.replace("Drawer");
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, [user, checkLoginStatus]);

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
