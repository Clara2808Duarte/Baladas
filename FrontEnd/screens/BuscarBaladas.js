import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import api from "../services/app";

export default function BuscarBaladaScreen() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscar = async (texto) => {
    setTermo(texto);
    if (texto.length > 1) {
      try {
        // busca por cidade
        const resCidade = await api.get(`/cidade/${texto}`);
        // busca por data (formato YYYY-MM-DD)
        const resData = await api.get(`/data/${texto}`);
        // busca por tipo
        const resTipo = await api
          .get(`/tipo/${texto}`)
          .catch(() => ({ data: [] }));

        // juntar resultados sem duplicar
        const todos = [...resCidade.data, ...resData.data, ...resTipo.data];
        const unicos = Array.from(
          new Map(todos.map((item) => [item.id, item])).values()
        );

        setResultados(unicos);
      } catch (err) {
        console.log(err);
        setResultados([]);
      }
    } else {
      setResultados([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buscar Balada</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite cidade, data ou tipo"
        placeholderTextColor="#ccc"
        value={termo}
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
              {item.data_evento} • {item.endereco}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma balada encontrada</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingTop: 58 },
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
  emptyText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
