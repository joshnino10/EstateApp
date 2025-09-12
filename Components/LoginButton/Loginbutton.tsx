import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function LoginButton({ title, onPress, disabled = false }) {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={disabled ? null : onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8BC83F',
    height:65, 
    width: 280,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    fontFamily: 'poppinsbold',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  disabledText: {
    color: '#888888',
  },
})