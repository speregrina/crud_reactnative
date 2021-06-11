import React, { useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView,Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const { guardarConsultarAPI } = route.params;
    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [error, hayError] = useState(false);

    //detectar si estamos editando
    useEffect( () => {
        //Estamos editando
        if (route.params.cliente){
            const { nombre, telefono, correo, empresa } = route.params.cliente;
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);
        }
    },[]);

    const guardarCliente = async () => {
        //Valdar campos
        if(nombre ==='' || telefono==='' || correo==='' || empresa===''){
            console.log('Hay campos vacios');
            hayError(true);
            return;
        }
        //Generar cliente
        const cliente= {nombre, telefono, correo, empresa}
        
        //Editar o guardar cliente
        if(route.params.cliente){
            const { id } = route.params.cliente;
            cliente.id = id;
            const url =  `http://192.168.100.13:8080/user/${cliente.nombre}`;
            console.post(`url = ${url}`);
            try{
await axios.put(url, cliente);
            }catch(error){

            }
        }else{
            //Guardar en el API
            try{
                if(Platform.OS === 'android'){
                    //para Android
                    await axios.post('http://192.168.100.13:8080/newuser',cliente);
                }else{
                    //para ios
                    await axios.post('http://localhost:8080/newuser',cliente);
                }
            }catch(error){
                console.error(error);
            }
        }
        
        //limpiar el fomr (opcional)
    
        guardarCorreo('');
        guardarEmpresa('');
        guardarNombre('');
        guardarTelefono('');
        console.log('guardando cliente');
        guardarConsultarAPI(true);
        //redireccionar
        navigation.navigate('Inicio');
    }

    return( 
        <View style={globalStyles.contenedor}> 
        <ScrollView>
            <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
            <TextInput label="Nombre"
            placeholder="Juan" 
            value={nombre}
            onChangeText={ text => guardarNombre(text)}
            style={styles.input}
            />
            <TextInput label="Telefono"
            placeholder="10 digits" 
            value={telefono}
            onChangeText={ text => guardarTelefono(text)}
            style={styles.input}
            keyboardType='numeric'
            />
            <TextInput label="Correo"
            placeholder="correo@correo.com" 
            value={correo}
            onChangeText={ text => guardarCorreo(text)}
            style={styles.input}
            keyboardType='email-address'
            />
            <TextInput label="Empresa"
            placeholder="Nombre Empresa" 
            value={empresa}
            onChangeText={ text => guardarEmpresa(text)}
            style={styles.input}
            />
            
            <Button icon="home" 
            mode="contained"
            onPress={() => guardarCliente()}
            >
                Guardar Cliente
            </Button>
            <Portal>
                <Dialog 
                visible={error}
                onDismiss={ () => hayError(false)}
                >
                    <Dialog.Title>Validacion</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>
                        Todos los campos del formulario son obligatorios
                    </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                            <Button onPress={() => hayError(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            </ScrollView>
        </View>
     );
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
});

export default NuevoCliente;