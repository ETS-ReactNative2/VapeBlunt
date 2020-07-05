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

  async getData(cartItems){
    let promises = []
    cartItems.forEach(item => {
      promises.push(productInfo(item.id))
    })
    return Promise.all(promises)
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

  async componentWillReceiveProps(nextProps){
    let {cartItems} = nextProps
    let temp = []
    let dataArr = await this.getData(cartItems)
    dataArr.forEach((data, i) => {
      variant = data.variants.filter(v => v.title === cartItems[i].variant)
      temp.push({product: data, variant: variant[0], quantity: cartItems[i].quantity})
    })
    this.setState({cartItems: temp})
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
    }else if(cartItems.length == 0 && this.state.subtotal > 0){
      this.setState({subtotal: 0, impuestos: 0, total: 0})
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
                <ItemCarrito key={i} product={item.product} variant={item.variant} quantity={item.quantity} 
                onRemoveItem={(toRemove) => this.props.removeFromCart(toRemove)}/>
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
      removeFromCart: (item) => dispatch({type: 'REMOVE_FROM_CART', payload: item})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
