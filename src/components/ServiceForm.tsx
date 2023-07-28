import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

interface ServiceFormProps {
  onSubmit: (username: string, password: string) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('Neo Service');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('45');
  const [seconds, setSeconds] = useState<string>('0');
  const [clientCost, setClientCost] = useState<string>('15 eur');
  const [employeeCost, setEmployeeCost] = useState<string>('5 eur');
  const [description, setDescription] = useState<string>('A new simple Service . \nCost is logically calculated.\n');
  // store service
  const handleService = () => {
    onSubmit(name ,hours ,minutes ,seconds,employeeCost,clientCost,description);
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.formHeader}
      >
        Add Service
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
        <Text style={styles.timeUnit}>Client</Text>
        <TextInput
          style={styles.costInput}
          keyboardType="numeric"
          value={employeeCost}
          onChangeText={setEmployeeCost}
        />
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
    backgroundColor : "#6465A1AA",
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingTop : 10,
    paddingBottom : 10,
    marginTop : 10,
    marginBottom: 20,
    borderRadius : 8,
  },
  formHeader : {
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom:15,
    marginTop : 10,
  },
  nameLabel : {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nameInput : {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderRadius : 8,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  durationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical : 5,
  },
  timeInput: {
    width : '12%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal : 5,
  },
  costInput: {
    width : '18%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal : 5,
  },
  timeUnit: {
    fontSize: 16,
  },
  submitButton : {
    backgroundColor : "#349CCFFF",
    borderRadius : 8,
    padding : 5,
    marginVertical : 5,
  },
  descriptionInput : {
    width : '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'top',
    height: 100,
  }
});

export default ServiceForm;