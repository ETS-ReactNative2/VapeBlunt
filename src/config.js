import React from 'react';
import { Image } from 'react-native';
import { ShoppingCartIcon } from './mini_components';

const config = {
  api_url: 'http://192.168.10.185:8080/',
  categoryTable : {
    "Herbales": "29357859",
    "De Ceras": "9845669912",
    "Líquidos": "400596878",
  },
  tabScreenOptions: ({ route }) => ({
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
          return <ShoppingCartIcon active={focused}/>
      }
      else if (route.name === 'Blog') {
        iconName = focused
          ? require('./assets/icons/blog.png')
          : require('./assets/icons/blogb.png');
      }
      return (<Image
        source={iconName}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />)
    },
  })
}

export default config;