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

import { updateService,assignService,getServiceEmployees,nanosecondsToHoursMinutesSeconds,nanosecondsToString } from '../utils/ServiceHandling';
import { getEmployees } from '../utils/EmployeeHandling';

import EmployeeSelection from '../components/EmployeeSelection';
import {ServiceForm} from '../components/ServiceForm';

interface ServiceContainerProps {
  service : {};
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({service,canDelete,refresh,deleteService}) => {
  const [serviceInfo, setServiceInfo] = useState(service);
  const [modalVisible, setModalVisible ] = useState(false);
  const [modalContent , setModalContent] = useState(null);
  const [mService , setMService] = useState(false);
  // modal handling
  const handleHideModal = () => {
    setModalVisible(false);
  };
  const handleShowModal = () => {
    setModalVisible(true);
  };
  // deletion modal
  const [deletionModalVisible , setDeletionModalVisible] = useState(false);
  // deletion modal handling
  const handleHideDeletionModal = () => {setDeletionModalVisible(false);};
  // to service deletion
  const toServiceDeletion = () => {setDeletionModalVisible(true);};
  // delete service
  const serviceDeletion = () => {
    setDeletionModalVisible(false);
    deleteService(service.name);
  }
  // assign service
  const assign = async (assign_emails,unassign_emails) => {
    await assignService(service.shop_id,assign_emails,unassign_emails,service.name)
    await setModalVisible(false);
    refresh();
  }
  // to assign-unassign service - employee selection
  const toAssign = async () => {
    // get everything about shop employees
    const shopEmployees = await getEmployees(service.shop_id);
    // get shop employee's emails for the employees related to service
    const serviceEmployees = await getServiceEmployees(service.shop_id,service.name)
    // make a fast ordering about employees related to service and those that do not
    var a = []
    var u = []
    for (i in shopEmployees){
      if(serviceEmployees.includes(shopEmployees[i].email)){
        a.push(shopEmployees[i])
      }else{u.push(shopEmployees[i])}
    }//end for
    // show modal
    await setModalContent(
            <EmployeeSelection
              hide={handleHideModal}
              assigned={a}
              unassigned={u}
              emails={serviceEmployees}
              assign={assign}
            />
          );
    setModalVisible(true);
  }

  const modify = async () => {await setMService((prevState) => !prevState)}

  const serviceModification = async (name ,hours ,minutes ,seconds,employeeCost,clientCost,description) => {
    const serv = {name ,hours ,minutes ,seconds,employeeCost,clientCost,description}
    if(mService){//save editted service
      var nameChanged = false;
      serv.numberOfEmployees=serviceInfo.numberOfEmployees;
      if(serv.name!=service.name){nameChanged=true}
      setServiceInfo(serv)
      await updateService(serv,nameChanged,service.name);
    }
    await setMService((prevState) => !prevState)
  }

  return(
    <View
      style={styles.outsideContainer}
    >
      <Text
        style={styles.serviceHeader}
      >
        {serviceInfo.name}
      </Text>
      <View
        style={styles.infoView}
      >
        <Text
        style={styles.infoText}
        >
          {'Average Duration : ' + nanosecondsToString(serviceInfo.average_dur.nanoseconds)}
        </Text>
        <Text
        style={styles.infoText}
        >
          {'Duration : ' + nanosecondsToString(serviceInfo.dur.nanoseconds)}
        </Text>
      </View>
      <View
        style={styles.infoView}
      >
        <Text
        style={styles.infoText}
        >
          {'Client Cost : ' + serviceInfo.client_cost + " eur"}
        </Text>
        <Text
        style={styles.infoText}
        >
          {'Employee Cost : ' + serviceInfo.employee_cost + " eur"}
        </Text>
      </View>
      <Text
        style={styles.useText}
      >
        {'Number of Employees : ' + serviceInfo.numberofemployees}
      </Text>
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
      >
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Show Service Statistics"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(!canDelete) ? styles.controlButtonsDisabled : styles.controlButtons }
          onPress={modify}
        >
          <Text>
            {"Modify Service"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
          onPress={toAssign}
        >
          <Text>
            {"Assign Service"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(!canDelete) ? styles.disabledDeleteButton : styles.deleteButton}
          disabled={!canDelete}
          onPress={toServiceDeletion}
        >
          <Text>
            {"Delete Service"}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={deletionModalVisible}
      >
        <View style={styles.deletionModal}>
          <Text style={styles.deletionModalHeader}>{'Service Deletion'}</Text>
          <View style={{padding: 10, borderRadius: 10 }}>
            <Text style={{marginHorizontal : 5,}}>{'Are you sure you want to delete '+service.name + ' ?'}</Text>
          </View>
          <View
            style={styles.deletionModalButtonView}
          >
          <TouchableOpacity style={styles.controlButtons} onPress={handleHideDeletionModal}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButtons} onPress={serviceDeletion}>
            <Text>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {
        (mService) ?
        (<ServiceForm onSubmit={serviceModification} service={service} />) :
        (null)
      }
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
  serviceHeader : {
    fontSize : 20,
    fontWeight : 'bold',
    alignSelf: 'center',
  },
  infoView : {
    flexDirection : 'row',
    justifyContent: 'space-between',
  },
  infoText : {
    fontSize : 12,
    fontWeight : 'bold',
    marginHorizontal : 4,
    padding : 3,
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
  useText : {
    alignSelf : 'center',
    marginVertical : 4,
    fontSize : 15,
    fontWeight : 'bold',
  },
  deletionModal : {
    backgroundColor : '#495866',
    height : '15%',
    alignSelf : 'center',
    marginTop : '25%',
    borderRadius : 8,
    borderWidth : 2,
    justifyContent : 'center',
    alignItems : 'center',
  },
  deletionModalHeader : {
    fontSize : 20,
    fontWeight : 'bold',
    color : 'white',
  },
  deletionModalButtonView : {
    justifyContent : 'space-between',
    alignItems : 'center',
    flexDirection : 'row',
  }
});

export default ServiceContainer;
