import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import LoginButton from "../LoginButton/Loginbutton";

export default function ChooseLocationDetails() {
  const router = useRouter();

  const goback = () => {
    router.push("/location/emptylocation");
  };
  const Skip = ()=>{
    router.push('/location/selectestate')
  }

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 6.5244, // Lagos default coordinates
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationAddress, setLocationAddress] = useState("Fetching address...");
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
    updateAddress(markerCoordinate.latitude, markerCoordinate.longitude); // Load initial address
  }, []);

  /** Request location permission */
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  /** Convert coordinates to human-readable address */
  const updateAddress = async (latitude, longitude) => {
    try {
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (result.length > 0) {
        const { city, region, country } = result[0];
        const formattedAddress = [city, region, country]
          .filter(Boolean)
          .join(", ");
        setLocationAddress(formattedAddress);
      } else {
        setLocationAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setLocationAddress("Unable to fetch address");
    }
  };

  /** Get current location */
  const getCurrentLocation = async () => {
    try {
      if (!locationPermission) {
        Alert.alert("Permission Required", "Please enable location permission first.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      const newCoordinate = { latitude, longitude };

      setMarkerCoordinate(newCoordinate);
      setSelectedLocation({ ...selectedLocation, latitude, longitude });

      updateAddress(latitude, longitude); // Fetch address for current location

      mapRef.current?.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    } catch (error) {
      console.error("Error getting current location:", error);
      Alert.alert("Error", "Failed to get current location. Please try again.");
    }
  };

  /** Handle map press */
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    setSelectedLocation({ ...selectedLocation, ...coordinate });
    updateAddress(coordinate.latitude, coordinate.longitude); // Fetch address
  };

  /** Search by address */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Search Query", "Please enter a location to search.");
      return;
    }

    try {
      const geocodedLocations = await Location.geocodeAsync(searchQuery);

      if (geocodedLocations.length > 0) {
        const { latitude, longitude } = geocodedLocations[0];
        const newCoordinate = { latitude, longitude };

        setMarkerCoordinate(newCoordinate);
        setSelectedLocation({ ...selectedLocation, latitude, longitude });

        updateAddress(latitude, longitude); // Update address

        mapRef.current?.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      } else {
        Alert.alert("Location Not Found", "Please try a different search term.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      Alert.alert("Search Error", "Failed to search location. Please try again.");
    }
  };

  /** Handle final choose location */
  const handleChooseLocation = () => {
    if (!locationAddress || locationAddress === "Fetching address...") {
      Alert.alert("Error", "Please select a valid location before continuing.");
      return;
    }

    console.log("Selected Location:", markerCoordinate, locationAddress);

    // Navigate to next screen and pass location data
    router.push({
      pathname: "/location/emptylocation",
      params: {
        latitude: markerCoordinate.latitude.toString(),
        longitude: markerCoordinate.longitude.toString(),
        address: locationAddress,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goback} style={styles.backButtonWrapper}>
          <Ionicons name="chevron-back" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={Skip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={selectedLocation}
          onPress={handleMapPress}
          showsUserLocation={locationPermission}
          showsMyLocationButton={false}
          mapType="standard"
        >
          <Marker
            coordinate={markerCoordinate}
            title="Selected Location"
            description={locationAddress}
            pinColor="#4A90E2"
          />
        </MapView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="black" />
            <TextInput
              style={styles.searchInput}
              placeholder="Find location"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.micButton}
              onPress={() => console.log("Voice search")}
            >
              <Ionicons name="mic" size={20} color="#A1A5C1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Address Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationTitle}>Location Detail</Text>
          </View>
          <View style={styles.locationDetails}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationAddress}>
              {locationAddress || "Fetching address..."}
            </Text>
          </View>
        </View>

        {/* Current Location Button */}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
        >
          <Ionicons name="locate" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Choose Location Button */}
      <View style={styles.bottomContainer}>
        <LoginButton title="Choose your location" onPress={handleChooseLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 16,
    zIndex: 1000,
  },
  backButtonWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#F5F4F8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2000,
  },
  skipButton: {
    backgroundColor: "#F5F4F8",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  skipText: {
    fontFamily: "poppinsregular",
    color: "#3A3F67",
    fontSize: 12,
  },
  searchContainer: {
    height: 70,
    position: "absolute",
    top: Platform.OS === "ios" ? 120 : 100,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  searchBar: {
    height: Platform.OS === "android" ? 70 : 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "poppinsregular",
  },
  divider: { height: 36, width: 0.9, backgroundColor: "#A1A5C1" },
  micButton: { padding: 4 },
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },
  locationCard: {
    position: "absolute",
    bottom: 120,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  locationHeader: { marginBottom: 12 },
  locationTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#252B5C",
    fontFamily: "latobold",
  },
  locationDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationAddress: {
    fontSize: 15,
    color: "#53587A",
    fontFamily: "poppinsregular",
    fontWeight: "400",
    flex: 1,
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 220,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    paddingTop: 16,
    alignItems: "center",
  },
});
