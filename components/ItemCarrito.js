// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import DynamicImage from './DynamicImage'

const colors = require('../assets/colors');

function Adder(props){
  return(
    <View style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:10}} onPress={()=>props.onDecrement()}>
            <Image style={{ height: 23, width: 23}} source={require('../assets/icons/minus.png')}/>
        </TouchableOpacity>
        <Text style={{padding:10,fontSize:20,fontWeight:'bold',marginTop:5}}>{props.quantity}</Text>
        <TouchableOpacity style={{marginTop:10, borderColor:'black',borderWidth:1}} onPress={()=>props.onIncrement()}>
            <Image style={{ height: 23, width: 23}} source={require('../assets/icons/more.png')}/>
        </TouchableOpacity>
    </View>
  )
}

class ItemCarrito extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let {variant, quantity, product} = this.props
    let {title, displayName, price} = variant
    if(title === 'Default Title'){
      displayName = product.title
    }
    return (
      <View style={styles.container}>
        {
          product.images ? (
        <DynamicImage backgroundColor={colors.lightgrey} width={60} containerWidth={80}
        containerHeight={80} source={{uri: product.images[0]}}/>
          ) : null
        }
        <View style={{flex: 3, flexDirection:'column', alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
          <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, fontFamily: 'Verdana'}}>{displayName}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => this.props.onRemoveItem({id: product.id, variant: variant.title})}>
              <Image style={{width: 15, height: 15}} source={require('../assets/icons/cancel.png')}></Image>
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'stretch', fontFamily: 'Verdana'}}>Vaporizador herbal</Text>
          <View style={{flexDirection:"row", alignItems:'center', justifyContent: 'space-between', alignSelf: 'stretch'}}>
            <Adder quantity={quantity} onIncrement={() => this.props.onIncrement({id: product.id, variant: title})}
            onDecrement={() => this.props.onDecrement({id: product.id, variant: title})}
            />
            <View style={{marginTop:10, backgroundColor: colors.green, borderRadius: 17, width: 100}} >
              <Text style={styles.textPrice}>${price}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.translucid,
    padding: 10,
  },
  textPrice: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 18,
    padding: 5,
    textAlign: 'center'
  },
  removeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 10,
  },
})

export default ItemCarrito;
