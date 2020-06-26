import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import Header from '../components/Header';
import DynamicImage from '../mini_components/DynamicImage'

const colors = require('../assets/colors')
const winWidth = Math.round(Dimensions.get('window').width)

function InfoScreen(props){
  return(
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10}}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>Davinci miqro amethyst</Text>
      <Text style={{fontSize: 16}}>$3,290</Text>
    </View>
  )
}

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
  }

  nextImage = () => {
    this.setState(prev => ({
      selectedIndex: prev.selectedIndex === this.props.images -1 ? 0 : prev.selectedIndex +1
    }))
  }

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width)
    this.setState({ selectedIndex })
  }

  render(){
    var {images, tab} = this.state
    return(
      <SafeAreaView>
        <Header onPress = {()=>{ navigation.navigate('Categorias') }} arrow/>
        <ScrollView horizontal pagingEnabled
        onMomentumScrollEnd={this.setSelectedIndex}
        ref={this.scrollRef} >
          {images.map((image, i) => (
            <DynamicImage 
            key={i}
            containerWidth={winWidth}
            containerHeight={winWidth/2}
            width={winWidth/3}
            source={image} />
          ))}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <MiniTab text="INFORMACIÓN" active={tab === 'Info'}/>
          <MiniTab text="RESEÑAS" active={tab === 'Res'}/>
        </View>
        <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 80}}>
          {this.state.info ? <InfoScreen /> : <InfoScreen />}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
