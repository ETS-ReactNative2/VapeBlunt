import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import BlackButton from '../mini_components/BlackButton'
import {productInfo} from '../lib/graphql-shopify'

const width = 300;
let image = Image.resolveAssetSource(require('../assets/images/PromoImage.png'))
const height = width * (image.height / image.width)

class PromoProduct extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      product: {},
      imgWidth: 200,
      imgHeight: 0
    }
  }

  componentDidMount(){
    productInfo(this.props.id).then(product => {
      Image.getSize(product.featuredImage, (w, h)=>{
        imgHeight = (this.state.imgWidth)*(h/w)
        this.setState({product, imgHeight})
      })
    })
  }

  render() {
    let {navigation, id} = this.props
    let {product, imgWidth, imgHeight} = this.state
    return (
      <View style={{ marginVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Producto', {id: id})}>
          {
            product ? <Image source={{uri: product.featuredImage}}
            style={{ resizeMode: 'contain', width: imgWidth, height: imgHeight }} /> : null
          }
        </TouchableOpacity>
        <BlackButton text={'Comprar'} style={{ width: 100, height: 35 }} onPress={() => props.onPress()} />
      </View>
    )
  }
}
export default PromoProduct;
