import { useEffect, useState } from "react";
import {
  View,// container principal
  Text,
  FlatList, // lista
  TouchableOpacity, // para botões
  StyleSheet,
  Alert,
} from "react-native";
import api from "../services/app"; // importa a configuração do axios

export default function ListarBaladasScreen({ navigation }) {
  const [baladas, setBaladas] = useState([]);

  // Função para carregar todas as baladas
  const carregarBaladas = () => {
    api
      .get("/") // usa a baseURL do api.js
      .then((res) => setBaladas(res.data)) // atualiza a lista de baladas
      .catch((err) => console.log(err)); // trata erro
  };

  useEffect(() => { // Carrega as baladas ao montar o componente
    carregarBaladas();
  }, []);

  // Função para deletar uma balada
  const deletarBalada = (id) => { //  id da balada a ser deletada
    Alert.alert("Confirmar", "Deseja realmente deletar esta balada?", [
      { text: "Cancelar", style: "cancel" }, // fecha o alerta
      {
        text: "Deletar",
        style: "destructive", // cor vermelha no iOS
        onPress: async () => { // ação ao confirmar
          try {
            await api.delete(`/${id}`); // faz a requisição DELETE
            Alert.alert("Sucesso", "Balada deletada!"); // alerta de sucesso
            carregarBaladas(); // atualiza a lista
          } catch (error) {
            console.log(error); // trata erros
            Alert.alert("Erro", "Não foi possível deletar.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => ( // renderiza cada item da lista
    <View style={styles.card}> // cartão estilizado
      <Text style={styles.title}>
        {item.cidade} - {item.tipo} // título da balada
      </Text>
      <Text style={styles.info}>Endereço: {item.endereco}</Text>
      <Text style={styles.info}>Data: {item.data_evento}</Text>

      <View style={styles.buttonsContainer}> // container dos botões
        <TouchableOpacity
          style={styles.btnUpdate}
          onPress={() => navigation.navigate("EditarBalada", { balada: item })} // navega para a tela de edição
        >
          <Text style={styles.btnText}>Atualizar</Text>
        </TouchableOpacity> // botão de atualizar

        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => deletarBalada(item.id)} // chama a função de deletar
        >
          <Text style={styles.btnText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Baladas</Text> // cabeçalho
      <FlatList
        data={baladas}
        keyExtractor={(item) => item.id.toString()} // chave única
        renderItem={renderItem} // função de renderização
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingTop: 58 },
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
    marginRight: 5,
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
