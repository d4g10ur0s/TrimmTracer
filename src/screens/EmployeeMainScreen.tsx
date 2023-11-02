import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import Calendar from '../components/Calendar';
import ShopContainer from '../components/ShopContainer';
import ShopClientsContainer from '../components/ShopClientsContainer';
import EmployeeAppMenu from '../components/EmployeeAppMenu';
import { login } from '../utils/EnterApp';

const EmployeeMainScreen: React.FC = () => {
  const [content, setContent] = useState(1);
  const route = useRoute();
  const [employee, setEmployee] = useState(route.params.userData);
  const navigation = useNavigation(); // Initialize navigation

  const toggleCalendar = () => {
    setContent(<Calendar employee={employee}/>);
  }

  const toggleToShop = () => {
    setContent(<ShopContainer
                  employeeType={employee.typeofemployee}
                  shop_id={employee.shop_id}
                  employee_email={employee.email}
                />);
  }

  const toggleClients = () => {
    setContent(<ShopClientsContainer
                 employee={employee}
              />);
  }

  const toggleOptions = () => {
    setContent(null);
  }


  return (
    <ScrollView>
      <View
        style={styles.container}
      >
        <Text
          style={styles.welcomeHeader}
        >
          {employee.nickname}
        </Text>
        <EmployeeAppMenu
          toCalendar={toggleCalendar}
          toShop={toggleToShop}
          toClients={toggleClients}
          toOptions={toggleOptions}
        />
        {(content==1) ? (<Calendar />) : (content)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#7C96C4AD",
  },
  welcomeHeader : {
    fontSize : 25,
    fontWeight : 'bold',
    color : 'white',
    textAlign : 'center',
  },
});

export default EmployeeMainScreen;
