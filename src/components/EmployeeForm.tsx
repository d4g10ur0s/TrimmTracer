import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,Picker, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

const WorkingHoursFormComponent : React.FC = ({ deleteInterval , startTime , endTime}) => {

  // content
  return (
    <View
      style={[styles.horizontalView,styles.timeBorder]}
    >
      <View
        style={styles.timeView}
      >
      <Text style={{alignSelf : 'center',paddingTop : 0, paddingRight : 5,}}>{'Start Time'}</Text>
      <Text
        style={{alignSelf : 'center',paddingTop : 0, paddingLeft : 5,}}
      >
        {startTime}
      </Text>
      </View>
      <View
        style={styles.timeView}
      >
      <Text style={{alignSelf : 'center',paddingTop : 0, paddingRight : 5,}}>{'End Time'}</Text>
      <Text
        style={{alignSelf : 'center',paddingTop : 0, paddingLeft : 5,}}
      >
        {endTime}
      </Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => deleteInterval()}>
      <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}
export const WorkingHoursForm: React.FC = ( {addWorkingHours , removeWorkingHours} ) => {
  const [dayNum , setDayNum]=useState({
    'Mon' : 0,
    'Tue' : 4,
    'Wed' : 8,
    'Thu' : 12,
    'Fri' : 16,
    'Sat' : 20,
    'Sun' : 24,
  })
  // about working hours
  const [formComponents , setFormComponents] = useState({});
  const [selectedDay , setSelectedDay] = useState('Mon')
  const [depth , setDepth] = useState(1)
  // something to rerender
  const updateDepth = (newDepth) => {setDepth(newDepth)}
  useEffect(()=>{console.log(depth)},[depth])
  // when selected day is changed , set a valid depth
  useEffect(()=>{try{updateDepth(formComponents[selectedDay].length)}catch{updateDepth(1)}},[selectedDay])
  // add new working time interval
  const addInterval = () => {
    setFormComponents((prevFormComponents) => {
      const newFormComponents = { ...prevFormComponents };
      const newIntervalKey = depth + 1;
      if (!newFormComponents[selectedDay]) {
        newFormComponents[selectedDay] = [];
      }
      newFormComponents[selectedDay].push(
        <WorkingHoursFormComponent key={newIntervalKey+dayNum[selectedDay]+1} deleteInterval={removeInterval} startTime={startTime} endTime={endTime}/>
      );
      updateDepth(newFormComponents[selectedDay].length);
      return newFormComponents;
    });
    // reset time input
    addWorkingHours(selectedDay , startTime , endTime)
    handleStartTimeChange('')
    handleEndTimeChange('')
  };
  // delete interval
  const removeInterval = () => {
    setFormComponents((prevFormComponents) => {
      const newFormComponents = { ...prevFormComponents };
      if (newFormComponents[selectedDay]) {
        // Remove the item at the specified index
        newFormComponents[selectedDay] = newFormComponents[selectedDay].filter(
          (_, index) => index !== depth-1
        );
        // Update the depth after removing the item
        updateDepth(newFormComponents[selectedDay].length);
      }
      return newFormComponents;
    });
    removeWorkingHours(selectedDay , startTime , endTime)
  };
  // handle start time
  const [startTime, setStartTime] = useState('10:00');
  const [isStartTimeValid, setIsStartTimeValid] = useState(false);
  const handleStartTimeChange = (text) => {
    // Regular expression to validate the time in HH:mm format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(text)) {
      setIsStartTimeValid(true);
    } else {
      setIsStartTimeValid(false);
    }
    setStartTime(text);
  };
  // handle end time
  const [endTime, setEndTime] = useState('12:00');
  const [isEndTimeValid, setIsEndTimeValid] = useState(false);
  const handleEndTimeChange = (text) => {
    // Regular expression to validate the time in HH:mm format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(text)) {
      setIsEndTimeValid(true);
    } else {
      setIsEndTimeValid(false);
    }
    setEndTime(text);
  };

  const begin = async (a) =>{await setFormComponents(a)}
  useEffect(()=>{
    begin({
      'Mon' : [],
      'Tue' : [],
      'Wed' : [],
      'Thu' : [],
      'Fri' : [],
      'Sat' : [],
      'Sun' : [],
    })
  },[])

  return(
    <View>
    <Text style={[styles.typeOfEmployeeHeader,{alignSelf : 'center',marginVertical : 5,}]}>{'Working Hours'}</Text>
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
          style={[styles.horizontalView, {marginVertical : 5,}]}
        >
          <View
            style={styles.timeView}
          >
          <Text style={{alignSelf : 'center',paddingTop : 0, paddingRight : 4,}}>{'Start Time'}</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="(HH:mm)"
            onChangeText={handleStartTimeChange}
            value={startTime}
          />
          </View>
          <View
            style={styles.timeView}
          >
          <Text style={{alignSelf : 'center',paddingTop : 0, paddingRight : 4,}}>{'End Time'}</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="(HH:mm)"
            onChangeText={handleEndTimeChange}
            value={endTime}
          />
          </View>
        </View>
      <TouchableOpacity style={styles.addIntervalButton} onPress={addInterval}
                        disabled={depth==4 || (!isStartTimeValid && !isEndTimeValid)}
      >
        <Text>{'Add Interval'}</Text>
      </TouchableOpacity>
    </View>
  );
}
// form for employee registration
export const EmployeeForm: React.FC = ({ onSubmit , employee }) => {
  const [name, setName] = useState<string>('Nikos');
  const [sirname, setSirname] = useState<string>('Kalantas');
  const [email, setEmail] = useState<string>('nikal@hotmail.com');
  const [phone, setPhone] = useState<string>('6985698574');
  const [typeOfEmployee , setTypeOfEmployee] = useState('3');
  //errors
  const [nameError, setNameError] = useState(null);
  const [nameErrorLabel , setNameErrorLabel] = useState(null);
  const [sirnameError, setSirnameError] = useState(null);
  const [sirnameErrorLabel , setSirnameErrorLabel] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [emailErrorLabel , setEmailErrorLabel] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [phoneErrorLabel , setPhoneErrorLabel] = useState(null);
  // begin modification
  const beginModification = () => {
    setName(employee.name);
    setSirname(employee.sirname);
    setEmail(employee.email);
    setPhone(employee.phone);
    setTypeOfEmployee(employee.typeOfEmployee);
    setWorkingHours(employee.workingHours);
    beginWorkingHours()
  }
  // Change to Log In Form
  const toLogIn = () => {
    changeForm();
  }
  // name and sirname must be over 2 characters long
  useEffect(() => {
    const containsLetters = /[a-zA-Z]/.test(name);
    if (typeof name === 'string' && name.length > 3 && containsLetters) {
      setNameError(false);
      setNameErrorLabel(null)
    }else{
      setNameErrorLabel(<Text style={styles.errorLabel}>{'Name must be over 3 characters long .'}</Text>)
      setNameError(true);
    }
  },[name])
  useEffect(() => {
    const containsLetters = /[a-zA-Z]/.test(sirname);
    if (typeof sirname === 'string' && sirname.length > 3 && containsLetters) {
      setSirnameError(false);
      setSirnameErrorLabel(null)
    }else{
      setSirnameError(true);
      setSirnameErrorLabel(<Text style={styles.errorLabel}>{'Sirname must be over 3 characters long .'}</Text>)
    }
  },[sirname])
  // check email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
      setEmailErrorLabel(null)
      setEmailError(true)
    }else{
      setEmailErrorLabel(<Text style={styles.errorLabel}>{'Incorrect e-mail address format .'}</Text>)
      setEmailError(false)
    }
  },[email]);
  // check phone number
  useEffect(() => {
    const greekPhoneRegex = /^(\+30|0030)?\s*?(69\d{8}|2\d{9})$/;
    if(greekPhoneRegex.test(phone)){
      setPhoneErrorLabel(null)
      setPhoneError(true)
    }else{
      setPhoneError(false)
      setPhoneErrorLabel(<Text style={styles.errorLabel}>{'Phone number must be 10 digits long .'}</Text>)
    }
  },[phone])
  // Register in Application
  const handleRegister = () => {
    // create dummy password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    onSubmit(name,sirname,email,phone,typeOfEmployee,code,workingHours);
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

  const [dayNames,setDayNames] = useState({
    Mon : 'Monday',
    Tue : 'Tuesday',
    Wed : 'Wednesday',
    Thu : 'Thursday',
    Fri : 'Friday',
    Sat : 'Saturday',
    Sun : 'Sunday',
  })
  // the working hours
  const [workingHours , setWorkingHours] = useState([]);
  // add working hours
  const addWorkingHours = (selectedDay , startTime , endTime) =>{
    setWorkingHours((prevWorkingHours) => ([
      ...prevWorkingHours,
      {
        dayname: dayNames[selectedDay],
        start_time : startTime,
        end_time : endTime,
      } ,
    ]));
  }
  // remove working hours
  const removeWorkingHours = (selectedDay, startTime, endTime) => {
  setWorkingHours((prevWorkingHours) =>
    prevWorkingHours.filter(
      (workingHour) =>
        workingHour.dayname !== daynameToRemove ||
        workingHour.start_time !== start_timeToRemove ||
        workingHour.end_time !== end_timeToRemove
      )
    );
  };

  useEffect(() => {
    if(!(employee==undefined)){

    }
  },[])

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
        onChangeText={(tname) => setName(tname.trim())}
      />
      {nameErrorLabel}
      <TextInput
        style={styles.input}
        placeholder="Sirname"
        value={sirname}
        onChangeText={(tsirname) => setSirname(tsirname.trim())}
      />
      {sirnameErrorLabel}
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={(temail) => setEmail(temail.trim())}
      />
      {emailErrorLabel}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(tphone)=>setPhone(tphone.trim())}
      />
      {phoneErrorLabel}
      <WorkingHoursForm addWorkingHours={addWorkingHours} removeWorkingHours={removeWorkingHours}/>
      <Text style={styles.typeOfEmployeeHeader}>{"Choose type of Employee"}</Text>
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
        <TouchableOpacity
          style={styles.submitButton}
          disabled={(!nameError && !sirnameError && !emailError && !phoneError)}
          onPress={handleRegister}
        >
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
    width: '90%',
    paddingTop : 5,
    paddingBottom : 5,
    marginBottom: 20,
    borderRadius : 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderRadius : 8,
    borderWidth: 2,
    marginVertical: 8,
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
  typeOfEmployeeHeader : {
    fontSize : 15,
    fontWeight : 'bold',
  },
  typeOfUserView : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  workingDayView : {
    flexDirection : 'row',
    justifyContent : 'center',
  },
  horizontalView : {
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  timeBorder : {
    borderColor : 'black',
    borderRadius : 8,
    borderWidth : 1,
    marginVertical : 1,
  },
  timeView : {
    marginVertical : 2,
    marginHorizontal : 5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingHorizontal : 1,
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
  errorLabel : {
    color : 'red',
    marginBottom : 1,
  },
  buttonContainer: {
    backgroundColor: 'red',
    width : 15,
    height : 15 ,
    borderRadius: 50, // Make it a circle
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf : 'center',
    marginRight : 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});
