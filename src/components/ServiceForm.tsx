import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

interface ServiceFormProps {
  onSubmit: (username: string, password: string) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('Neo Service');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('45');
  const [seconds, setSeconds] = useState<string>('0');
  const [clientCost, setClientCost] = useState<string>('15');
  const [employeeCost, setEmployeeCost] = useState<string>('5');
  const [description, setDescription] = useState<string>('A new simple Service . \nCost is logically calculated.\n');
  const [toSubmit, setToSubmit ] = useState(false);
  // store service
  const handleService = async () => {// den exw valei to alert
    if (typeof name == 'string' && name.length > 3 && /[a-zA-Z ]/.test(name) &&// name constraint
    /^\d+$/.test(hours) && /^\d+$/.test(minutes) && parseInt(minutes)>0 && /^\d+$/.test(seconds) &&// duration constraint
    /^\d+(\.\d{0,1,2})?$/.test(clientCost) && parseFloat(clientCost)>0
    && /^\d+(\.\d{0,1,2})?$/.test(employeeCost) && parseFloat(employeeCost)>0 ){// cost constraints
      onSubmit(name ,hours ,minutes ,seconds,employeeCost,clientCost,description);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.formHeader}
      >
        Add Service
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

export const ServiceModificationForm: React.FC = ({ onSubmit, service }) => {
  const [name, setName] = useState<string>(service.name);
  const [hours, setHours] = useState<string>('0');//edw 8elei edit
  const [minutes, setMinutes] = useState<string>('45');
  const [seconds, setSeconds] = useState<string>('0');
  const [clientCost, setClientCost] = useState<string>(service.client_cost);
  const [employeeCost, setEmployeeCost] = useState<string>(service.employee_cost);
  const [description, setDescription] = useState<string>(service.description);
  const [toSubmit, setToSubmit ] = useState(false);
  // store service
  const handleService = async () => {// den exw valei to alert
    if (typeof name == 'string' && name.length > 3 && /[a-zA-Z ]/.test(name) &&// name constraint
    /^\d+$/.test(hours) && /^\d+$/.test(minutes) && parseInt(minutes)>0 && /^\d+$/.test(seconds) &&// duration constraint
    /^\d+(\.\d{1,2})?$/.test(clientCost) && parseFloat(clientCost)>0
    && /^\d+(\.\d{1,2})?$/.test(employeeCost) && parseFloat(employeeCost)>0 ){// cost constraints
      service.name = name ;
      service.client_cost = clientCost;
      service.employee_cost = employeeCost;
      service.description = description;
      service.dur=hours+'h'+minutes+'m'+seconds+'s';
      onSubmit(service);
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
    durationSetUP();
  }, [])

  return (
    <View style={styles.modificationContainer}>
      <Text
        style={styles.formHeader}
      >
        Modify Service
      </Text>
      <TextInput
        style={styles.nameInput}
        placeholder={'Service Name'}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.durationInput}>
        <Text style={styles.label}>Duration</Text>
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
      <View style={styles.durationInput}>
        <Text style={styles.label}>Cost</Text>
        <TextInput
          style={styles.costInput}
          keyboardType="numeric"
          value={clientCost}
          onChangeText={setClientCost}
        />
        <Text style={styles.timeUnit}>eur</Text>
        <Text style={styles.timeUnit}>Client</Text>
        <TextInput
          style={styles.costInput}
          keyboardType="numeric"
          value={employeeCost}
          onChangeText={setEmployeeCost}
        />
        <Text style={styles.timeUnit}>eur</Text>
        <Text style={styles.timeUnit}>Employee</Text>
      </View>
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
  },
  label: {
    marginHorizontal : 5,
    fontWeight : 'bold',
    color : 'white',
  },
  currencyText : {
    marginRight : 10,
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
});
