import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {
  Header,
  CartItem
} from '../components';
import { BlackButton } from '../mini_components';

import { connect } from 'react-redux';
import { productInfo } from '../lib/shopify'

const Carrito = (props) => {
  const {
    navigation,
  } = props;
  const [items, setItems] = React.useState([]);

  //Fetch items and merge web info with store info
  const fetchItems = async() => {
    const { cartItems } = props;
    if(cartItems.length === 0){
      return setItems([])
    }

    try{
      const products = await Promise.all(cartItems.map(({handle}) => productInfo(handle)))
      let newItems = [];
      for(let i=0; i<products.length; i++){
        const { variants } = products[i];
        const variant = variants.filter(v => v.title === cartItems[i].variant)[0]
        const toAdd = {
          product: products[i],
          variant: variant,
          quantity: cartItems[i].quantity
        }
        newItems.push(toAdd);
      }
      setItems(newItems);
    }catch(e){
      console.log("Error merging cart items", e);
    }
  }

  React.useEffect(() => {
    fetchItems();
  }, [props.cartItems])

  const calculatedCosts = React.useMemo(() => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal += parseInt(item.variant.price)*item.quantity
    })
    const impuestos = (subtotal*0.16).toFixed(2)
    const total = (subtotal*1.16).toFixed(2)
    return { subtotal, impuestos, total };
  }, [items])

  const { subtotal, impuestos, total } = calculatedCosts;

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Header onPress = {() => navigation.navigate('Inicio')} arrow/>
      <View style={{ flex: 1, backgroundColor:'white'}}>
        <ScrollView>
          {items.map((item, i) => (
            <CartItem key={i} item={item}
            navigation={navigation}
            onRemoveItem={props.removeFromCart}
            onIncrement={props.incrementInCart}
            onDecrement={props.decrementInCart}
            />
          ))}
        </ScrollView>
        <View style={{justifyContent:'space-between',flexDirection:"row", borderTopColor:"rgba(0, 0, 0, 0.1)", borderTopWidth:1}}>
            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>Subtotal</Text>
            <Text style={{padding:10,fontSize:15}}>${subtotal}</Text>
        </View>
        <View style={{justifyContent:'space-between',flexDirection:"row", borderTopColor:"rgba(0, 0, 0, 0.1)", borderTopWidth:1}}>
            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>Impuestos</Text>
            <Text style={{padding:10,fontSize:15}}>${impuestos}</Text>
        </View>
        <View style={{justifyContent:'space-between',flexDirection:"row", borderTopColor:"rgba(0, 0, 0, 0.1)", borderTopWidth:1,borderBottomColor:"rgba(0, 0, 0, 0.1)",borderBottomWidth:1}}>
            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>Total</Text>
            <Text style={{padding:10,fontSize:15}}>${total}</Text>
        </View>
        
        <View style={{alignItems:"center"}}>
          <BlackButton style={styles.pay_button}
          text={"Pagar"} fontSize={18}
          onPress={props.emptyCart}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pay_button: {
    width: 325,
    height: 50,
    marginVertical: 20,
    borderRadius: 30,
  }
})

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      removeFromCart: (item) => dispatch({type: 'REMOVE_FROM_CART', payload: item}),
      incrementInCart: (item) => dispatch({type: 'INCREMENT_IN_CART', payload: item}),
      decrementInCart: (item) => dispatch({type: 'DECREMENT_IN_CART', payload: item}),
      emptyCart: () => dispatch({type: 'EMPTY'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
