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

export default function AccountSetupDetails() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });
  const [errors, setErrors] = useState({
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

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    // Navigate to next screen or home
    // router.push('/(tabs)');
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleNext = async () => {
    if (isSubmitting) return;

    const newErrors = {
      fullName: '',
      phoneNumber: '',
      email: '',
    };

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Validate Phone Number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    // Check if there are any errors
    if (!newErrors.fullName && !newErrors.phoneNumber && !newErrors.email) {
      setIsSubmitting(true);
      
      // Simulate API call or data saving
      console.log('Form data:', formData, 'Profile image:', profileImage);
      
      // Simulate network delay
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert('Success', 'Account setup completed!', [
          {
            text: 'Continue',
            onPress: () => {
              // router.push('/account-setup/success');
            }
          }
        ]);
      }, 1500);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    setErrors({ ...errors, [field]: '' });
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
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButtonWrapper}>
              <Ionicons name="chevron-back" size={18} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

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

          {/* Profile Image Section */}
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

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.fullName && styles.inputError]}>
                
                <Image style={{marginRight:10 ,width:20, height:20, tintColor:'#252B5C'}} source={require('../../assets/images/Profile.png')}/>
                    
          
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#A1A5C1"
                  value={formData.fullName}
                  onChangeText={(text) => updateFormData('fullName', text)}
                  autoCapitalize="words"
                />
              </View>
              {errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>

            {/* Phone Number */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.phoneNumber && styles.inputError]}>
                <Ionicons 
                  name="call-outline" 
                  size={20} 
                  color={errors.phoneNumber ? '#FF6B6B' : '#252B5C'} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#A1A5C1"
                  keyboardType="phone-pad"
                  value={formData.phoneNumber}
                  onChangeText={(text) => updateFormData('phoneNumber', text)}
                />
              </View>
              {errors.phoneNumber ? (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              ) : null}
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <View style={[
                styles.inputContainer, 
                styles.emailContainer,
                errors.email && styles.inputErrorEmail
              ]}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={errors.email ? '#FF6B6B' : '#fff'} 
                  style={styles.inputIcon} 
                />
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
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>
          </View>

          {/* Next Button */}
          <View style={{alignSelf: 'center'}}>

          <LoginButton  
            title={isSubmitting ? "Finish" : "Next"}
            onPress={handleNext}
            disabled={isSubmitting}
            >
            {isSubmitting && <ActivityIndicator color="blue" size="large" />}
          </LoginButton>
      </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
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
  titleContainer: {
    marginBottom: 20,
  },
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
    marginTop:40,
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
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
  formContainer: {
    marginBottom: 32,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: 12,
    height: 70,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  emailContainer: {
    backgroundColor: '#234F68',
  },
  inputError: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  inputErrorEmail: {
    borderColor: '#FF6B6B',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'poppinsregular',
    color: '#252B5C',
  },
  emailInput: {
    color: '#fff',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 11,
    marginTop: 6,
    marginLeft: 4,
    fontFamily: 'poppinsregular',
  },
  nextButton: {
    backgroundColor: '#8BC83F',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#8BC83F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonDisabled: {
    backgroundColor: '#A8D47E',
    opacity: 0.7,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'latobold',
  },
});