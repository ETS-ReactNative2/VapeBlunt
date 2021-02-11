import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

export const InputForm = (props) => {
  const {
    title,
    required = false,
    editable = true,
    onChangeInput = () => {}
  } = props;

  return(
    <>
      {
        title && (
          <Text style={[style.text, props.titleStyle]}>{title}{required ? " (*)" : ""}:</Text>
        ) 
      }
      <TextInput {...props} style={[style.textInput, props.style]}
        onChangeText={onChangeInput} editable={editable}
      />
    </>
  )
}

const style = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 15
  },
  textInput: {
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    color: 'black',
  },
})


export default InputForm;