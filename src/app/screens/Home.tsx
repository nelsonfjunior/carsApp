import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { IndexNavigationProp, ModelNavigationProp } from "@/src/navigation/navigation";
import { AuthContext } from "@/src/context/AuthContext";
import { DrawerToggleButton } from "@react-navigation/drawer";

interface CarBrand {
  codigo: string;
  nome: string;
}

export default function Home() {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ModelNavigationProp>();
  const navigationIndex = useNavigation<IndexNavigationProp>();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await axios.get<CarBrand[]>(
          "https://parallelum.com.br/fipe/api/v1/carros/marcas"
        );
        setBrands(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load car brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarBrands();
  }, []);

  const handleBrandPress = (codigo: string) => {
    navigation.navigate("screens/Model", { brandCode: codigo });
  };

  const handleLogout = async () => {
    await logout();
    navigationIndex.navigate("index");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3498db" />
        <Text className="mt-4 text-lg text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-4 py-4">
      <DrawerToggleButton />
      <Text className="text-3xl font-bold text-gray-800 mb-6">Home</Text>
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg text-gray-700">
          Olá, <Text className="font-bold text-blue-600">{user?.name || "Visitante"}</Text>
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="px-6 py-2 bg-red-500 rounded-full shadow-md"
        >
          <Text className="text-white text-lg font-semibold text-center">Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={brands}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleBrandPress(item.codigo)}
            className="p-4 bg-white rounded-lg mb-4 shadow-sm border border-gray-200"
          >
            <Text className="text-lg text-gray-800">{item.nome}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
