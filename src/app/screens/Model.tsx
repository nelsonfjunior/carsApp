import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute } from '@react-navigation/native'; // Adicionando o hook useRoute
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f0f0f0" }}>
      <DrawerToggleButton />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Modelos</Text>
      <FlatList
        data={modelos}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 8,
              marginBottom: 8,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => alert(`Modelo selecionado: ${item.nome}`)}
          >
            <Text style={{ fontSize: 18 }}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
