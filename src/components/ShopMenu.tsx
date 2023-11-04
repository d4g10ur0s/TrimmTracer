import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity,ScrollView } from 'react-native';

interface ShopMenuProps {
  addForm: () => void;
  isType3 : boolean;
}

const ShopMenu: React.FC<ShopMenuProps> = ({addForm,isType3,alter}) => {

  const toAddForm = () => {addForm();}

  const [es , setES] = useState(true);
  const alterButton = () => {
    setES((prevState) => !prevState);
    alter();
  }

  return (
    <View
      style={styles.containerMenu}
    >
    {
      (es) ?
      (<TouchableOpacity
        style={(isType3) ? (styles.controlButtonDisabled) : (styles.controlButton)}
        onPress={toAddForm}
        disabled={isType3}
      >
        <Text>
          {"Add Employee"}
        </Text>
      </TouchableOpacity>) :
      (<TouchableOpacity
        style={(isType3) ? (styles.controlButtonDisabled) : (styles.controlButton)}
        onPress={toAddForm}
        disabled={isType3}
      >
        <Text>
          {"Add Service"}
        </Text>
      </TouchableOpacity>)}
      {(es) ? (<TouchableOpacity
        style={styles.controlButton}
        onPress={alterButton}
      >
        <Text>
          {"To Services"}
        </Text>
      </TouchableOpacity>) :
      (<TouchableOpacity
        style={styles.controlButton}
        onPress={alterButton}
      >
        <Text>
          {"To Employees"}
        </Text>
      </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  containerMenu:{
    marginBottom : 5,
    borderRadius : 8,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#495866',
    flexDirection : 'row',
  },
  controlButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 15,
    padding : 5,
  },
  controlButtonDisabled:{
    backgroundColor : '#574C9E77',
    borderRadius : 8,
    marginVertical : 8,
    marginHorizontal : 15,
    padding : 5,
  },
});

export default ShopMenu;
