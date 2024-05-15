import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AuthButton from "../components/UI/AuthButton";

const EditProfileScreen = () => {
  const bottomSheetRef = useRef(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const snapPoints = ["100%"];

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.borderStyle} />
        <View style={styles.innerContainer}>
          {/* Full Name Input */}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Estiak Ahmed"
              placeholderTextColor="#151312"
            />
          </View>
          {/* Email Input */}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="estiak@finder-lbs.com"
                placeholderTextColor="#151312"
              />
              <Pressable onPress={openBottomSheet}>
                <Text style={styles.rowEndText}>Change</Text>
              </Pressable>
            </View>
          </View>
          {/* Phone Number Input */}
          <View style={[styles.inputContainer, styles.specificStyles]}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="+880 1XXXXXXXXX"
                placeholderTextColor="#7B7B7B"
              />
              <Text style={styles.rowEndText}>Add Number</Text>
            </View>
          </View>
          <View style={styles.btnContainerOuter}>
            <View style={styles.bottomBorder} />
            <Pressable style={styles.btnContainerInner}>
              <Text style={styles.btnText}>SAVE</Text>
            </Pressable>
          </View>
          {/* ****************** */}
          <BottomSheet
            detached={false}
            index={-1}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: "#fff" }}
            keyboardBehavior="interactive"
          >
            <BottomSheetView style={styles.bottomSheetContainer}>
              <View style={styles.sheetHeaderContainer}>
                <View>
                  <Text style={styles.subHeaderText}>Change Email?</Text>
                </View>
                <Pressable onPress={closeBottomSheet}>
                  <Image
                    style={styles.sheetIcon}
                    source={require("../assets/SheetIcon/Close.png")}
                  />
                </Pressable>
              </View>
              <View style={styles.enterPassTextContainer}>
                <Text style={styles.enterPassText}>Enter Password</Text>
              </View>
              <View style={styles.sheetSubHeaderTextContainer}>
                <Text style={styles.sheetSubHeaderText}>
                  Enter the password for estiak@finder-lbs.com
                </Text>
                <Text style={styles.sheetSubHeaderText}>
                  to change this email address
                </Text>
              </View>
              <View style={styles.sheetInputContainer}>
                <Text style={styles.bottomLabel}>New Email Address</Text>
                <TextInput
                  style={styles.bottomInput}
                  placeholderTextColor="#A3A3A3"
                  placeholder="Enter new email"
                />
              </View>
              <View style={styles.sheetBtnContainer}>
                <AuthButton>NEXT</AuthButton>
              </View>
            </BottomSheetView>
          </BottomSheet>

          {/* ****************** */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  innerContainer: {
    paddingTop: 9,
    flex: 1,
  },

  borderStyle: {
    borderTopWidth: 2,
    borderTopColor: "rgba(190,190,190, 0.2)",
  },

  inputContainer: {
    marginVertical: 8,
    paddingHorizontal: 22,
  },

  label: {
    color: "#151312",
    marginBottom: 6,
    fontSize: 13,
    fontFamily: "roboto-regular",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 7,
    fontSize: 13,
    borderWidth: 1.2,
    borderColor: "rgba(214,214,214, 0.7)",
  },

  specificStyles: {
    marginVertical: 6,
  },

  passwordContainer: {
    position: "relative",
    flexDirection: "row",
  },

  rowEndText: {
    position: "absolute",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -10 }],
    right: 12,
    color: "#7B7B7B",
    fontSize: 13,
    fontFamily: "roboto-regular",
  },

  btnContainerOuter: {
    flex: 2,
    justifyContent: "flex-end",
    marginVertical: 16,
  },

  btnContainerInner: {
    backgroundColor: "rgba(217,70,56, 0.5)",
    paddingVertical: 13.3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 22,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(190,190,190, 0.15)",
    marginBottom: 10,
  },

  bottomSheetContainer: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    paddingHorizontal: 18,
    flex: 1,
  },

  sheetHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sheetIcon: {
    width: 25,
    height: 25,
  },

  subHeaderText: {
    color: "#3A3A3F",
    fontFamily: "roboto-regular",
    fontSize: 15,
  },

  enterPassTextContainer: {
    marginTop: 2,
  },

  enterPassText: {
    textAlign: "center",
    fontSize: 19,
    fontFamily: "roboto-semi",
  },

  sheetSubHeaderTextContainer: {
    marginTop: 2,
  },
  sheetSubHeaderText: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    color: "#3A3A3F",
    textAlign: "center",
  },

  bottomLabel: {
    color: "#151312",
    marginBottom: 4,
    fontSize: 13,
  },
  bottomInput: {
    paddingLeft: 17,
    width: 312,
    height: 48,
    borderRadius: 7,
    fontSize: 13,
    borderWidth: 1.6,
    borderColor: "#DBDBDB",
    fontFamily: "roboto-regular",
  },

  sheetInputContainer: {
    marginTop: 8,
  },

  sheetBtnContainer: {
    marginTop: 10,
  },
});
