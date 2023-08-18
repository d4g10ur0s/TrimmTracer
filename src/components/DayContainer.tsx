import React, { useState } from 'react';
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

import EmployeeSelection from '../components/EmployeeSelection';
import {ServiceModificationForm} from '../components/ServiceForm';

interface DayContainerProps {

}

const ServiceInfoContainer: React.FC = ({service}) => {

  return(
    <View
      style={styles.serviceInfo}
    >
      <Text>{'Service Name'}</Text>
      <Text>{'Service Duration'}</Text>
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
        <Text>{'Start : 13:00'}</Text>
        <Text>{'End : 13:25'}</Text>
        <Text>{'Duration : 00:25:00'}</Text>
      </View>
      <View
        style={styles.serviceInfoView}
      >
        <Text style={styles.personInfo}>{'Appointment Services'}</Text>
        <ServiceInfoContainer />
        <ServiceInfoContainer />
      </View>
      <Text style={styles.personInfo}>{'Client Info'}</Text>
      <View
        style={styles.clientInfo}
      >
        <Text>{'Client Full Name'}</Text>
        <Text>{'Client Phone Num.'}</Text>
        <Text>{'Client Email'}</Text>
      </View>
      <Text style={styles.personInfo}>{'Employee Info'}</Text>
      <View
        style={styles.employeeInfo}
      >
        <Text>{'Employee Full Name'}</Text>
        <Text>{'Employee Phone Num.'}</Text>
        <Text>{'Employee Email'}</Text>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
      >
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Employee Profile"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Modify Employee"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"New Appointment"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Assign Service"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
        >
          <Text>
            {"Unassign Service"}
            </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

};


const DayContainer: React.FC<DayContainerProps> = ({day , employee}) => {

  return(
    <View
      style={styles.outsideContainer}
    >
      <Text
        style={styles.dayHeader}
      >
        {day.toLocaleString()}
      </Text>
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
  dayHeader : {
    marginVertical : 5,
    fontSize : 20,
    fontWeight : 'bold',
    alignSelf: 'center',
  },
  appointmentContainer : {
    borderRadius : 8,
    backgroundColor:'#AFAFAFAD',
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
  },
  serviceInfo : {
    width : '100%',
    paddingHorizontal : 0,
    marginVertical : 2,
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  clientInfo : {
    width : '100%',
    paddingHorizontal : 0,
    marginVertical : 2,
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  employeeInfo : {
    width : '100%',
    paddingHorizontal : 0,
    marginVertical : 2,
    justifyContent : 'space-between',
    flexDirection : 'row',
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
