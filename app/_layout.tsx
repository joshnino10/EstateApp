import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import {
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StateProvider } from "@/context/GlobalContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    latoregular: Lato_400Regular,
    latothin: Lato_100Thin,
    latolight: Lato_300Light,
    latobold: Lato_700Bold,

    poppinsthin: Poppins_100Thin,
    poppinsregular: Poppins_400Regular,
    poppinslight:Poppins_300Light,
    poppinsmedium: Poppins_500Medium,
    poppinsbold: Poppins_700Bold,
    poppinssemibold: Poppins_600SemiBold,
    poppinsextrabold: Poppins_800ExtraBold,

  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <StateProvider>
    <Stack screenOptions={{ headerShown: false , gestureEnabled:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboardingscreen" />
      <Stack.Screen name="onboardingscreen2" />
      <Stack.Screen name="ready" />
      <Stack.Screen name="otp" />
    </Stack>
    </StateProvider>
  );
}
