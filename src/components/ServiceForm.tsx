import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

interface ServiceFormProps {
  onSubmit: (username: string, password: string) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit,service }) => {
  const [name, setName] = useState<string>('Neo Service');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('45');
  const [seconds, setSeconds] = useState<string>('0');
  const [clientCost, setClientCost] = useState<string>('15');
  const [employeeCost, setEmployeeCost] = useState<string>('5');
  const [description, setDescription] = useState<string>('A new simple Service . \nCost is logically calculated.\n');
  const [toSubmit, setToSubmit ] = useState(false);
  // handle errors
  // name error
  const [nameError,setNameError] = useState(null);
  useEffect(()=>{
    if (typeof name == 'string' && name.length > 3 && /[a-zA-Z ]/.test(name)){setNameError(null)}
    else{setNameError(<Text style={styles.errorLabel}>{'Name must be over 3 characters long .'}</Text>)}
  },[name])
  // cost error
  const [costError,setCostError] = useState(null);
  useEffect(()=>{
    if (/^\d+(\.\d{0,1,2})?$/.test(clientCost) && parseFloat(clientCost)>0
    && /^\d+(\.\d{0,1,2})?$/.test(employeeCost) && parseFloat(employeeCost)>0){setCostError(null)}
    else{setCostError(<Text style={styles.errorLabel}>{'Cost must be a valid currency number .'}</Text>)}
  },[clientCost , employeeCost])
  // time error
  const [timeError,setTimeError] = useState(null);
  useEffect(()=>{
    if (/^\d+$/.test(hours) && /^\d+$/.test(minutes) && parseInt(minutes)>0 && /^\d+$/.test(seconds)){setTimeError(null)}
    else{setTimeError(<Text style={styles.errorLabel}>{'Time must be a valid time unit numbers .'}</Text>)}
  },[seconds ,minutes , hours])
  // store service
  const handleService = async () => {// den exw valei to alert
    if (nameError==null && costError==null && timeError==null){// cost constraints
      onSubmit(name ,hours ,minutes ,seconds,employeeCost,clientCost,description);
    }
  };

  const durationSetUP = async () => {
    const totalMilliseconds = parseInt(service.dur.nanoseconds) / 1000000;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hou = Math.floor((totalSeconds % 86400) / 3600);
    const min = Math.floor(((totalSeconds % 86400) % 3600) / 60);
    const sec = ((totalSeconds % 86400) % 3600) % 60;
    await setSeconds(sec.toString())
    await setMinutes(min.toString())
    await setHours(hou.toString())
  }

  useEffect(()=>{
    if(!(service==undefined)){
      setName(service.name)
      setClientCost(service.client_cost.toString())
      setEmployeeCost(service.employee_cost.toString())
      setDescription(service.description)
      durationSetUP()
    }
  },[])

  return (
    <View style={styles.container}>
      <Text
        style={styles.formHeader}
      >
        {(service==undefined) ? 'Add Service' : 'Modify Service'}
      </Text>
      <View
        style={styles.formContentsView}
      >
        <Text
          style={styles.label}
        >
          {'Service Name'}
        </Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Service Name'}
          value={name}
          onChangeText={setName}
        />
      </View>
      {nameError}
      <View
        style={styles.formContentsView}
      >
        <Text
          style={styles.label}
        >
          {'Service Duration'}
        </Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <Text style={styles.timeUnit}>h</Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
        <Text style={styles.timeUnit}>m</Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
        />
        <Text style={styles.timeUnit}>s</Text>
      </View>
      {timeError}
      <View
        style={styles.formContentsView}
      >
        <Text style={styles.label}>Cost</Text>
        <Text style={styles.label}>Client</Text>
        <TextInput
          style={styles.costInput}
          keyboardType="numeric"
          value={clientCost}
          onChangeText={setClientCost}
        />
        <Text style={styles.currencyText}>eur</Text>
        <Text style={styles.label}>Employee</Text>
        <TextInput
          style={styles.costInput}
          keyboardType="numeric"
          value={employeeCost}
          onChangeText={setEmployeeCost}
        />
        <Text style={styles.currencyText}>eur</Text>
      </View>
      {costError}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        multiline
        numberOfLines={8}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter your description here"
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleService}
      >
        <Text style={{alignSelf : "center",}}> {"Submit"} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : '#495866',
    width : '90%',
    alignItems : 'center',
    borderRadius : 8,
  },
  formHeader : {
    alignSelf : 'center',
    fontSize : 20,
    fontWeight : 'bold',
    color : 'white',
    marginVertical : 10,
  },
  formContentsView : {
    flexDirection : "row",
    justifyContent : 'space-between',
    alignItems : 'center',
    marginVertical : 5,
    marginHorizontal : 15,
  },
  nameInput : {
    flex : 1,
    paddingLeft : 5,
    paddingRight : -5,
    paddingVertical : -5,
    borderRadius : 8,
    borderWidth : 1,
    borderColor : 'gray',
    marginHorizontal : 15,
  },
  timeInput : {
    flex : 1,
    paddingLeft : 5,
    paddingRight : 0,
    paddingVertical : -5,
    borderRadius : 8,
    borderWidth : 1,
    borderColor : 'gray',
    marginHorizontal : 8,
  },
  costInput : {
    flex : 1,
    paddingLeft : 5,
    paddingVertical : -5,
    borderRadius : 8,
    borderWidth : 1,
    borderColor : 'gray',
    marginHorizontal : 5,
    marginHorizontal : 0,
  },
  label: {
      marginHorizontal : 5,
      fontWeight : 'bold',
      color : 'white',
  },
  currencyText : {
    marginRight : 10,
    marginHorizontal : 5,
    fontWeight : 'bold',
    color : 'white',
  },
  descriptionInput : {
    height : 75,
    borderWidth : 1,
    borderColor : 'gray',
    borderRadius : 8,
    marginVertical : 5,
    paddingHorizontal : 15,
  },
  submitButton : {
    backgroundColor : "#349CCFFF",
    borderRadius : 8,
    padding : 5,
    marginVertical : 10,
  },
  errorLabel : {
    color : 'red',
    marginBottom : 1,
  },
});
