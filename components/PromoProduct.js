import * as React from 'react';
import {Image,TouchableOpacity,Dimensions,View} from 'react-native';
import resolveAssetSource from 'resolveAssetSource'
import BlackButton from '../mini_components/BlackButton'

const width = Dimensions.get('window').width;
let image = resolveAssetSource(require('../assets/images/PromoImage.png'))
const height = Dimensions.get('window').width*(image.height/image.width)

function PromoProduct(props){
    
    return(
        <View style={{marginVertical:15, alignItems:'center'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress ={ ()=> props.onPress()}>
                <Image source={require('../assets/images/PromoProduct.png')} 
                style={{resizeMode:'contain', width:width,height:height}}/>
            </TouchableOpacity>
            <BlackButton text={'Comprar'} style={{width: 100, height: 35}} onPress ={ ()=> props.onPress()} />
        </View>
    )
}
export default PromoProduct;
