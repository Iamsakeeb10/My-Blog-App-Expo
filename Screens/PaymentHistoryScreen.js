import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

const PaymentHistoryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          borderTopWidth: 2,
          borderTopColor: "rgba(190,190,190, 0.2)",
        }}
      />
      <View style={styles.horizontalSpace}>
        <View style={{ marginVertical: 12 }}>
          <Text style={styles.recentText}>Recent Payments</Text>
        </View>
        {/* Payments */}
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingBottom: 12,
            borderBottomColor: "rgba(217,217,217, 0.4)",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Image
              style={{ width: 44, height: 44, marginRight: 6 }}
              source={require("../assets/BillIcons/payment-paid.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#151312",
                marginBottom: 3,
              }}
            >
              Finder Payment
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-regular",
                color: "#3A3A3F",
              }}
            >
              Transaction ID: 42YQUnvR1 - Card
            </Text>
            <Text
              style={{
                color: "#6F717A",
                fontSize: 14,
                fontFamily: "roboto-regular",
              }}
            >
              09:20PM, June 26, 2023
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#00AE11",
              }}
            >
              BDT 1,200
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingVertical: 12,
            borderBottomColor: "rgba(217,217,217, 0.4)",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Image
              style={{ width: 44, height: 44, marginRight: 6 }}
              source={require("../assets/BillIcons/payment-paid.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#151312",
                marginBottom: 3,
              }}
            >
              Finder Payment
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-regular",
                color: "#3A3A3F",
              }}
            >
              Transaction ID: 42YQUnvR1 - Card
            </Text>
            <Text
              style={{
                color: "#6F717A",
                fontSize: 14,
                fontFamily: "roboto-regular",
              }}
            >
              09:20PM, June 26, 2023
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#00AE11",
              }}
            >
              $340
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingVertical: 12,

            borderBottomColor: "rgba(217,217,217, 0.4)",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Image
              style={{ width: 44, height: 44, marginRight: 6 }}
              source={require("../assets/BillIcons/payment-paid.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#151312",
                marginBottom: 3,
              }}
            >
              Finder Payment
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-regular",
                color: "#3A3A3F",
              }}
            >
              Transaction ID: 42YQUnvR1 - Card
            </Text>
            <Text
              style={{
                color: "#6F717A",
                fontSize: 14,
                fontFamily: "roboto-regular",
              }}
            >
              09:20PM, June 26, 2023
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#00AE11",
              }}
            >
              $340
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            borderBottomColor: "rgba(217,217,217, 0.4)",
            borderBottomWidth: 1,
            paddingVertical: 12,
          }}
        >
          <View>
            <Image
              style={{
                width: 44,
                height: 44,
                marginRight: 6,
              }}
              source={require("../assets/BillIcons/payment-paid.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#151312",
                marginBottom: 3,
              }}
              t
            >
              Finder Payment
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-regular",
                color: "#3A3A3F",
              }}
            >
              Transaction ID: 42YQUnvR1 - Card
            </Text>
            <Text
              style={{
                color: "#6F717A",
                fontSize: 14,
                fontFamily: "roboto-regular",
              }}
            >
              09:20PM, June 26, 2023
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "roboto-semi",
                color: "#00AE11",
              }}
            >
              $340
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentHistoryScreen;

const styles = StyleSheet.create({
  horizontalSpace: {
    paddingLeft: 20,
    paddingRight: 8,
  },

  recentText: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    color: "#6F717A",
  },
});
