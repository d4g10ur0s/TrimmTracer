import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

interface EmployeeAppMenuProps {
  toCalendar: () => void;
  toShop: () => void;
  toOptions: () => void;
}

const EmployeeAppMenu: React.FC<EmployeeAppMenuProps> = ({toCalendar , toShop , toClients , toOptions}) => {

  const calendar = () => {
    toCalendar();
  }
  const shop = () => {
    toShop();
  }
  const clients = () => {
    toClients();
  }
  const options = () => {
    toOptions();
  }

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.controlButton}
        onPress={calendar}
      >
        <Text>
          {"Calendar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={shop}
      >
        <Text>
          {"My Shop"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={clients}
      >
        <Text>
          {"My Clients"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={options}
      >
        <Text>
          {"Options"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#495866',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 8,
    marginVertical : 10,
  },
  controlButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 15,
    padding : 5,
  },
});

export default EmployeeAppMenu;
