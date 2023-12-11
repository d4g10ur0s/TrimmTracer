import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import {RCalendar} from '../components/Calendar';
import DayContainer from '../components/DayContainer';
import ShopContainer from '../components/ShopContainer';
import ShopClientsContainer from '../components/ShopClientsContainer';
import EmployeeAppMenu from '../components/EmployeeAppMenu';
import {Options} from '../components/Options'
import { login } from '../utils/EnterApp';

const EmployeeMainScreen: React.FC = () => {
  const [content, setContent] = useState(1);
  const route = useRoute();
  const [employee, setEmployee] = useState(route.params.userData);
  const navigation = useNavigation(); // Initialize navigation

  const toggleDay = (day) => {
    setContent(<DayContainer day={day} employee={employee} />)
  }
  const toggleCalendar = () => {
    console.log(employee)
    setContent(<RCalendar
                  onDateSelect={toggleDay}
                  employee={employee}
                />);
  }
  const toggleToShop = () => {
    setContent(<ShopContainer employee={employee}/>);
  }
  const toggleClients = () => {
    setContent(<ShopClientsContainer
                 employee={employee}
              />);
  }
  const toggleOptions = () => {
    setContent(<Options
                employee={employee}
                logOut={logOut}
               />);
  }

  const logOut = () =>{
    navigation.navigate('Register');
  }

  return (
    <ScrollView style={{backgroundColor : "#2C2A33",}}>
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
        {(content==1) ? (<RCalendar onDateSelect={toggleDay} employee={employee} />) : (content)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#2C2A33",
  },
  welcomeHeader : {
    fontSize : 25,
    fontWeight : 'bold',
    color : 'white',
    textAlign : 'center',
  },
});

export default EmployeeMainScreen;
