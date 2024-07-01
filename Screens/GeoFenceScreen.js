import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GeoFenceScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          borderTopWidth: 2,
          borderTopColor: "rgba(190,190,190, 0.2)",
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../assets/GeoFenceIcon/illustration - geofence.png")}
          />
        </View>
        <Text style={styles.geoText}>No Geofence Added Yet!</Text>
        <Pressable>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Create Geofence</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default GeoFenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  imgContainer: {
    width: 187,
    height: 120,
  },

  geoText: {
    color: "#3A3A3F",
    fontSize: 19,
    fontFamily: "roboto-bold",
  },

  btnText: {
    fontSize: 12,
    fontFamily: "roboto-semi",
    color: "#fff",
  },
  btnContainer: {
    backgroundColor: "#E4342F",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 4,
  },
});
