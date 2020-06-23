import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
//libraries
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import Carrito from './Carrito';
import Blog from './Blog';
import Tienda from './Tienda';
import Inicio from './Inicio';
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