import CustomButton from '@/Components/CustomButton';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
  
  export default function OnborardingScreen() {
    const router = useRouter();

    const Next = ()=>{
        router.replace('/onboardingscreen2')
    }
    
    return (
      <SafeAreaView style={styles.safearea}>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <View style={styles.container}>
          <View style={styles.TitleContainer}>
            <Text style={styles.title}>Discover Your Ideal</Text>
            <Text style={styles.title}>Stay at the Best Rates</Text>
          </View>
  
          <View style={styles.SubTitleContainer}>
            <Text style={styles.SubTitle}>Browse top-rated properties that fit your style</Text>
            <Text style={styles.SubTitle}>and budget with ease</Text>
          </View>
        </View>
  
        <View style={styles.imageContainer}>
          <ImageBackground 
            style={styles.imageBackground}
            source={require('../assets/images/onboardingimage1.png')}
            resizeMode='contain'
          >
            <View style={styles.buttonContainer}>
              <CustomButton onPress={Next}  title="Next"/>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    safearea: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    container: {
      paddingHorizontal: 20
    },
    TitleContainer: {
      marginTop: 40
    },
    title: {
      fontFamily: 'latoregular',
      fontSize: 35,
      fontWeight: '500',
      letterSpacing: 1
    },
    SubTitleContainer: {
      marginTop: 20
    },
    SubTitle: {
      fontFamily: "latoregular",
      color: '#292929',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 25
    },
    imageContainer: {
      flex: 1,
      paddingHorizontal: 20
    },
    imageBackground: {
      flex: 1
    },
    buttonContainer: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 50 : 70,
      left: Platform.OS === 'ios'? 80:65,
      right: 20,
      paddingHorizontal: 20
    }
  })