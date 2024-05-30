// import React from "react";
// import { Image, StyleSheet, Text, View } from "react-native";

// const CustomTab = () => {
//   return (
//     <View
//       style={{
//         position: "absolute",
//         bottom: 15,
//         left: 15,
//         right: 15,
//       }}
//     >
//       <View style={styles.tabContainer}>
//         <View style={styles.tabInRow}>
//           <Image
//             style={styles.tabIcon}
//             source={require("../../assets/TabIcon/Map.png")}
//           />
//           <Text style={styles.tabText}>TRACKING</Text>
//         </View>
//         <View style={styles.tabInRow}>
//           <Image
//             style={styles.tabIcon}
//             source={require("../../assets/TabIcon/my-vehicle.png")}
//           />
//           <Text style={styles.tabText}>MY VEHICLE</Text>
//         </View>
//         <View style={styles.tabInRow}>
//           <Image
//             style={styles.tabIcon}
//             source={require("../../assets/TabIcon/Notifications.png")}
//           />
//           <Text style={styles.tabText}>ALERTS</Text>
//         </View>
//         <View style={styles.tabInRow}>
//           <Image
//             style={styles.tabIcon}
//             source={require("../../assets/TabIcon/More.png")}
//           />
//           <Text style={styles.tabText}>MORE</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default CustomTab;

// const styles = StyleSheet.create({
//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 100,
//     elevation: 8,
//   },

//   tabIcon: {
//     width: 24,
//     height: 24,
//   },

//   tabText: {
//     fontSize: 9,
//     fontFamily: "roboto-semi",
//     color: "#6F717A",
//   },

//   tabInRow: {
//     alignItems: "center",
//   },
// });

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomTab = ({ state, descriptors, navigation }) => {
  const currentRouteIndex = state.index;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 15,
        left: 15,
        right: 15,
      }}
    >
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = currentRouteIndex === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const getIconSource = (name) => {
            switch (name) {
              case "TRACKING":
                return require("../../assets/TabIcon/Map.png");
              case "MY VEHICLE":
                return require("../../assets/TabIcon/my-vehicle.png");
              case "ALERTS":
                return require("../../assets/TabIcon/Notifications.png");
              case "MORE":
                return require("../../assets/TabIcon/More.png");
              default:
                return null;
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabInRow, isFocused ? styles.activeTab : null]}
            >
              <Image style={styles.tabIcon} source={getIconSource(label)} />
              <Text
                style={[
                  styles.tabText,
                  isFocused ? styles.activeTabText : null,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
    borderRadius: 100,
    elevation: 8,
  },

  tabIcon: {
    width: 24,
    height: 24,
  },

  tabText: {
    fontSize: 9,
    fontFamily: "roboto-bold",
    color: "#6F717A",
  },

  tabInRow: {
    alignItems: "center",
    borderRadius: 100,
  },

  activeTab: {
    backgroundColor: "transparent", // Active background color
  },

  activeTabText: {
    color: "#E4342F", // Active tint color
  },
});
