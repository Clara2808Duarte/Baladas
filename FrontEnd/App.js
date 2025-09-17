import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListarBaladas from './screens/ListBaladas';
import BuscarBalada from './screens/BuscarBaladas';
import NovaBalada from './screens/AddBalada';
import EditarBalada from './screens/UpdateBaladas';
import DeleteBalada from './screens/DeleteBalada';
import Home from './screens/Home';

const Stack = createNativeStackNavigator() // cria o stack de navegação -> strack é um conjunto de telas 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListarBaladas" component={ListarBaladas} />
        <Stack.Screen name="BuscarBalada" component={BuscarBalada} />
        <Stack.Screen name="NovaBalada" component={NovaBalada} />
        <Stack.Screen name="EditarBalada" component={EditarBalada} />
        <Stack.Screen name="DeleteBalada" component={DeleteBalada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

