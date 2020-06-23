import * as React from 'react';
import { Text, StyleSheet,TouchableOpacity } from 'react-native';
const colors = require('../assets/colors');

function BlackButton(props) {

    return (
    <TouchableOpacity style={[styles.buttonStyle,{width:props.width,height:props.height}]} onPress={() => props.onPress()}>
        <Text style={{color: colors.lightgreen, textAlign: 'center',fontSize:props.fontSize}}>{props.text}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
    backgroundColor: 'black',
    justifyContent: "center",
    borderRadius: 20
    }
})

export default BlackButton;