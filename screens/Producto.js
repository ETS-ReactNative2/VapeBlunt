import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, Dimensions} from 'react-native';
import Header from '../components/Header';
import DynamicImage from '../components/DynamicImage'
import InfoTab from './InfoTab'

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
    }
    this.renderImageIndicator = this.renderImageIndicator.bind(this)
  }

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width)
    this.setState({ selectedIndex })
  }

  renderTab = () => {
    if(this.state.tab == 'Info'){
      return <InfoTab rating={this.state.rating}/>
    }else if(this.state.tab == 'Res'){
      return <InfoTab rating={this.state.rating}/>
    }
  }

  renderImageIndicator = (i) => {
    let color = (i == this.state.selectedIndex) ? colors.black : colors.grey
    return <Text key={i} style={{textAlign: 'center', fontSize: 40, color: color}}>{`\u2022`}</Text>
  }
  
  render(){
    var {images, tab} = this.state
    var {navigation} = this.props
    return(
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Header color={colors.lightgrey} onPress = {()=>{ navigation.navigate('Categorias') }} arrow/>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={this.setSelectedIndex}
        ref={this.scrollRef} >
          {images.map((image, i) => (
            <DynamicImage 
            key={i}
            backgroundColor={colors.lightgrey}
            containerWidth={winWidth}
            width={winWidth/3}
            source={image} />
          ))}
        </ScrollView>
        {/* Carousel indicators */}
        <View style={{flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightgrey}}>
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
