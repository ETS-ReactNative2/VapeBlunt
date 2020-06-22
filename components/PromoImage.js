import * as React from 'react';
import{Image,Text, TouchableOpacity} from 'react-native';

function PromoImage(props){
return(

    <TouchableOpacity>
        <Image source={require('../assets/images/jumbo2.png')}/>
    </TouchableOpacity>
)
}
export default PromoImage;


