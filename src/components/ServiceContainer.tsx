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

import { deleteService } from '../utils/ServiceHandling';

interface ServiceContainerProps {
  service : {};
}

const nanosecondsToHoursMinutesSeconds = (nanoseconds) => {
  const nsPerSecond = 1e9;
  const nsPerMinute = nsPerSecond * 60;
  const nsPerHour = nsPerMinute * 60;

  const hours = Math.floor(nanoseconds / nsPerHour);
  const remainingAfterHours = nanoseconds % nsPerHour;

  const minutes = Math.floor(remainingAfterHours / nsPerMinute);
  const remainingAfterMinutes = remainingAfterHours % nsPerMinute;

  const seconds = Math.floor(remainingAfterMinutes / nsPerSecond);

  return { hours, minutes, seconds };
};

const ServiceContainer: React.FC<ServiceContainerProps> = ({service,canDelete,refresh}) => {
  const [serviceInfo, setServiceInfo] = useState(service);
  console.log(serviceInfo);
  const nanosecondsToString = (nanoseconds) => {
    const { hours, minutes, seconds } = nanosecondsToHoursMinutesSeconds(nanoseconds)
    if(hours==0){return minutes + " m " + seconds + " s "}
    return hours + " h " + minutes + " m " + seconds + " s "
  }
  // delete service
  const serviceDeletion = () => {
    deleteService(service.shop_id, service.id);
    refresh();
  }

  return(
    <View
      style={styles.outsideContainer}
    >
      <Text
        style={styles.serviceHeader}
      >
        {serviceInfo.name}
      </Text>
      <View
        style={styles.infoView}
      >
        <Text
        style={styles.infoText}
        >
          {'Average Duration : ' + nanosecondsToString(serviceInfo.average_dur.nanoseconds)}
        </Text>
        <Text
        style={styles.infoText}
        >
          {'Duration : ' + nanosecondsToString(serviceInfo.dur.nanoseconds)}
        </Text>
      </View>
      <View
        style={styles.infoView}
      >
        <Text
        style={styles.infoText}
        >
          {'Client Cost : ' + serviceInfo.client_cost + " eur"}
        </Text>
        <Text
        style={styles.infoText}
        >
          {'Employee Cost : ' + serviceInfo.employee_cost + " eur"}
        </Text>
      </View>
      <Text
        style={styles.useText}
      >
        {'Number of Employees : ' + service.employee_email.length}
      </Text>
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
      >
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Show Service Statistics"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButtons}
        >
          <Text>
            {"Modify Service"}
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
          onPress={serviceDeletion}
        >
          <Text>
            {"Delete Service"}
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

export default ServiceContainer;
