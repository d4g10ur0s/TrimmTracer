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
    <View
      style={styles.serviceInfo}
    >
    <Text style={{color : 'black',marginLeft: 5,}}>{'Service Name'}</Text>
      <Text style={{color : 'black',marginRight: 5,}}>{'Service Duration'}</Text>
    </View>
  );

}

const AppointmentContainer: React.FC = ({}) =>{

  return(
    <View
      style={styles.appointmentContainer}
    >
      <View
        style={styles.appointmentTime}
      >
        <Text style={{color : 'black',marginRight: 5,}}>{'Start : 13:00'}</Text>
        <Text style={{color : 'black',}}>{'End : 13:25'}</Text>
        <Text style={{color : 'black',marginLeft: 5,}}>{'Duration : 00:25:00'}</Text>
      </View>
      <View
        style={styles.serviceInfoView}
      >
        <Text style={styles.personInfo}>{'Appointment Services'}</Text>
        <ServiceInfoContainer />
        <ServiceInfoContainer />
      </View>
      <View
        style={styles.personInfoView}
      >
        <View
          style={styles.clientInfo}
        >
          <Text style={styles.personInfo}>{'Client Info'}</Text>
          <Text style={{color : 'black',}}>{'Client Full Name'}</Text>
          <Text style={{color : 'black',}}>{'Client Phone Num.'}</Text>
          <Text style={{color : 'black',}}>{'Client Email'}</Text>
        </View>
        <View
          style={styles.employeeInfo}
        >
          <Text style={styles.personInfo}>{'Employee Info'}</Text>
          <Text style={{color : 'black',}}>{'Employee Full Name'}</Text>
          <Text style={{color : 'black',}}>{'Employee Phone Num.'}</Text>
          <Text style={{color : 'black',}}>{'Employee Email'}</Text>
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

  const [appointments,setAppointments] = useState(null);

  const renderAppointments = async () => {
    // first timestamp of the day
    var when_0 = day;
    when_0.setHours(0,0,0,0);
    // last timestamp of the day
    var when_1 = day;
    when_1.setHours(23, 59, 59, 999);
    // get appointments
    appointements = await getShopAppointments(employee.shop_id,
                                              employee.email,
                                              when_0,when_1)
    // render every appointment in a list
  }

  useEffect(() => {
    renderAppointments();
  }, []);

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
        <AppointmentContainer />
        <AppointmentContainer />
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
    paddingHorizontal : 0,
    marginVertical : 2,
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  personInfoView : {
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  clientInfo : {
    marginVertical : 3,
    marginLeft : 5,
  },
  employeeInfo : {
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
