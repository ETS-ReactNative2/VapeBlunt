import * as React from 'react';
import{Image,Text, TouchableOpacity,Dimensions} from 'react-native';
import resolveAssetSource from 'resolveAssetSource'

const width  = Dimensions.get('window').width;
let image = resolveAssetSource(require('../assets/images/PromoImage.png'))
const  height  = Dimensions.get('window').width*(image.height/image.width);

function PromoImage(props){
    
    return(
        <TouchableOpacity>
            <Image source={require('../assets/images/PromoImage.png')} 
            style={{ width:width,height:height}}/>
        </TouchableOpacity>
    )
}


export default PromoImage;


