import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView, Modal } from 'react-native';

import {ClientForm} from '../components/ClientForm';
import AppointmentEmployeeSelection from '../components/AppointmentEmployeeSelection';
import {addClient,deleteShopClient,getClients} from '../utils/ClientHandling'
import { getServices,getServiceEmployees } from '../utils/ServiceHandling';
import { getEmployees } from '../utils/EmployeeHandling';

const ClientContainer: React.FC = ({client,deleteClient,canDelete,employeeEmail}) => {
  // current employee
  const [currentClient ,setCurrentClient] = useState(client);
  // appointment modal
  const [modalVisible, setModalVisible ] = useState(false);
  const [modalContent , setModalContent] = useState(null);
  // modal handling
  const handleHideModal = () => {
    setModalVisible(false);
  };
  const handleShowModal = () => {
    setModalVisible(true);
  };
  // create a new appointment
  const createAppointment = async () => {
    // get everything about shop employees
    const shopEmployees = await getEmployees(client.shop_id);
    // show modal
    await setModalContent(
            <AppointmentEmployeeSelection
              hide={handleHideModal}
              employees={shopEmployees}
              submit={toServices}
              client={currentClient}
              employeeEmail={employeeEmail}
              canSelect={!(canDelete)}
            />
          );
    setModalVisible(true);
  }
  // select services
  toServices = () =>{
    setModalVisible(false);
  }
  // content
  return (
    <View
      style={styles.outsideContainer}
    >
      <View
        style={styles.container}
      >
        <View style={{'flexDirection':'row'}}>
          <Text style={styles.infoText}>{'Full Name :'}</Text>
          <Text style={styles.infoText}>{client.name + ' ' + client.sirname}</Text>
        </View>
        <View style={{'flexDirection':'row'}}>
          <Text style={styles.infoText}>{'Phone Num. :'}</Text>
          <Text style={styles.infoText}>{client.phone}</Text>
        </View>
        <View style={{'flexDirection':'row'}}>
          <Text style={styles.infoText}>{'E-Mail :'}</Text>
          <Text style={styles.infoText}>{client.email}</Text>
        </View>
        <View style={{'flexDirection':'column'}}>
          <Text style={styles.noteHeader}>{'Note'}</Text>
          <Text style={styles.note}>{client.note}</Text>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
      >
        <TouchableOpacity
          style={styles.controlButtons}
          disabled={!(canDelete)}
        >
          <Text>
            {"Modify Client"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
          onPress={createAppointment}
        >
          <Text>
            {"New Appointment"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={()=>{deleteClient(client.email)}}
          disabled={!(canDelete)}
        >
          <Text>
            {"Delete Client"}
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
    </View>
  );
};
// main cointainer
const ShopClientsContainer: React.FC = ({employee}) => {
  // current employee
  const [cEmployee ,setCEmployee] = useState(employee);
  // client containers
  const [clientContainers , setClientContainers] = useState(null);
  // client add form
  const [clientForm , setClientForm] = useState(null);
  // show form to add new client
  const newClient = async () => {
    if(clientForm==null){await setClientForm(<ClientForm onSubmit={addNewClient} />)}
    else{setClientForm(null)}
  }
  // add new client
  const addNewClient = async (email,phone,name,note,sirname) => {
    await addClient(employee.shop_id,email,phone,name,note,sirname);
    await reload()
    setClientForm(null)
  }
  // delete client
  const deleteClient = async (clientEmail) => {
    await deleteShopClient(employee.shop_id,clientEmail);
    await reload();
  }
  // render client containers
  const renderClients = async () => {
    var clients = await getClients(employee.shop_id);
    var containers = [];
    for(i in clients){
      containers.push(<ClientContainer
                        key={i}
                        client={clients[i]}
                        deleteClient={deleteClient}
                        canDelete={(employee.typeofemployee<3)}
                        employeeEmail={employee.email}
                      />)
    }
    setClientContainers(containers)
  }
  // get clients
  useEffect(() => {
    renderClients()
  }, []);
  // reload after adding,deleting,modifying
  const reload = () => {// refresh after deletion
    renderClients()
  }

  return (
    <View>
      <View
        style={styles.clientArea}
      >
        <View style={styles.newClientButtonView}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={newClient}
          >
            <Text>
              {'New Client'}
            </Text>
          </TouchableOpacity>
        </View>
        {clientForm}
        {clientContainers}
      </View>
    </View>
  );
};

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
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
  },
  clientArea : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : "#2C2A33",
    marginBottom : 10,
    paddingBottom : 10,
  },
  controlButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 15,
    padding : 5,
  },
  buttonScrollView : {
    backgroundColor : '#FFFFFFAD',
    margin : 5,
    borderRadius : 8,
  },
  newClientButtonView : {
    backgroundColor : '#495866',
    margin : 5,
    borderRadius : 8,
    width : '95%',
    flexDirection : 'row',
    justifyContent : 'center',
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
  infoText:{
    alignSelf : 'center',
    fontWeight : 'bold',
    marginVertical :2,
    marginHorizontal : 5,
    fontSize : 15,
  },
  noteHeader : {
    alignSelf : 'center',
    fontSize : 18,
    fontWeight : '700',
  },
  note : {
    fontSize : 15,
  }
});

export default ShopClientsContainer;
