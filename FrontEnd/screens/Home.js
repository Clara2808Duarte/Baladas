import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Painel de Baladas</Text>

      {/* Listar Baladas */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ListarBaladas")}
      >
        <Text style={styles.btnText}>Listar Baladas</Text>
      </TouchableOpacity>

      {/* Adicionar Balada */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("NovaBalada")}
      >
        <Text style={styles.btnText}>Adicionar Balada</Text>
      </TouchableOpacity>

      {/* Atualizar Balada */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ListarBaladas")}
      >
        <Text style={styles.btnText}>Atualizar Balada</Text>
        <Text style={styles.subText}>Clique em "Atualizar" na lista</Text>
      </TouchableOpacity>

      {/* Buscar Balada */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("BuscarBalada")}
      >
        <Text style={styles.btnText}>Buscar Balada</Text>
      </TouchableOpacity>

      {/* Deletar Balada */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ListarBaladas")}
      >
        <Text style={styles.btnText}>Deletar Balada</Text>
        <Text style={styles.subText}>Clique em "Deletar" na lista</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 58, 
  },
  header: {
    color: "#E91E63",
    fontSize: 28,
    marginBottom: 40,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#4B0082",
    width: "80%",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
  },
});
