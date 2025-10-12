import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

export default function Paypal() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="name"
          placeholderTextColor="#A1A5C1"
          value={name}
          onChangeText={setname}
        />
        <Ionicons
          name="person-outline"
          size={17}
          color="#252B5C"
          style={styles.icon}
        />
      </View>

   
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="#A1A5C1"
          keyboardType="numeric"
          value={email}
          onChangeText={setEmail}
        />
        <Ionicons
          name="card-outline"
          size={22}
          color="#252B5C"
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F4F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: Platform.OS === "ios" ? 70 : 60,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    fontFamily: "poppinsmedium",
    fontSize: 14,
    color: "#252B5C",
    paddingLeft: 8,
  },

  icon: {
    marginRight: 8,
  },

});
