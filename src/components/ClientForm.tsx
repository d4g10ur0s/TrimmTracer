import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,Picker, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

export const ClientForm: React.FC = ({ onSubmit }) => {
  const [note, setNote] = useState<string>('Varaei poly.');
  //errors
  const [noteError, setNoteError] = useState(null);
  // name and sirname must be over 2 characters long
  const [name, setName] = useState('Panos');
  const [nameError, setNameError] = useState(null);
  const [nameErrorContent ,setNameErrorContent] = useState(null);
  // name error
  useEffect(()=>{
    const containsLetters = /[a-zA-Z]/.test(name);
    if (typeof name === 'string' && name.length > 3 && containsLetters) {
      setNameError(false);
      setNameErrorContent(null)
    }else{
      setNameErrorContent(<Text style={styles.errorLabel}>{'Name must be over 3 characters long .'}</Text>)
      setNameError(true);
    }
  },[name])
  const [sirname, setSirname] = useState<string>('Koutsis');
  const [sirnameError, setSirnameError] = useState(null);
  const [sirnameErrorContent ,setSirnameErrorContent] = useState(null);
  // sirname error
  useEffect(()=>{
    const containsLetters = /[a-zA-Z]/.test(sirname);
    if (typeof sirname === 'string' && name.length > 3 && containsLetters) {
      setSirnameError(false);
      setSirnameErrorContent(null)
    }else{
      setSirnameError(true);
      setSirnameErrorContent(<Text style={styles.errorLabel}>{'Sirname must be over 3 characters long .'}</Text>)
    }
  },[sirname])
  // email errors
  const [email, setEmail] = useState<string>('pkoutsan@gmail.com');
  const [emailError, setEmailError] = useState(null);
  const [emailErrorContent ,setEmailErrorContent] = useState(null);
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
      setEmailError(false)
      setEmailErrorContent(null)
    }else{
      setEmailError(true)
      setEmailErrorContent(<Text style={styles.errorLabel}>{'E-mail is not in correct format .'}</Text>)
    }
  },[email])
  // check phone number
  const [phone, setPhone] = useState<string>('6956050752');
  const [phoneError, setPhoneError] = useState(null);
  const [phoneErrorContent ,setPhoneErrorContent] = useState(null);
  useEffect(() => {
    const greekPhoneRegex = /^(\+30|0030)?\s*?(69\d{8}|2\d{9})$/;
    if(greekPhoneRegex.test(phone)){
      setPhoneError(false)
      setPhoneErrorContent(null)
    }else{
      setPhoneError(true)
      setPhoneErrorContent(<Text style={styles.errorLabel}>{'Phone number must be 10 digits long .'}</Text>)
    }
  },[phone])
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
      <View style={styles.contentsView}>
        <Text
          style={styles.label}
        >
          {'Name'}
        </Text>
        <TextInput
        style={styles.nameInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        />
      </View>
      {nameErrorContent}
      <View style={styles.contentsView}>
        <Text
          style={styles.label}
        >
          {'Sirname'}
        </Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Sirname"
          value={sirname}
          onChangeText={setSirname}
        />
      </View>
      {sirnameErrorContent}
      <View style={styles.contentsView}>
        <Text
          style={styles.label}
        >{'E-Mail'}</Text>
        <TextInput
        style={styles.nameInput}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        />
      </View>
      {emailErrorContent}
      <View style={styles.contentsView}>
        <Text
          style={styles.label}
        >{'Phone'}</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      {phoneErrorContent}
      <Text style={styles.noteHeader}>Note</Text>
      <TextInput
        style={styles.noteInput}
        multiline
        numberOfLines={8}
        onChangeText={setNote}
        placeholder="Enter your note here"
        value={note}
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
  formHeader : {
    marginVertical : 10,
    fontSize : 18,
    fontWeight : 'bold',
    color : 'white',
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
    backgroundColor : '#495866',
    width : '80%',
    alignItems : 'center',
    borderRadius : 8,
  },
  contentsView : {
    flexDirection : "row",
    justifyContent : 'space-between',
    alignItems : 'center',
    marginVertical : 5,
    marginHorizontal : 30,
  },
  label: {
    flex : 1,
    fontWeight : 'bold',
    color : 'white',
  },
  nameInput : {
    flex : 2,
    paddingVertical : -3,
    paddingLeft : 10,
    borderRadius : 8,
    borderWidth : 1,
    borderColor : 'gray',
  },
  noteHeader : {
    fontSize : 15,
    fontWeight : 'bold',
    color : 'white',
    marginTop : 10,
  },
  noteInput : {
    width : '75%',
    height : 100,
    paddingHorizontal : 7,
    paddingVertical : 10,
    marginVertical : 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  errorLabel : {
    color : 'red',
    marginBottom : 1,
  },
});
