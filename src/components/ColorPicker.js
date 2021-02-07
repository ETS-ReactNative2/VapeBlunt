import * as React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const colors = require('../assets/colors')

//required props: size, colors
//optional props: onSelected, style
function ColorPicker(props) {
  const {size} = props;

  function getColorComponent(color, i){
    marginRight = 5
    if(i === props.colors.length - 1){
      marginRight = 0
    }
    return(
      <TouchableOpacity key={i} onPress={() => props.onSelected(color)}
          style={{width: size, height: size, marginRight: marginRight,
            backgroundColor: color, borderRadius: size/2}} >
      </TouchableOpacity>
    )
  }
  return (
    <View style={[{flexDirection: 'row', marginVertical: 8}, props.style]}>
      {props.colors.map((color, i) => getColorComponent(color, i))}
    </View>
  )
}

export default ColorPicker;