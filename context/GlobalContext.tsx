import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of our global state
interface GlobalState {
  fullName: string;
  setFullName: (fullName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  clearAllData: () => void;
}

// Create the context
const GlobalContext = createContext<GlobalState | undefined>(undefined);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  // Global states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Clear all data (e.g., on logout)
  const clearAllData = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Values provided to the entire app
  const value: GlobalState = {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    clearAllData,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobal = (): GlobalState => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used within a StateProvider");
  }

  return context;
};
