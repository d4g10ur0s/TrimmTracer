import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,Picker, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

interface RegistrationFormProps {
  onSubmit: (name : string , sirname : string , email: string, phone : string, password: string) => void;
  changeForm: () => void ;
  addEmployee : boolean ;
  onSubmit2: (name : string , sirname : string , email: string, phone : string, typeOfEmployee : number ,password: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, changeForm,addEmployee,onSubmit2 }) => {
  const [name, setName] = useState<string>('Nikos');
  const [sirname, setSirname] = useState<string>('Kalantas');
  const [nickname, setNickname] = useState<string>('kalantas');
  const [email, setEmail] = useState<string>('nikal@hotmail.com');
  const [phone, setPhone] = useState<string>('6985698574');
  const [password, setPassword] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [typeOfEmployee , setTypeOfEmployee] = useState('3');
  //errors
  const [nameError, setNameError] = useState(null);
  const [sirnameError, setSirnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  // Change to Log In Form
  const toLogIn = () => {
    changeForm();
  }
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
      // create dummy password
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      onSubmit2(name,sirname,nickname,email,phone,typeOfEmployee,code);
    }
  };

  // employee types
  const [selected , setSelected] = useState([false, false, true]);
  const button1 = () => {
    setSelected([true ,false ,false]);
    setTypeOfEmployee('1');
  }
  const button2 = () => {
    setSelected([false ,true ,false]);
    setTypeOfEmployee('2');
  }
  const button3 = () => {
    setSelected([false ,false ,true]);
    setTypeOfEmployee('3');
  }

  return (
    <View style={[styles.container, ( (addEmployee) ? ({}) : ({marginTop : 85,}) )]}>
      <Text
        style={styles.formHeader}
      >
        {"Register"}
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
      {(addEmployee)?
        (<TextInput
          style={styles.input}
          placeholder="Nickname"
          value={sirname}
          onChangeText={setNickname}
        />)
        :(null)
      }
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
      {(addEmployee)?(null):
        (<TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />)
      }
      {(addEmployee)?(null):
        (<TextInput
          style={styles.input}
          placeholder="Repeat Password"
          secureTextEntry
          value={password1}
          onChangeText={setPassword1}
        />)
      }
      {(addEmployee)?
        (<View
        style={styles.typeOfUserView}
      >
      <TouchableOpacity
        style={selected[0] ? styles.typeButtonDisabled : styles.typeButton}
        disabled={selected[0]}
        onPress={() => button1()}
      >
        <Text>
          {"Type 1"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selected[1] ? styles.typeButtonDisabled : styles.typeButton}
        disabled={selected[1]}
        onPress={() => button2()}
      >
        <Text>
          {"Type 2"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selected[2] ? styles.typeButtonDisabled : styles.typeButton}
        disabled={selected[2]}
        onPress={() => button3()}
      >
        <Text>
          {"Type 3"}
        </Text>
      </TouchableOpacity>
      </View>):(null)
      }
      <View
        style={{flexDirection : "row",padding : 10,}}
      >
      {(addEmployee)?(null):
        (<TouchableOpacity style={styles.signInButton}>
          <Text style={{alignSelf : "center",}}> {"Sign In"} </Text>
        </TouchableOpacity>)
      }
      {(addEmployee)?(null):
        (<TouchableOpacity style={styles.logInButton} onPress={toLogIn}>
          <Text style={{alignSelf : "center",}}> {"Log In"} </Text>
        </TouchableOpacity>)
      }
      {(addEmployee)?
        (<TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={{alignSelf : "center",}}> {"Submit"} </Text>
        </TouchableOpacity>)
        :(null)
      }
      </View>
    </View>
  );
};

export const EmployeeModificationForm: React.FC = ({ onSubmit, employee }) => {
  const [name, setName] = useState<string>(employee.name);
  const [sirname, setSirname] = useState<string>(employee.sirname);
  const [nickname, setNickname] = useState<string>(employee.nickname);
  const [email, setEmail] = useState<string>(employee.email);
  const [phone, setPhone] = useState<string>('6985698574');
  const [typeOfEmployee , setTypeOfEmployee] = useState(employee.typeOfEmployee);
  //errors
  const [nameError, setNameError] = useState(null);
  const [sirnameError, setSirnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

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
      onSubmit(name,sirname,nickname,email,phone,typeOfEmployee);
    }
  };

  // employee types
  const [selected , setSelected] = useState([false, false, false]);
  const button1 = () => {
    setSelected([true ,false ,false]);
    setTypeOfEmployee('1');
  }
  const button2 = () => {
    setSelected([false ,true ,false]);
    setTypeOfEmployee('2');
  }
  const button3 = () => {
    setSelected([false ,false ,true]);
    setTypeOfEmployee('3');
  }
  useEffect(()=>{
    //set type of employee at start
    if(employee.typeofemployee=='1'){button1()}
    else if(employee.typeofemployee=='2'){button2()}
    else{button3()}
  }, []);

  return (
    <View style={styles.modificationContainer}>
      <Text
        style={styles.formHeader}
      >
        {"Modify " + employee.name}
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
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
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
      <View
        style={styles.typeOfUserView}
      >
      <TouchableOpacity
        style={selected[0] ? styles.typeButtonDisabled : styles.typeButton}
        disabled={selected[0]}
        onPress={() => button1()}
      >
        <Text>
          {"Type 1"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selected[1] ? styles.typeButtonDisabled : styles.typeButton}
        disabled={selected[1]}
        onPress={() => button2()}
      >
        <Text>
          {"Type 2"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selected[2] ? styles.typeButtonDisabled : styles.typeButton}
        disabled={selected[2]}
        onPress={() => button3()}
      >
        <Text>
          {"Type 3"}
        </Text>
      </TouchableOpacity>
      </View>
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
});
