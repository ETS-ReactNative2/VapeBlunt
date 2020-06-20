import * as React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import NavigationButton from '../mini_components/NavigationButton';

function Sidemenu(props) {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: 'black', paddingLeft: 10, paddingRight: 10}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Inicio')}>
            <Image style={{ height: 30, width: 30 }} source={require('../assets/icons/hamburger.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{ fontSize: 25, color: 'white' }}>MENU</Text>
          </View>
      </View>

      <ScrollView style={{backgroundColor:'white'}}>
        <NavigationButton text="Tienda" onPress={() => props.navigation.navigate('Tienda')}/>
        <NavigationButton text="Blog" onPress={() => props.navigation.navigate('Blog')}/>
        <NavigationButton text="Noticias y promociones" onPress={() => props.navigation.navigate('Blog')}/>
        <NavigationButton text="Carrito" onPress={() => props.navigation.navigate('Carrito')}/>

        <View style={{ alignItems: 'center', marginTop: 20, opacity: .4 }}>
          <Image style={{ height: 160, width: 160 }}
            source={require('../assets/images/logo.png')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Sidemenu;