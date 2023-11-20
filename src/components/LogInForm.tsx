import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

interface LogInFormProps {
  onSubmit: (username: string, password: string) => void;
  changeForm : () => void;
}

const LogInForm: React.FC<LogInFormProps> = ({ onSubmit, changeForm }) => {
  const [isEmployee , setIsEmployee] = useState(true);
  const [username, setUsername] = useState<string>('aledadu@hotmail.com');
  const [password, setPassword] = useState<string>('aledadu071!');
  // employee or client log in
  const changeUser = () => { setIsEmployee( (prevState)=>(!prevState) ); }
  // Change to Registration Form
  const toRegister = () => {
    changeForm();
  }
  // Log In
  const handleLogIn = () => {
    // Perform any validation if needed before submitting the data
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Username and password are required.');
      return;
    }
    // Call the onSubmit prop with the entered username and password
    onSubmit(username, password, isEmployee);
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.formHeader}
      >
        {"Log In"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail or Phone Num."
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View
        style={{flexDirection : "row",padding : 10,}}
      >
        <TouchableOpacity style={styles.logInButton} onPress={changeUser}>
          <Text style={{alignSelf : "center",}}> {isEmployee ? ("Employee") : ("Client")} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
          <Text style={{alignSelf : "center",}}> {"Log In"} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={toRegister}>
          <Text style={{alignSelf : "center",}}> {"Sign In"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#6465A1AA",
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingTop : 10,
    paddingBottom : 10,
    marginTop : 150,
    marginBottom: 20,
    borderRadius : 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderRadius : 8,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  formHeader : {
    margin : 5,
    fontSize : 20,
    fontWeight : 'bold',
  },
  logInButton : {
    backgroundColor : "#349CCFFF",
    borderRadius : 8,
    padding : 5,
    marginRight : 15,
  },
  signInButton : {
    backgroundColor : "#FCB083FF",
    borderRadius : 8,
    padding : 5,
    marginLeft : 15,
  },
});

export default LogInForm;
