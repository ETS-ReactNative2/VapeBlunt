import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const colors = require('../assets/colors')

function Header(props) {
  var {color, arrow, onPress} = props
  color = color || 'black'
  var image = require('../assets/icons/hamburger.png')
  if(arrow){
    image = require('../assets/icons/BackArrow.png')
  }
  if(arrow && (color == 'transparent' || color == 'white' || color == colors.lightgrey)){
    image = require('../assets/icons/BackArrowBlack.png')
  }
  return (
    <View style={{ flexDirection: "row", alignItems: 'center', height: 50, backgroundColor: color}}>
      <TouchableOpacity onPress={() => onPress()} style={{ alignItems: 'center' }} >
        <Image style={{ height: 30, width: 30, marginLeft: 10 }}
          source={image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header;