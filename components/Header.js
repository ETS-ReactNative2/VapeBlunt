import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

function Header({ navigation }) {
  return (
    <View style={{ flexDirection: "row", alignItems: 'center', height: 50, backgroundColor: 'black' }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems: 'center' }} >
        <Image style={{ height: 30, width: 30, marginLeft: 10 }}
          source={require('../assets/icons/jamburger.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header;