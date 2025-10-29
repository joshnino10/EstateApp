import { Platform, SafeAreaView, StatusBar, StyleSheet, Text,  } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <Text>home</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    SafeArea:{
        flex:1,
        backgroundColor: 'white',
        paddingTop:Platform.OS === "android"? StatusBar.currentHeight:0
    },

})