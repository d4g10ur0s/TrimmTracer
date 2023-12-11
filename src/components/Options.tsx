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
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const Options: React.FC = ({employee,logOut}) => {

  return(
    <View
      style={styles.optionsView}
    >
      <Text style={styles.optionsHeader}>{'Options'}</Text>
      <TouchableOpacity
        style={styles.optionsButton}
      >
        <Text
          style={styles.optionsButtonText}
        >
          {'Change Password'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionsButton}
      >
        <Text
          style={styles.optionsButtonText}
        >
          {'Change Photo'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logOutButton}
        onPress={logOut}
      >
        <Text
          style={styles.optionsButtonText}
        >
          {'Log Out'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  optionsView : {
    justifyContent : 'center',
    alignItems : 'center',
  },
  optionsHeader : {
    fontSize : 25,
    fontWeight : 'bold',
    color : 'white',
  },
  optionsButton : {
    backgroundColor : '#574C9EAA',
    textAlign : 'center',
    width : '40%',
    borderRadius : 8,
    marginTop : '10%',
    marginHorizontal : 15,
    paddingHorizontal : 10,
    paddingVertical : 5,
  },
  optionsButtonText : {
    alignSelf : 'center',
    fontSize : 15,
  },
  logOutButton : {
    backgroundColor : '#E9769AAA',
    textAlign : 'center',
    width : '40%',
    borderRadius : 8,
    marginTop : '10%',
    marginHorizontal : 15,
    paddingHorizontal : 10,
    paddingVertical : 5,
  },
});
