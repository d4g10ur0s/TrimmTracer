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

interface AppointmentSubmitionFormProps {

}

const AppointmentSubmitionForm: React.FC<AppointmentSubmitionFormProps> = ({employee , date, services}) => {
  // assign
  const [containers , setContainers] = useState([])
  // render containers
  const renderEmployees = async () => {
    var containers = []
    for(i in employees){
      containers.push(
        <MiniEmployeeContainer
          key={i}
          employee={employees[i]}
          createAppointment={toDateSelection}
        />
      );
    }
    await setContainers(containers);
  }
  // date selection
  const toDateSelection = async (employee, selectedServices ) => {
    console.log(employee)
    console.log(selectedServices)
    await setContainers(<MiniCalendar employee={employee} />)
  }
  // date selected
  const dateSelected = async (employee,date,appointmentNumber) => {
    if(appointmentNumber > 18){console.log("error")}
    else{
      await setContainers(<AppointmentSubmitionForm employee={employee} date={date} />)
    }
  }
  // submit
  const toSubmit = (employee) => {
    submit(employee);
  }
  // render at start
  useEffect(()=>{
    renderEmployees();
  }, []);

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
          <Text>{selectedServices.length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Total Cost"}</Text>
          <Text>{selectedServices.length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Total Duration"}</Text>
          <Text>{selectedServices.length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Employee Name"}</Text>
          <Text>{selectedServices.length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Employee Email"}</Text>
          <Text>{selectedServices.length}</Text>
        </View>
        <View
          style={styles.horizontalView}
        >
          <Text>{"Service Name"}</Text>
          <Text>{selectedServices[0]}</Text>
        </View>
      </View>
      <View
        style={styles.appointmentIntervalSelection}
      >
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={submit}
      >
        <Text>{"Submit"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  employeeSelection : {
    height : '65%',
    width : '85%',
    backgroundColor : "#2C2A33",
    alignSelf : 'center',
    marginTop : '25%',
    borderRadius : 8,
    borderWidth : 2,
  },
  selectionHeader : {
    alignSelf : 'center',
    color: 'white',
    fontSize : 20,
    fontWeight : 'bold',
  },
  miniContainer : {
    margin : 2,
    borderRadius : 8,
    borderStyle : 'dashed',
    borderWidth : 1,
    borderColor : 'gray',
    backgroundColor : '#495866',
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
