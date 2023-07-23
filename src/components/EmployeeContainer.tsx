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

interface EmployeeContainerProps {
  employee : {};
}

const EmployeeContainer: React.FC<EmployeeContainerProps> = ({employee,canDelete,refresh}) => {
  const [employeeInfo, setEmployeeInfo] = useState(employee);

  const employeeDeletion = () => {
    deleteEmployee(employee.email);
    refresh();
  }

  return(
    <View
      style={styles.outsideContainer}
    >
      <View
        style={styles.container}
      >
        <View
          style={styles.employeeContainer}
        >
          <Image
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            style={styles.photoStyle}
          />
          <Text
            style={styles.employeeHeader}
          >
            {employee.name+ " " + employee.sirname}
          </Text>
        </View>
        <View
          style={styles.employeeInfoContainer}
        >
          <Text
            style={styles.infoText}
          >
            {"Employee Phone : " + employee.phone}
          </Text>
          <Text
            style={styles.infoText}
          >
            {"Employee Email : " + employee.email}
          </Text>
          <Text
            style={styles.infoText}
          >
            {"Works Today : "}
          </Text>
          <Text
            style={styles.infoText}
          >
            {"Employee Services : "}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
      >
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Employee Profile"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Modify Employee"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"New Appointment"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Assign Service"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
        >
          <Text>
            {"Unassign Service"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(canDelete) ? styles.disabledDeleteButton : styles.deleteButton}
          disabled={canDelete}
          onPress={employeeDeletion}
        >
          <Text>
            {"Delete Employee"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  },
  container : {
    flexDirection : 'row',
  },
  employeeContainer : {
    padding : 5,
    alignItems : 'center',
    flexDirection : 'column',
  },
  photoStyle : {
    width : 80,
    height : 80,
    borderRadius : 8,
    padding : 2,
  },
  employeeHeader : {
    fontSize : 12,
    fontWeight : 'bold',
  },
  employeeInfoContainer : {
    width : '60%',
    marginLeft : 4,
    padding : 5,
  },
  infoText:{
    fontWeight : 'bold',
    marginVertical :2,
    fontSize : 12,
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
});

export default EmployeeContainer;
