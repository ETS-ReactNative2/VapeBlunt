import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView, InputForm } from "../components";

const useUserCheckoutInfo = () => {
    const [info, setInfo] = React.useState({
        email: "",
        name: "",
        lastName: "",
        address: "",
        postalCode: "",
        country: "",
        city: "",
        state: "",
        phoneNumber: "",
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

    const setState = (state) => {
        setInfo({ ...info, state: state });
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
            setState,
            setPhoneNumber,
        },
    ];
};

//Checkout screen
const Checkout = (props) => {
    const [user, editors] = useUserCheckoutInfo();
    console.log(user);

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
                onChangeInput={(text) => editors.setEmail(text)}
                placeholder="Correo electrónico"
                titleStyle={{ fontSize: 17 }}
            />
            <Text style={styles.title}>Dirección de Envío</Text>
            <View style={styles.container}>
                <InputForm
                    onChangeInput={(text) => editors.setName(text)}
                    placeholder="Nombre"
                    style={styles.inputForm}
                />
                <InputForm
                    onChangeInput={(text) => editors.setLastName(text)}
                    placeholder="Apellido"
                    style={styles.inputForm}
                />
            </View>
            <InputForm
                onChangeInput={(text) => editors.setAddress(text)}
                style={[styles.inputForm, { width: "100%", marginBottom: 10 }]}
                placeholder="Dirección Completa (Calle, Número Ext/Int, Colonia y/o Delegación)"
            />
            <View style={styles.container}>
                <InputForm
                    onChangeInput={(text) => editors.setPostalCode(text)}
                    placeholder="Código Postal"
                    style={styles.inputForm}
                />
                <InputForm
                    onChangeInput={(text) => editors.setCity(text)}
                    placeholder="Ciudad"
                    style={styles.inputForm}
                />
            </View>
            <View style={styles.container}>
                <InputForm
                    onChangeInput={(text) => editors.setState(text)}
                    placeholder="Estado"
                    style={styles.inputForm}
                />
                <InputForm
                    onChangeInput={(text) => editors.setCountry(text)}
                    placeholder="País"
                    style={styles.inputForm}
                />
            </View>
            <InputForm
                onChangeInput={(text) => editors.setPhoneNumber(text)}
                placeholder="Teléfono"
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

export default Checkout;
