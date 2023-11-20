import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import {RegistrationForm} from '../components/RegistrationForm';
import LogInForm from '../components/LogInForm';
import { login } from '../utils/EnterApp';

const RegisterScreen: React.FC = () => {
  const [regForm, setRegForm] = useState(true);
  const navigation = useNavigation(); // Initialize navigation

  const toggleForm = () => {
    setRegForm((prevState) => !prevState);
  }

  const logIn = async  (username : string , password : string , employee: boolean) => {
    try {
      const userData = await login(username, password,employee);
      // Do something with the user data (e.g., save to state or AsyncStorage)
      navigation.navigate('EmployeeMainScreen', {userData});
    } catch (error) {
      console.log()
      Alert.alert('Login Failed', error + ' , please try again.');
    }
  }

  return (
    <View style={styles.container}>
      {
        regForm ? (<RegistrationForm changeForm={toggleForm} addEmployee={false}/>) : (<LogInForm onSubmit={logIn} changeForm={toggleForm}/>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default RegisterScreen;
