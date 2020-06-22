import * as React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

function NavigationButton(props) {
  var {backgroundColor} = props;
  if(!backgroundColor){
    backgroundColor = 'transparent'
  }
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: backgroundColor}]}
    onPress={() => props.onPress()} >
        <Text style={{ fontSize: 20 }}> {props.text} </Text>
        <Image source={require('../assets/icons/flechaSideMenu.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  }
})

export default NavigationButton;