import * as React from 'react';
import Header from '../components/Header';
import {  View, Text, SafeAreaView,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import ItemCarrito from '../components/ItemCarrito';
import BlackButton from '../mini_components/BlackButton';
import {productInfo} from '../lib/graphql-shopify'

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
  
  componentDidMount(){
    this.props.cartItems.forEach(item => {
      productInfo(item.id).then(data =>{
        variant = data.variants.filter(v => v.title === item.variant)
        this.setState((prev) => (
          {cartItems: [...prev.cartItems, {product: data, variant: variant[0], quantity: item.quantity}]}
        ))
      })
    })
  }

  componentDidUpdate(){
    let {cartItems} = this.state
    let subtotal = 0
    let impuestos = 0
    let total = 0
    if(cartItems.length > 0 && this.state.subtotal === 0){
      cartItems.forEach(item => {
        subtotal += parseInt(item.variant.price)
      })
      impuestos = (subtotal*0.16).toFixed()
      total = subtotal*1.16
      this.setState({subtotal, impuestos, total})
    }
  }

  render(){
    let {navigation} = this.props
    let {cartItems, subtotal, impuestos, total} = this.state
    console.log("INCI", cartItems)
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <Header onPress = {()=>{navigation.navigate('Inicio')} } arrow/>
        <View style={{ flex: 1, backgroundColor:'white'}}>
          <ScrollView>
            {cartItems.map((item, i) => (
                <ItemCarrito key={i} product={item.product} variant={item.variant} quantity={item.quantity} />
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

export default connect(mapStateToProps)(Carrito);
