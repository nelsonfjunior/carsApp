import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import "nativewind";
import { HomeNavigationProp } from "../navigation/navigation";

// Definir a estrutura esperada para os dados do formulário
interface SignInFormData {
  user: string;
  password: string;
}

// Definir o tipo para os dados da resposta de erro
interface SignInErrorResponse {
  error: boolean;
  message: string;
}

export default function SignIn() {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<HomeNavigationProp>(); // Adicionar navegação

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const response = await axios.post("https://test-api-y04b.onrender.com/signIn", data);

      // Verificar status da resposta
      if (response.status === 200) {
        const { error, message, user } = response.data;

        if (error) {
          Alert.alert("Login Failed", message); // Exibe a mensagem de erro da API
        } else {
          await AsyncStorage.setItem("userData", JSON.stringify(user));
          setUser(user);
          navigation.navigate("screens/Home");
        }
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    } catch (err) {
      // Verifique se o erro é um AxiosError e afirme o tipo de resposta
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<SignInErrorResponse>; // Afirma que a resposta tem o tipo esperado
        if (axiosErr.response) {
          // Aqui podemos acessar o conteúdo da resposta com segurança
          const message = (axiosErr.response.data as SignInErrorResponse).message || "An error occurred";
          Alert.alert("Error", message);
        } else {
          Alert.alert("Error", "Network error. Please check your connection.");
        }
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-5">Login</Text>

      <Controller
        control={control}
        name="user"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full p-3 mb-3 border border-gray-300 rounded bg-white"
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.user && <Text className="text-red-500 mb-3">{errors.user.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full p-3 mb-3 border border-gray-300 rounded bg-white"
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text className="text-red-500 mb-3">{errors.password.message}</Text>}

      <TouchableOpacity
        className={`w-full p-4 bg-blue-500 rounded items-center ${loading ? "opacity-50" : ""}`}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text className="text-white text-lg">Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
