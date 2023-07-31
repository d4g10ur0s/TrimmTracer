import React, { useState } from 'react';
import { useCallback , useMemo } from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

interface EmployeeSelectionProps {
  assigned : [];
  unassigned : [];
}

const MiniEmployeeContainer: React.FC<MiniEmployeeContainer> = ({employee, assigned,assign , unassing}) =>{
  const [a , setA] = assigned;
  const handleA = () => {
      if(a){unassign(employee.email);}
      else{assign(employee.email)}
      setA((prevState) => !prevState);
  }

  return (
    <View
      style={styles.miniContainer}
    >
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"Credentials"}</Text>
        <Text>{employee.name + ' ' + employee.sirname}</Text>
      </View>
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"E-mail"}</Text>
        <Text>{employee.email}</Text>
      </View>
      <TouchableOpacity
        onPress={hadleA}
        style={(a) ? (styles.unassignButton) : (styles.assignButton)}
      >
        <Text>{(a) ? ('Unassign') : ('Assign') }</Text>
      </TouchableOpacity>
    </View>
  );

}

const EmployeeSelection: React.FC<EmployeeSelectionProps> = ({assigned,unassigned}) => {
  const [aEmployee, setAEmployee] = useState(null);
  const [uEmployee, setUEmployee] = useState(null);
  // delete service
  const serviceDeletion = () => {
    deleteService(service.shop_id, service.id);
    refresh();
  }
  // assign service
  const toAssign = async () => {
    const shopEmployees = await getEmployees(service.shop_id);
    var assigned = []
    var unassigned = []
    for (i in shopEmployees){
      if(shopEmployees[i].email in service.employee_email){
        assigned.push(shopEmployees[i])
      }else{unassigned.push(shopEmployees[i])}
    }//end for
    // show modal
  }

  return(

  )
}

const styles = StyleSheet.create({
  outsideContainer : {
    borderRadius : 8,
    backgroundColor:'#AFAFAFAD',
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    width: '95%',
    marginVertical : 3,
  },
  serviceHeader : {
    fontSize : 20,
    fontWeight : 'bold',
    alignSelf: 'center',
  },
  infoView : {
    flexDirection : 'row',
    justifyContent: 'space-between',
  },
  infoText : {
    fontSize : 12,
    fontWeight : 'bold',
    marginHorizontal : 4,
    padding : 3,
  },
  buttonScrollView : {
    backgroundColor : '#FFFFFFAD',
    margin : 5,
    borderRadius : 8,
  },
  controlButtons : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
  deleteButton : {
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
  disabledDeleteButton : {
    backgroundColor : '#E9769A77',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
  useText : {
    alignSelf : 'center',
    marginVertical : 4,
    fontSize : 15,
    fontWeight : 'bold',
  },
});

export default EmployeeSelection;
