import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView } from 'react-native';
import ShopMenu from '../components/ShopMenu';
import EmployeeContainer from '../components/EmployeeContainer';
import { getEmployees,addEmployee } from '../utils/EmployeeHandling';
import RegistrationForm from '../components/RegistrationForm';
import { getServices } from '../utils/ServiceHandling';
import ServiceContainer from '../components/ServiceContainer';

interface ShopContainerProps {
  employeeType : number;
}

const ShopContainer: React.FC<ShopContainerProps> = ({employeeType ,shop_id}) => {
  // state form both employees and services
  const [es , setES] = useState(true);
  // states for employees
  const [employeeForm, setEmployeeForm] = useState(true);
  const [employeeContainers , setEmployeeContainers] = useState();
  // states for services
  const [serviceForm, setServiceForm] = useState(true);
  const [serviceContainers , setServiceContainers] = useState();
  // Functions for both employees and services content
  const alter = () => {
    setES((prevState) => !prevState);
  }
  const addForm = () => {// add form
    setEmployeeForm((prevState) => !prevState)
  }
  const reload = () => {// refresh after deletion
    renderShopEmployees();
  }
  useEffect(() => {
    if(es){
      if(!serviceForm){setServiceForm((prevState) => !prevState);}
      renderShopEmployees();
    }else{
      if(!employeeForm){setEmployeeForm((prevState) => !prevState);}
      renderShopServices();
    }
  }, [es]);
  // Employee Functions
  // get and render employees
  const renderShopEmployees = async () => {
    const shopEmployees = await getEmployees(shop_id);//get employees from db
    var empContainers = []
    for(emp in shopEmployees){// render employees' containers
      empContainers.push(<EmployeeContainer key={emp} employee={shopEmployees[emp]} canDelete={(employeeType==3)} refresh={reload}/>);
    }
    await setEmployeeContainers(empContainers);
  }
  // add new employee , store and refresh
  const addNewEmployee = async (name,sirname,nickname,email,phone,typeofemployee,code) => {
    await addEmployee(name,sirname,nickname,email,phone,typeofemployee,code,shop_id)
    setEmployeeForm((prevState) => !prevState)
    renderShopEmployees();
  }
  // Service Functions
  // get and render services
  const renderShopServices = async () => {
    const shopServices = await getServices(shop_id);//get employees from db
    var servContainers = []
    for(serv in shopServices){// render employees' containers
      servContainers.push(<ServiceContainer key={serv} service={shopServices[serv]} canDelete={(employeeType==3)} refresh={reload}/>);
    }
    await setServiceContainers(servContainers);
    setEmployeeContainers(null);// don't waste
  }
  // add new service , store and refresh
  const addNewService = (shop_id,dur,client_cost,employee_cost,employee_email,name) => {
    addService(shop_id,dur,client_cost,employee_cost,employee_email,name)
    setServiceForm((prevState) => !prevState)
    renderShopServices();
  }

  return (
    <View
      style={styles.container}
    >
      <ShopMenu
        alter={alter}
        addForm={addForm}
        isType3={(employeeType==3)}
      />
      <View
        style={styles.employeeArea}
      >
        {(employeeForm) ? (null) : (<RegistrationForm addEmployee={true} onSubmit2={addNewEmployee}/>)}
        {(es) ? (employeeContainers) : (serviceContainers)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {

  },
  employeeArea : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#FFFFFFAD',
    marginBottom : 10,
    paddingBottom : 10,
  }
});

export default ShopContainer;
