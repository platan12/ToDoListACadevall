import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [items, setItems] = useState([]); // Estat compartit per la llista
  const [allowSubtitle, setAllowSubtitle] = useState(false); // Estat per controlar l'entrada del subtítol
  const [error, setError] = useState(''); // Estat per gestionar el missatge d'error

  const handleSave = () => {
    if (!title) {
      setError('El títol és obligatori.'); // Configura l'error si no hi ha títol
      return;
    }
    setError(''); // Neteja l'error si tot és correcte
    const newItem = {
      id: Date.now().toString(),
      title,
      subtitle: allowSubtitle ? subtitle : '',
    };
    const updatedItems = [...items, newItem]; // Actualitzem la llista
    setItems(updatedItems); // Actualitzem l'estat local
    setTitle('');
    setSubtitle('');
    setAllowSubtitle(false); // Reset del botó "Do Subtitle"
    // Naveguem a la pantalla de llista amb la llista actualitzada
    navigation.navigate('List', { items: updatedItems, setItems });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Afegir títol i subtítol</Text>
      <TextInput
        style={styles.input}
        placeholder="Introdueix un títol"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          setError(''); // Elimina l'error en escriure
        }}
      />
      <View style={styles.button}>
      <TouchableOpacity   style={styles.checkbox} onPress={() => setAllowSubtitle(true)}>
              <Text style={styles.checkboxText}>X</Text>
      </TouchableOpacity>
      <Text>Has due Date?</Text>
      </View> 
      {/* Mostrar el camp de subtítol només si el botó "Do Subtitle" s'ha premut */}
      {allowSubtitle && (
        <TextInput
          style={styles.input}
          placeholder="Introdueix due Date DD/MM/YYYY"
          value={subtitle}
          onChangeText={setSubtitle}
        />
      )}
      {/* Mostra el missatge d'error si hi ha un error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button style={styles.button} title="Guardar" onPress={handleSave} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:30
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 14, 
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxMarked: {
    backgroundColor: '#000',
  },
  checkboxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
