import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';

let image = Image.resolveAssetSource(require('../assets/images/PromoImage.png'))
const width  = Dimensions.get('window').width;
const  height  = Dimensions.get('window').width*(image.height/image.width);

function PromoBlog(props){
    return(
        <TouchableOpacity onPress={() => props.onPress()}>
            <Image source={{uri: props.source}} 
            style={{ width:width,height:height}}/>
            <View>
                <Text style={{fontWeight:"bold",paddingLeft:10,fontSize:20}}>{props.title}</Text>
                <Text style={{paddingLeft:5}}>{props.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PromoBlog;