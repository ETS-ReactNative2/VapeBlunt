import * as React from 'react';
import { ScrollView, Text, SafeAreaView, ImageBackground, Dimensions, StyleSheet, View} from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import { TouchableHighlight } from 'react-native-gesture-handler';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import NavigationButton from '../mini_components/NavigationButton';

const colors = require('../assets/colors');

export default class Tienda extends React.Component{
  constructor(props){
    super(props)
    let image = resolveAssetSource(require('../assets/images/pax3.jpg'))
    this.state = {
      jumbo: {
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').width*(image.height/image.width)),
      }
    }
  }

  render(){
    var {navigation} = this.props;
    var {jumbo} = this.state;
    return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
      <Header onPress = {()=>{ navigation.navigate('Inicio') }} arrow/>
      <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 80}}>
        <ImageBackground source={require('../assets/images/pax3.jpg')} 
          style={[styles.imgBackgroundStyle, {width: jumbo.width, height: jumbo.height}]}>
          <TouchableHighlight style={styles.buttonStyle} onPress={() => console.log("hi")}>
            <Text style={{color: colors.lightgreen, textAlign: 'center'}}>Comprar</Text>
          </TouchableHighlight>
        </ImageBackground>

        <NavigationButton text="Vaporizadores" onPress={()=>{}}/>
        <NavigationButton text="Accesorios" onPress={()=>{}}/>
        
        <View style={{marginTop: 30, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nuevos</Text>
            <Text style={{color: colors.lightgreen, fontSize: 16}}>Ver todo</Text>
          </View>
          {/* Start Product cards */}
          <View>
            <ScrollView horizontal={true} style={{padding: 20}}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </View>
          {/* End Product cards */}
        </View>

        <View style={{marginTop: 30, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Los más vendidos</Text>
            <Text style={{color: colors.lightgreen, fontSize: 16}}>Ver todo</Text>
          </View>
          {/* Start Product cards */}
          <View>
            <ScrollView horizontal={true} style={{padding: 20}}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </View>
          {/* End Product cards */}
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  imgBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: 'black',
    width: 100,
    height: 30,
    justifyContent: "center",
    borderRadius: 20
  }
})