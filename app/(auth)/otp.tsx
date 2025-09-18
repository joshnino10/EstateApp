import LoginButton from "@/Components/LoginButton/Loginbutton";
import InputOtp from "@/Components/OtpInput/otpinput";
import { useGlobal } from "@/context/GlobalContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Otp() {
  const { email } = useGlobal();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);

  /** HANDLE TIMER **/
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /** FORMAT TIME **/
  const formattedTime = `0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;

  /** HANDLE BACK **/
  const goBack = () => {
    router.back();
  };

  /** HANDLE RESEND OTP **/
  const handleResendOtp = () => {
    if (!canResend) return;
    setTimeLeft(60); // Restart countdown
    setCanResend(false);

    console.log("OTP resent to:", email);
    // TODO: Add your API call to resend OTP here
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.page}>
          {/* BACK BUTTON */}
          <TouchableOpacity onPress={goBack}>
            <View style={styles.backButton}>
              <Feather name="arrow-left" size={20} color="black" />
            </View>
          </TouchableOpacity>

          {/* TITLE AND DESCRIPTION */}
          <View style={{ marginTop: 30 }}>
            <Text style={styles.title}>
              Enter the <Text style={styles.spantext}>code</Text>
            </Text>
            <Text style={styles.messageText}>
              Enter the 4-digit code that we just sent to
            </Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {/* OTP INPUT */}
          <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
            <InputOtp numberOfDigits={4} />
          </View>

          {/* TIMER */}
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <View style={styles.timecontainer}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={20}
                color="#252B5C"
              />
              <Text style={styles.time}>{formattedTime}</Text>
            </View>
          </View>

          {/* RESEND OTP */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
              <Text
                style={[
                  styles.resendText,
                  { color: canResend ? "#53587A" : "gray" },
                ]}
              >
                Didn’t receive the OTP?{" "}
                <Text style={{ fontWeight: "700", color: '#252B5C', fontFamily: 'poppinsbold' }}>
                  {canResend ? "Resend OTP" : "Wait"}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* REGISTER BUTTON */}
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <LoginButton title="Register" onPress={() => console.log("Register pressed")} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  page: {
    paddingHorizontal: 16,
  },

  /*** HEADER ***/
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "#F5F4F8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  /*** TITLE & TEXT ***/
  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "#252B5C",
  },
  spantext: {
    fontWeight: "800",
    color: "#252B5C",
  },
  messageText: {
    fontFamily: "latoregular",
    color: "#53587A",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 20,
  },
  email: {
    fontFamily: "latosemibold",
    marginTop: 5,
    fontSize: 16,
    color: "#252B5C",
    fontWeight: "600",
  },

  /*** TIMER ***/
  timecontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F5F4F8",
    padding: 15,
    borderRadius: 200,
  },
  time: {
    fontFamily: "poppinsmedium",
    fontSize: 12,
    fontWeight: "500",
    color: "#252B5C",
  },

  /*** RESEND OTP ***/
  resendText: {
    fontSize: 14,
    color: '#53587A',
    fontFamily: "poppinsmedium",
  },
});
