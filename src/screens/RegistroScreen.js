import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registrarAlerta } from '../services/alertService';

export default function RegistroScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('via'); // Definindo uma categoria padrão

  const handleSubmit = async () => {
    if (!title || !description) {
      alert('Preencha todos os campos!');
      return;
    }

    const icones = {
      via: '🚧',
      clima: '🌦️',
      geral: '⚠️',
      animais: '🐕'
    };

    const novoAlerta = {
      title,
      description,
      category,
      icon: icones[category] || '❓',
      location: { lat: -8.0539, lng: -34.8808 },
      createdAt: new Date().toISOString(),
    };

    await registrarAlerta(novoAlerta);
    alert('Alerta registrado com sucesso!');
    setTitle('');
    setDescription('');
    setCategory('via');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex: Buraco na pista" />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Ex: Grande buraco na avenida" />

      <Text style={styles.label}>Categoria</Text>
      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
        <Picker.Item label="🚧 Problema na via" value="via" />
        <Picker.Item label="🌦️ Condições climáticas" value="clima" />
        <Picker.Item label="⚠️ Risco geral" value="geral" />
        <Picker.Item label="🐕 Animais na pista" value="animais" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Alerta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  input: { backgroundColor: 'white', padding: 10, borderRadius: 6, marginBottom: 12 },
  picker: { backgroundColor: 'white', marginBottom: 12 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
