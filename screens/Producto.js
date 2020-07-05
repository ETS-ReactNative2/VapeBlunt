import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Header from '../components/Header';
import DynamicImage from '../components/DynamicImage'
import InfoTab from './InfoTab'

import {productInfo} from '../lib/graphql-shopify'

const colors = require('../assets/colors')
const winWidth = Math.round(Dimensions.get('window').width)

function MiniTab({text, active, onPress}){
  if(active){
    return(
      <TouchableOpacity onPress={() => onPress()} style={{flex: 1, backgroundColor: colors.black,
        height: 40, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: colors.lightgreen}}>
        <Text style={{textAlign: 'center',color: colors.lightgreen}}>{text}</Text>
      </TouchableOpacity>
    )
  }else{
    return(
      <TouchableOpacity onPress={() => onPress()} style={{flex: 1, backgroundColor: colors.black, height: 40, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center',color: colors.white}}>{text}</Text>
      </TouchableOpacity>
    )
  }
}


class Producto extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedImageIndex: 0,
      images: [require('../assets/images/davinci-black.png'), require('../assets/images/davinci-blue.png')],
      tab: 'Info',
      rating: 4,
      product: {},
      selectedVariant: '',
      images: [],
    }
    this.renderImageIndicator = this.renderImageIndicator.bind(this)
    this.selectVariant = this.selectVariant.bind(this)
  }

  setselectedImageIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const selectedImageIndex = Math.round(contentOffset.x / winWidth)
    this.setState({ selectedImageIndex })
  }

  renderTab = () => {
    if(this.state.tab === 'Info'){
      return <InfoTab product={this.state.product} 
        onVariantSelect={variant=>this.selectVariant(variant)} onAddToCart={(cartItem) => this.props.addItemToCart(cartItem)}/>
    }else if(this.state.tab === 'Res'){
      return <InfoTab product={this.state.product} 
        onVariantSelect={variant=>this.selectVariant(variant)} onAddToCart={(cartItem) => this.props.addItemToCart(cartItem)}/>
    }
  }

  renderImageIndicator = (i) => {
    let color = (i === this.state.selectedImageIndex) ? colors.black : colors.grey
    return <Text key={i} style={{textAlign: 'center', fontSize: 40, color: color}}>{`\u2022`}</Text>
  }

  prepareImages = (product) => {
    images = product.images
    if(product.variants.length > 1){
      product.variants.forEach(variant => {
        if(images.indexOf(variant.image) === -1){
          images.push(variant.image)
        }
      })
    }
    return images
  }

  componentDidMount(){
    let id = this.props.route.params.productId
    productInfo(id).then((data)=> {
      images = this.prepareImages(data)
      data.id = id
      this.setState({product: data, selectedVariant: data.variants[0].title, images: images})
    })
  }

  selectVariant = (variantTitle) => {
    // //change image
    // let {product, selectedImageIndex, images} = this.state
    // let index = selectedImageIndex
    // let imageURL = ""
    // product.variants.forEach((variant) => {
    //   if(variant.title === variantTitle){
    //     imageURL = variant.image
    //   }
    // })
    // images.forEach((image, i) => {
    //   if(image === imageURL){
    //     index = i
    //   }
    // })
    // //set scrollview index here
    this.setState({selectedVariant: variantTitle})
  }
  
  render(){
    var {tab} = this.state
    var {navigation} = this.props
    var images = this.state.images
    return(
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Header color={colors.white} onPress = {()=>{ navigation.pop() }} arrow/>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={this.setselectedImageIndex}
        ref={this.scrollRef}>
          {images.map((image, i) => (
            <DynamicImage 
            key={i}
            backgroundColor={colors.white}
            containerWidth={winWidth}
            width={winWidth/3}
            source={{uri: image}} />
          ))}
        </ScrollView>
        {/* Carousel indicators */}
        <View style={{flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white}}>
          {images.map((_, i) => this.renderImageIndicator(i))}
        </View>
        {/* END Carousel indicators  */}
        <View style={{flexDirection: 'row'}}>
          <MiniTab text="INFORMACIÓN" onPress={() => this.setState({tab: 'Info'})} active={tab === 'Info'}/>
          <MiniTab text="RESEÑAS" onPress={() => this.setState({tab: 'Res'})} active={tab === 'Res'}/>
        </View>
        <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 290}}>
          {this.renderTab()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
    }
}

export default connect(null, mapDispatchToProps)(Producto)
