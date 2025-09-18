import PaymentMethod from '@/Components/PaymentMethod/PaymentMethod'
import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text,  } from 'react-native'

export default function Payment() {
  return (
    <SafeAreaView style={styles.safearea}>
        <PaymentMethod/>
  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea:{
        flex:1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,

    },
})