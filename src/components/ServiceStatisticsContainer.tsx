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
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  LineChart,
} from "react-native-chart-kit";

const TimeScaleSelection : React.FC = ({timeScaleChanged}) => {

  const [byWeek , setByWeek] = useState(true)
  const [byMonth , setByMonth] = useState(false)

  const selected = async () => {
    timeScaleChanged(byWeek);
    await setByWeek((prevState)=>!prevState)
    await setByMonth((prevState)=>!prevState)
  }

  return (
    <View
      style={styles.selectTimeButtonView}
    >
      <TouchableOpacity
        style={byWeek ? styles.timeScaleButtonDisabled : styles.timeScaleButton}
        disabled={byWeek}
        onPress={selected}
      >
        <Text>{'Week'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={byMonth ? styles.timeScaleButtonDisabled : styles.timeScaleButton}
        disabled={byMonth}
        onPress={selected}
      >
        <Text>{'Month'}</Text>
      </TouchableOpacity>
    </View>
  );

}

const ServiceStatisticsContainer: React.FC = ({service}) => {

  const [timeIndex , setTimeIndex] = useState('Week');
  const [lineChartLabelsDay , setLineChartLabelsDay] = useState(
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thurstday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
  );
  const timeScaleChanged = (week) =>{
    if(week){
      setLineChartLabelsDay(Array.from({ length: 30 }, (_, index) => index + 1));
    }else{
      setLineChartLabelsDay(
        [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thurstday',
          'Friday',
          'Saturday',
          'Sunday',
        ]
      );
    }
  }

  return(
    <View
      style={styles.outsideContainer}
    >
      <TimeScaleSelection timeScaleChanged={timeScaleChanged}/>
      <ScrollView
        style={styles.chartView}
        horizontal={true}
      >
        <LineChart
        data={{
          labels: lineChartLabelsDay,
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width*2} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#000000ff",
          backgroundGradientFrom: "#341A6BAA",
          backgroundGradientTo: "#341A6BAA",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 8
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: "#000000ff"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  outsideContainer : {
    marginVertical : 10,
    justifyContent : 'center',
    alignItems : 'center',
  },
  selectTimeScaleView : {

  },
  selectTimeButtonView : {
    backgroundColor : '#FFFFFFAD',
    borderRadius : 8,
    flexDirection : 'row',
    justifyContent : 'space-between',
    width : '65%',
    paddingHorizontal : 25,
    paddingVertical : 5,
  },
  timeScaleButton : {
    backgroundColor : '#574C9EAA',
    borderRadius : 8,
    paddingHorizontal : 10,
  },
  timeScaleButtonDisabled : {
    backgroundColor : '#574C9E77',
    borderRadius : 8,
    paddingHorizontal : 10,
  },
  chartView : {
    borderRadius : 8,
    marginHorizontal : 5,
  },
});

export default ServiceStatisticsContainer;
