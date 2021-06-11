import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView,  ScrollView,  StatusBar,  StyleSheet,  Text,  useColorScheme,  View} from 'react-native';
import Inicio from './views/Inicio';
import NuevoCliente from './views/nuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';

import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//definir el tema
const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'#1774F2'
  }
}

//console.log(theme.colors.primary);


const App = () => {
  
  return (
    <>
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle:{
          backgroundColor: theme.colors.primary
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle:{
          fontWeight: 'bold'
        }
      }}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={ ({navigation, route}) => ({
            headerTitleAlign:'center',
           // headerLeft: (props) => <BarraSuperior {...props}
           //                     navigation = {navigation}
           //                     route = {route}
           //                   />
          })}
         />
          <Stack.Screen
          name="Nuevocliente"
          component={NuevoCliente}
          options={{
            title: "Nuevo Cliente"
          }}
         />
          <Stack.Screen
          name="DetalleCliente"
          component={DetallesCliente}
          options={{
            title: "Detalles Cliente"
          }}
         />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
