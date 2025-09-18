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
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default function Register() {
  const { fullName, setFullName, email, setEmail, password, setPassword } = useGlobal();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Focus states for gradient borders
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const router = useRouter();

  const goToLogin = () => {
    router.replace("/(auth)/login");
  };

  /** VALIDATION **/
  const validateName = (value: string) => (!value ? "Name is required" : "");
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };
  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  /** HANDLE CHANGES **/
  const handleNameChange = (value: string) => {
    setFullName(value);
    setErrors((prev) => ({ ...prev, fullName: validateName(value) }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  /** REGISTER HANDLER **/
  const handleRegister = () => {
    const nameError = validateName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setErrors({
        fullName: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    if (!isChecked) {
      alert("Please agree to the Terms of Service and Privacy Policy before continuing.");
      return;
    }

    console.log("Registering with:", { fullName, email, password });
    router.push("/(auth)/otp");
  };

  // Button enabled only when all fields are filled
  const isFormFilled = fullName.trim() && email.trim() && password.trim();

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.page}>
            {/* TITLE */}
            <View style={{ marginTop: 60 }}>
              <Text style={styles.title}>
                Create your <Text style={styles.spantext}>account</Text>
              </Text>
              <Text style={styles.desc}>Please create an account to register</Text>

              <View style={{ marginTop: 60 }}>
                {/* NAME INPUT */}
                <View style={styles.inputWrapper}>
                  {nameFocused ? (
                    <LinearGradient
                      colors={["#8BC83F", "#1F4C6B"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientBorder}
                    >
                      <View style={styles.innerInputContainer}>
                        <Ionicons name="person-outline" size={22} color="#53587A" style={styles.icon} />
                        <TextInput
                          placeholder="Full Name"
                          value={fullName}
                          onChangeText={handleNameChange}
                          autoCapitalize="words"
                          style={styles.input}
                          placeholderTextColor="#999"
                          onFocus={() => setNameFocused(true)}
                          onBlur={() => setNameFocused(false)}
                        />
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.innerInputContainer}>
                      <Ionicons name="person-outline" size={22} color="#252B5C" style={styles.icon} />
                      <TextInput
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={handleNameChange}
                        autoCapitalize="words"
                        style={styles.input}
                        placeholderTextColor="#999"
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                      />
                    </View>
                  )}
                  {errors.fullName ? <Text style={styles.error}>{errors.fullName}</Text> : null}
                </View>

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
                        <Ionicons name="mail-outline" size={22} color="#53587A" style={styles.icon} />
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
                      <Ionicons name="mail-outline" size={22} color="#252B5C" style={styles.icon} />
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
                        <Ionicons name="lock-closed-outline" size={20} color="#252B5C" style={styles.icon} />
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
                      <Ionicons name="lock-closed-outline" size={22} color="#252B5C" style={styles.icon} />
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
                  {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                </View>

                {/* TERMS & CONDITIONS */}
                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    onPress={() => setIsChecked(!isChecked)}
                    style={[
                      styles.checkbox,
                      { backgroundColor: isChecked ? "#8BC83F" : "#F5F4F8" },
                    ]}
                  >
                    {isChecked && <Ionicons name="checkmark" size={14} color="white" />}
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    By signing up, you agree to the{" "}
                    <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                    <Text style={styles.linkText}>Privacy Policy</Text>.
                  </Text>
                </View>
              </View>

              {/* REGISTER BUTTON */}
              <View style={{ alignSelf: "center", marginTop: 20 }}>
                <LoginButton
                  title="Register"
                  onPress={handleRegister}
                  disabled={!isFormFilled || !isChecked}
                  style={{ opacity: isFormFilled && isChecked ? 1 : 0.5 }}
                />
              </View>
            </View>

            {/* FOOTER */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{ color: "#53587A", fontSize: 14 }}>
                Already have an account?{" "}
                <Text onPress={goToLogin} style={{ color: "#252B5C", fontWeight: "700" }}>
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

  /*** INPUT ***/
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

  /*** ERROR TEXT ***/
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },

  /*** TERMS ***/
  termsContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  termsText: {
    fontFamily: 'poppinsmedium',
    fontWeight: '500',
    fontSize: 13,
    color: "#B8B8B8",
    flex: 1,
    lineHeight: 18,
  },
  linkText: {
    fontWeight: "600",
    color: "#252B5C",
  },
});
