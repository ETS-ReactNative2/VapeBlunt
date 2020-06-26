import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

import resolveAssetSource from 'resolveAssetSource';

const colors = require('../assets/colors')
//Image inside its own container we can adjust container width and height
//through props. Can also adjust image width through props and will adjust
//height automatically with the image ratio
//By default the container is squared if you just specify the width
function DynamicImage(props) {
  let containerWidth = props.containerWidth || 170
  let containerHeight = props.containerHeight || containerWidth
  
  let image = resolveAssetSource(props.source)
  let width = props.width || 120
  let height = Math.round(width*(image.height/image.width))
  
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={[{ alignItems: 'center', justifyContent: 'space-between' }, props.style]} >
      <View style={[styles.imageContainer, {width: containerWidth, height: containerHeight}]}>
        <Image resizeMode='center'
          style={{ width: width, height: height, backgroundColor: colors.lightgrey}}
          source={props.source}
        />
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

export default DynamicImage;