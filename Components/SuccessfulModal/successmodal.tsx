import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
 
} from 'react-native';
import { BlurView as ExpoBlurView } from 'expo-blur';
import LoginButton from '../LoginButton/Loginbutton';

const { width, height } = Dimensions.get('window');

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SuccessModal({ visible, onClose }: SuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ExpoBlurView intensity={20} style={styles.blurContainer}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Top indicator */}
            <View style={styles.topIndicator} />

            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <Image 
                style={{ width: 113, height: 100 }} 
                source={require('../../assets/images/successicon.png')}
              />
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Account created</Text>
              <Text style={styles.spantitle}>successfully</Text>
              <Text style={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur.
              </Text>
            </View>

            {/* Finish Button using LoginButton */}
            <View style={styles.buttonContainer}>
              <LoginButton
                title="Finish"
                onPress={onClose}
              />
            </View>
          </View>
        </View>
      </ExpoBlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    width: width,
    height: 491,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  topIndicator: {
    width: 60,
    borderWidth: 2,
    backgroundColor: '#53587A',
    borderRadius: 3,
    marginBottom: 42,
  },
  iconContainer: {
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 42,
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'latomedium',
    marginBottom:10
  },
  spantitle:{
    fontSize: 25,
    fontWeight: '800',
    color:"#252B5C",
    fontFamily: 'latoextrabold'

  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'poppinsregular',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});