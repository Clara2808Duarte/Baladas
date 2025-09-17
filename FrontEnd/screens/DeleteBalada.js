import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../services/app"; // importa a instância do axios -> axios é uma biblioteca para fazer requisições HTTP

export default function DeleteBaladaScreen() {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    if (!id) { // verifica se o campo ID está vazio -> ! significa "não"
      Alert.alert("Erro", "Digite o ID da balada");
      return;
    }

    try {
      await api.delete(`/${id}`); // usa a baseURL do api.js
      Alert.alert("Sucesso", "Balada deletada!");
      setId(""); // limpa o campo ID após a deleção
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível deletar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Balada</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da balada"
        placeholderTextColor="#888"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20,  paddingTop: 58,
 },
  title: {
    fontSize: 24,
    color: "#ff00ff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderColor: "#ff00ff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1a1a1a",
    borderColor: "#ff00ff",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 15,
    shadowColor: "#ff00ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ff00ff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
