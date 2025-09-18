import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../services/app";

export default function ListarBaladasScreen({ navigation }) {
  const [baladas, setBaladas] = useState([]);

  // Função para carregar todas as baladas
  const carregarBaladas = () => {
    api
      .get("/")
      .then((res) => setBaladas(res.data)) //atualiza a lista de baladas
      .catch((err) => console.log(err)); // trata erros
  };

  useEffect(() => {
    carregarBaladas();
  }, []);

  // Função para deletar uma balada
  const deletarBalada = (id) => {
    Alert.alert("Confirmar", "Deseja realmente deletar esta balada?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/${id}`);//
            Alert.alert("Sucesso", "Balada deletada!");
            carregarBaladas(); // atualiza a lista
          } catch (error) {
            console.log(error);// trata erros
            Alert.alert("Erro", "Não foi possível deletar.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.cidade} - {item.tipo}
      </Text>
      <Text style={styles.info}>Endereço: {item.endereco}</Text> 
      <Text style={styles.info}>Data: {item.data_evento}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btnUpdate} // Botão para atualizar a balada
          onPress={() => navigation.navigate("EditarBalada", { balada: item })}//
        >
          <Text style={styles.btnText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => deletarBalada(item.id)}// Botão para deletar a balada
        >
          <Text style={styles.btnText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Baladas</Text>
      <FlatList
        data={baladas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} //
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  header: {
    color: "#E91E63",
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#4B0082",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  info: { color: "#ccc", fontSize: 14, marginBottom: 4 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnUpdate: {
    backgroundColor: "#E91E63",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5, // Margem direita do botão de atualizar
  },
  btnDelete: {
    backgroundColor: "crimson",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
