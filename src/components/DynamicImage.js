import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
const { resolveAssetSource } = Image;

const colors = require('../assets/colors')
//Image inside its own container we can adjust container width and height
//through props. Can also adjust image width and will adjust
//height automatically with the image ratio
//By default the container has the image's dimensions (+ 10 padding)
function DynamicImage(props) {
  //let image = resolveAssetSource(props.source)

  let source = require('../assets/images/davinci-black.png')
  let width = props.width || 120
  let height = width
  let containerWidth = props.containerWidth || (width + 10)
  let containerHeight = props.containerHeight || (height + 10)

  if(props.source && props.source.uri){
    let uri = props.source.uri
    Image.getSize(uri, (w, h)=>{
      height = Math.round(width*(h/w))
      containerWidth = props.containerWidth || (width + 10)
      containerHeight = props.containerHeight || (height + 10)
    })
    source = props.source
  }else{
    source = props.source || require('../assets/images/davinci-black.png')
    let image = resolveAssetSource(source)
    height = Math.round(width*(image.height/image.width))
  }

 // let containerWidth = props.containerWidth || (width + 10)
 // let containerHeight = props.containerHeight || (height + 10)

  let bgColor = props.backgroundColor || colors.lightgrey
  
  if(props.onPress){
    return (
      <TouchableOpacity onPress={() => props.onPress()} style={[{ alignItems: 'center', justifyContent: 'space-between' }, props.style]} >
        <View style={[styles.imageContainer, {width: containerWidth, height: containerHeight, backgroundColor: bgColor}]}>
          <Image resizeMode='center'
            style={{ width: width, height: height, backgroundColor: bgColor}}
            source={props.source}
          />
        </View>
      </TouchableOpacity>
    )
  }else{
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'space-between' }, props.style]} >
        <View style={[styles.imageContainer, {width: containerWidth, height: containerHeight, backgroundColor: bgColor}]}>
          <Image resizeMode='center'
            style={{ width: width, height: height, backgroundColor: bgColor}}
            source={props.source}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  }
})

export default DynamicImage;