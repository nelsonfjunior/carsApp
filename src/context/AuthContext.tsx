import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definição do tipo de usuário
interface User {
  id: number;
  name: string;
  token: string;
}

// Tipo do contexto
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Criação do contexto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

// Provedor do contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Função para atualizar o estado e salvar no AsyncStorage
  const setUser = async (user: User | null) => {
    setUserState(user);  // Atualiza o estado do usuário
    if (user) {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("userData");
    }
  };

  // Função de logout
  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setUserState(null);
  };

  // Recuperar dados do usuário ao iniciar o aplicativo
  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        setUserState(JSON.parse(storedUser));  // Carrega os dados de AsyncStorage
      }
    };
    loadUserData();
  }, []);  // Apenas executa uma vez na montagem do componente

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
