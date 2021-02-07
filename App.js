// React
import * as React from 'react';
import { Image } from 'react-native';
//Stacks
import {
  InicioStack,
  TiendaStack,
  CarritoStack,
  BlogStack,
  NoticiasStack
} from './src/screens/Stacks'
//Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './src/reducers'
//Components
import { Sidemenu } from './src/components';
import { ShoppingCartIcon } from './src/mini_components';
//extra
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused
              ? require('./src/assets/icons/inicio.png')
              : require('./src/assets/icons/iniciob.png');
          } else if (route.name === 'Tienda') {
            iconName = focused
              ? require('./src/assets/icons/tienda.png')
              : require('./src/assets/icons/tiendab.png');
          }
          else if (route.name === 'Carrito') {
            iconName = focused
              ? require('./src/assets/icons/carrito.png')
              : require('./src/assets/icons/carritob.png');
              return <ShoppingCartIcon active={focused}/>
          }
          else if (route.name === 'Blog') {
            iconName = focused
              ? require('./src/assets/icons/blog.png')
              : require('./src/assets/icons/blogb.png');
          }
          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: 30, height: 30 }} resizeMode="contain" />;
        },
      })}
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store_ = createStore(persistedReducer)
const persistor = persistStore(store_)

function App() {
  return (
    <Provider store={store_}>
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