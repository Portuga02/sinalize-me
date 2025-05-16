import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { listarAlertas } from '../services/alertService';

export default function ListaScreen() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    async function carregarAlertas() {
      const dados = await listarAlertas();
      setAlertas(dados);
    }
    carregarAlertas();
  }, []);

  const icones = {
    chuva: "🌧️ Chuva severa",
    sol: "🌞 Alta exposição solar",
    via: "🚧 Problema na via",
    geral: "⚠️ Risco geral",
    animais: "🐕 Animais na pista",
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alertas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.alerta}>
            <Text style={styles.icon}>{icones[item.category] || "❓ Desconhecido"}</Text>
            <Text style={styles.text}>{item.title}: {item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  alerta: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { fontSize: 18, fontWeight: "bold", marginRight: 10 },
  text: { fontSize: 16, color: '#333' }
});
