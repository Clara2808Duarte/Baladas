import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../services/app";

export default function EditarBalada({ route, navigation }) {
  const { balada } = route.params; // pega os dados da balada selecionada

  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (balada) {
      setCidade(balada.cidade);
      setEndereco(balada.endereco);
      setDataEvento(balada.data_evento);
      setTipo(balada.tipo);
    }
  }, [balada]);

const handleUpdate = async () => {
  if (!cidade || !endereco || !dataEvento || !tipo) { // Verifica se todos os campos estão preenchidos
    Alert.alert("Erro", "Preencha todos os campos");
    return;
  }

  try {
    // garante que está enviando os campos certos
    const payload = {
      cidade: cidade.trim(),
      endereco: endereco.trim(),
      data_evento: dataEvento.trim(), // YYYY-MM-DD
      tipo: tipo.trim(),
    };

    console.log("Payload enviado:", payload); // DEBUG: verifique se está correto

    await api.put(`/${balada.id}`, payload);//
    Alert.alert("Sucesso", "Balada atualizada!");
    navigation.goBack();
  } catch (error) {
    console.log(error.response?.data || error.message);
    Alert.alert("Erro", "Não foi possível atualizar a balada");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Balada</Text>

      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#888"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#888"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Data do Evento (YYYY-MM-DD)"
        placeholderTextColor="#888"
        value={dataEvento}
        onChangeText={setDataEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        placeholderTextColor="#888"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar Balada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, paddonTop: 58,},
  header: {
    color: "#E91E63",
    fontSize: 24,
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
    backgroundColor: "#E91E63",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
