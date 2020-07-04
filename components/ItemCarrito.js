// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import DynamicImage from './DynamicImage'
import {productInfo} from '../lib/graphql-shopify'

const colors = require('../assets/colors');

function Adder(props){
    return(
        <View style={{flexDirection:"row", alignItems:"center"}}>
            <TouchableOpacity style={{marginTop:10, borderColor:'black',borderWidth:1}}>
                <Image style={{ height: 23, width: 23}} source={require('../assets/icons/more.png')}/>
            </TouchableOpacity>
            <Text style={{padding:10,fontSize:20,fontWeight:'bold',marginTop:5}}>{props.quantity}</Text>
            <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:10}}>
                <Image style={{ height: 23, width: 23}} source={require('../assets/icons/minus.png')}/>
            </TouchableOpacity>
        </View>
    )
}

class ItemCarrito extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          product: {},
          variant: {},
        }
    }

    componentDidMount(){
      let {item} = this.props
      productInfo(item.id).then(res =>{
        variant = res.variants.filter(v => v.title === item.variant)
        this.setState({product: res, variant: variant[0], quantity: item.quantity})
      })
    }

    componentDidUpdate(){
      console.log("Update", this.state)
    }

    render(){
        let {variant, quantity, product} = this.state
        let {displayName, price} = variant
        return (
            <View style={styles.container}>
                {
                  product.images ? (
                <DynamicImage backgroundColor={colors.lightgrey} width={60} containerWidth={80}
                containerHeight={80} source={{uri: product.images[0]}}/>
                  ) : null
               }
                <View style={{flex: 3, flexDirection:'column', alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'stretch', fontFamily: 'Verdana'}}>{displayName}</Text>
                    <Text style={{alignSelf: 'stretch', fontFamily: 'Verdana'}}>Vaporizador herbal</Text>
                    <View style={{flexDirection:"row", alignItems:'center', justifyContent: 'space-between', alignSelf: 'stretch'}}>
                        <Adder quantity={quantity} />
                        <View style={{marginTop:10, backgroundColor: colors.green, borderRadius: 17, width: 100}} >
                            <Text style={styles.textPrice}>${price}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.translucid,
        padding: 10,
    },
    textPrice: {
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 18,
        padding: 5,
        textAlign: 'center'
    }
})

export default ItemCarrito;
