import React, { useState, useEffect } from 'react';
import { useCallback , useMemo } from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { nanosecondsToString,nanosecondsToHoursMinutesSeconds } from '../utils/ServiceHandling';

interface AppointmentSubmitionFormProps {

}

const AppointmentSubmitionForm: React.FC<AppointmentSubmitionFormProps> = ({employee , date, selectedServices}) => {

  const [totalCost, setTotalCost] = useState(0);
  const [serviceNames, setServiceNames] = useState(null);
  const [totalDuration , setTotalDuration] = useState(0);

  useEffect(()=>{
    // variables
    var cost = 0;
    var names=[];
    var totalNanoseconds = 0;
    // parcing selected services
    for(i in selectedServices){
      // set up cost
      cost+=selectedServices[i].client_cost
      // set up names
      names.push(<View
                  key={i}
                  style={styles.horizontalView}
                 >
                   <Text>{"Service Name"}</Text>
                   <Text>{selectedServices[i].name}</Text>
                 </View>)
      // set up duration
      totalNanoseconds += parseInt(selectedServices[i].average_dur.nanoseconds);
    }
    // set total cost
    setTotalCost(cost)
    // set service names
    setServiceNames(names)
    // set up duration
    setTotalDuration(nanosecondsToString(totalNanoseconds))
  },[])

  return(
    <View
      style={styles.appointmentSubmitionForm}
    >
      <View
        style={styles.appointmentInfoView}
      >
        <Text
        style={styles.selectionHeader}
        >
          {"Appointment Information"}
        </Text>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Number of Services"}</Text>
          <Text>{Object.keys(selectedServices).length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Total Cost"}</Text>
          <Text>{totalCost}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Total Duration"}</Text>
          <Text>{totalDuration}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Employee Name"}</Text>
          <Text>{employee.name + ' ' + employee.sirname}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Employee Email"}</Text>
          <Text>{employee.email}</Text>
        </View>
        {serviceNames}
      </View>
      <View
        style={styles.appointmentIntervalSelection}
      >
      </View>
      <TouchableOpacity
        style={styles.submitButton}
      >
        <Text>{"Submit"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  appointmentInfoView : {
    margin : 5,
    padding : 10,
    borderRadius : 8,
    borderWidth : 1,
    borderColor : 'white',
  },
  selectionHeader : {
    marginBottom : 10,
    alignSelf : 'center',
    color: 'white',
    fontSize : 20,
    fontWeight : 'bold',
  },
  horizontalView : {
    padding : 2,
    margin : 2,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  miniHeader : {
    fontSize : 15,
    fontWeight : 'bold',
    color : 'white',
  },
  infoText : {
    fontSize : 15,
    color : 'white',
    fontWeight : '500',
  },
  selectButton : {
    alignSelf : 'center',
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 3,
  },
  submitView : {
    margin : 5,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  cancelButton : {
    fontSize : 8,
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    padding : 3,
  },
  submitButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    padding : 3,
  },
  servicesListComponent : {
    padding : 5,
    marginBottom : 5,
    borderBottomWidth : 1,
    borderColor : 'white',
    borderRadius : 8,
  },
  serviceList : {
    marginBottom : 5,
    padding : 8,
    borderTopWidth : 1,
    borderBottomWidth : 1,
    borderRadius : 12,
    borderColor : 'white',
  },
  selectServiceHeader : {
    borderBottomWidth : 1,
    borderColor : 'white',
    alignSelf : 'center',
    fontWeight : 'bold',
    fontSize : 18,
    color : 'white',
  },
});

export default AppointmentSubmitionForm;
