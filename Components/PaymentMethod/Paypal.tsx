import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

export default function Paypal() {
  const [username, setUsername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View>
      {/* Username Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#A1A5C1"
          value={username}
          onChangeText={setUsername}
        />
        <Ionicons name="person-outline" size={18} color="#252B5C" style={styles.icon} />
      </View>

      {/* Card Number Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#A1A5C1"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
          maxLength={16} 
        />
        <Ionicons name="card-outline" size={22} color="#252B5C" style={styles.icon} />
      </View>

      {/* Date & CVV Row */}
      <View style={styles.row}>
        {/* Expiry Date */}
        <View style={styles.inputContainerSmall}>
          <Feather name="calendar" size={20} color="#252B5C" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YY"
            placeholderTextColor="#A1A5C1"
            keyboardType="numeric"
            value={cardDate}
            onChangeText={setCardDate}
            maxLength={8} // e.g., 12/12/24
          />
        </View>

        {/* CVV */}
        <View style={styles.inputContainerSmall}>
          <Ionicons name="lock-closed-outline" size={20} color="#252B5C" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            placeholderTextColor="#A1A5C1"
            keyboardType="numeric"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
            maxLength={3} // CVV usually 3 or 4 digits
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Shared Input Container */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 70 : 60,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 15,
  },

  /** Small Inputs (Date and CVV) */
  inputContainerSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 70 : 60,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 15,
    flex: 1,
    marginRight: 10,
  },

  /** Text Input Field */
  input: {
    flex: 1,
    fontFamily: 'poppinsmedium',
    fontSize: 14,
    color: '#252B5C',
    paddingLeft: 8,
  },

  /** Icon Styling */
  icon: {
    marginRight: 8,
  },

  /** Row for Date & CVV */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
