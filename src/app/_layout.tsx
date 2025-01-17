import '../styles/global.css';
import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView className="flex-1">
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: '#f8fafc', 
              width: 240,
            },
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: '600',
            },
            drawerActiveTintColor: '#3b82f6', 
            drawerInactiveTintColor: '#9ca3af',
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Login',
              drawerItemStyle: { display: 'none' },
            }}
          />

          <Drawer.Screen
            name="screens/Home"
            options={{
              drawerLabel: 'Home',
            }}
          />

          <Drawer.Screen
            name="screens/Model"
            options={{
              drawerLabel: 'Model',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
