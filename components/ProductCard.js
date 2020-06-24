import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

import resolveAssetSource from 'resolveAssetSource';

const colors = require('../assets/colors')

function ProductCard(props) {
  let containerWidth = props.containerWidth || 170
  let containerHeight = props.containerHeight || containerWidth
  
  let image = resolveAssetSource(require('../assets/images/davinci-black.png'))
  let width = props.width || 120
  let height = Math.round(width*(image.height/image.width))
  
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={[{ alignItems: 'center', justifyContent: 'space-between' }, props.style]} >
      <View style={[styles.imageContainer, {width: containerWidth, height: containerHeight}]}>
        <Image resizeMode='center'
          style={{ width: width, height: height, backgroundColor: colors.lightgrey}}
          source={require('../assets/images/davinci-black.png')}
        />
      </View>
      <View style={{alignSelf: 'stretch'}}>
        <Text style={{color: 'black', textAlign: 'left'}}>Davinci miqro amethyst</Text>
        <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'left'}}>$3,290</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    marginBottom: 0,
  }
})

export default ProductCard;