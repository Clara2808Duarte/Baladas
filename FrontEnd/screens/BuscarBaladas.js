import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import api from "../services/app";

export default function BuscarBaladaScreen() {
  const [cidade, setCidade] = useState("");
  const [resultados, setResultados] = useState([]);// [] significa que o estado inicial é uma lista vazia

  const buscar = (texto) => {
    setCidade(texto);
    if (texto.length > 1) { // só busca se tiver mais de 1 caractere
      api
        .get(`/cidade/${texto}`) //${texto} é o valor digitado
        .then((res) => setResultados(res.data)) // atualiza o estado com os dados recebidos
        .catch((err) => console.log(err));
    } else {
      setResultados([]); // limpa os resultados se o texto for muito curto
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buscar Balada por Cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        placeholderTextColor="#ccc"
        value={cidade}
        onChangeText={buscar}
      />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.cidade} - {item.tipo}
            </Text>
            <Text style={styles.subtitle}>
              {item.data_evento} • {item.endereco} // exibe os detalhes da balada (o ponto • é só um separador visual)
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingTop: 58,
 },
  header: {
    color: "#E91E63",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#4B0082",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#4B0082",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  subtitle: { color: "#ccc", fontSize: 14 },
});
