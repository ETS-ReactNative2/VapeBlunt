import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, Dimensions} from 'react-native';
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


export default class Producto extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedIndex: 0,
      images: [require('../assets/images/davinci-black.png'), require('../assets/images/davinci-blue.png')],
      tab: 'Info',
      rating: 4,
      product: {},
    }
    this.renderImageIndicator = this.renderImageIndicator.bind(this)
  }

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const selectedIndex = Math.round(contentOffset.x / winWidth)
    this.setState({ selectedIndex })
  }

  renderTab = () => {
    if(this.state.tab === 'Info'){
      return <InfoTab rating={this.state.rating} product={this.state.product}/>
    }else if(this.state.tab === 'Res'){
      return <InfoTab rating={this.state.rating} product={this.state.product}/>
    }
  }

  renderImageIndicator = (i) => {
    let color = (i === this.state.selectedIndex) ? colors.black : colors.grey
    return <Text key={i} style={{textAlign: 'center', fontSize: 40, color: color}}>{`\u2022`}</Text>
  }

  componentDidMount(){
    let id = this.props.route.params.productId
    productInfo(id).then((data)=> this.setState({
      product: data
    }))
  }
  
  render(){
    var {tab, product} = this.state
    var {navigation} = this.props
    var images = product.images || [] 
    return(
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Header color={colors.white} onPress = {()=>{ navigation.pop() }} arrow/>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={this.setSelectedIndex}
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
