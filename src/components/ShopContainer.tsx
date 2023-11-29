import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView } from 'react-native';
import ShopMenu from '../components/ShopMenu';
import EmployeeContainer from '../components/EmployeeContainer';
import { getEmployees,addEmployee } from '../utils/EmployeeHandling';
import { EmployeeForm } from '../components/EmployeeForm';
import { getServices,addService,deleteService } from '../utils/ServiceHandling';
import ServiceContainer from '../components/ServiceContainer';
import { ServiceForm } from '../components/ServiceForm';

interface ShopContainerProps {

}

const ShopContainer: React.FC<ShopContainerProps> = ({employee}) => {
  // state form both employees and services
  const [es , setES] = useState(true);
  const [formComponent , setFormComponent] = useState(<EmployeeForm
                                                        onSubmit={addNewEmployee}
                                                      />);
  const [enableForm, setEnableForm] = useState(true);
  // states for employees
  const [employeeContainers , setEmployeeContainers] = useState();
  // states for services
  const [serviceContainers , setServiceContainers] = useState();
  // Functions for both employees and services content
  const alter = () => {
    setES((prevState) => !prevState);
  }
  const addForm = () => {// add form
    setEnableForm((prevState) => !prevState)
  }
  const reload = async () => {// refresh after deletion
    if(es){await renderShopEmployees();}
    else{await renderShopServices();}
  }
  useEffect(() => {
    if(!enableForm){setEnableForm((prevState) => !prevState);}
    if(es){
      renderShopEmployees();
      setFormComponent(<EmployeeForm
                          onSubmit={addNewEmployee}
                        />);
    }else{
      renderShopServices();
      setFormComponent(<ServiceForm
                          onSubmit={addNewService}
                        />);
    }
  }, [es]);
  // Employee Functions
  // get and render employees
  const renderShopEmployees = async () => {
    const shopEmployees = await getEmployees(employee.shop_id);//get employees from db
    var empContainers = []
    console.log(employee.typeofemployee==1)
    for(emp in shopEmployees){// render employees' containers
      empContainers.push(<EmployeeContainer
                            key={emp}
                            employee={shopEmployees[emp]}
                            canDelete={(employee.typeofemployee>1)} refresh={reload}
                            userEmail={employee.email}
                          />);
    }
    await setEmployeeContainers(empContainers);
    setServiceContainers(null);
  }
  // add new employee , store and refresh
  const addNewEmployee = async (name,sirname,email,phone,typeofemployee,code,workingHours) => {
    await addEmployee(name,sirname,email,phone,typeofemployee,code,employee.shop_id,workingHours)
    setEnableForm((prevState) => !prevState)
    renderShopEmployees();
  }
  // Service Functions
  // get and render services
  const renderShopServices = async () => {
    const shopServices = await getServices(employee.shop_id);//get employees from db
    var servContainers = []
    for(serv in shopServices){// render employees' containers
      servContainers.push(<ServiceContainer key={serv}
                                            service={shopServices[serv]}
                                            canDelete={(employee.typeofemployee==1)}
                                            refresh={reload}
                                            deleteService={deleteAService}
                                            />);
    }
    await setServiceContainers(servContainers);
    setEmployeeContainers(null);// don't waste
  }
  // add new service , store and refresh
  const addNewService = async (name ,hours ,minutes ,seconds,employeeCost,clientCost,description) => {
    const dur = hours+'h'+minutes+'m'+seconds+'s';
    try {
      await addService(employee.shop_id , employee.email ,name , dur , clientCost , employeeCost ,description )
      setEnableForm((prevState) => !prevState)
    } catch (error) {
      Alert.alert('Service Storing Failed', error + ' , please try again.');
    }
    renderShopServices();
  }
  // delete a service
  const deleteAService = (serviceName) => {
    if(checkForAppointmentsService(employee.shop_id,employee.email,serviceName)){
      Alert.alert('Service has Appointments');
    }else{// employee can be deleted
      deleteService(employee.shop_id,serviceName);
      reload();
    }
  }

  return (
    <View
      style={styles.container}
    >
      <ShopMenu
        alter={alter}
        addForm={addForm}
        employeeType={employee.typeofemployee}
      />
      <View
        style={styles.employeeArea}
      >
        {(enableForm) ? (null) : (formComponent)}
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
    backgroundColor : "#2C2A33",
    marginBottom : 10,
    paddingBottom : 10,
  }
});

export default ShopContainer;
