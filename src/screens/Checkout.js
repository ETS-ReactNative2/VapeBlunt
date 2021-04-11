import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { BlackButton } from '../mini_components';
import { SafeAreaView, InputForm } from "../components";
import { createCheckout } from '../shopify/orders';
import { connect } from 'react-redux';
import { productInfo } from '../shopify/products'

const useUserCheckoutInfo = (default_info) => {
  const [info, setInfo] = React.useState(default_info || {
    email: "alfredd.gco@gmail.com",
    name: "Alfredo",
    lastName: "Garcia",
    address: "Calzada los Encinos #666",
    postalCode: "67120",
    country: "Mexico",
    city: "Monterrey",
    province: "NL",
    phoneNumber: "8123288522",
  });

  const setEmail = (email) => {
    setInfo({ ...info, email: email });
  };

  const setName = (name) => {
    setInfo({ ...info, name: name });
  };

  const setLastName = (lastName) => {
    setInfo({ ...info, lastName: lastName });
  };

  const setAddress = (address) => {
    setInfo({ ...info, address: address });
  };

  const setPostalCode = (postalCode) => {
    setInfo({ ...info, postalCode: postalCode });
  };

  const setCountry = (country) => {
    setInfo({ ...info, country: country });
  };

  const setCity = (city) => {
    setInfo({ ...info, city: city });
  };

  const setProvince = (state) => {
    setInfo({ ...info, province: state });
  };

  const setPhoneNumber = (phoneNumber) => {
    setInfo({ ...info, phoneNumber: phoneNumber });
  };

  return [
    info,
    {
      setEmail,
      setName,
      setLastName,
      setAddress,
      setPostalCode,
      setCountry,
      setCity,
      setProvince,
      setPhoneNumber,
    },
  ];
};

//Checkout screen
const Checkout = (props) => {
  const { cartItems } = props;
  const [user, editors] = useUserCheckoutInfo();
  const [ lineItems, setLineItems ] = useState([])

  const fetchItems = async() => {
    try{
      const products = await Promise.all(cartItems.map(({handle}) => productInfo(handle)))
      let tempLineItems = [];
      for(let i=0; i<products.length; i++){
        const { variants } = products[i];
        const variant = variants.filter(v => v.title === cartItems[i].variant)[0]
        const toAdd = {
          variantId: variant.id,
          quantity: cartItems[i].quantity
        }
        tempLineItems.push(toAdd);
      }
      setLineItems(tempLineItems);
    }catch(e){
      console.log("Error getting cart line items", e);
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const submitForm = () => {
    createCheckout({...user, lineItems}).then(({id, webUrl}) => {
      webUrl = webUrl.replace('.myshopify', '')
      console.log(`Redirecting to ${webUrl}...`)
      Linking.openURL(webUrl)
    }).catch((errors) => {
      console.log("Error generating checkout:", errors)
      errors.forEach(console.log)
    })
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: "white",
      }}
    >
      <Text style={styles.title}>Información de Contacto</Text>
      <InputForm
        value={user.email}
        onChangeInput={editors.setEmail}
        placeholder="Correo electrónico"
        titleStyle={{ fontSize: 17 }}
      />
      <Text style={styles.title}>Dirección de Envío</Text>
      <View style={styles.container}>
        <InputForm
          value={user.name}
          onChangeInput={editors.setName}
          placeholder="Nombre"
          style={styles.inputForm}
        />
        <InputForm
          value={user.lastName}
          onChangeInput={editors.setLastName}
          placeholder="Apellido"
          style={styles.inputForm}
        />
      </View>
      <InputForm
        value={user.address}
        onChangeInput={editors.setAddress}
        style={[styles.inputForm, { width: "100%", marginBottom: 10 }]}
        placeholder="Dirección Completa (Calle, Número Ext/Int, Colonia y/o Delegación)"
      />
      <View style={styles.container}>
        <InputForm
          value={user.postalCode}
          onChangeInput={editors.setPostalCode}
          placeholder="Código Postal"
          style={styles.inputForm}
        />
        <InputForm
          value={user.city}
          onChangeInput={editors.setCity}
          placeholder="Ciudad"
          style={styles.inputForm}
        />
      </View>
      <View style={styles.container}>
          <InputForm
            value={user.province}
            onChangeInput={editors.setProvince}
            placeholder="Estado"
            style={styles.inputForm}
          />
          <InputForm
            value={user.country}
            onChangeInput={editors.setCountry}
            placeholder="País"
            style={styles.inputForm}
          />
      </View>
      <InputForm
        value={user.phoneNumber}
        onChangeInput={editors.setPhoneNumber}
        placeholder="Teléfono"
      />
      <BlackButton style={{paddingVertical: 10, marginTop: 40}}
        text='Continuar' fontSize={18}
        onPress={submitForm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  inputForm: {
    width: "48%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems
  }
}

export default connect(mapStateToProps)(Checkout);
