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
    const sec = Math.floor(service.duration / 1000);
    await setSeconds(sec)
    const min = Math.floor((seconds % 3600) / 60);
    await setMinutes(min)
    const hou = Math.floor(seconds / 3600);
    await setHours(hou)
  }

  useEffect(()=>{
    if(!(service==undefined)){
      setName(service.name)
      setClientCost(service.client_cost)
      setEmployeeCost(service.employee_cost)
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
