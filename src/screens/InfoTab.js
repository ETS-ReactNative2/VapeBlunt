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
      options: [],
    }
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidUpdate(){
    if(this.state.options.length === 0){
      let variants = this.props.product.variants
      let options = []
      variants.forEach(variant => {
        options.push({label: variant.title, value: variant.title})
        this.setState({options: options})
      })
    }
  }
  
  renderPicker(){
    let {options} = this.state
    if(options.length > 1){
      return(
        <DropDownPicker
            items={options}
            defaultValue={options[0].label}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.props.onVariantSelect(item.value)}
        />
      )
    }
  }

  addToCart(){
    let { product } = this.props
    let { options } = this.state
    let cartItem = {
      handle: product.handle,
      variant: options[this.props.variantIndex].value,
      quantity: 1
    }
    this.props.onAddToCart(cartItem)
  }

  renderButtons(){
    let {product, variantIndex} = this.props
    renderArr = []
    if(product.variants[variantIndex].inventoryQuantity === 0){
      renderArr.push(
        <TouchableOpacity key={'nd'} style={{justifyContent: 'center', alignItems: 'center', borderWidth: 2,
          borderColor: colors.black, height: 45, borderRadius: 22.5}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>No disponible</Text>
        </TouchableOpacity>
      )
    }else{
      renderArr.push(
        <TouchableOpacity key={'add'} style={{justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: colors.black, height: 45, borderRadius: 22.5}} onPress={this.addToCart}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Agregar al carrito</Text>
        </TouchableOpacity>)

      renderArr.push(
        <BlackButton key={'buy'} text="Comprar ahora" fontSize={20} style={{height: 49, borderRadius: 22.5, marginVertical: 15}}/>
      )
    }
    return renderArr
  }

  render(){
    let { product, variantIndex } = this.props
    let { variants } = product
    let rating = product.rating || 0
    if(!product || !variants){
      return(<View></View>)
    }
    return(
      <View style={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, flex: 1}}>{product.title}</Text>
          <Text style={{fontSize: 16, width: 100, textAlign: 'right'}}>${variants[variantIndex].price}</Text>
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
          <ScrollView style={{maxHeight: 200}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Descripción</Text>
            <HTML html={product.descriptionHtml || "<p></p>"} />
          </ScrollView>
        </View>
        <View style={{marginTop: 20}}>
          {this.renderButtons()}
        </View>
      </View>
    )
  }
}
