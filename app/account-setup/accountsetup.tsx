import { Platform, SafeAreaView, StatusBar, StyleSheet,} from 'react-native'
import React from 'react'
import AccountSetupDetails from '@/Components/AccountSetup/AccountSetupDetails'

export default function accountsetup() {
  return (
    <SafeAreaView style={styles.safearea}>
        <AccountSetupDetails/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea:{
        flex:1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0
    }

})