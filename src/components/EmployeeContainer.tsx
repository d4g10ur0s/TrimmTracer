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

import { deleteEmployee,modifyEmployee,getEmployeeServices,assignService } from '../utils/EmployeeHandling';
import {EmployeeModificationForm} from '../components/RegistrationForm'
import { getServices,deleteService,getServiceEmployees } from '../utils/ServiceHandling';
import ServiceSelection from '../components/ServiceSelection';


interface EmployeeContainerProps {
  employee : {};
}

const EmployeeContainer: React.FC<EmployeeContainerProps> = ({employee,canDelete,refresh}) => {
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
      setM(<EmployeeModificationForm employee={employee} onSubmit={employeeModification}/>)
    }else{setM(null)}
  };
  // modify employee
  const employeeModification = async (name,sirname,email,phone,typeOfEmployee) => {
    modifyEmployee(employee.email,name,sirname,email,phone,typeOfEmployee);
    setM(null);
    await refresh();
  }
  // delete employee
  const employeeDeletion = async () => {
    deleteEmployee(employee.email,employee.shop_id);
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
        hide={handleHideModal}
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
          style={styles.controlButtons}
          onPress={toAssignServices}
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
