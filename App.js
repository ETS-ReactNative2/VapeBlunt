// React
import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
//Screens
import Carrito from './screens/Carrito';
import Blog from './screens/Blog';
import Tienda from './screens/Tienda';
//Components
import Header from './components/Header';
import NavigationButton from './mini_components/NavigationButton';
//extra
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const StackTienda = createStackNavigator();
const StackCarrito = createStackNavigator();
const StackBlog = createStackNavigator();
const Tab = createBottomTabNavigator();

function InicioStack({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}>
            You are on Inicio Screen
          </Text>
      </View>
    </SafeAreaView>
  );
}

function TiendaStack() {
  return (
    <StackTienda.Navigator initialRouteName="Tiendda">
      <StackTienda.Screen name="Tienda" component={Tienda} />
    </StackTienda.Navigator>
  );
}

function CarritoStack() {
  return (
    <StackCarrito.Navigator initialRouteName="Carrito"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <StackCarrito.Screen name="Carrtio" component={Carrito} options={{ title: 'Pagina Carrito' }} />
    </StackCarrito.Navigator>
  );
}


function BlogStack() {
  return (
    <StackBlog.Navigator initialRouteName="Blog"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <StackBlog.Screen name="Blog" component={Blog} options={{ title: 'Pagina Blog' }} />
    </StackBlog.Navigator>
  );
}


function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

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

const Drawer = createDrawerNavigator();

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

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 0, backgroundColor: "black" }} />
      <Drawer.Navigator initialRouteName="Menutab" drawerContent={props => Sidemenu(props)}>
        <Drawer.Screen name="Inicio" component={TabNavigator} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}
export default App;