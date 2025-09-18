import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginButton from "../LoginButton/Loginbutton";

export default function EmptylocationDetails() {
  const { latitude, longitude, address } = useLocalSearchParams();
  const router = useRouter();

  /** Navigate to the location picker screen */
  const GotoChoose = () => {
    router.push("/location/chooselocation");
  };

  /** Skip selecting location */
  const Skip = () => {
    router.push("/location/selectestate");
  };

  /** Handle Next button logic */
  const ChooseLocation = () => {
    if (latitude && longitude && address) {
      // If location is already selected, go to the next screen with params
      router.push({
        pathname: "/location/selectestate",
        params: { latitude, longitude, address },
      });
    } else {
      // If no location chosen, open location picker
      router.push("/location/chooselocation");
    }
  };

  return (
    <View style={styles.page}>
      {/* Top Section */}
      <View>
        {/* Skip Button */}
        <TouchableOpacity onPress={Skip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>Add to your </Text>
            <Text style={styles.spanTitle}>location</Text>
          </View>
          <Text style={styles.descText}>
            You can edit this later in your account settings.
          </Text>
        </View>

        {/* Map Placeholder */}
        <TouchableOpacity onPress={GotoChoose} style={styles.mapWrapper}>
          <Image
            style={styles.mapImage}
            resizeMode="contain"
            source={require("../../assets/images/Map.png")}
          />
        </TouchableOpacity>

        {/* Selected Location Details */}
        <TouchableOpacity onPress={GotoChoose} style={styles.detailsContainer}>
          <View style={styles.locationRow}>
            <View style={styles.locationInfo}>
              <Ionicons name="location" size={18} color="#1F4C6B" />
              <Text style={latitude && longitude && address ? styles.selectedAddress : styles.detailsText}>
                {latitude && longitude && address
                  ? address
                  : "Location details"}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#A1A5C1"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomButton}>
        <LoginButton onPress={ChooseLocation} title="Next" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Page Layout */
  page: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
   
  },

  /** Skip Button */
  skipButton: {
    alignSelf: "flex-end",
    backgroundColor: "#F5F4F8",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  skipText: {
    fontFamily: "poppinsregular",
    color: "#3A3F67",
    fontSize: 12,
  },

  /** Header */
  titleContainer: {
    marginTop: 30,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainTitle: {
    fontFamily: "latomedium",
    fontSize: 25,
    letterSpacing: 1.2,
    color: "#000",
  },
  spanTitle: {
    fontFamily: "latoextrabold",
    fontWeight: "800",
    color: "#252B5C",
    fontSize: 25,
  },
  descText: {
    marginTop: 15,
    fontFamily: "latoregular",
    fontWeight: "400",
    fontSize: 14,
    color: "#53587A",
  },

  /** Map Section */
  mapWrapper: {
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: 350,
  },

  /** Location Details */
  detailsContainer: {
    marginTop: 20,
    padding: 16,
    height:70,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  detailsText: {
    fontSize: 16,
    fontFamily: "latoregular",
    color: "#A1A5C1",
  },
  selectedAddress: {
    fontSize: 14,
    fontFamily: "poppinsbold",
    color: "#252B5C",
    flexShrink: 1,
  },

  /** Bottom Button */
  bottomButton: {
    alignItems: "center",
    marginBottom: 20,
  },
});
