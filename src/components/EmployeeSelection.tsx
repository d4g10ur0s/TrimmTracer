import React, { useState, useEffect } from 'react';
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

const MiniEmployeeContainer: React.FC<MiniEmployeeContainer> = ({employee, assigned,assign , unassign}) =>{
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

  const [assignedContainers , setAssignContainers] = useState(null)
  const [unassignedContainers , setUnassignedContainers] = useState(null)

  const renderAssigned = async () => {
    var containers = []
    for(a in assigned){
      containers.push(
        <MiniEmployeeContainer
          key={a}
          employee={assigned[a]}
          assigned={true}
        />
      )
    }
    return containers
  }

  const renderUnassigned = async () => {
    var containers = []
    console.log(unassigned)
    for(u in unassigned){
      containers.push(
        <MiniEmployeeContainer
          key={assignedContainers.length + u}
          employee={unassigned[u]}
          assigned={false}
        />
      )
    }
    await setUnassignedContainers(containers);
  }

  useEffect(() => {
    setAssignContainers(renderAssigned())
    renderUnassigned()
  }, []);

  return(
    <View>
      <ScrollView
        style={styles.employeeSelection}
      >
        <Text
          style={styles.selectionHeader}
        >
          {"Select an Employee"}
        </Text>
        {assignedContainers}
        {unassignedContainers}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  employeeSelection : {
    height : '65%',
    width : '85%',
    backgroundColor : "#FFFFFFAD",
    alignSelf : 'center',
    marginTop : 50,
    borderRadius : 8,
    borderWidth : 2,
  },
  selectionHeader : {
    alignSelf : 'center',
    color: 'black',
    fontSize : 20,
    fontWeight : 'bold',
  },
  miniContainer : {
    backgroundColor : "#FFFFFFAD",
  },
});

export default EmployeeSelection;
