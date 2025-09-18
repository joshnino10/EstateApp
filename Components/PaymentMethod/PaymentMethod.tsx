import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoginButton from "../LoginButton/Loginbutton";

export default function PaymentMethod() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButtonWrapper}>
          <Ionicons name="chevron-back" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* TITLE SECTION */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add your</Text>
        <Text style={styles.spanTitle}>payment method</Text>
        <Text style={styles.desc}>
          You can edit this later on your account settings.
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            width: 353,
            height: 200,
            resizeMode: "cover",
            borderRadius: 20,
          }}
          source={require("../../assets/images/credit-card.png")}
        />
      </View>

      {/* FIXED NEXT BUTTON */}
      <View style={styles.content}>
        <LoginButton title="next" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  /** HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backButtonWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#F5F4F8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  skipButton: {
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

  /** TITLE */
  titleContainer: {
    marginBottom: 20,
  },

  title: {
    fontFamily: "latomedium",
    fontSize: 25,
    letterSpacing: 1.2,
    color: "#000",
  },
  spanTitle: {
    marginTop: 5,
    fontFamily: "latoextrabold",
    fontWeight: "800",
    color: "#252B5C",
    fontSize: 25,
  },
  desc: {
    fontFamily: "latoregular",
    fontSize: 14,
    color: "#53587A",
    fontWeight: "400",
    marginTop: 20,
  },

  /** FIXED BUTTON */
  content: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 0 : 20,
    left: 16,
    right: 16,
    alignItems: "center",
  },
});
