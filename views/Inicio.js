import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Text, FlatList, View, Button, StyleSheet } from 'react-native';
import {Headline, List, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation, route}) => {

    const [ clientes, guardarClientes] = useState([]);
    const [ consultarApi, guardarConsultarAPI ] = useState(true);

    useEffect( () =>{
        console.log("UseEffect trigger");
        const obtenerClienteApi =  async () =>{
            try {
                console.log("Before call services");
                const resultado= await axios.get('http://192.168.100.13:8080/getAll');
                console.log("El resultado del servicio");
                guardarConsultarAPI(false);
                console.log(resultado.data);
                guardarClientes(resultado.data);
            } catch (error) {
                console.log(error);
            }
        }
        if(consultarApi){
            obtenerClienteApi();
        }
    }, [consultarApi]);
    return( 
        <View style={globalStyles.contenedor}>
            <Button 
                icon="plus-circle"
                title="Nuevo cliente"
                onPress={ () => navigation.navigate("Nuevocliente", {guardarConsultarAPI})}>
                NUEVO CLIENTE
            </Button>
            <Headline style={globalStyles.titulo}> {clientes.length > 0 ? "Clientes": "Aun no hay Clientes"} </Headline>

            <FlatList 
             data={clientes}
             keyExtractor={ cliente => (cliente.id).toString() }
             renderItem={ ({item}) => (
                 <List.Item
                    title={item.nombre}
                    description={item.empresa}
                    onPress={ () => navigation.navigate("DetalleCliente", {item, guardarConsultarAPI})}
                 />
             )}
            />

            <FAB
                icon="plus"
                style={globalStyles.fab}
                onPress={ () => navigation.navigate("Nuevocliente", {guardarConsultarAPI})}
            />
        </View>
     );
}

const styles= StyleSheet.create({
    
});

export default Inicio;