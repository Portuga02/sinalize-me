import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { listarAlertas } from '../services/alertService';

export default function MapaScreen() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    async function carregarAlertas() {
      const dados = await listarAlertas();
      setAlertas(dados);
    }
    carregarAlertas();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -8.0539,
          longitude: -34.8808,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {alertas.map((alerta, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: alerta.location.lat,
              longitude: alerta.location.lng,
            }}
            title={alerta.title}
          >
            <Text style={styles.marker}>{alerta.icon}</Text>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: { fontSize: 24 },
});
