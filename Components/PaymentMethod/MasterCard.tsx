import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

export default function MasterCard() {
  return (
    <View>
      {/* Username Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#252B5C"
        />
        <Ionicons name="person-outline" size={18} color="#252B5C" style={styles.icon} />
      </View>

      {/* Card Number Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#252B5C"
          keyboardType="numeric"
        />
        <Ionicons name="card-outline" size={22} color="#252B5C" style={styles.icon} />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

      <View style={styles.inputContainer2}>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YY"
          placeholderTextColor="#252B5C"
          keyboardType="numeric"
        />
        <Feather name="calendar" size={20} color="black" style={styles.icon}/>
      </View>
      <View style={styles.inputContainer2}>
         <Ionicons name="card-outline" size={22} color="#252B5C" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          placeholderTextColor="#A1A5C1"
          keyboardType="numeric"
        />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: 12,
    gap:6,
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 70 : 60,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 15,
    width:190
  },

  input: {
    flex: 1,
    fontFamily: 'poppinsmedium',
    fontSize: 12,
    color: '#252B5C',
    
  },
  icon: {
    marginLeft: 8,
  },
});
