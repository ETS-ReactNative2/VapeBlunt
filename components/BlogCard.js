import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet, View,Text,TouchableOpacity,Image } from 'react-native';


const colors = require('../assets/colors');

const BlogCard= ({ navigation }) => {

    return (
        <View>
            <View style={{alignItems:"center",flexDirection:"column",borderRadius:13,overflow:'hidden'}}>
                <Image source={require('../assets/images/boundless.jpg')} style={{ height:350,backgroundColor:colors.lightgrey,resizeMode:'contain',borderColor:'green'}}/>
            </View>
            <View>
                <Text style={{fontWeight:"bold",fontSize:20,marginTop:20}}>Reseña Vaporizador CF Boundless</Text>
                <Text style={{ color:'grey',opacity:.9}}>Es uno de los vaporizadores mas consistentes por este rango de precio, es fecil de usar y facil de limpiar </Text>
            </View>
            <TouchableOpacity style={{borderWidth:1,borderColor:'black',borderRadius:30,marginTop:20}}>
                <Text style={{color:"black", textAlign: 'center',fontSize:22,alignSelf:'center',padding:10,fontWeight:'500'}}>Leer más</Text>
            </TouchableOpacity>
        </View>         
    )
};

export default BlogCard;