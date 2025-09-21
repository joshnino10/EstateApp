import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginButton from '../LoginButton/Loginbutton';
import ChooseEstate from './ChooseEstate';

export default function SelectEstateDetails() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const GotoPayement = ()=>{
    router.push('/payment/payment')
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButtonWrapper}>
            <Ionicons name="chevron-back" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* TITLE SECTION */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select your preferable</Text>
          <Text style={styles.spanTitle}>real estate type</Text>
          <Text style={styles.desc}>
            You can edit this later on your account settings.
          </Text>
        </View>

        {/* CHOOSE ESTATE GRID */}
        <View style={styles.gridWrapper}>
          <ChooseEstate />
        </View>

        {/* FIXED NEXT BUTTON */}
        <View style={styles.content}>
          <LoginButton
            title="Next"
           onPress={GotoPayement}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  page: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  /** HEADER */
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButtonWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  skipButton: {
    backgroundColor: '#F5F4F8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  skipText: {
    fontFamily: 'poppinsregular',
    color: '#3A3F67',
    fontSize: 12,
  },

  /** TITLE */
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'latomedium',
    fontSize: 25,
    letterSpacing: 1.2,
    color: '#000',
  },
  spanTitle: {
    marginTop: 5,
    fontFamily: 'latoextrabold',
    fontWeight: '800',
    color: '#252B5C',
    fontSize: 25,
  },
  desc: {
    fontFamily: 'latoregular',
    fontSize: 14,
    color: '#53587A',
    fontWeight: '400',
    marginTop: 20,
  },

  /** GRID */
  gridWrapper: {
    flex: 1,
    marginTop: 10,
  },

  /** FIXED BUTTON */
  content: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
});
