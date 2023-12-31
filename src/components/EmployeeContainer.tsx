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
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// Database Connection
import { deleteEmployee,modifyEmployee,getEmployeeServices,assignService } from '../utils/EmployeeHandling';
import { getServices,deleteService,getServiceEmployees } from '../utils/ServiceHandling';
import { checkForAppointments } from '../utils/AppointmentHandling';
// Components
import {EmployeeModificationForm} from '../components/RegistrationForm'
import ServiceSelection from '../components/ServiceSelection';
import {EmployeeForm} from '../components/EmployeeForm';
import {SubmitionMessage} from '../components/MessageError';


interface EmployeeContainerProps {
  employee : {};
}

const EmployeeContainer: React.FC<EmployeeContainerProps> = ({employee,canDelete,refresh,userEmail}) => {
  const [employeeInfo, setEmployeeInfo] = useState(employee);
  const [m , setM] = useState(null);

  const [modalVisible, setModalVisible ] = useState(false);
  const [modalContent , setModalContent] = useState(null);
  // modal
  const handleHideModal = () => {
    setModalVisible(false);
  };
  const handleShowModal = () => {
    setModalVisible(true);
  };
  // assign service
  const assign = async (assign_names,unassign_names) => {
    var names = [];
    const employeeServices = await getEmployeeServices(employee.shop_id,employeeInfo.email,false);
    for(i in assign_names){
      if(!employeeServices.includes(assign_names[i])){names.push(assign_names[i])}
    }
    await assignService(employee.shop_id,names,unassign_names,employee.email)
    await setModalVisible(false);
    refresh();
  }
  // employee modification
  const alterM = async () => {
    if(m==null){
      setM(<EmployeeForm onSubmit={employeeModification} employee={employee}/>)
    }else{setM(null)}
  };
  // modify employee
  const employeeModification = async (name,sirname,email,phone,typeOfEmployee,workingHours) => {
    modifyEmployee(name,sirname,email,phone,typeOfEmployee,workingHours);
    setM(null);
    await refresh();
  }
  // deletion submition message
  const submitDeletion = async () => {
    await setModalContent(
      <SubmitionMessage
        submit={deletionEmployee}
        close={handleHideModal}
        title={'Delete Employee'}
        message={'Are you sure you want to delete : '+ employee.name + ' ' + employee.sirname + ' ?'}
      />
    );
    setModalVisible(true);
  }
  // delete employee
  const employeeDeletion = async () => {
    const a = await checkForAppointments(employee.shop_id,employee.email)
    if(employee.email==userEmail){// employee is self , cannot be deleted
      Alert.alert('You cannot delete yourself !');
    }else if(a.hasAppointments){
      Alert.alert('Employee has Appointments');
    }else{// employee can be deleted
      submitDeletion()
    }
  }
  // delete the employee
  const deletionEmployee = async () => {
    deleteEmployee(employee.email,employee.shop_id);
    setModalVisible(false);
    await refresh();
  }
  // assign-unassign services
  const toAssignServices = async () => {
    // get everything about shop services
    const shopServices=await getServices(employee.shop_id);
    // get shop employee's emails for the employees related to service
    const employeeServices = await getEmployeeServices(employee.shop_id,employeeInfo.email,false);
    // make a fast ordering about employees related to service and those that do not
    var a = []
    var u = []
    var n = []
    for (i in shopServices){
      if(employeeServices.includes(shopServices[i].name)){
        a.push(shopServices[i])
      }else{u.push(shopServices[i])}
    }//end for
    // show modal
    await setModalContent(
      <ServiceSelection
        close={handleHideModal}
        assigned={a}
        unassigned={u}
        emails={employeeServices}
        assign={assign}
      />
    );
    setModalVisible(true);
  }

  return(
    <View
      style={styles.outsideContainer}
    >
      <View
        style={styles.container}
      >
        <View
          style={styles.employeeContainer}
        >
          <Image
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            style={styles.photoStyle}
          />
          <Text
            style={styles.employeeHeader}
          >
            {employee.name+ " " + employee.sirname}
          </Text>
        </View>
        <View
          style={styles.employeeInfoContainer}
        >
          <Text
            style={styles.infoText}
          >
            {"Employee Phone : " + employee.phone}
          </Text>
          <Text
            style={styles.infoText}
          >
            {"Employee Email : " + employee.email}
          </Text>
          <Text
            style={styles.infoText}
          >
            {"Works Today : "}
          </Text>
          <Text
            style={styles.infoText}
          >
            {"Employee Services : "}
          </Text>
        </View>
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
          onPress={alterM}
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
          style={(!userEmail==employee.email && !canDelete) ? styles.controlButtonsDisabled : styles.controlButtons}
          onPress={toAssignServices}
          disabled={(!userEmail==employee.email && !canDelete)}
        >
          <Text>
            {"Assign Service"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(canDelete) ? styles.disabledDeleteButton : styles.deleteButton}
          disabled={canDelete}
          onPress={employeeDeletion}
        >
          <Text>
            {"Delete Employee"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleHideModal}
      >
        {modalContent}
      </Modal>
      {m}
    </View>
  )
}

const styles = StyleSheet.create({
  outsideContainer : {
    borderRadius : 8,
    backgroundColor : '#495866',
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    width: '95%',
    marginVertical : 3,
  },
  container : {
    flexDirection : 'row',
  },
  employeeContainer : {
    padding : 5,
    alignItems : 'center',
    flexDirection : 'column',
  },
  photoStyle : {
    width : 80,
    height : 80,
    borderRadius : 8,
    padding : 2,
  },
  employeeHeader : {
    fontSize : 12,
    fontWeight : 'bold',
  },
  employeeInfoContainer : {
    width : '60%',
    marginLeft : 4,
    padding : 5,
  },
  infoText:{
    fontWeight : 'bold',
    marginVertical :2,
    fontSize : 12,
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
  controlButtonsDisabled : {
    backgroundColor : '#574C9E77',
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

export default EmployeeContainer;
