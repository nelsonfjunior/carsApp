import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native"; // Adicionando o hook useRoute
import { DrawerToggleButton } from "@react-navigation/drawer";

interface CarModel {
  codigo: string;
  nome: string;
}

export default function Model() {
  // Usando useRoute para acessar os parâmetros da rota
  const route = useRoute();
  const { marcaCodigo } = route.params as { marcaCodigo: string };

  const [modelos, setModelos] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`
        );
        const data = await response.json();
        setModelos(data.modelos);
      } catch (error) {
        console.error("Erro ao buscar os modelos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [marcaCodigo]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3498db" />
        <Text className="mt-4 text-lg text-gray-500">Carregando...</Text>
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
