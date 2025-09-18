import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectEstateDetails from '@/Components/SelectedEstate/SelectEstateDetails'

export default function SelectEstate() {
  return (
    <SafeAreaView style={styles.safearea}>
        <SelectEstateDetails/>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safearea:{
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0

  },

})