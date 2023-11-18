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
  FlatList,
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

// the appointment time buttons
const AppointmentTimeButtons : React.FC = ({timeString, timeSelected}) => {

  const selected = () => {timeSelected(timeString)}

  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress = {selected}
    >
      <Text>
        {timeString}
      </Text>
    </TouchableOpacity>
  );
}

const AppointmentSubmitionForm: React.FC<AppointmentSubmitionFormProps> = ({employee , date, selectedServices , submitData}) => {

  const [totalCost, setTotalCost] = useState(0);
  const [serviceNames, setServiceNames] = useState(null);
  const [totalDuration , setTotalDuration] = useState(0);
  // to submit
  const [disabled, setDisabled] = useState(true)
  const toSubmitData = () => {submitData(
                                date,
                                appointmentTime,
                                totalCost,
                                totalDuration,
                                totalCost,
                                note
                              )}
  // appointment note
  const [note, setNote] = useState('Empty Note')
  const [noteForm , setNoteForm] = useState(null)
  // appointment note form input
  const addNoteForm = () => {
    if(noteForm==null){
      setNoteForm(
        <View
          style={styles.appointmentNoteView}
        >
          <Text style={styles.searchIntervalHeader}>Note</Text>
          <TextInput
            style={styles.noteInput}
            multiline
            numberOfLines={8}
            onChangeText={setNote}
            placeholder="Enter your note here"
          />
        </View>
      )
    }
    else{setNoteForm(null)}
  }
  // interval choice container
  const [intervalsChoice , setIntervalsChoice] = useState(null);
  const [appointmentTime , setAppointmentTime] = useState('');
  // get time intervals
  const getTimeIntervals = async () => {
    const timeIntervals = await getAppointmentTimesForDate(
                                                           employee.shop_id,
                                                           employee.email,
                                                           employee.workinghours[date.getDay()],
                                                           date,
                                                           totalDuration
                                                          )
    renderTimeIntervals(timeIntervals);
  }
  // render time intervals
  const renderTimeIntervals = (timeIntervals) => {
    var intervals = []
    for(i in timeIntervals.timeIntervals){
      intervals.push(
        <AppointmentTimeButtons key={i} timeString={timeIntervals.timeIntervals[i]} timeSelected={timeSelected} />
      )
    }
    setIntervalsChoice(intervals)
  }
  // set the time of appointment
  const timeSelected = (aTime) => {
    setAppointmentTime(aTime)
    setIntervalsChoice(null)
    setDisabled((prevState)=>(!prevState))
  }
  // needs rerendering

  // beggining
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
                   <Text style={styles.label}>{"Service Name"}</Text>
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
          <Text style={styles.label}>{"Number of Services"}</Text>
          <Text>{Object.keys(selectedServices).length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text style={styles.label}>{"Total Cost"}</Text>
          <Text>{totalCost}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text style={styles.label}>{"Appointment Date"}</Text>
          <Text>{date.toLocaleDateString()}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text style={styles.label}>{"Appointment Time"}</Text>
          <Text>{appointmentTime}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text style={styles.label}>{"Total Duration"}</Text>
          <Text>{totalDuration}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text style={styles.label}>{"Employee Name"}</Text>
          <Text>{employee.name + ' ' + employee.sirname}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text style={styles.label}>{"Employee Email"}</Text>
          <Text>{employee.email}</Text>
        </View>
        {serviceNames}
        <View
          style={styles.appointmentNoteView}
        >
          <Text style={styles.label}>{'Appointment Note'}</Text>
          <Text>{note}</Text>
        </View>
        <View
          style={styles.submitView}
        >
          <TouchableOpacity
            style={(disabled) ? (styles.disabledSubmitButton) : (styles.submitButton)}
            onPress={toSubmitData}
            disabled={disabled}
          >
            <Text>{'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={styles.submitView}
      >
        <Text
          style={styles.searchIntervalHeader}
        >
          {"Search for Time"}
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={getTimeIntervals}
        >
          <Text>{"Search"}</Text>
        </TouchableOpacity>
      </View>
      {intervalsChoice}
      <View
      style={styles.submitView}
      >
        <Text
          style={styles.searchIntervalHeader}
        >
          {"Appointment Note"}
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={addNoteForm}
        >
          <Text>{"Add Note"}</Text>
        </TouchableOpacity>
      </View>
      {noteForm}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
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
  disabledSubmitButton : {
    backgroundColor : '#574C9E77',
    borderRadius : 8,
    padding : 5,
    margin : 5,
  },
  searchIntervalHeader : {
    fontWeight : 'bold',
    fontSize : 18,
    color : 'white',
  },
  appointmentIntervalSelection : {

  },
  gridItem: {
    margin: 5,
    width : '75%',
    height: 50,
    backgroundColor : '#574C9EAA',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf : 'center',
    borderRadius: 8,
  },
  noteInput : {
    width : '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'top',
    height: 100,
  },
  appointmentNoteView : {
    justifyContent : 'center',
    alignItems : 'center',
    padding : 5,
  },
});

export default AppointmentSubmitionForm;
