import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface User {
  id: number;
  name: string;
  token: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = async (user: User | null) => {
    setUserState(user);  
    if (user) {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("userData");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setUserState(null);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        setUserState(JSON.parse(storedUser));  
      }
    };
    loadUserData();
  }, []);  

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
