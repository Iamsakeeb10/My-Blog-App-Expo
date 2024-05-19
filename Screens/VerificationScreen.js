import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { AuthContext } from "../store/auth-context";
import AuthButton from "./../components/UI/AuthButton";

const CELL_COUNT = 6;

const VerificationScreen = ({ route }) => {
  const [value, setValue] = useState("");
  const [codeError, setCodeError] = useState("");

  const { updatedEmail } = useContext(AuthContext);
  // Necessary for sending api req....
  const userId = route.params.userId;
  console.log(userId);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const codeChangeHandler = (enteredValue) => {
    setValue(enteredValue);

    if (codeError) {
      setCodeError("");
    }
  };

  const verifyCodeHandler = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setCodeError(`Field can't be empty`);
      return;
    }

    if (trimmedValue.length !== 6) {
      setCodeError("Empty field found");
      return;
    }

    const isValid = /^\d+$/.test(value);

    if (!isValid) {
      setCodeError("Numbers required");
      return;
    }

    setCodeError("");

    console.log("value--****", value);
  };

  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.verificationText}>Verify email</Text>
      </View>
      <View style={{ marginTop: 2 }}>
        <Text style={styles.verificationTextSmall}>
          We sent a security code to <Text>{updatedEmail}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.verificationTextSmall}>
          You may need to check your junk or Spam folder
        </Text>
      </View>
      <View
        style={[
          styles.otpFieldContainer,
          { marginVertical: codeError ? 20 : 26 },
        ]}
      >
        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={codeChangeHandler}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused ? styles.focusCell : null,
                  index < value.length && /^\d+$/.test(value[index])
                    ? styles.validCell
                    : index === value.length && /^\d+$/.test(symbol)
                    ? styles.pendingCell
                    : symbol
                    ? styles.errorCell
                    : styles.defaultCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (!codeError && isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {codeError ? <Text style={styles.errorText}>{codeError}</Text> : ""}
        </View>
      </View>
      <View>
        <AuthButton onPress={verifyCodeHandler}>VERIFY</AuthButton>
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

  validCell: {
    borderColor: "green",
  },
  pendingCell: {
    borderColor: "#D6D6D6",
  },
  errorCell: {
    borderColor: "#E87B09",
  },

  errorText: {
    color: "#D2042D",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 3,
    fontFamily: "roboto-regular",
    textAlign: "center",
  },

  verificationText: {
    fontFamily: "roboto-semi",
    fontSize: 21,
    color: "#151312",
  },

  otpFieldContainer: {
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
