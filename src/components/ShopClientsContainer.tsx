import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView } from 'react-native';

import {ClientForm} from '../components/ClientForm';

const ShopClientsContainer: React.FC = ({employee}) => {
  // current employee
  const [cEmployee ,setCEmployee] = useState(employee);
  // client containers
  const [clientContainers , setClientContainers] = useState(null);
  // client add form
  const [clientForm , setClientForm] = useState(null);

  const newClient = async () => {
    if(clientForm==null){await setClientForm(<ClientForm />)}
    else{setClientForm(null)}
  }

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.clientArea}
      >
        <TouchableOpacity
          style={styles.controlButton}
          onPress={newClient}
        >
          <Text>
            {'New Client'}
          </Text>
        </TouchableOpacity>
        {clientForm}
        {clientContainers}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {

  },
  clientArea : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#FFFFFFAD',
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
});

export default ShopClientsContainer;
