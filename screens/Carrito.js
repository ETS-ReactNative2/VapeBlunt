import * as React from 'react';
import Header from '../components/Header';
import {View, Text, SafeAreaView,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CartItem from '../components/CartItem';
import BlackButton from '../mini_components/BlackButton';
import {productInfo, productInfoo} from '../lib/graphql-shopify'

const colors = require('../assets/colors');

class Carrito extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cartItems: [],
      subtotal: 0,
      impuestos: 0,
      total: 0,
    }
  }
  
  async componentDidMount(){
    let {cartItems} = this.props
    let temp = []
    let dataArr = await this.getData(cartItems)
    dataArr.forEach((data, i) => {
      variant = data.variants.filter(v => v.title === cartItems[i].variant)
      temp.push({product: data, variant: variant[0], quantity: cartItems[i].quantity})
    })
    this.setState({cartItems: temp})
  }

  getData(cartItems){
    return Promise.all((cartItems.map(item => (productInfo(item.id)))))
  }

  propsUpdated(){
    //added or removed item
    if(this.props.cartItems.length !== this.state.cartItems.length){
      return true
    }
    propsQuantities = 0
    stateQuantities = 0
    this.props.cartItems.forEach(item => {
      propsQuantities += item.quantity
    })
    this.state.cartItems.forEach(item => {
      stateQuantities += item.quantity
    })
    //changed quantity in some item
    if(stateQuantities !== propsQuantities){
      return true
    }
    return false
  }

  stateUpdated(prevState){
    if(prevState.cartItems.length !== this.state.cartItems.length){
      return true
    }
    prevStateQuantities = 0
    stateQuantities = 0
    prevState.cartItems.forEach(item => {
      prevStateQuantities += item.quantity
    })
    this.state.cartItems.forEach(item => {
      stateQuantities += item.quantity
    })
    if(prevStateQuantities !== stateQuantities){
      return true
    }
    return false
  }

  async componentDidUpdate(prevProps, prevState){
    if(this.propsUpdated()){
      let {cartItems} = this.props
      let temp = []
      let dataArr = await this.getData(cartItems)
      dataArr.forEach((data, i) => {
        variant = data.variants.filter(v => v.title === cartItems[i].variant)
        temp.push({product: data, variant: variant[0], quantity: cartItems[i].quantity})
      })
      this.setState({cartItems: temp})
    }

    if(this.stateUpdated(prevState)){
      subtotal = 0
      impuestos = 0
      total = 0
      this.state.cartItems.forEach(item => {
        subtotal += parseInt(item.variant.price)*item.quantity
      })
      impuestos = (subtotal*0.16).toFixed(2)
      total = (subtotal*1.16).toFixed(2)
      this.setState({subtotal, impuestos, total})
    }
  }

  render(){
    let {navigation} = this.props
    let {cartItems, subtotal, impuestos, total} = this.state
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <Header onPress = {()=>{navigation.navigate('Inicio')} } arrow/>
        <View style={{ flex: 1, backgroundColor:'white'}}>
          <ScrollView>
            {cartItems.map((item, i) => (
                <CartItem key={i} product={item.product} variant={item.variant} quantity={item.quantity} 
                onRemoveItem={(toRemove) => this.props.removeFromCart(toRemove)}
                onIncrement={(toIncrement) => this.props.incrementInCart(toIncrement)}
                onDecrement={(toDecrement) => this.props.decrementInCart(toDecrement)}
                navigation={navigation}
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
            <BlackButton style={{width: 325, height: 50,marginTop:20,marginBottom:20,borderRadius:30}} text={"Pagar"} fontSize={18} onPress={()=>console.log()}/>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      removeFromCart: (item) => dispatch({type: 'REMOVE_FROM_CART', payload: item}),
      incrementInCart: (item) => dispatch({type: 'INCREMENT_IN_CART', payload: item}),
      decrementInCart: (item) => dispatch({type: 'DECREMENT_IN_CART', payload: item})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
