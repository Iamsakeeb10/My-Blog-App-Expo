// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const SwitchToggler = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [sliderPosition, setSliderPosition] = useState(0);

//   const toggleSwitch = () => {
//     setIsEnabled(!isEnabled);
//     setSliderPosition(sliderPosition === 0 ? -40 : 0); // Toggle slider position
//   };

//   return (
//     <TouchableOpacity style={styles.container} onPress={toggleSwitch}>
//       <View style={[styles.switch]}>
//         <View style={styles.textContainer}>
//           <Text style={[styles.text, isEnabled && styles.textEnabled]}>
//             বাং
//           </Text>
//           <Text style={[styles.text, !isEnabled && styles.textEnabled]}>
//             EN
//           </Text>
//         </View>
//         <View
//           style={[
//             styles.slider,
//             { transform: [{ translateX: sliderPosition }] },
//           ]}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
//   switch: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1.1,
//     borderRadius: 100,
//     borderColor: "#CCC9C9",
//     // borderColor: "#ACA1A0",
//     width: 78,
//     height: 28,
//     overflow: "hidden",
//   },
//   text: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//     textAlign: "center",
//     zIndex: 2,
//   },
//   textEnabled: {
//     color: "#fff",
//   },
//   slider: {
//     width: 37,
//     height: 25.5,
//     borderRadius: 100,
//     backgroundColor: "#D94638",
//     marginLeft: "auto",
//     transitionProperty: "transform",
//     transitionDuration: "0.3s",
//   },
//   textContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
// });

// export default SwitchToggler;

import React, { useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SwitchToggler = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderPosition] = useState(new Animated.Value(0)); // Use Animated.Value for slider position

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    // Animate slider position change
    Animated.timing(sliderPosition, {
      toValue: isEnabled ? 0 : -40,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleSwitch}>
      <View style={[styles.switch]}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, isEnabled && styles.textEnabled]}>
            বাং
          </Text>
          <Text style={[styles.text, !isEnabled && styles.textEnabled]}>
            EN
          </Text>
        </View>
        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX: sliderPosition }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.1,
    borderRadius: 100,
    borderColor: "#CCC9C9",
    // borderColor: "#ACA1A0",
    width: 78,
    height: 28,
    overflow: "hidden",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2,
  },
  textEnabled: {
    color: "#fff",
  },
  slider: {
    width: 37,
    height: 25.5,
    borderRadius: 100,
    backgroundColor: "#D94638",
    marginLeft: "auto",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default SwitchToggler;
