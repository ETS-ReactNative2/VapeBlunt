import * as React from 'react';
import { Text, StyleSheet,TouchableOpacity } from 'react-native';
import { colors } from '../assets';

//receives text, style, fontSize, and onPress
function BlackButton(props) {
    return (
        <TouchableOpacity style={[styles.buttonStyle,props.style]} onPress={() => props.onPress()}>
            <Text style={{color: colors.lightgreen, textAlign: 'center',fontSize:props.fontSize, marginHorizontal: 10}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'black',
        justifyContent: 'center',
        borderRadius: 20
    }
})

export default BlackButton;