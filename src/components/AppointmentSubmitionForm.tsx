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
import { getAppointmentTimesForDate } from '../utils/AppointmentHandling'

interface AppointmentSubmitionFormProps {

}

const AppointmentSubmitionForm: React.FC<AppointmentSubmitionFormProps> = ({employee , date, selectedServices}) => {

  const [totalCost, setTotalCost] = useState(0);
  const [serviceNames, setServiceNames] = useState(null);
  const [totalDuration , setTotalDuration] = useState(0);

  // get time intervals
  const getTimeIntervals = async () => {
    console.log('submit')
    const timeIntervals = await getAppointmentTimesForDate(
                                                           employee.shop_id,
                                                           employee.email,
                                                           employee.workinghours[date.getDay()],
                                                           date,
                                                           totalDuration
                                                          )
  }

  const unpackWorkingHours = (workingHours) => {
    var dict = {}
    for(i in workingHours){
      var dayname = workingHours[i].dayname
      if (dict.hasOwnProperty(dayname)) {
        dict[dayname].push({
          start_time: workingHours[i].start_time,
          end_time: workingHours[i].end_time
        });
      } else {
        dict[dayname] = [{
          start_time: workingHours[i].start_time,
          end_time: workingHours[i].end_time
        }];
      }
    }
  }

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
          <Text>{"Object.keys(selectedServices).length"}</Text>
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
        style={styles.submitView}
      >
        <Text
          style={styles.searchIntervalHeader}
        >
          {"Search for Services"}
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={getTimeIntervals}
        >
          <Text>{"Search"}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.appointmentIntervalSelection}
      >
      </View>
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
    alignItems : 'center',
    justifyContent : 'center',
    margin : 5,
    flexDirection : 'column',
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
    padding : 5,
    margin : 5,
  },
  searchIntervalHeader : {
    fontWeight : 'bold',
    fontSize : 18,
    color : 'white',
  },
});

export default AppointmentSubmitionForm;
