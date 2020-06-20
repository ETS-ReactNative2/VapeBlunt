import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

function Header(props) {
  return (
    <View style={{ flexDirection: "row", alignItems: 'center', height: 50, backgroundColor: 'black'}}>
      <TouchableOpacity onPress={() => props.onPress()} style={{ alignItems: 'center' }} >
        <Image style={{ height: 30, width: 30, marginLeft: 10 }}
          source={props.arrow ? require('../assets/icons/BackArrow.png'):require('../assets/icons/hamburger.png') }
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header;