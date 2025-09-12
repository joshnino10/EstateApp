import LoginButton from "@/Components/LoginButton/Loginbutton";
import { useGlobal } from "@/context/GlobalContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const { email, setEmail, password, setPassword } = useGlobal();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Track focus states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const router = useRouter();

  /** NAVIGATION **/
  const gotoRegister = () => {
    router.replace("/(auth)/register");
  };

  const gotoForgotPassword = () => {
    router.push('/(auth)/forgotpassword');
  };

  /** VALIDATION **/
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  /** HANDLE CHANGES **/
  const handleEmailChange = (value) => {
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value ? validateEmail(value) : "",
    }));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: value ? validatePassword(value) : "",
    }));
  };

  /** LOGIN HANDLER **/
  const handleLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    console.log("Logging in with:", { email, password });
    // Proceed with API call or authentication logic
  };

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.page}>
        <View style={{ marginTop: 60 }}>
          <Text style={styles.title}>
            Let’s <Text style={styles.spantext}>Sign In</Text>
          </Text>
          <Text style={styles.desc}>
            Please sign in to continue using our services
          </Text>

          <View style={{ marginTop: 60 }}>
            {/* EMAIL INPUT */}
            <View style={styles.inputWrapper}>
              {emailFocused ? (
                <LinearGradient
                  colors={["#8BC83F", "#1F4C6B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <View style={styles.innerInputContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={22}
                      color="#53587A"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Email"
                      value={email}
                      onChangeText={handleEmailChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.input}
                      placeholderTextColor="#999"
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                    />
                  </View>
                </LinearGradient>
              ) : (
                <View style={styles.innerInputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={22}
                    color="#252B5C"
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    placeholderTextColor="#999"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>
              )}
              {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
            </View>

            {/* PASSWORD INPUT */}
            <View style={styles.inputWrapper}>
              {passwordFocused ? (
                <LinearGradient
                  colors={["#8BC83F", "#1F4C6B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <View style={styles.innerInputContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#252B5C"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Password"
                      value={password}
                      onChangeText={handlePasswordChange}
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      placeholderTextColor="#999"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      style={styles.showButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={{ color: "#252B5C", fontWeight: "600" }}>
                        {showPassword ? "Hide" : "Show"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              ) : (
                <View style={styles.innerInputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color="#252B5C"
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    placeholderTextColor="#999"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={{ color: "#A1A5C1", fontWeight: "600" }}>
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}
            </View>

            {/* FORGOT PASSWORD LINK */}
            <TouchableOpacity
              onPress={gotoForgotPassword}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* LOGIN BUTTON */}
          <View style={{ alignSelf: "center", marginTop: 15 }}>
            {isFormFilled && (
              <LoginButton title="Login" onPress={handleLogin} />
            )}
          </View>
        </View>

        {/* FOOTER */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ color: "#53587A", fontSize: 14 }}>
            Don’t have an account?{" "}
            <Text
              onPress={gotoRegister}
              style={{ color: "#252B5C", fontWeight: "700" }}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  page: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
  spantext: {
    fontWeight: "800",
    color: "#252B5C",
  },
  desc: {
    marginTop: 20,
    fontSize: 14,
    color: "#53587A",
  },

  /** INPUT **/
  inputWrapper: {
    marginTop: 20,
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 2,
  },
  innerInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F4F8",
    borderRadius: 8,
    height: 70,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: "poppinssemibold",
    color: "#252B5C",
    fontWeight: "600",
  },
  showButton: {
    position: "absolute",
    right: 10,
  },

  /** ERROR **/
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },

  /** FORGOT PASSWORD **/
  forgotPasswordContainer: {
    marginTop: 15,
 
  },
  forgotPasswordText: {
    fontFamily: "poppinssemibold",
    color: "#1F4C6B",
    fontWeight: "600",
    fontSize: 14,
  },
});
