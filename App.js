// React
import * as React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
//Stacks
import { InicioStack, TiendaStack, CarritoStack, BlogStack } from './screens/Stacks'
//Components
import NavigationButton from './mini_components/NavigationButton';
//extra
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

function Sidemenu(props) {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: 'black', paddingLeft: 10, paddingRight: 10}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Inicio')}>
            <Image style={{ height: 30, width: 30 }} source={require('./assets/icons/hamburger.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{ fontSize: 25, color: 'white' }}>MENU</Text>
          </View>
      </View>

      <ScrollView>
        <NavigationButton text="Tienda" onPress={() => props.navigation.navigate('Tienda')}/>
        <NavigationButton text="Blog" onPress={() => props.navigation.navigate('Blog')}/>
        <NavigationButton text="Noticias y promociones" onPress={() => props.navigation.navigate('Blog')}/>
        <NavigationButton text="Carrito" onPress={() => props.navigation.navigate('Carrito')}/>

        <View style={{ alignItems: 'center', marginTop: 20, opacity: .4 }}>
          <Image style={{ height: 160, width: 160 }}
            source={require('./assets/icons/logo.png')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          console.log(route);
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

      <Tab.Screen name="Inicio" component={InicioStack}
        options={{
          tabBarLabel: 'Inicio',
        }} />

      <Tab.Screen name="Tienda" component={TiendaStack}
        options={{
          tabBarLabel: 'Tienda',
        }} />

      <Tab.Screen name="Carrito" component={CarritoStack}
        options={{
          tabBarLabel: 'Carrito',
        }} />

      <Tab.Screen name="Blog" component={BlogStack}
        options={{
          tabBarLabel: 'Blog',
        }} />

    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Menutab" drawerContent={props => Sidemenu(props)}>
        <Drawer.Screen name="Inicio" component={TabNavigator} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}
export default App;