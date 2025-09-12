import CustomButton from "@/Components/CustomButton";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const onboardingsteps = [
  {
    Title1: "List and Sell Your Property",
    Title2: "Instantly",
    subTitle1: "Reach thousands of buyers with a simple and",
    subTitle2: "fast listing process",
    Image: require("../assets/images/onboardingimage2.png"),
  },

  {
    Title1: "Find the Perfect Choice for",
    Title2: "Your Future House",
    subTitle1: "Browse handpicked homes that match your lifestyles",
    subTitle2: "and future goals",
    Image: require("../assets/images/onboardingimage3.png"),
  },
];

export default function OnborardingScreen2() {
  const router = useRouter();
  const Goback = () => {
    router.push('/onborardingscreen');
  };
  const [screenindex, setScreenindex] = useState(0);

  const currentStep = onboardingsteps[screenindex];

  const Continue = () => {
    const isLastscreen = screenindex === onboardingsteps.length - 1;
    if (isLastscreen) {
      endonboarding();
    } else {
      setScreenindex(screenindex + 1);
    
    } 
  };

  const endonboarding = () => {
    setScreenindex(0);
    router.replace('/ready')
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.skipcontainer}>
          <TouchableOpacity onPress={endonboarding}>
            <Text style={styles.skipbutton}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TitleContainer}>
          <Text style={styles.title}>{currentStep.Title1}</Text>
          <Text style={styles.title}>{currentStep.Title2}</Text>
        </View>

        <View style={styles.SubTitleContainer}>
          <Text style={styles.SubTitle}>{currentStep.subTitle1}</Text>
          <Text style={styles.SubTitle}>{currentStep.subTitle2}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.imageBackground}
          source={currentStep.Image}
          resizeMode="contain"
        >
          <View style={styles.buttonContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={Goback}>
                <View
                  style={{
                    width: 54,
                    height: 54,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2000,
                  }}
                >
                 <Feather name="arrow-left" size={24} color="black" />
             
                </View>
              </TouchableOpacity>
              <CustomButton onPress={Continue} title="Next" />
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    marginBottom:10,
    paddingHorizontal: 20,
  },
  skipcontainer: {
    alignItems: "flex-end",

  },
  skipbutton: {
    fontFamily: "poppinsregular",
    color: "#414141",
    fontWeight: "400",
    fontSize: 16,
  },

  TitleContainer: {
    marginTop: 40,
  },
  title: {
    fontFamily: "latoregular",
    fontSize: Platform.OS === 'ios'? 30: 29,
    fontWeight: "500",
    letterSpacing: 1,
  },
  SubTitleContainer: {
    marginTop: 15,
  },
  SubTitle: {
    fontFamily: "latoregular",
    color: "#292929",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 25,
  },
  imageContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageBackground: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 70,
    left: Platform.OS === "ios" ? 5 : 10,
    right: 20,
    paddingHorizontal: 20,
  },
});
