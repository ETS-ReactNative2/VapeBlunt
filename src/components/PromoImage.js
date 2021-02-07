import * as React from 'react';
import {Image, TouchableOpacity, Dimensions} from 'react-native';

let image = Image.resolveAssetSource(require('../assets/images/PromoImage.png'))
const width  = Dimensions.get('window').width;
const  height  = Dimensions.get('window').width*(image.height/image.width);

function PromoImage(props){
    return(
        <TouchableOpacity onPress={() => props.onPress()}>
            <Image source={require('../assets/images/PromoImage.png')} 
            style={{ width:width,height:height}}/>
        </TouchableOpacity>
    )
}

export default PromoImage;
