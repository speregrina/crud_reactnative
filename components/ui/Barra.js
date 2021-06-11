import React from 'react';
import { Button,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarraSuperior = ({navigation, route}) => {

    const handlePress = () => {
        //console.log('Vamos a crear un cliente');
        navigation.navigate("Nuevocliente");
    }

    return( 
       <View>
       <Icon.Button
       name="home"
       onPress={ () => handlePress() }
       >
       Inicio
     </Icon.Button>
     </View>
     );
}

export default BarraSuperior;