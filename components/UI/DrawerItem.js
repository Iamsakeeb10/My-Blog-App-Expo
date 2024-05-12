import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

const DrawerItem = ({ label, icon, onPress }) => (
  <Pressable
    style={({ pressed }) => pressed && styles.pressed}
    onPress={onPress}
  >
    <View style={styles.drawerItemContainer}>
      <View style={styles.drawerItemInnerContainer}>
        <Image style={styles.drawerIcon} source={icon} />
        <Text style={styles.drawerLabel}>{label}</Text>
      </View>
      <View style={styles.iconContainer}>
        <IconButton icon="chevron-forward-outline" size={20} color="#6F717A" />
      </View>
    </View>
  </Pressable>
);

export default DrawerItem;

const styles = StyleSheet.create({
  drawerIcon: {
    width: 23,
    height: 23,
  },

  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 11,
    marginLeft: 16,
    marginRight: 8,
  },

  drawerItemInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
    flex: 1,
  },

  drawerLabel: {
    fontSize: 13.1,
    fontFamily: "roboto-regular",
    color: "#151312",
  },

  pressed: {
    opacity: 0.7,
  },
});
