import React, { useState, useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import api from "../services/app"; // importa o app do services/app.js

export default function EditarBalada({ route, navigation }) {
  const { balada } = route.params; // pega os dados da balada selecionada

  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => { // preenche os campos com os dados atuais da balada
    if (balada) {
      setCidade(balada.cidade);
      setEndereco(balada.endereco);
      setDataEvento(balada.data_evento);
      setTipo(balada.tipo);
    }
  }, [balada]); // só roda quando balada atualizada

const handleUpdate = async () => {
  if (!cidade || !endereco || !dataEvento || !tipo) { // validação simples -> || significa "ou" e ! significa "não"
    Alert.alert("Erro", "Preencha todos os campos"); 
    return;
  }

  try {
    // garante que está enviando os campos certos
    const payload = {
      cidade: cidade.trim(), // trim() remove espaços extras
      endereco: endereco.trim(),
      data_evento: dataEvento.trim(), // YYYY-MM-DD
      tipo: tipo.trim(),
    };

    console.log("Payload enviado:", payload); // DEBUG: verifique se está correto

    await api.put(`/${balada.id}`, payload); //payload é o corpo da requisição -> passar as informações para atualizar a balada
    Alert.alert("Sucesso", "Balada atualizada!");
    navigation.goBack(); // volta para a tela anterior
  } catch (error) {
    console.log(error.response?.data || error.message); // DEBUG: log do erro
    // error.response?.data verifica se error.response existe antes de acessar a atualização 
    // e error.message mostra a mensagem de erro genérica
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
  container: { 
    flex: 1, 
    backgroundColor: "#000", 
    padding: 20, 
    paddonTop: 58
  },
  header: {
    color: "#E91E63",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 40,
  
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