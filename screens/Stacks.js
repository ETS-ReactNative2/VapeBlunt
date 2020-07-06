import * as React from 'react';
//libraries
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import Inicio from './Inicio';
import Tienda from './Tienda';
import Producto from './Producto';
import Categorias from './Categorias';
import Accesorios from './Accesorios';
import Carrito from './Carrito';
import Blog from './Blog';
import Noticias from './Noticias';


const StackInicio = createStackNavigator()
const StackTienda = createStackNavigator()
const StackCarrito = createStackNavigator()
const StackBlog = createStackNavigator()
const StackNoticias = createStackNavigator()

function InicioStack({ navigation }) {
  return (
    <StackInicio.Navigator initialRouteName="Inicio" headerMode="none" >
      <StackInicio.Screen name="Inicio" component={Inicio}/>
      <StackTienda.Screen name="Producto" component={Producto}/>
    </StackInicio.Navigator>
  )
}

function TiendaStack() {
  return (
    <StackTienda.Navigator initialRouteName="Tienda" headerMode="none" >
      <StackTienda.Screen name="Tienda" component={Tienda}/>
      <StackTienda.Screen name="Categorias" component={Categorias}/>
      <StackTienda.Screen name="Accesorios" component={Accesorios}/>
      <StackTienda.Screen name="Producto" component={Producto}/>
    </StackTienda.Navigator>
  )
}

function CarritoStack() {
  return (
    <StackCarrito.Navigator initialRouteName="Carrito" headerMode="none">
      <StackCarrito.Screen name="Carrito" component={Carrito}  />
    </StackCarrito.Navigator>
  )
}

function BlogStack() {
  return (
    <StackBlog.Navigator initialRouteName="Blog" headerMode="none">
      <StackBlog.Screen name="Blog" component={Blog} options={{ title: 'Blogs' }} />
    </StackBlog.Navigator>
  )
}

function NoticiasStack() {
  return (
    <StackBlog.Navigator initialRouteName="Noticias" headerMode="none">
      <StackNoticias.Screen name="Noticias" component={Noticias} options={{ title: 'Noticias y promociones' }} />
    </StackBlog.Navigator>
  )
}

export {
  InicioStack,
  TiendaStack,
  CarritoStack,
  BlogStack,
  NoticiasStack
}