import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
//libraries
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import Inicio from './Inicio';
import Tienda from './Tienda';
import Categorias from './Categorias';
import Carrito from './Carrito';
import Blog from './Blog';
//Components
import Header from '../components/Header';

const StackTienda = createStackNavigator();
const StackCarrito = createStackNavigator();
const StackBlog = createStackNavigator();

function InicioStack({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Header onPress={()=> navigation.openDrawer()}/>
      <View style={{flex:1, backgroundColor:'white'}}>
          <Inicio navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}

function TiendaStack() {
  return (
    <StackTienda.Navigator initialRouteName="Tienda" headerMode="none" >
      <StackTienda.Screen name="Tienda" component={Tienda}/>
      <StackTienda.Screen name="Categorias" component={Categorias}/>
    </StackTienda.Navigator>
  );
}

function CarritoStack() {
  return (
    <StackCarrito.Navigator initialRouteName="Carrito" headerMode="none">
      <StackCarrito.Screen name="Carrito" component={Carrito}  />
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