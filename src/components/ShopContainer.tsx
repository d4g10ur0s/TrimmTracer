import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView } from 'react-native';
import ShopMenu from '../components/ShopMenu';
import EmployeeContainer from '../components/EmployeeContainer';
import RegistrationForm from '../components/RegistrationForm';
import { addEmployee } from '../utils/EmployeeHandling';

interface ShopContainerProps {
  employeeType : number;
  employees : any[];
}

const ShopContainer: React.FC<ShopContainerProps> = ({employeeType , employees,shop_id , reload}) => {
  const [shopEmployees , setShopEmployees] = useState(employees);
  const [employeeForm, setEmployeeForm] = useState(true);

  const addForm = () => {
    setEmployeeForm((prevState) => !prevState)
  }

  const renderShopEmployees = () => {
    var employeeContainers = []
    for(emp in shopEmployees){
      employeeContainers.push(<EmployeeContainer key={emp} employee={shopEmployees[emp]} canDelete={(employeeType==3)} refresh={reload}/>);
    }
    return employeeContainers;
  }

  const addNewEmployee = (name,sirname,nickname,email,phone,typeofemployee,code) => {
    addEmployee(name,sirname,nickname,email,phone,typeofemployee,code,shop_id)
    setEmployeeForm((prevState) => !prevState)
    reload();
  }

  return (
    <View
      style={styles.container}
    >
      <ShopMenu
        addForm={addForm}
        isType3={(employeeType==3)}
      />
      <View
        style={styles.employeeArea}
      >
        {(employeeForm) ? (null) : (<RegistrationForm addEmployee={true} onSubmit2={addNewEmployee}/>)}
        {renderShopEmployees()}
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
