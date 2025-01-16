import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Button } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { IndexNavigationProp, ModelNavigationProp } from "@/src/navigation/navigation";
import { AuthContext } from "@/src/context/AuthContext"; // Importe o contexto

interface CarBrand {
  codigo: string;
  nome: string;
}

export default function Home() {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ModelNavigationProp>();
  const navigationIndex = useNavigation<IndexNavigationProp>();
  // Usando o contexto de autenticação
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await axios.get<CarBrand[]>(
          "https://parallelum.com.br/fipe/api/v1/carros/marcas"
        );
        setBrands(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch car brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarBrands();
  }, []);

  const handleBrandPress = (codigo: string) => {
    navigation.navigate("screens/Model", { marcaCodigo: codigo });
  };

  const handleLogout = async () => {
    await logout(); // Chama o logout para limpar o estado
    navigationIndex.navigate("index"); // Navega para a tela de SignIn
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Carros</Text>
      {/* Nome do usuário no topo */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ fontSize: 18 }}>Olá, {user?.name || "Nome não disponivel"}</Text>
        <Button title="Sair" onPress={handleLogout} />
      </View>

      <FlatList
        data={brands}
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
            onPress={() => handleBrandPress(item.codigo)}
          >
            <Text style={{ fontSize: 18 }}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
