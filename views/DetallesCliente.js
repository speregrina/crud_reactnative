import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Headline, Subheading, Text, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';


const DetallesClientes = ({navigation, route}) => {
    console.log(route.params);
    const { id, nombre, telefono, correo, empresa} = route.params.item;
const mostrarConfirmacion = () => {
    Alert.alert(
        '¿Deseas eliminar a este cliente?',
        'El registro ya no será recuperado',
        [
            {text: 'Si eliminar', onPress: () => eliminarContacto()},
            {text: 'Cancelar', style:'cancel'}
        ]
    )
}
//const {guardarConsultarAPI} = route.params;
const eliminarContacto = async () => {
    const url =`http://192.168.100.13:8080/user/${nombre}`;
    console.log(url);
    
    try{
        await axios.delete(url);
    }catch(error){
        console.error(error);
    }
    //redireccionar
    navigation.navigate('Inicio');
    //
    route.params.guardarConsultarAPI(true);
} 

    return( 
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>
            <Button mode="contained" icon="cancel" style={styles.boton}
                    onPress={ () => mostrarConfirmacion() }>
                Eliminar Cliente
            </Button>
            <FAB
                icon="pencil"
                style={globalStyles.fab}
                onPress={ () => navigation.navigate("Nuevocliente", {cliente: routes.params.item, guardarConsultarAPI})}
            />
        </View>
     );
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red',
        color: '#000000'
    }
});

export default DetallesClientes;