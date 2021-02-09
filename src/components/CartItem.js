import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { colors } from '../assets';

function Adder(props){
  return(
    <View style={{flexDirection:"row", alignItems:"center"}}>
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:10}} onPress={props.onDecrement}>
        <Image style={{ height: 23, width: 23}} source={require('../assets/icons/minus.png')}/>
      </TouchableOpacity>
      <Text style={{padding:10,fontSize:20,fontWeight:'bold',marginTop:5}}>
        {props.quantity}
      </Text>
      <TouchableOpacity style={{marginTop:10, borderColor:'black',borderWidth:1}} onPress={props.onIncrement}>
        <Image style={{ height: 23, width: 23}} source={require('../assets/icons/more.png')}/>
      </TouchableOpacity>
    </View>
  )
}

const RemoveIcon = (props) => {
  return(
    <TouchableOpacity style={styles.removeButton}
      onPress={props.onRemove}
    >
      <Image style={{
        width: 15,
        height: 15
        }} source={require('../assets/icons/cancel.png')}
      />
    </TouchableOpacity>
  )
}

const CartItem = (props) => {
  const navigation = useNavigation();
  const { product, variant, quantity } = props.item;
  const { title, price } = variant

  const increment = () => {
    props.onIncrement({handle: product.handle, variant: title})
  }

  const decrement = () => {
    props.onDecrement({handle: product.handle, variant: title})
  }

  const remove = () => {
    props.onRemoveItem({handle: product.handle, variant: variant.title})
  }

  return (
    <View style={styles.container}>
      <RemoveIcon onRemove={remove} />
      {product.images && (
      <Image
        resizeMode='contain'
        style={{width: 80, height: 80}}
        onPress={() => navigation.navigate('Producto', {handle: product.handle})}
        source={{uri: product.images[0]}}
      />)}
      <View style={styles.secondary_container}>
        <Text style={styles.title}>
          {product.title}
        </Text>
        {title !== 'Default Title' && (
          <Text style={{alignSelf: 'stretch', fontFamily: 'Verdana'}}>
            {title}
          </Text>
        )}
        <View style={styles.controllers}>
          <Adder quantity={quantity}
            onIncrement={increment}
            onDecrement={decrement}
          />
          <Text style={styles.textPrice}>
            ${price}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.translucid,
    padding: 10,
  },
  secondary_container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  controllers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Verdana',
    alignSelf: 'stretch'
  },
  textPrice: {
    backgroundColor: colors.green,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 100,
    width: 110,
  },
  removeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
})

export default CartItem;
