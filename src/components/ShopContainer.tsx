import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity, ScrollView } from 'react-native';
import ShopMenu from '../components/ShopMenu';
import EmployeeContainer from '../components/EmployeeContainer';
import RegistrationForm from '../components/RegistrationForm';
import { addEmployee } from '../utils/EmployeeHandling';
import { getEmployees } from '../utils/EmployeeHandling';

interface ShopContainerProps {
  employeeType : number;
}

const ShopContainer: React.FC<ShopContainerProps> = ({employeeType ,shop_id}) => {
  const [employeeForm, setEmployeeForm] = useState(true);
  const [employeeContainers , setEmployeeContainers] = useState();
  const [es , setES] = useState(true);

  const addForm = () => {
    setEmployeeForm((prevState) => !prevState)
  }

  const reload = () => {
    renderShopEmployees();
  }

  const renderShopEmployees = async () => {
    const shopEmployees = await getEmployees(shop_id);
    var empContainers = []
    for(emp in shopEmployees){
      empContainers.push(<EmployeeContainer key={emp} employee={shopEmployees[emp]} canDelete={(employeeType==3)} refresh={reload}/>);
    }
    await setEmployeeContainers(empContainers);
  }

  const addNewEmployee = (name,sirname,nickname,email,phone,typeofemployee,code) => {
    addEmployee(name,sirname,nickname,email,phone,typeofemployee,code,shop_id)
    setEmployeeForm((prevState) => !prevState)
    renderShopEmployees();
  }

  const alter = () => {
    setES((prevState) => !prevState);
  }

  useEffect(() => {
    renderShopEmployees();
  }, [es]);

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
        {(es) ? (employeeContainers) : (null)}
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
