import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Carrito from './Carrito';
import Blog from './Blog';
import Tienda from './Tienda';

//Components
import Header from '../components/Header';

const StackTienda = createStackNavigator();
const StackCarrito = createStackNavigator();
const StackBlog = createStackNavigator();

function InicioStack({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Header onPress={()=> navigation.openDrawer()}/>
      <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
          <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}>
            You are on Inicio Screen
          </Text>
      </View>
    </SafeAreaView>
  );
}

function TiendaStack() {
  return (
    <StackTienda.Navigator initialRouteName="Tienda" headerMode="none" >
      <StackTienda.Screen name="Tienda" component={Tienda}/>
    </StackTienda.Navigator>
  );
}

function CarritoStack() {
  return (
    <StackCarrito.Navigator initialRouteName="Carrito" headerMode="none">
      <StackCarrito.Screen name="Carrtio" component={Carrito}  />
    </StackCarrito.Navigator>
  );
}

function BlogStack() {
  return (
    <StackBlog.Navigator initialRouteName="Blog" headerMode="none">
      <StackBlog.Screen name="Blog" component={Blog} options={{ title: 'Pagina Blog' }} />
    </StackBlog.Navigator>
  );
}

export {
  InicioStack,
  TiendaStack,
  CarritoStack,
  BlogStack
}