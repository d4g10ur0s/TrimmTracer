import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,Picker, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

const WorkingHoursFormComponent : React.FC = ({}) => {

  // working hours
  const [time, setTime] = useState('');
  const [isTimeValid, setIsTimeValid] = useState(true);

  const handleTimeChange = (text) => {
    // Regular expression to validate the time in HH:mm format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (timeRegex.test(text)) {
      setIsTimeValid(true);
    } else {
      setIsTimeValid(false);
    }

    setTime(text);
  };

  return (
    <View>
      <View
        style={styles.timeView}
      >
      <Text>{'Start Time'}</Text>
      <TextInput
        style={[styles.timeInput, !isTimeValid && styles.inputError]}
        placeholder="(HH:mm)"
        onChangeText={handleTimeChange}
        value={time}
      />
      </View>
      <View
        style={styles.timeView}
      >
      <Text>{'End Time'}</Text>
      <TextInput
        style={[styles.timeInput, !isTimeValid && styles.inputError]}
        placeholder="(HH:mm)"
        onChangeText={handleTimeChange}
        value={time}
      />
      </View>
    </View>
  );
}
export const WorkingHoursForm: React.FC = () => {
  // about working hours
  const [formComponents , setFormComponents] = useState({
    'Mon' : [],
    'Tue' : [],
    'Wed' : [],
    'Thu' : [],
    'Fri' : [],
    'Sat' : [],
    'Sun' : [],
  });
  const [selectedDay , setSelectedDay] = useState('Mon')
  const [depth , setDepth] = useState(0)
  // something to rerender
  const updateDepth = (newDepth) => {setDepth(newDepth)}
  useEffect(()=>{console.log(depth)},[depth])
  // when selected day is changed , set a valid depth
  useEffect(()=>{
    if(formComponents[selectedDay]==undefined){updateDepth(0)}
    else{updateDepth(formComponents[selectedDay].length)}
  },[selectedDay])
  // add new working time interval
  const addInterval = () => {
    setFormComponents((prevFormComponents) => {
      const newFormComponents = { ...prevFormComponents };
      const newIntervalKey = depth + 1;

      if (!newFormComponents[selectedDay]) {
        newFormComponents[selectedDay] = [];
      }

      newFormComponents[selectedDay].push(
        <WorkingHoursFormComponent key={newIntervalKey} />
      );

      updateDepth(newFormComponents[selectedDay].length);
      return newFormComponents;
    });
  };

  return(
    <View>
      <View style={styles.workingDayView}>
        <TouchableOpacity
          style={(selectedDay=='Mon') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Mon')}
          disabled={(selectedDay=='Mon')}>
          <Text>{'Mon'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDay=='Tue') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Tue')}
          disabled={(selectedDay=='Tue')}>
          <Text>{'Tue'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDay=='Wed') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Wed')}
          disabled={(selectedDay=='Wed')}>
          <Text>{'Wed'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDay=='Thu') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Thu')}
          disabled={(selectedDay=='Thu')}>
          <Text>{'Thu'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDay=='Fri') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Fri')}
          disabled={(selectedDay=='Fri')}>
          <Text>{'Fri'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDay=='Sat') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Sat')}
          disabled={(selectedDay=='Sat')}>
          <Text>{'Sat'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDay=='Sun') ? styles.workingDayButtonDisabled : styles.workingDayButton}
          onPress={() => setSelectedDay('Sun')}
          disabled={(selectedDay=='Sun')}>
          <Text>{'Sun'}</Text>
        </TouchableOpacity>
      </View>
      {formComponents[selectedDay] &&
        formComponents[selectedDay].map((component) => component)}
      <View
        style={styles.horizontalView}
      >
      <TouchableOpacity style={styles.addIntervalButton} onPress={addInterval} disabled={depth==4}>
        <Text>{'Add Interval'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}>
        <Text>{'Delete Interval'}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
// form for employee registration
export const EmployeeForm: React.FC = ({ onSubmit }) => {
  const [name, setName] = useState<string>('Nikos');
  const [sirname, setSirname] = useState<string>('Kalantas');
  const [email, setEmail] = useState<string>('nikal@hotmail.com');
  const [phone, setPhone] = useState<string>('6985698574');
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
      onSubmit(name,sirname,email,phone,typeOfEmployee,code);
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
    <View style={styles.container}>
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
      <WorkingHoursForm />
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
    backgroundColor : '#495866',
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
  addIntervalButton : {
    backgroundColor : "#349CCFFF",
    borderRadius : 8,
    padding : 5,
    alignSelf : 'center',
    marginVertical : 5,
  },
  typeOfUserView : {
    flexDirection : 'row',
  },
  workingDayView : {
    flexDirection : 'row',
  },
  horizontalView : {
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  timeView : {
    marginVertical : 2,
    marginHorizontal : 10,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  typeButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 15,
    padding : 5,
  },
  workingDayButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 3,
    padding : 5,
  },
  typeButtonDisabled:{
    backgroundColor : '#574C9E44',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 15,
    padding : 5,
  },
  workingDayButtonDisabled : {
    backgroundColor : '#574C9E44',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 3,
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
  timeInput: {
    width: 100,
    height: 35,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius : 8,
    paddingLeft: 5,
    paddingTop : 2,
    paddingBottom : 2,
  },
  deleteButton : {
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
});
