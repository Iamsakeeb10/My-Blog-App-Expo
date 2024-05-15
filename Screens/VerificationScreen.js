import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AuthButton from "./../components/UI/AuthButton";

const CELL_COUNT = 6;

const VerificationScreen = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.verificationText}>Verify email</Text>
      </View>
      <View style={{ marginTop: 2 }}>
        <Text style={styles.verificationTextSmall}>
          We sent a security coe to <Text>reaz@finder-lbs.com</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.verificationTextSmall}>
          You may need to check your junk or Spam folder
        </Text>
      </View>
      <View style={styles.otpFieldContainer}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View>
        <AuthButton>VERIFY</AuthButton>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Didn't receive code?
          <Text style={styles.footerTextSpecific}> Resend</Text>
        </Text>
      </View>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },

  verificationText: {
    fontFamily: "roboto-semi",
    fontSize: 21,
    color: "#151312",
  },

  otpFieldContainer: {
    marginVertical: 26,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerContainer: {
    alignItems: "center",
    marginTop: 18,
  },

  verificationTextSmall: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    color: "#7B7B7B",
  },

  footerText: {
    color: "#6F717A",
    fontSize: 13,
    fontFamily: "roboto-regular",
  },

  footerTextSpecific: {
    color: "#6F717A",
    fontSize: 13,
    fontFamily: "roboto-semi",
    color: "#E4342F",
  },

  cell: {
    width: 36,
    height: 45,
    borderColor: "#D6D6D6",
    borderWidth: 0.7,
    borderRadius: 9,
    lineHeight: 46,
    color: "#151312",
    fontFamily: "roboto-semi",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 4,
  },

  focusCell: {
    borderColor: "#A0130F",
    borderWidth: 1,
  },
});
