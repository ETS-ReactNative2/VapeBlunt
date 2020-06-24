// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet, View,Text,TouchableOpacity,Image } from 'react-native';

const colors = require('../assets/colors');

const ItemCarrito= ({ navigation }) => {

    return (
        <View style={{flexDirection:'row',height:125}}>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <View style={{height:70,width:70,backgroundColor:colors.lightgrey,justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:15}}>
                <Image source={require('../assets/images/davinci-black.png')} style={{ width:55, height:55,backgroundColor:colors.lightgrey}}/>
                </View>
            </View>
            <View style={{flex:3,flexDirection:'column'}}>
                <View style={{flexDirection:"column"}}>
                    <Text style={{fontWeight:'500', fontSize:15, fontFamily:'Verdana',marginTop:15}}>Davicni miqro amethyst</Text>
                    <Text style={{fontSize:12, fontFamily:'Verdana',marginTop:5}}>Vaporizador herbal</Text>
                <View style={{flexDirection:"row", alignItems:'center',justifyContent:'flex-start'}}>
                        <Text style={{fontSize:12, fontFamily:'Verdana',marginTop:5,paddingRight:10}}>Negro</Text>
                        <View style={{width:15,height:15,borderRadius:7.5,backgroundColor:'black',marginTop:5}}/>
                </View>
            </View>
                <View style={{flexDirection:"row",height:45,alignItems:'center'}}>
                    <View style={{flexDirection:"row",flex:1,height:45,alignItems:"center"}}>
                        <TouchableOpacity style={{marginTop:10, borderColor:'black',borderWidth:1}}>
                            <Image style={{ height: 25, width: 25}}
                            source={require('../assets/icons/more.png')}/>
                        </TouchableOpacity>
                        <Text style={{padding:10,fontSize:20,fontWeight:'bold',marginTop:5}} >1</Text>
                        <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:10}}>
                            <Image style={{ height: 25, width: 25}}
                            source={require('../assets/icons/minus.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row",flex:2,height:50,alignItems:'center',marginTop:10,justifyContent:"center"}} >
                        <Text style={{fontWeight:'bold',color:"white",backgroundColor:colors.green,fontSize:18,paddingLeft:20,paddingRight:20,borderRadius:17,justifyContent:'flex-start',padding:5}}>$3.290</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default ItemCarrito;