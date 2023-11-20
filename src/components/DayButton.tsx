import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {getAppointmentTimesForDate,getEmployeeNumberAppointments,getShopNumberAppointments} from '../utils/AppointmentHandling'

const DayButton : React.FC = ({shop_id,email,typeofemployee,date,selectDate,dayCounter,disable})=>{
  const [ldate ,setDate] = useState(date);
  const [num, setNum] = useState(0); // Initialize num state
  const [buttonStyle, setButtonStyle] = useState(styles.dateCell)

  useEffect(()=>{
    const fetchNum = async () => {
      var result ;
      if(typeofemployee==3){
        result = await getEmployeeNumberAppointments(shop_id, email, ldate);
      }else{
        result = await getShopNumberAppointments(shop_id, ldate)
      }
     setNum(result.count);
   };
   fetchNum(); // Fetch num and update the state
  },[ldate])

  useEffect(() => {
    console.log(num)
    // Select the style based on num or use a default style
    if ( num > 0 && num < 8) {setButtonStyle(styles.dateCell_1);}
    else if (num >= 8 && num < 12) {setButtonStyle(styles.dateCell_2);}
    else {setButtonStyle(styles.dateCell_3);}
  }, [num])
  // date selected
  const dateSelected = () => {selectDate(date,num)}

  return(
    <View>
      <TouchableOpacity
      style={(date<new Date() && disable) ? styles.disabledDateCell : buttonStyle}
      disabled={(date<new Date() && disable)}
      onPress={() => dateSelected(ldate)}
      >
      <Text
        style={{'color' : 'black'}}
      >
        {dayCounter}
      </Text>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
  dateCell: {
    width: 40,
    height: 40,
    margin : 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  dateCell_1: {
    width: 40,
    height: 40,
    margin : 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#95EAE2',
  },
  dateCell_2: {
    width: 40,
    height: 40,
    margin : 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EBE98D',
  },
  dateCell_3: {
    width: 40,
    height: 40,
    margin : 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  disabledDateCell : {
    width: 40,
    height: 40,
    margin : 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#0000002F',
  },
});

export default DayButton
