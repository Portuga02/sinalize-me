import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ReportScreen() {
  const [type, setType] = useState('Sinalização ausente');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSend = () => {
    console.log('Tipo:', type);
    console.log('Descrição:', description);
    alert('Ocorrência enviada!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de problema</Text>
      <Picker selectedValue={type} onValueChange={(item) => setType(item)} style={styles.input}>
        <Picker.Item label="Sinalização ausente" value="Sinalização ausente" />
        <Picker.Item label="Buraco na pista" value="Buraco na pista" />
        <Picker.Item label="Placa ilegível" value="Placa ilegível" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Descreva o que você viu..."
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginTop: 5, padding: 10 },
});
