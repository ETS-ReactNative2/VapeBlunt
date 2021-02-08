import 'react-native-gesture-handler';
// React
import React from 'react';
//Components
import { Sidemenu } from './src/components';
//Stacks
import {
  InicioStack,
  TiendaStack,
  CarritoStack,
  BlogStack,
  NoticiasStack
} from './src/screens/Stacks'
//Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
//Config
import config from './src/config';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={config.tabScreenOptions}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Inicio" component={InicioStack}/>
      <Tab.Screen name="Tienda" component={TiendaStack}/>
      <Tab.Screen name="Carrito" component={CarritoStack}/>
      <Tab.Screen name="Blog" component={BlogStack}/>
      {/* https://reactnavigation.org/docs/bottom-tab-navigator/ */}
      <Tab.Screen name="Noticias" component={NoticiasStack} options={() => ({
        tabBarButton: () => (null),
      })}/>
      {/* https://reactnavigation.org/docs/bottom-tab-navigator/ */}
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => Sidemenu(props)}>
          <Drawer.Screen name="App" component={TabNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

export default App;