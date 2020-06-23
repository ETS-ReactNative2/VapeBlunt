// React
import * as React from 'react';
import { Image } from 'react-native';
//Stacks
import { InicioStack, TiendaStack, CarritoStack, BlogStack } from './screens/Stacks'
//Components
import Sidemenu from './components/Sidemenu';
//extra
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused
              ? require('./assets/icons/inicio.png')
              : require('./assets/icons/iniciob.png');
          } else if (route.name === 'Tienda') {
            iconName = focused
              ? require('./assets/icons/tienda.png')
              : require('./assets/icons/tiendab.png');
          }
          else if (route.name === 'Carrito') {
            iconName = focused
              ? require('./assets/icons/carrito.png')
              : require('./assets/icons/carritob.png');
          }
          else if (route.name === 'Blog') {
            iconName = focused
              ? require('./assets/icons/blog.png')
              : require('./assets/icons/blogb.png');
          }
          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: 30, height: 30 }} resizeMode="contain" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }} >

      <Tab.Screen name="Inicio" component={InicioStack}/>
      <Tab.Screen name="Tienda" component={TiendaStack}/>
      <Tab.Screen name="Carrito" component={CarritoStack}/>
      <Tab.Screen name="Blog" component={BlogStack}/>

    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => Sidemenu(props)}>
        <Drawer.Screen name="App" component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;