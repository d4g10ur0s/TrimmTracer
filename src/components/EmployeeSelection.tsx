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
  const handleA = async () => {
      if(a){
        await unassign(employee.email);
      }else{
        await assign(employee.email);
      }
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

const EmployeeSelection: React.FC<EmployeeSelectionProps> = ({emails,hide,assigned,unassigned,assign}) => {
  // assign
  const [a, setA] = useState(emails)
  const [u, setU] = useState([])
  const [assignedContainers , setAssignContainers] = useState([])
  // render containers
  const renderAssigned = async () => {
    var containers = []
    var b = []
    for(as in assigned){
      containers.push(
        <MiniEmployeeContainer
          key={as}
          employee={assigned[as]}
          assigned={true}
          assign={assignService}
          unassign={unassignService}
        />
      );
    }
    await setAssignContainers(containers);
  }
  // assign service
  const assignService = async (emp_email) => {
    var b = a;
    b.push(emp_email)
    setA(b);

    b=u;
    let index = b.indexOf(emp_email);
    if (index !== -1) {
      b.splice(index, 1);
    }
    setU(b);
  }
  // unassign service
  const unassignService = async (emp_email) => {
    var b = u;
    b.push(emp_email)
    setU(b);

    var b=a;
    let index = b.indexOf(emp_email);
    if (index !== -1) {
      b.splice(index, 1);
    }
    setA(b);
  }
  // unassign
  const [unassignedContainers , setUnassignedContainers] = useState([])
  // render containers
  const renderUnassigned = async () => {
    var containers = []
    for(un in unassigned){
      containers.push(
        <MiniEmployeeContainer
          key={assignedContainers.length + un}
          employee={unassigned[un]}
          assigned={false}
          assign={assignService}
          unassign={unassignService}
        />
      )
    }
    await setUnassignedContainers(containers);
  }
  // submit
  const submit = () => {assign(a,u);}
  // render at start
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
          onPress={hide}
        >
          <Text>{"Cancel"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submit}
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
    backgroundColor : "#2C2A33",
    alignSelf : 'center',
    marginTop : '25%',
    borderRadius : 8,
    borderWidth : 2,
  },
  selectionHeader : {
    alignSelf : 'center',
    color: 'white',
    fontSize : 20,
    fontWeight : 'bold',
  },
  miniContainer : {
    margin : 2,
    borderRadius : 8,
    borderStyle : 'dashed',
    borderWidth : 1,
    borderColor : 'gray',
    backgroundColor : '#495866',
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
    fontSize : 8,
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
