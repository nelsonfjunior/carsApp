import '../styles/global.css';
import 'react-native-gesture-handler';
import { Slot } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from "../context/AuthContext"; // Importe o AuthProvider

export default function RootLayout() {
  return (
    <AuthProvider> 
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: '#005490',
              width: 240,
            },
            drawerLabelStyle: {
              color: '#fff',
            },
          }}
        >
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Login',
              drawerItemStyle: { display: 'none' },
            }}
          />

          <Drawer.Screen
            name="screens/Home" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Home',
            }}
          />

          <Drawer.Screen
            name="screens/Model" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Model',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
