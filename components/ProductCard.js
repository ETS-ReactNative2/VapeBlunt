import * as React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

function ProductCard(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={{ alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }} >
      <Image resizeMode='center'
        style={{ width: 100, height: 150, marginBottom: 10}}
        source={require('../assets/images/davinci-black.png')}
      />
      <View>
        <Text style={{color: 'black'}}>Davinci miqro amethyst</Text>
        <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'left'}}>$3,290</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard;