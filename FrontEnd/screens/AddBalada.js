import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../services/app";

export default function NovaBaladaScreen({ navigation }) {
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [tipo, setTipo] = useState("");

  const criar = () => {
    api
      .post("/", { cidade, endereco, data_evento: dataEvento, tipo })
      .then(() => { // executa quando a  requisição for bem sucedida
        Alert.alert("Sucesso", "Balada criada");
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nova Balada</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade} // função que atualiza o estado
        placeholder="Cidade"
      />
      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço"
      />
      <TextInput
        style={styles.input}
        value={dataEvento}
        onChangeText={setDataEvento}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo"
      />

      <TouchableOpacity style={styles.btn} onPress={criar}>
        <Text style={styles.btnText}>Salvar</Text>
      </TouchableOpacity>
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
  btn: {
    backgroundColor: "#E91E63",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
