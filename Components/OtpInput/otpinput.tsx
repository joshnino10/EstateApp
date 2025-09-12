import React from "react";
import { StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";

type OtpInputProps = {
  numberOfDigits?: number;
  value: string;
  placeholder?: string;
  onChange: (otp: string) => void;
  hasError?: boolean;
};

const InputOtp: React.FC<OtpInputProps> = ({
  numberOfDigits = 4,
  value,
  onChange, 
  placeholder = "",
  hasError = false
}) => {
  return (
    <OtpInput
      numberOfDigits={numberOfDigits}
      onTextChange={onChange}
      placeholder={placeholder}
      theme={{
        containerStyle: styles.otpContainer,
        pinCodeContainerStyle: [
          styles.pinCodeContainer,
          hasError && styles.errorContainer
        ],
        pinCodeTextStyle: styles.pinCodeText,
        focusedPinCodeContainerStyle: styles.focusedContainer,
        focusStickStyle: styles.focusStick,
      }}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    marginVertical:10,
   
  },
  pinCodeContainer: {
    width: 70,
    height: 70,
    borderRadius: 12 ,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    color: '#252B5C',
    backgroundColor: "#F5F4F8"
  },
  focusedContainer: {
    borderColor: "#252B5C",
 backgroundColor: "#F5F4F8",
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  pinCodeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3D4C",
  },
  focusStick: {
    backgroundColor: "#3B82F6",
    height: 20,
    width: 1,
  },
});

export default InputOtp;