import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Exemple d'una pantalla
import ListScreen from './screens/ListScreen'; // Exemple d'una pantalla

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false ,  animation: 'none'}}/>
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
