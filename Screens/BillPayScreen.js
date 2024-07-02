import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../components/UI/AuthButton";
import IconButton from "../components/UI/IconButton";

const BillPayScreen = ({ navigation }) => {
  const { height: screenHeight } = Dimensions.get("window");

  const bottomSheetRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState(["45%"]);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetIndex(0);
    bottomSheetRef.current?.expand();
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIndex(-1);
    bottomSheetRef.current?.close();
    setIsOpen(false);
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#5C0300", height: screenHeight * 0.44 }}
      >
        <StatusBar barStyle="light-content" />
        <View style={[styles.headerContainer]}>
          <IconButton
            onPress={() => navigation.goBack()}
            icon="arrow-back-outline"
            size={29}
            color="#fff"
          />
          <View style={styles.billTextContainer}>
            <Text style={styles.billText}>Bill & Payments</Text>
          </View>
        </View>
        <View style={styles.subHeaderTextContainer}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "roboto-regular",
              color: "#fff",
            }}
          >
            Total Bill
          </Text>
          <Text
            style={{ fontSize: 24, fontFamily: "roboto-semi", color: "#fff" }}
          >
            BDT 1800.00
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "roboto-regular",
              marginTop: 8,
              color: "#fff",
            }}
          >
            Your Billing Date: July 28, 2023
          </Text>
        </View>
      </SafeAreaView>
      {/* Card Section */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 7,
          padding: 12,
          marginHorizontal: 15,
          transform: [{ translateY: -screenHeight * 0.12 }],
          marginBottom: -screenHeight * 0.12,
          elevation: 6,
        }}
      >
        <View style={styles.cardHeaderContainer}>
          <View style={styles.billingIconContainer}>
            <View>
              <Image
                style={styles.payIcon}
                source={require("../assets/BillIcons/bkash.png")}
              />
            </View>
            <View>
              <Image
                style={styles.payIcon}
                source={require("../assets/BillIcons/nagad.png")}
              />
            </View>
            <View>
              <Image
                style={styles.payIcon}
                source={require("../assets/BillIcons/rocket.png")}
              />
            </View>
            <View
              style={{
                backgroundColor: "#F0F0F0",
                borderRadius: 100,
                paddingVertical: 3,
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontSize: 9, color: "#3A3A3F" }}>+2</Text>
            </View>
          </View>
          <View style={styles.billingTextContainer}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "roboto-regular",
                  color: "#3A3A3F",
                }}
              >
                Billing ID:
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: "roboto-semi" }}>150457</Text>
            </View>
            <View>
              <Image
                style={{ width: 16, height: 16 }}
                source={require("../assets/BillIcons/Copy-16px.png")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(190,190,190, 0.2)",
            marginTop: 12,
            marginBottom: 6,
          }}
        />

        <View style={styles.dueBillContainer}>
          <View style={{}}>
            <Text
              style={{
                color: "#6F717A",
                fontSize: 14,
                fontFamily: "roboto-regular",
              }}
            >
              Total assets
            </Text>
            <Text
              style={{ fontSize: 14, fontFamily: "roboto-semi", marginTop: 2 }}
            >
              24
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#6F717A",
                fontSize: 14,
                fontFamily: "roboto-regular",
              }}
            >
              Due Bill
            </Text>
            <Text
              style={{ fontSize: 14, fontFamily: "roboto-semi", marginTop: 2 }}
            >
              BDT 340.00
            </Text>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(190,190,190, 0.2)",
            marginTop: 12,
            marginBottom: 6,
          }}
        />
        <View>
          <Pressable
            onPress={() => navigation.navigate("BillingDetailsScreen")}
            style={{
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                color: "#E4342F",
                fontFamily: "roboto-semi",
                fontSize: 14,
              }}
            >
              View Billing Details
            </Text>
            <View
              style={{
                transform: [{ translateY: 1 }],
              }}
            >
              <IconButton
                icon="chevron-forward-outline"
                size={14}
                color="#E4342F"
              />
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate("PaymentHistoryScreen")}
        style={styles.paymentHistoryContainer}
      >
        <View style={styles.paymentHistoryInnerContainer}>
          <Text
            style={{
              fontSize: 14,
              color: "#3A3A3F",
              fontFamily: "roboto-semi",
            }}
          >
            Payment History
          </Text>
        </View>
        <View>
          <IconButton
            icon="chevron-forward-outline"
            size={20}
            color="##3A3A3F"
          />
        </View>
      </Pressable>

      {/* Footer */}
      <View
        style={{
          paddingHorizontal: 15,
          marginBottom: 20,
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <AuthButton onPress={openBottomSheet}>PAY NOW</AuthButton>
      </View>
      {/* Bottomsheet */}
      <BottomSheet
        detached={false}
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "#ccc" }}
        keyboardBehavior="interactive"
        onClose={closeBottomSheet}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View style={styles.bottomSheetContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "roboto-semi",
                    color: "#151312",
                  }}
                >
                  Payment Methods
                </Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Pressable
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/VerificationScreenIcons/Close.png")}
                  />
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.bottomSheetRowContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <BouncyCheckbox
                    size={20}
                    fillColor="#3A3A3F"
                    unFillColor="#FFFFFF"
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                  />
                </View>
                <View>
                  <Text style={styles.bottomSheetText}>bKash</Text>
                </View>
              </View>
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/BillIcons/bKash copy.png")}
                />
              </View>
            </Pressable>
            <Pressable style={styles.bottomSheetRowContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <BouncyCheckbox
                    size={20}
                    fillColor="#3A3A3F"
                    unFillColor="#FFFFFF"
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                  />
                </View>
                <View>
                  <Text style={styles.bottomSheetText}>Sslcommerz</Text>
                </View>
              </View>
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/BillIcons/sslcommerz.png")}
                />
              </View>
            </Pressable>
            <Pressable style={styles.bottomSheetRowContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <BouncyCheckbox
                    size={20}
                    fillColor="#3A3A3F"
                    unFillColor="#FFFFFF"
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                  />
                </View>
                <View>
                  <Text style={styles.bottomSheetText}>Nagad</Text>
                </View>
              </View>
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/BillIcons/nagad copy.png")}
                />
              </View>
            </Pressable>
            <View style={{ marginTop: 20 }}>
              <AuthButton>CONFIRM & PAY</AuthButton>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default BillPayScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  billTextContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  billText: {
    fontSize: 16, // Adjust font size as needed
    fontFamily: "roboto-semi",
    color: "#fff",
  },
  subHeaderTextContainer: {
    alignItems: "center",
    marginTop: 18,
  },

  payIcon: {
    width: 20,
    height: 20,
  },

  cardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  billingIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  billingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  dueBillContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  paymentHistoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2,
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 15,
    marginTop: 8,
    borderRadius: 7,
    elevation: 4,
  },

  paymentHistoryInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 13,
  },

  bottomSheetIcon: {
    width: 26,
    height: 26,
  },

  bottomSheetContainer: {
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: "center",
  },

  bottomSheetRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 6,
  },

  bottomSheetText: {
    fontFamily: "roboto-regular",
    fontSize: 14,
    color: "#3A3A3F",
    transform: [{ translateX: -7 }],
  },
});
