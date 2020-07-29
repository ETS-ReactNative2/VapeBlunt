import * as React from 'react';
import {Image, Text, TouchableOpacity, Dimensions, View} from 'react-native';

let image = Image.resolveAssetSource(require('../assets/images/PromoImage.png'))
const width  = Dimensions.get('window').width;
const  height  = Dimensions.get('window').width*(image.height/image.width);

function PromoBlog(props){

    return(
        <TouchableOpacity onPress={() => props.onPress()}>
            <Image source={require('../assets/images/boundless.jpg')} 
            style={{ width:width,height:height}}/>
            <View>
                <Text style={{fontWeight:"bold",paddingLeft:10,fontSize:20}}>Reseña Vaporizador CF Boundless</Text>
                <Text style={{paddingLeft:5}}> Es un Vaporizador portatil hibrido de conduccion/conve...</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PromoBlog;

