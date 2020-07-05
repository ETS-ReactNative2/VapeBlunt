import * as React from 'react';
import { Text, TouchableOpacity, View, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BlackButton from '../mini_components/BlackButton';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';

const colors = require('../assets/colors')

export default class InfoTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      option: '',
      options: []
    }
    this.renderPicker = this.renderPicker.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidUpdate(){
    if(this.state.options.length === 0){
      let variants = this.props.product.variants
      let options = []
      variants.forEach(variant => {
        options.push({label: variant.title, value: variant.title})
      })
      this.setState({options: options, option: options[0].label})
    }
  }
  
  renderPicker = ()=>{
    if(this.state.options.length > 1){
      return(
        <DropDownPicker
            items={this.state.options}
            defaultValue={this.state.option}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.props.onVariantSelect(item.value)}
        />
      )
    }
  }

  addToCart = () => {
    let cartItem = {id: this.props.product.id, variant: this.state.option, quantity: 1}
    this.props.onAddToCart(cartItem)
  }

  render(){
    let {product} = this.props
    let {variants} = product
    let rating = product.rating || 0
    return(
      <View style={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, flex: 1}}>{product.title}</Text>
          <Text style={{fontSize: 16, width: 100, textAlign: 'right'}}>${variants ? variants[0].price : ""}</Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          {/* Render active stars */}
          {Array(Math.floor(rating)).fill().map((_, i) => (
            <Image key={i} source={require('../assets/icons/star-active.png')}
            style={{width: 16, height: 16}}
            />
          ))}
          {/* Render half stars */}
          {Array((rating / 0.5) % 2).fill().map((_, i) => (
            <Image key={i} source={require('../assets/icons/star-medium.png')}
            style={{width: 16, height: 16}}
            />
          ))}
          {/* Render inactive stars */}
          {Array(5-Math.floor(rating) - ((rating / 0.5) % 2)).fill().map((_, i) => (
            <Image key={i} source={require('../assets/icons/star-inactive.png')}
            style={{width: 16, height: 16}}
            />
          ))}
        </View>
        {this.renderPicker()}
        <View style={{marginTop: 10}}>
          <ScrollView style={{height: 200}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Descripción</Text>
            <HTML html={product.descriptionHtml} />
          </ScrollView>
        </View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',
            borderWidth: 2, borderColor: colors.black, height: 45, borderRadius: 22.5}} onPress={this.addToCart}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Agregar al carrito</Text>
          </TouchableOpacity>
          {/* receives text, style, fontSize, and onPress */}
          <BlackButton text="Comprar ahora" fontSize={20} style={{height: 49, borderRadius: 22.5, marginVertical: 15}}/>
        </View>
      </View>
    )
  }
}
