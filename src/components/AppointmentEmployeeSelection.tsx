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

// for employees
import {getEmployeeServices} from '../utils/EmployeeHandling';
// for services
import {nanosecondsToString,nanosecondsToHoursMinutesSeconds} from '../utils/ServiceHandling';
// for appointments
import {getAppointmentTimesForDate,storeAppointment} from '../utils/AppointmentHandling'
import AppointmentSubmitionForm from '../components/AppointmentSubmitionForm'
import MiniCalendar from '../components/MiniCalendar'


interface AppointmentEmployeeSelectionProps {

}

// list of services to select
const EmployeeServicesListComponent : React.FC = ({employee , service , select,unselect}) => {
  const [selected , setSelected] = useState(false);

  const serviceSelected = async () => {await setSelected((prevState) => !prevState)}

  useEffect(() => {
    if(selected){select(service);}
    else{unselect(service.name);}
  } , [selected])

  return (
    <View
      style={styles.servicesListComponent}
    >
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"Name"}</Text>
        <Text style={styles.infoText}>{service.name}</Text>
      </View>
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"Cost"}</Text>
        <Text style={styles.infoText}>{service.client_cost}</Text>
      </View>
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"Duration"}</Text>
        <Text style={styles.infoText}>{nanosecondsToString(service.dur.nanoseconds)}</Text>
      </View>
      <TouchableOpacity
        onPress={serviceSelected}
        style={styles.selectButton}
      >
        <Text>{(selected) ? ('Unselect') : ('Select')}</Text>
      </TouchableOpacity>
    </View>
  );
}
// the employee and his services
const MiniEmployeeContainer: React.FC<MiniEmployeeContainer> = ({employee, createAppointment,canSelect}) =>{

  const [serviceList , setServiceList] = useState(null);
  const [selectedServices , setSelectedServices] = useState({});
  const [selected , setSelected] = useState(false)
  // employee selected
  const toSelect = async () => {await setSelected((prevState) => !prevState)}
  // a service has been selected
  const serviceSelection = async (service) => {
    await setSelectedServices((prevSelectedServices) => ({
      ...prevSelectedServices,
      [service.name]: service,
    }));
  }
  // unselect service
  const unselectService = async (service_name) => {
    await setSelectedServices((prevSelectedServices) => {
      const updatedSelectedServices = { ...prevSelectedServices };
      delete updatedSelectedServices[service_name];
      return updatedSelectedServices;
    });
  }
  // render services to select
  const renderServiceList = async () => {
    const employeeServices = await getEmployeeServices(employee.shop_id, employee.email, true);
    var sList = []
    for(i in employeeServices){
      sList.push(
        <EmployeeServicesListComponent
          key={i}
          employee={employee}
          service={employeeServices[i]}
          select={serviceSelection}
          unselect={unselectService}
        />
      );
    }
    await setServiceList(<View style={styles.serviceList}><Text style={styles.selectServiceHeader}>{"Select Service"}</Text>{sList}</View>);
  }
  // render service list
  useEffect(() => {
    if(selected==true){renderServiceList()}
    else{
      setServiceList(null)
      setSelectedServices({})
    }
  }, [selected])
  // content
  return (
    <View
      style={styles.miniContainer}
    >
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"Name"}</Text>
        <Text style={styles.infoText}>{employee.name + ' ' + employee.sirname}</Text>
      </View>
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"E-mail"}</Text>
        <Text style={styles.infoText}>{employee.email}</Text>
      </View>
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"Phone"}</Text>
        <Text style={styles.infoText}>{employee.phone}</Text>
      </View>
      <TouchableOpacity
        onPress={toSelect}
        style={styles.selectButton}
        disabled={canSelect}
      >
        <Text>{'Select'}</Text>
      </TouchableOpacity>
      {serviceList}
      {(selected) ? (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={()=>{createAppointment(employee,selectedServices)}}
        >
          <Text>{'Create Appointment'}</Text>
        </TouchableOpacity>
      ) : (null)}
    </View>
  );

}
// this is basically a modal
const AppointmentEmployeeSelection: React.FC<AppointmentEmployeeSelectionProps> = ({hide , employees, submit , client,employeeEmail,canSelect}) => {
  // assign
  const [currentClient , setCurrentClient] = useState(client)
  const [containers , setContainers] = useState([])
  const [theInfo , setInfo] = useState({})
  // render containers
  const renderEmployees = async () => {
    var containers = []
    for(i in employees){
      containers.push(
        <MiniEmployeeContainer
          key={i}
          employee={employees[i]}
          createAppointment={toDateSelection}
          canSelect={( !(employees[i].email==employeeEmail) && canSelect)}
        />
      );
    }
    await setContainers(containers);
  }
  // render mini calendar
  const renderMiniCalendar = () => {
    var employee=theInfo.employee;
    setContainers(<MiniCalendar employee={employee} toSubmitionForm={dateSelected} />)
  }
  // date selection
  const toDateSelection = async (employee, selectedServices ) => {setInfo({employee : employee , theServices : selectedServices});}
  useEffect(()=>{
    renderMiniCalendar()
  }, [theInfo])
  // after a date has been selected
  const dateSelected = (employee,date,appointmentNumber) => {
    var employee = theInfo.employee
    var theServices = theInfo.theServices
    if(appointmentNumber > 18){console.log("error")}
    else{setContainers(<AppointmentSubmitionForm
                        employee={employee}
                        date={date}
                        selectedServices={theServices}
                        submitData={submitData}
                       />)}
  }
  // submit
  const submitData = async (date , time , note) => {
    // starting datetime
    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    // appointments to be stored
    var appointments = []
    // create one appointment appointment for each service and then store it
    for(i in theInfo.theServices){
      // calculate checkOut time
      var checkOut = new Date(date.getTime() + (theInfo.theServices[i].average_dur.nanoseconds / 1e6) );
      var appointment = {
        shop_id : theInfo.employee.shop_id,
        when : date,
        employee_email : theInfo.employee.email,
        client_email : currentClient.email,
        check_in : date,
        check_out : checkOut,
        client_cost : theInfo.theServices[i].client_cost ,
        client_fullname : currentClient.name + ' ' + currentClient.sirname ,
        client_phone : currentClient.phone,
        dur : theInfo.theServices[i].average_dur ,
        employee_cost : theInfo.theServices[i].employee_cost,
        employee_fullname : theInfo.employee.name + ' ' + theInfo.employee.sirname,
        employee_phone : theInfo.employee.phone,
        end_time : checkOut ,
        note : note,
        service_name : theInfo.theServices[i].name ,
        start_time : date,
      };
      date = checkOut// prepare date for next service
      appointments.push(appointment)// push data to be stored
    }
    await storeAppointment(appointments)
    hide()// before hiding , errors must be checked
  }
  // render at start
  useEffect(()=>{renderEmployees();}, []);

  return(
    <View
      style={styles.employeeSelection}
    >
      <Text
      style={styles.selectionHeader}
      >
        {"Select Employees"}
      </Text>
      <ScrollView>
        {containers}
      </ScrollView>
      <View
        style={styles.submitView}
      >
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={hide}
        >
          <Text>{"Cancel"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submit}
        >
          <Text>{"Back"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  employeeSelection : {
    height : '70%',
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

export default AppointmentEmployeeSelection;
