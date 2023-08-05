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
  const [a , setA] = useState(assigned);
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
        <Text style={styles.miniHeader} >{"Name"}</Text>
        <Text style={styles.infoText}>{employee.name + ' ' + employee.sirname}</Text>
      </View>
      <View
        style={styles.horizontalView}
      >
        <Text style={styles.miniHeader} >{"E-mail"}</Text>
        <Text style={styles.infoText}>{employee.email}</Text>
      </View>
      <TouchableOpacity
        onPress={handleA}
        style={(a) ? (styles.unassignButton) : (styles.assignButton)}
      >
        <Text>{(a) ? ('Unassign') : ('Assign') }</Text>
      </TouchableOpacity>
    </View>
  );

}

const EmployeeSelection: React.FC<EmployeeSelectionProps> = ({assigned,unassigned}) => {

  const [assignedContainers , setAssignContainers] = useState([])
  const [unassignedContainers , setUnassignedContainers] = useState([])

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
    await setAssignContainers(containers);
  }

  const renderUnassigned = async () => {
    var containers = []
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

  useEffect(()=>{
    renderAssigned();
    renderUnassigned();
  }, []);

  return(
    <View
      style={styles.employeeSelection}
    >
      <Text
      style={styles.selectionHeader}
      >
        {"Select Employees"}
      </Text>
      <ScrollView>
        {unassignedContainers}
        {assignedContainers}
      </ScrollView>
      <View
        style={styles.submitView}
      >
        <TouchableOpacity
          style={styles.cancelButton}
        >
          <Text>{"Cancel"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
        >
          <Text>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  employeeSelection : {
    height : '45%',
    width : '85%',
    backgroundColor : "#FFFFFFAD",
    alignSelf : 'center',
    marginTop : '25%',
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
    margin : 2,
    borderRadius : 8,
    borderStyle : 'dashed',
    borderWidth : 1,
    borderColor : 'gray',
    backgroundColor : '#999999AD',
  },
  horizontalView : {
    padding : 2,
    margin : 2,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  miniHeader : {
    fontSize : 15,
    fontWeight : 'bold',
  },
  infoText : {
    fontSize : 15,
    fontWeight : '500',
  },
  unassignButton : {
    alignSelf : 'center',
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 3,
  },
  assignButton : {
    alignSelf : 'center',
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 3,
  },
  submitView : {
    margin : 5,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  cancelButton : {
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    padding : 3,
  },
  submitButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    padding : 3,
  },
});

export default EmployeeSelection;
