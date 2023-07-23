import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import Calendar from '../components/Calendar';
import ShopContainer from '../components/ShopContainer';
import EmployeeAppMenu from '../components/EmployeeAppMenu';
import { login } from '../utils/EnterApp';
import { getEmployees } from '../utils/EmployeeHandling';

const EmployeeMainScreen: React.FC = () => {
  const [content, setContent] = useState(1);
  const route = useRoute();
  const [employee, setEmployee] = useState(route.params.userData);
  const navigation = useNavigation(); // Initialize navigation

  const toggleCalendar = () => {
    setContent(<Calendar />);
  }

  const reloadShop = () => {
    setContent(null);
    toggleToShop();
  }

  const toggleToShop = async () => {
    const employees = await getEmployees(employee.shop_id);
    setContent(<ShopContainer
                  employees={employees.employees}
                  employeeType={employee.typeofemployee}
                  shop_id={employee.shop_id}
                  reload={reloadShop}
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
