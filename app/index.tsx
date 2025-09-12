import CustomButton from "@/Components/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet, Text, View, } from "react-native";

export default function Index() {
  const router = useRouter();

  const handleStart = () => {
    router.replace('/onborardingscreen');
  }

  return (
      <ImageBackground 
        style={{flex:1}}
        source={require("../assets/images/backgroundimage.jpg")}
      >
        <StatusBar barStyle='light-content' backgroundColor="transparent" translucent={true}/>
        <LinearGradient 
          colors={["#21628A00","#1F4C6B"]}
          style={StyleSheet.absoluteFillObject}
          start={{x:0.5, y:0}}
          end={{x:0.5, y:0.9}}
        >
          <View style={styles.container}>
            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Access</Text>
              <Text style={styles.title}>Home</Text>
            </View>
            
            {/* Button Section */}
            <View style={styles.buttonContainer}>
              <CustomButton onPress={handleStart} title="Let's Start"/>
            </View>

            {/* Version Text */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Made with love</Text>
              <Text style={styles.versionText2}>v1.0</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'latobold',
    fontWeight: '700',
    fontSize: 40,
    color: '#FFFFFF',
    justifyContent: 'center',
    textAlign: 'center',
    letterSpacing: -1.75, 
  },

  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  
  },

  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  versionText: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.8,
  },

  versionText2: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    fontWeight: 'bold'
  },
})