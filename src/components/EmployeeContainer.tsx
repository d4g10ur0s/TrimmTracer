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

import { deleteEmployee,modifyEmployee,getEmployeeServices } from '../utils/EmployeeHandling';
import {EmployeeModificationForm} from '../components/RegistrationForm'
import { getServices,deleteService, assignService,getServiceEmployees } from '../utils/ServiceHandling';


interface EmployeeContainerProps {
  employee : {};
}

const EmployeeContainer: React.FC<EmployeeContainerProps> = ({employee,canDelete,refresh}) => {
  const [employeeInfo, setEmployeeInfo] = useState(employee);
  const [m , setM] = useState(false);

  const [modalVisible, setModalVisible ] = useState(false);
  const [modalContent , setModalContent] = useState(null);
  // modal
  const handleHideModal = () => {
    setModalVisible(false);
  };
  const handleShowModal = () => {
    setModalVisible(true);
  };

  const alterM = async () => {setM((prevState)=>!prevState);}

  const employeeModification = async (name,sirname,nickname,email,phone,typeOfEmployee) => {
    modifyEmployee(employee.email,name,sirname,nickname,email,phone,typeOfEmployee);
    setM((prevState)=>!prevState);
    refresh();
  }
  // delete employee
  const employeeDeletion = () => {
    deleteEmployee(employee.email,employee.shop_id);
    refresh();
  }
  // assign-unassign services
  const toAssignServices = async () => {
    // get everything about shop services
    const shopServices=await getServices();
    // get shop employee's emails for the employees related to service
    const employeeServices = await getEmployeeServices(employee.shop_id,employeeInfo.email)
    // make a fast ordering about employees related to service and those that do not
    var a = []
    var u = []
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
              emails={serviceEmployees}
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
      {(m) ? (<EmployeeModificationForm employee={employee} onSubmit={employeeModification}/>) : (null)}
    </View>
  )
}

const styles = StyleSheet.create({
  outsideContainer : {
    borderRadius : 8,
    backgroundColor:'#AFAFAFAD',
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
