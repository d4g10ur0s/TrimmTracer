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

import { deleteService, assignService } from '../utils/ServiceHandling';
import { getEmployees } from '../utils/EmployeeHandling';
import { getShopAppointments } from '../utils/AppointmentHandling';

import EmployeeSelection from '../components/EmployeeSelection';
import {ServiceModificationForm} from '../components/ServiceForm';

interface DayContainerProps {

}

const ServiceInfoContainer: React.FC = ({service}) => {

  return(
    <View style={styles.serviceInfo}>
      <View style={{alignItems : 'center'}}>
        <Text style={{fontWeight:'700',color : 'black',marginLeft: 5,}}>{"Service Name"}</Text>
        <Text style={{color : 'black',marginLeft: 5,}}>{service.name}</Text>
      </View>
      <View  style={{alignItems : 'center'}}>
        <Text style={{fontWeight:'700',color : 'black',marginLeft: 5,}}>{"Service Duration"}</Text>
        <Text style={{color : 'black',marginRight: 5,}}>{service.duration + " minutes"}</Text>
      </View>
    </View>
  );

}

const AppointmentContainer: React.FC = ({appointment}) =>{

  const renderServices = () => {
    var serviceContainers = [];
    for(i in appointment.service_names){
      serviceContainers.push(<ServiceInfoContainer
                              service={appointment.service_names[i]}
                            />)
    }
    return serviceContainers;
  }

  const getHourMinuteStringFromDate = (dateString) => {
    var date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const getDuration = (date_1 , date_0) => {
    const timeDifference = Math.abs(new Date(date_1) - new Date(date_0)) / 1000; // Difference in seconds
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = Math.floor(timeDifference % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return(
    <View
      style={styles.appointmentContainer}
    >
      <View
        style={styles.appointmentTime}
      >
        <Text style={{color : 'black',marginRight: 5,}}>{'Start : '+getHourMinuteStringFromDate(appointment.check_in)}</Text>
        <Text style={{color : 'black',}}>{'End : '+getHourMinuteStringFromDate(appointment.check_out)}</Text>
        <Text style={{color : 'black',marginLeft: 5,}}>{'Duration : ' + getDuration(appointment.check_out,appointment.check_in)}</Text>
      </View>
      <View
        style={styles.serviceInfoView}
      >
        <Text style={styles.personInfo}>{'Appointment Services'}</Text>
        {renderServices()}
      </View>
      <View
        style={styles.personInfoView}
      >
        <View
          style={styles.clientInfo}
        >
          <Text style={styles.personInfo}>{'Client Info'}</Text>
          <Text style={{color : 'black',}}>{appointment.client_fullname}</Text>
          <Text style={{color : 'black',}}>{appointment.client_phone}</Text>
          <Text style={{color : 'black',}}>{appointment.client_email}</Text>
        </View>
        <View
          style={styles.employeeInfo}
        >
          <Text style={styles.personInfo}>{'Employee Info'}</Text>
          <Text style={{color : 'black',}}>{appointment.employee_fullname}</Text>
          <Text style={{color : 'black',}}>{appointment.employee_phone}</Text>
          <Text style={{color : 'black',}}>{appointment.employee_email}</Text>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
      >
        <TouchableOpacity
          style={styles.deleteButton}
        >
          <Text>
            {"Modify Appointment"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
        >
          <Text>
            {"Delete Appointment"}
            </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

};


const DayContainer: React.FC<DayContainerProps> = ({day , employee}) => {
  const [user,setUser] = useState(employee);
  const [appointments,setAppointments] = useState(null);
  // render appointments
  const renderAppointments = async () => {
    var listOfAppointments = await getAppointments();
    var content = [];
    for (i in listOfAppointments.appointments){
      console.log(listOfAppointments.appointments[i])
      content.push(<AppointmentContainer
                    key={i}
                    appointment={listOfAppointments.appointments[i]}
                   />);
    }
    await setAppointments(content);
  }
  // get appointments from database
  const getAppointments = async () => {
    console.log(user)
    // first timestamp of the day
    var when_0 = new Date(day);
    when_0.setHours(0,0,0,0);
    // last timestamp of the day
    var when_1 = new Date(day);
    when_1.setHours(23, 59, 59, 999);
    // get appointments
    var appointments = await getShopAppointments(user.shop_id,
                                              user.email,
                                              when_0,when_1);
    return appointments;
  }

  useEffect(()=>{
    renderAppointments();
  },[user])

  return(
    <View
      style={styles.outsideContainer}
    >
      <View
        style={styles.container}
      >
        <Text
          style={styles.dayHeader}
        >
          {day.toDateString()}
        </Text>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>{'New Appointment'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {appointments}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  outsideContainer : {
    alignSelf : 'center',
    width: '95%',
  },
  container : {
    backgroundColor : '#FFFFFFAD',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 8,
    marginVertical : 10,
  },
  dayHeader : {
    marginVertical : 5,
    fontSize : 20,
    fontWeight : 'bold',
    alignSelf: 'center',
    color : 'black',
  },
  appointmentContainer : {
    borderRadius : 8,
    backgroundColor : '#FFFFFFAD',
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    paddingHorizontal : 5,
    marginVertical : 3,
  },
  appointmentTime : {
    flexDirection : 'row',
    justifyContent: 'space-between',
  },
  serviceInfoView:{
    justifyContent : 'center',
    alignItems:'center',
  },
  personInfo : {
    alignSelf : 'center',
    marginVertical : 3,
    fontWeight : 'bold',
    fontSize : 16,
    color : 'black',
  },
  serviceInfo : {
    width : '100%',
    borderStyle : 'dashed',
    borderRadius : 8,
    borderWidth : 1,
    paddingHorizontal : 5,
    paddingVertical : 2,
    marginVertical : 2,
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  personInfoView : {
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  clientInfo : {
    alignItems : 'center',
    justifyContent : 'center',
    textAlign : 'center',
    marginVertical : 3,
    marginLeft : 5,
  },
  employeeInfo : {
    alignItems : 'center',
    justifyContent : 'center',
    textAlign : 'center',
    marginRight: 5,
    marginVertical : 3,
  },
  buttonScrollView : {
    backgroundColor : '#FFFFFFAD',
    margin : 5,
    borderRadius : 8,
  },
  controlButtons : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
  deleteButton : {
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
  disabledDeleteButton : {
    backgroundColor : '#E9769A77',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
});

export default DayContainer;
