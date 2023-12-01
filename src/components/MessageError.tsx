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


export const SubmitionMessage: React.FC = ({submit, close, title, message }) => {


  return(
    <View
      style={styles.submitionMessageView}
    >
      <Text
        style={styles.submitionMessageTitle}
      >{title}</Text>
      <View
        style={styles.contentView}
      >
        <Text
          style={styles.messageText}
        >{message}</Text>
      </View>
      <View
        style={styles.buttonView}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={close}
        >
          <Text>
            {"Close"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submit}
        >
          <Text>
            {"Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  submitionMessageView :{
    marginTop : '45%',
    backgroundColor : "#2C2A33",
    width : '75%',
    alignSelf : 'center',
    borderRadius : 8,
  },
  submitionMessageTitle : {
    alignSelf : 'center',
    fontSize : 18,
    fontWeight : 'bold',
    color : 'white',
    marginVertical : 3,
  },
  contentView : {
    marginVertical : 5,
    paddingVertical : 5,
    paddingHorizontal : 5,
    borderTopWidth : 1,
    borderColor : 'white',
  },
  messageText : {
    fontSize : 15,
    color : 'white',
  },
  buttonView : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 2,
    marginBottom : 5,
    marginHorizontal : 20,
  },
  submitButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
  closeButton : {
    backgroundColor : '#E9769AAA',
    borderRadius : 8,
    marginVertical : 5,
    marginHorizontal : 10,
    padding : 5,
  },
});
