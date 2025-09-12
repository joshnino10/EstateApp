import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
  
  const { width } = Dimensions.get("window");

  const router = useRouter();

  const GotoLogin = () =>{
    router.replace('/(auth)/login')
  }

  const CreateAccount = () =>{
    router.replace('/(auth)/register')
  }
  
  const propertyImages = [
    {
      id: "1",
      image: require("../assets/images/house1.png"),
    },
  
    {
      id: "2",
      image: require("../assets/images/house2.png"),
    },
  
    {
      id: "3",
      image: require("../assets/images/house3.png"),
    },
  
    {
      id: "4",
      image: require("../assets/images/house4.png"),
    },
  ];
  
  export default function Ready() {
    const renderPropertyItem = ({ item }) => (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.propertyImage} />
      </View>
    );
  
    return (
      <SafeAreaView style={styles.Safearea}>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <View style={styles.PageContent}>
          <FlatList
            data={propertyImages}
            renderItem={renderPropertyItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <Text style={styles.ReadyText}>
              Ready to <Text style={styles.spanExplore}>explore?</Text>
            </Text>
          </View>
  
          <TouchableOpacity onPress={GotoLogin} style={styles.btnbox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons name="mail-outline" size={20} color="white" />
              <Text style={styles.btn}>Continue with Email</Text>
            </View>
          </TouchableOpacity>
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              marginTop: 40,
            }}
          >
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>
        </View>
  
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            alignSelf: "center",
            marginTop: 40,
          }}
        >
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require("../assets/images/Gmail.png")}
            />
          </View>
  
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require("../assets/images/Facebook.png")}
            />
          </View>
  
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require("../assets/images/Apple.png")}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <View style={{flexDirection:'row', gap:5}}>
             <Text style={styles.register}>Don’t have an account?</Text>
             <TouchableOpacity onPress={CreateAccount}>
               <Text style={styles.registerSpan}>Register</Text>
             </TouchableOpacity>
          </View>
         
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    Safearea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    PageContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
      color: "#333",
    },
    listContainer: {
      paddingBottom: 20,
    },
    row: {
      justifyContent: "space-between",
      marginBottom: 15,
    },
    imageContainer: {
      width: (width - 50) / 2,
      height: 174,
      backgroundColor: "#f8f8f8",
      borderRadius: 20,
      overflow: "hidden",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    propertyImage: {
      width: "100%",
      height: 174,
      resizeMode: "cover",
    },
  
    ReadyText: {
      fontFamily: "lato",
      fontSize: 25,
      fontWeight: 500,
      letterSpacing: 2.5,
    },
  
    spanExplore: {
      color: "#252B5C",
      fontWeight: "bold",
      fontSize: 30,
    },
  
    btnbox: {
      marginTop: 30,
      backgroundColor: "#8BC83F",
      alignItems: "center",
      justifyContent: "center",
      width: 280,
      height: 65,
      borderRadius: 10,
      alignSelf: "center",
    },
  
    btn: {
      fontFamily: "poppinsbold",
      color: "#FFFFFF",
      fontWeight: "500",
    },
  
    line: {
      width: 168,
      height: 0,
      borderWidth: 0.5,
      color: "#B8B8B8",
    },
    orText: {
      color: "#B8B8B8",
      fontSize: 17,
      fontFamily: "poppinslight",
    },
    logoBox: {
      borderColor: "#D0D0D0",
      borderWidth: 1,
      backgroundColor: "white",
      height: 48,
      width: 48,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
  
    logo: {
      width: 24,
      height: 24,
    },
    register:{
      fontFamily: 'latoregular',
      fontSize: 13,
      fontWeight: '400',
      color: '#53587A'
    },
  
    registerSpan:{
      fontFamily: 'latobold',
      fontSize:13,
      fontWeight: '700',
      color: "#252B5C",
  
    },
  });
  