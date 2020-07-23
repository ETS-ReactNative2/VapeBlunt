import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet, View,Text,TouchableOpacity,Image } from 'react-native';

const colors = require('../assets/colors');

function NoticiasCard(props) {
    return (
        <View style={styles}>
            <View style={{alignItems:"center",flexDirection:"column",borderRadius:13,overflow:'hidden'}}>
                <Image source={{uri: props.source}} 
                style={{aspectRatio:1, height: undefined, width: '100%', backgroundColor:colors.lightgrey, resizeMode:'cover', borderColor:'green'}}/>
            </View>
            <View>
                <Text style={{fontWeight:"bold",fontSize:20,marginTop:20}}> {props.title} </Text>
                <Text style={{ color:'grey',opacity:.9}}>{props.description}</Text>
            </View>
            <TouchableOpacity style={{borderWidth:1,borderColor:'black',borderRadius:30,marginTop:20}}>
                <Text style={{color:"black", textAlign: 'center',fontSize:22,alignSelf:'center',padding:10,fontWeight:'500'}}>Leer más</Text>
            </TouchableOpacity>
        </View>         
    )
};

const styles = StyleSheet.create({
    marginBottom: 20,
})


export default NoticiasCard;

