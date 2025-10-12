import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Paypal from "./Paypal";
import MasterCard from "./MasterCard";
import Visa from "./Visa";

export default function ChoosePayment() {
  const [activeTab, setActiveTab] = useState("Mastercard");

  const tabs = [
    {
      id: "1",
      label: "Paypal",
      image: require("../../assets/images/paypal logo.png"),
      activeImage: require("../../assets/images/Paypalactive.png"),
    },
    {
      id: "2",
      label: "Mastercard",
      image: require("../../assets/images/masterlogo.png"),
      activeImage: require("../../assets/images/Mastercard logo.png"),
    },
    {
      id: "3",
      label: "Visa",
      image: require("../../assets/images/Visa logo.png"),
      activeImage: require("../../assets/images/Visa logo.png"), 
    },
  ];

  return (
    <View>
      {/* Tab Selector */}
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.label)}
                activeOpacity={0.8}
              >
                <View style={styles.innerTab}>
                
                  <Image
                    source={isActive ? tab.activeImage : tab.image}
                    style={styles.tabImage}
                    resizeMode="contain"
                  />
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {activeTab === "Paypal" && <Paypal />}
        {activeTab === "Mastercard" && <MasterCard />}
        {activeTab === "Visa" && <Visa />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    maxWidth: 600,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 200,
    flex: 1,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activeTab: {
    backgroundColor: "#234F68",
    ...Platform.select({
      ios: {
        shadowColor: "#234F68",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  innerTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabImage: {
    width: 23,
    height: 23,
  },
  tabText: {
    fontSize: 10,
    color: "#53587A",
    fontWeight: "500",
    textAlign: "center",
  },
  activeTabText: {
    fontFamily: "poppinsbold",
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "700",
  },
  contentContainer: {
    marginTop: 20,
  },
});
