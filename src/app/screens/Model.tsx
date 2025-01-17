import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native"; 
import { DrawerToggleButton } from "@react-navigation/drawer";

interface CarModel {
  codigo: string;
  nome: string;
}

export default function Model() {
  const route = useRoute();
  const { brandCode } = route.params as { brandCode: string };

  const [modelos, setModelos] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`
        );
        const data = await response.json();
        setModelos(data.modelos);
      } catch (error) {
        console.error("Error fetching the models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [brandCode]);

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
      <Text className="text-3xl font-bold text-gray-800 mb-6">Models</Text>
      <FlatList
        data={modelos}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <TouchableOpacity
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
