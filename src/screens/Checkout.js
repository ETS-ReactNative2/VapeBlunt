import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  SafeAreaView,
  InputForm
} from '../components';

//Checkout screen
const Checkout = (props) => {
  return(
    <SafeAreaView style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: 'white'
      }}
    >
      <Text style={styles.title}>
        Información de Contacto
      </Text>
      <InputForm 
      placeholder='Correo electrónico' titleStyle={{fontSize: 17}}/>
      <Text style={styles.title}>
        Dirección de Envío
      </Text>
      <View style={styles.container}>
        <InputForm placeholder='Nombre' style={styles.inputForm}/>
        <InputForm placeholder='Apellido' style={styles.inputForm}/>
      </View>
      <InputForm style={[styles.inputForm, {width: '100%', marginBottom: 10}]}
      placeholder='Dirección Completa (Calle, Número Ext/Int, Colonia y/o Delegación)'/>
      <View style={styles.container}>
        <InputForm placeholder='Código Postal' style={styles.inputForm}/>
        <InputForm placeholder='Ciudad' style={styles.inputForm}/>
      </View>
      <View style={styles.container}>
        <InputForm placeholder='Estado' style={styles.inputForm}/>
        <InputForm placeholder='País' style={styles.inputForm}/>
      </View>
      <InputForm placeholder='Teléfono'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  inputForm: {
    width: '48%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
})

export default Checkout;