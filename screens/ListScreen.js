import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function ListScreen({ route, navigation }) {
  const { items, setItems } = route.params; // Reb l'estat i la funció d'actualització
  const [localItems, setLocalItems] = useState(items); // Estat local per a la llista visible

  // Funció per alternar el marcat d'un ítem
  const toggleItem = (id) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  // Funció per mostrar el popup de confirmació
  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmació',
      'Estàs segur que vols eliminar aquest element?',
      [
        {
          text: 'Cancel·lar',
          style: 'cancel', // Tanca el popup sense acció
        },
        {
          text: 'OK',
          onPress: () => deleteItem(id), // Crida a la funció per eliminar l'ítem
        },
      ],
      { cancelable: true }
    );
  };

  // Funció per eliminar un ítem
  const deleteItem = (id) => {
    // Actualitza la llista visible i persistent
    const updatedItems = localItems.filter((item) => item.id !== id);
    setLocalItems(updatedItems); // Actualitza la vista immediatament
    setItems(updatedItems); // Actualitza l'estat persistent
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Llista de títols i subtítols</Text>
      <FlatList
        data={localItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMarked = item.marked; // Comprova si l'ítem està marcat
          return (
            <View style={styles.listItem}>
              {/* Botó quadrat */}
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  isMarked && styles.checkboxMarked,
                ]}
                onPress={() => toggleItem(item.id)}
              >
                {isMarked && <Text style={styles.checkboxText}>X</Text>}
              </TouchableOpacity>

              {/* Text amb línia si està marcat */}
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.title,
                    isMarked && styles.strikethrough,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    isMarked && styles.strikethrough,
                  ]}
                >
                  Data Limit: {item.subtitle}
                </Text>
              </View>

              {/* Botó "Delete" */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id)} // Crida al popup de confirmació
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.returnButton}
      >
        <Text style={styles.returnButtonText}>
          Crear To Do
        </Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
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
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  returnButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  returnButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
