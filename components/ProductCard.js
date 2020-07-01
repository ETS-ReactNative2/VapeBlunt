import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';

const colors = require('../assets/colors')

function ProductCard(props) {
  let containerWidth = props.containerWidth || 170
  let containerHeight = props.containerHeight || containerWidth
  
  let source = require('../assets/images/davinci-black.png')
  let width = props.width || 120
  let height = width
  if(props.source && props.source.uri){
    let uri = props.source.uri
    Image.getSize(uri, (w, h)=>{
      height = Math.round(width*(h/w))
    })
    source = props.source
  }else{
    source = props.source || require('../assets/images/davinci-black.png')
    let image = resolveAssetSource(source)
    height = Math.round(width*(image.height/image.width))
  }

  let title = props.title || "Davinci miqro amethyst"

  return (
    <TouchableOpacity onPress={() => props.onPress()} style={[{ alignItems: 'center'}, props.style]} >
      <View style={[styles.imageContainer, {width: containerWidth, height: containerHeight}]}>
        <Image resizeMode='center'
          style={{ width: width, height: height, backgroundColor: colors.lightgrey}}
          source={source}
        />
      </View>
      <View style={{width: containerWidth, marginTop: 2}}>
        <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'left'}}>{title}</Text>
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