import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import EmployeeMainScreen from '../screens/EmployeeMainScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EmployeeMainScreen" component={EmployeeMainScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
