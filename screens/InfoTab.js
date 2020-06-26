import * as React from 'react';
import { Text, TouchableOpacity, View, Image} from 'react-native';
import ColorPicker from '../components/ColorPicker';
import BlackButton from '../mini_components/BlackButton';

const colors = require('../assets/colors')

function InfoTab(props){
  let rating = Math.round(props.rating)
  return(
    <View style={{paddingHorizontal: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Davinci miqro amethyst</Text>
        <Text style={{fontSize: 16}}>$3,290</Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        {/* Render active stars */}
        {Array(rating).fill().map((_, i) => (
          <Image key={i} source={require('../assets/icons/star-active.png')}
          style={{width: 16, height: 16}}
          />
        ))}
        {/* Render inactive stars */}
        {Array(5-rating).fill().map((_, i) => (
          <Image key={i} source={require('../assets/icons/star-inactive.png')}
          style={{width: 16, height: 16}}
          />
        ))}
      </View>
      <Text style={{color: colors.grey}}>Selecciona un color</Text>
      <ColorPicker onSelected={(color) => console.log(color)} colors={[colors.black,'#466895']} size={16}/>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Descripción</Text>
        <Text style={{color: colors.grey}}>El DaVinci Miqro ofrece el calentamiento avanzado de su predecesor el IQ con un diseño 33% más pequeño para una máxima discreción.</Text>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Características</Text>
        <Text>{`\u2022 Tamaño del horno ajustable`}</Text>
        <Text>{`\u2022 Herramienta para herbas incoroporada`}</Text>
        <Text>{`\u2022 Tecnología Smart Path`}</Text>
        <Text>{`\u2022 Control de temperatura con posición`}</Text>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',
          borderWidth: 2, borderColor: colors.black, height: 45, borderRadius: 22.5}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Agregar al carrito</Text>
        </TouchableOpacity>
        {/* receives text, style, fontSize, and onPress */}
        <BlackButton text="Comprar ahora" fontSize={20} style={{height: 49, borderRadius: 22.5, marginVertical: 15}}/>
      </View>
    </View>
  )
}

export default InfoTab