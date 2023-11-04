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

import {getEmployeeServices} from '../utils/EmployeeHandling';
import { nanosecondsToString,nanosecondsToHoursMinutesSeconds } from '../utils/ServiceHandling';

interface AppointmentEmployeeSelectionProps {

}

const EmployeeServicesListComponent : React.FC = ({employee , service , select}) => {

  const serviceSelected = () => {
    select(service);
  }

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
        <Text>{'Select'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const MiniEmployeeContainer: React.FC<MiniEmployeeContainer> = ({employee, select}) =>{

  const [serviceList , setServiceList] = useState(null);
  const [selectedServices , setSelectedServices] = useState([]);
  const [selected , setSelected] = useState(false)
  // employee selected
  const toSelect = async () => {await setSelected((prevState) => !prevState)}
  // a service has been selected
  const serviceSelection = async (service) => {
    var b = selectedServices;
    b.push(service);
    await setSelectedServices(b);
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
        />
      );
    }
    console.log("+mvainei")
    await setServiceList(<View style={styles.serviceList}><Text style={styles.selectServiceHeader}>{"Select Service"}</Text>{sList}</View>);
  }

  useEffect(() => {
    if(selected==true){renderServiceList()}
    else{setServiceList(null)}
  }, [selected])

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
      >
        <Text>{'Select'}</Text>
      </TouchableOpacity>
      {serviceList}
    </View>
  );

}

const AppointmentEmployeeSelection: React.FC<AppointmentEmployeeSelectionProps> = ({hide , employees, submit}) => {
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
          select={toSubmit}
        />
      );
    }
    await setContainers(containers);
  }
  // submit
  const toSubmit = (employee) => {submit(employee);}
  // render at start
  useEffect(()=>{
    renderEmployees();
  }, []);

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
          <Text>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
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

export default AppointmentEmployeeSelection;
