import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

const UserProfileScreen = () => {
  const { getUserData } = useContext(AuthContext);

  const userData = getUserData();

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>Name: {userData.userName}</Text>
          <Text style={styles.userEmail}>Email: {userData.email}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    textAlign: "center",
    fontSize: 24,
  },

  userEmail: {
    alignSelf: "center",
    fontSize: 22,
  },
});
