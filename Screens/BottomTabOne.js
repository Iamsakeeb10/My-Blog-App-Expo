import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const BottomTabOne = () => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        status={isChecked ? "checked" : "unchecked"}
        onPress={() => setChecked(!isChecked)}
      />
      <Text>Check me</Text>
    </View>
  );
};

export default BottomTabOne;

const styles = StyleSheet.create({});
