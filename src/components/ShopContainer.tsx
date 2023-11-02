import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView } from 'react-native';
import ShopMenu from '../components/ShopMenu';
import EmployeeContainer from '../components/EmployeeContainer';
import { getEmployees,addEmployee } from '../utils/EmployeeHandling';
import { RegistrationForm } from '../components/RegistrationForm';
import { getServices,addService } from '../utils/ServiceHandling';
import ServiceContainer from '../components/ServiceContainer';
import { ServiceForm } from '../components/ServiceForm';

interface ShopContainerProps {
  employeeType : number;
}

const ShopContainer: React.FC<ShopContainerProps> = ({employeeType ,shop_id,employee_email}) => {
  // state form both employees and services
  const [es , setES] = useState(true);
  const [formComponent , setFormComponent] = useState(<RegistrationForm
                                                        addEmployee={true}
                                                        onSubmit2={addNewEmployee}
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
      setFormComponent(<RegistrationForm
                          addEmployee={true}
                          onSubmit2={addNewEmployee}
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
    const shopEmployees = await getEmployees(shop_id);//get employees from db
    var empContainers = []
    for(emp in shopEmployees){// render employees' containers
      empContainers.push(<EmployeeContainer key={emp} employee={shopEmployees[emp]} canDelete={(employeeType==3)} refresh={reload}/>);
    }
    await setEmployeeContainers(empContainers);
    setServiceContainers(null);
  }
  // add new employee , store and refresh
  const addNewEmployee = async (name,sirname,email,phone,typeofemployee,code) => {
    await addEmployee(name,sirname,email,phone,typeofemployee,code,shop_id)
    setEnableForm((prevState) => !prevState)
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
  const addNewService = async (name ,hours ,minutes ,seconds,employeeCost,clientCost,description) => {
    const dur = hours+'h'+minutes+'m'+seconds+'s';
    await addService(shop_id , employee_email ,name , dur , clientCost , employeeCost ,description )
    setEnableForm((prevState) => !prevState)
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
    backgroundColor : '#FFFFFFAD',
    marginBottom : 10,
    paddingBottom : 10,
  }
});

export default ShopContainer;
