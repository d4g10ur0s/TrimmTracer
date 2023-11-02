import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,Picker, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

export const ClientForm: React.FC = ({ onSubmit }) => {
  const [name, setName] = useState<string>('Panos');
  const [sirname, setSirname] = useState<string>('Koutsis');
  const [email, setEmail] = useState<string>('pkoutsan@gmail.com');
  const [phone, setPhone] = useState<string>('6956050752');
  const [note, setNote] = useState<string>('Varaei poly.');
  //errors
  const [nameError, setNameError] = useState(null);
  const [sirnameError, setSirnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [noteError, setNoteError] = useState(null);
  // name and sirname must be over 2 characters long
  const checkName = (name) => {
    const containsLetters = /[a-zA-Z]/.test(name);
    if (typeof name === 'string' && name.length > 3 && containsLetters) {
      setNameError(false);
    }else{setNameError(true);}
  }
  const checkSirname = (name) => {
    const containsLetters = /[a-zA-Z]/.test(name);
    if (typeof name === 'string' && name.length > 3 && containsLetters) {
      setSirnameError(false);
    }else{setSirnameError(true);}
  }
  // check email
  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
      setEmailError(false)
    }else{setEmailError(true)}
  }
  // check phone number
  const checkPhoneNumber = (phoneNumber) => {
    const greekPhoneRegex = /^(\+30|0030)?\s*?(69\d{8}|2\d{9})$/;
    if(greekPhoneRegex.test(phoneNumber)){
      setPhoneError(false)
    }else{setPhoneError(true)}
  }
  // Register in Application
  const handleRegister = () => {
    // if no errors then register new employee
    if( !nameError && !sirnameError && !emailError && !phoneError ){
      onSubmit(email,phone,name,note,sirname);
    }
  };

  return (
    <View style={styles.modificationContainer}>
      <Text
        style={styles.formHeader}
      >
        {"Add New Client"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sirname"
        value={sirname}
        onChangeText={setSirname}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.noteInput}
        multiline
        numberOfLines={8}
        onChangeText={setNote}
        placeholder="Enter your note here"
      />
      <View
        style={{flexDirection : "row",padding : 10,}}
      >
        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={{alignSelf : "center",}}> {"Submit"} </Text>
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
    borderRadius : 8,
    padding : 5,
    marginLeft : 15,
  },
  signInButton : {
    backgroundColor : "#FCB083FF",
    borderRadius : 8,
    padding : 5,
    marginRight : 15,
  },
  submitButton : {
    backgroundColor : "#349CCFFF",
    borderRadius : 8,
    padding : 5,
  },
  typeOfUserView : {
    flexDirection : 'row',
  },
  typeButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 15,
    padding : 5,
  },
  typeButtonDisabled:{
    backgroundColor : '#574C9E77',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 15,
    padding : 5,
  },
  modificationContainer: {
    backgroundColor : "#6465A1AA",
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingTop : 10,
    paddingBottom : 10,
    margin : 5,
    borderRadius : 8,
    alignSelf : 'center',
  },
  noteInput : {
    width : '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'top',
    height: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
