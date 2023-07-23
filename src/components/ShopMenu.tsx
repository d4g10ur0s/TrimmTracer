import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert,TouchableOpacity,ScrollView } from 'react-native';

interface ShopMenuProps {
  addForm: () => void;
  isType3 : boolean;
}

const ShopMenu: React.FC<ShopMenuProps> = ({addForm,isType3}) => {

  const toAddForm = () => {addForm();}
  const shop = () => {toShop();}
  const options = () => {toOptions();}

  return (
    <View
      style={styles.containerMenu}
    >
    <TouchableOpacity
      style={(isType3) ? (styles.controlButtonDisabled) : (styles.controlButton)}
      onPress={toAddForm}
      disabled={isType3}
    >
      <Text>
        {"Add Employee"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.controlButton}
      onPress={shop}
    >
      <Text>
        {"To Services"}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMenu:{
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#FFFFFFAD',
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
