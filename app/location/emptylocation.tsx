import EmptylocationDetails from '@/Components/EmptyLocation/EmptylocationDetails'
import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, } from 'react-native'

export default function Emptylocation() {
  return (
    <SafeAreaView style={styles.safearea}> 
     <StatusBar barStyle='dark-content' backgroundColor="white"/>
    <EmptylocationDetails/>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea:{
        flex:1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,

    },


})