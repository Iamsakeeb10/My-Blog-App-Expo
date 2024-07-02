import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import AuthButton from "../components/UI/AuthButton";

const BillingDetailsScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.dateText}>July 2023</Text>
          <Text style={styles.lastUpdatedText}>
            Last updated: 10:40pm,06/06/23
          </Text>
        </View>
        {/* Due & Total Bill Container */}
        <View style={styles.dueAndTotalBillContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#6F717A",
                fontFamily: "roboto-regular",
              }}
            >
              Due Bill
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6F717A",
                fontFamily: "roboto-regular",
              }}
            >
              Total Bill
            </Text>
          </View>
          <View style={styles.divider} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={{ color: "#E87B09", fontFamily: "roboto-semi" }}>
              BDT 1,400.00
            </Text>
            <Text style={{ fontFamily: "roboto-semi", color: "#141312" }}>
              BDT 43,400.00
            </Text>
          </View>
        </View>
        {/* Billing Item  */}
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <Text
              style={{
                marginTop: 10,
                color: "#6F717A",
                fontSize: 13,
                fontFamily: "roboto-regular",
              }}
            >
              BILLING ITEMS(S)
            </Text>
          </View>
          <View style={styles.nameAndServiceChargeContainer}>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "roboto-semi",
                color: "#3A3A3F",
              }}
            >
              NAME
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "roboto-semi",
                color: "#3A3A3F",
              }}
            >
              SERVICE CHARGE
            </Text>
          </View>
        </View>
        {/* Billing Item Names */}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>DM-LA-43-0916</Text>
            <Text style={styles.billingItemText}>500.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>
              DM-LA-43-0916 (Office Bike)
            </Text>
            <Text style={styles.billingItemText}>400.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>DM-LA-43-0916</Text>
            <Text style={styles.billingItemText}>500.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>
              DM-LA-43-0916 (Office Bike)
            </Text>
            <Text style={styles.billingItemText}>400.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>DM-LA-43-0916</Text>
            <Text style={styles.billingItemText}>500.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>
              DM-LA-43-0916 (Office Bike)
            </Text>
            <Text style={styles.billingItemText}>400.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>DM-LA-43-0916</Text>
            <Text style={styles.billingItemText}>500.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>
              DM-LA-43-0916 (Office Bike)
            </Text>
            <Text style={styles.billingItemText}>400.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>DM-LA-43-0916</Text>
            <Text style={styles.billingItemText}>500.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>
              DM-LA-43-0916 (Office Bike)
            </Text>
            <Text style={styles.billingItemText}>400.00</Text>
          </View>
          <View style={styles.billingItemListContainer}>
            <Text style={styles.billingItemText}>DM-LA-43-0916</Text>
            <Text style={styles.billingItemText}>500.00</Text>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 12,
          }}
        >
          <AuthButton>PAY NOW</AuthButton>
        </View>
      </View>
    </>
  );
};

export default BillingDetailsScreen;

const styles = StyleSheet.create({
  dateText: {
    fontSize: 16,
    fontFamily: "roboto-semi",
    color: "#151312",
  },

  lastUpdatedText: {
    color: "#6F717A",
    fontFamily: "roboto-regular",
    fontSize: 12,
  },

  headerTextContainer: {
    alignItems: "center",
  },

  dueAndTotalBillContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 4,
    borderTopColor: "rgba(217,217,217,0.4)",
    borderBottomColor: "rgba(217,217,217,0.3)",
    padding: 12,
  },

  divider: {
    width: 1,
    backgroundColor: "rgba(217,217,217,0.6)",
    height: 63,
    position: "absolute",
    left: "50%",
  },

  nameAndServiceChargeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(214,214,214,0.4)",
    padding: 11,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginTop: 10,
  },

  billingItemListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginTop: 12,
    marginBottom: 12,
  },

  billingItemText: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    color: "#151312",
  },
});
