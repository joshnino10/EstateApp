import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LoginButton from '../LoginButton/Loginbutton';
import SuccessModal from '../SuccessfulModal/successmodal';

export default function AccountSetupDetails() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to make this work!'
        );
      }
    })();
  }, []);

  // Debug: Log when modal state changes
  useEffect(() => {
    console.log('Modal visibility changed:', showSuccessModal);
  }, [showSuccessModal]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    Alert.alert('Skip', 'You can complete your profile later');
  };

  const pickImage = async () => {
    setIsImageLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setIsImageLoading(false);
    }
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[0-9+\-\s()]{10,}$/.test(phone);

  const handleNext = async () => {
    console.log('handleNext called');
    if (isSubmitting) return;

    if (!formData.fullName.trim()) {
      Alert.alert('Missing Info', 'Please enter your full name.');
      return;
    }
    if (formData.fullName.trim().length < 2) {
      Alert.alert('Invalid Name', 'Full name must be at least 2 characters long.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert('Missing Info', 'Please enter your phone number.');
      return;
    }
    if (!validatePhone(formData.phoneNumber)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Missing Info', 'Please enter your email address.');
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    console.log('All validations passed');
    setIsSubmitting(true);
    console.log('Form data:', formData, 'Profile image:', profileImage);

    setTimeout(() => {
      console.log('Setting modal to true');
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleModalClose = () => {
    console.log('Modal closing');
    setShowSuccessModal(false);
    // Navigate to home or dashboard
    // router.push('/home');
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButtonWrapper}>
              <Ionicons name="chevron-back" size={18} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* TITLE */}
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>Fill your</Text>
              <Text style={styles.spanTitle}> information</Text>
            </View>
            <Text style={styles.title}>below</Text>
          </View>

          <Text style={styles.helperText}>
            You can edit this later on your account setting.
          </Text>

          {/* PROFILE IMAGE */}
          <View style={styles.profileSection}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.profileImageContainer}
              disabled={isImageLoading}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  {isImageLoading ? (
                    <ActivityIndicator size="large" color="#234F68" />
                  ) : (
                    <Ionicons name="person-outline" size={50} color="#999" />
                  )}
                </View>
              )}
              <View style={styles.editButton}>
                <Ionicons name="pencil" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* FORM INPUTS */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Image
                style={{ marginRight: 10, width: 20, height: 20, tintColor: '#252B5C' }}
                source={require('../../assets/images/Profile.png')}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#A1A5C1"
                value={formData.fullName}
                onChangeText={(text) => updateFormData('fullName', text)}
                autoCapitalize="words"
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#252B5C" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#A1A5C1"
                keyboardType="phone-pad"
                value={formData.phoneNumber}
                onChangeText={(text) => updateFormData('phoneNumber', text)}
              />
            </View>

            {/* Email */}
            <View style={[styles.inputContainer, styles.emailContainer]}>
              <Ionicons name="mail-outline" size={20} color="#fff" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.emailInput]}
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.6)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
              />
            </View>
          </View>

          {/* NEXT BUTTON */}
          <View style={{ alignSelf: 'center' }}>
            <LoginButton
              title={isSubmitting ? 'Finishing...' : 'Next'}
              onPress={handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting && <ActivityIndicator color="blue" size="large" />}
            </LoginButton>
          </View>
        </View>
      </ScrollView>

      {/* SUCCESS MODAL */}
      <SuccessModal visible={showSuccessModal} onClose={handleModalClose} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
  header: {
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
  titleContainer: { marginBottom: 20 },
  title: {
    fontFamily: 'latomedium',
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: 1.7,
  },
  spanTitle: {
    fontFamily: 'latoextrabold',
    fontSize: 25,
    fontWeight: '800',
    color: '#252B5C',
    letterSpacing: 1,
  },
  helperText: {
    fontSize: 12,
    color: '#A1A5C1',
    marginBottom: 32,
    fontFamily: 'poppinsregular',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  profileImageContainer: { position: 'relative' },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#234F68',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  formContainer: { marginBottom: 32 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: 12,
    height: 70,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emailContainer: { backgroundColor: '#234F68' },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'poppinsregular',
    color: '#252B5C',
  },
  emailInput: { color: '#fff' },
});