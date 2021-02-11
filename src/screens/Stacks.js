import React from 'react';
//libraries
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import Inicio from './Inicio';
import Tienda from './Tienda';
import Producto from './Producto';
import Categorias from './Categorias';
import Carrito from './Carrito';
import Checkout from './Checkout';
import Blog from './Blog';
import DisplayProducts from './DisplayProducts';

import { Icon } from '../assets';

const StackInicio = createStackNavigator()
const StackTienda = createStackNavigator()
const StackCarrito = createStackNavigator()
const StackBlog = createStackNavigator()

const screenOptions = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: 'white',
}

const DrawerButton = (props) => (
  <Icon name='menu' size={26} color={props.tintColor}
    onPress={props.navigation.toggleDrawer}
    style={{marginLeft: 12}}
  />
)

function InicioStack({ navigation }) {
  return (
    <StackInicio.Navigator initialRouteName="Inicio" screenOptions={screenOptions}>
      <StackInicio.Screen name="Inicio" options={{
        headerLeft: (props) => (
          <DrawerButton navigation={navigation} {...props}/>
        ),
      }} component={Inicio}/>
      <StackTienda.Screen name="Producto" component={Producto}/>
    </StackInicio.Navigator>
  )
}

function TiendaStack({ navigation }) {
  return (
    <StackTienda.Navigator initialRouteName="Tienda" screenOptions={screenOptions}>
      <StackTienda.Screen name="Tienda" options={{
        headerLeft: (props) => (
          <DrawerButton navigation={navigation} {...props}/>
        )
      }} component={Tienda}/>
      <StackTienda.Screen name="Categorias" component={Categorias}/>
      <StackTienda.Screen name="Producto" component={Producto}/>
      <StackTienda.Screen name="Display Products" component={DisplayProducts} options={{title: ''}}/>
    </StackTienda.Navigator>
  )
}

function CarritoStack({ navigation }) {
  return (
    <StackCarrito.Navigator initialRouteName="Carrito" screenOptions={screenOptions}>
      <StackCarrito.Screen name="Carrito" options={{
        headerLeft: (props) => (
          <DrawerButton navigation={navigation} {...props}/>
        ),
        title: ''
      }} component={Carrito} />
      <StackCarrito.Screen name="Checkout" component={Checkout}  />
    </StackCarrito.Navigator>
  )
}

function BlogStack({ navigation }) {
  return (
    <StackBlog.Navigator initialRouteName="Blog" screenOptions={screenOptions}>
      <StackBlog.Screen name="Blog" component={Blog} options={{
          headerLeft: (props) => (
            <DrawerButton navigation={navigation} {...props}/>
          ),
          title: ''
        }}
      />
    </StackBlog.Navigator>
  )
}

export {
  InicioStack,
  TiendaStack,
  CarritoStack,
  BlogStack,
}