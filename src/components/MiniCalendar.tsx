import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import DayContainer from '../components/DayContainer';
import DayButton from '../components/DayButton';
import {getAppointmentTimesForDate,getEmployeeNumberAppointments} from '../utils/AppointmentHandling'

const RCalendar: React.FC = ({ shop_id, email, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

    const fDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);
    const lDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    const calendarArray = [];
    let dayCounter = 1;

    const dayHeader = [];
    const dayNames = ["Sun","Mon", "Tue", "Thi", "Wed", "Fri", "Sat"];
    for(let i=0; i<7; i++){
      dayHeader.push(<View style={styles.dayHeaderCell} key={i}>
                      <Text style={{color : 'black',}}>{dayNames[i]}</Text>
                     </View>
                    );
    }

    calendarArray.push(
      <View style={styles.weekRow} key={0}>
        {dayHeader}
      </View>
    );

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<View key={j} style={styles.emptyCell} />);
        } else if (dayCounter <= daysInMonth) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayCounter);
          week.push(
            <DayButton
              key={j}
              shop_id={shop_id}
              email={email}
              date={date}
              selectDate={dateSelected}
              dayCounter={dayCounter}
              disable={true}
            />
          );
          dayCounter++;
        } else {
          week.push(<View key={j} style={styles.emptyCell} />);
        }
      }
      calendarArray.push(
        <View key={i+1} style={styles.weekRow}>
          {week}
        </View>
      );
    }
    return calendarArray;
  };

  // a day has been selected
  const dateSelected=(date,numberOfAppointments)=>{
    onDateSelect(date,numberOfAppointments)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        {renderCalendar()}
      </View>
    </View>
  );
};

const MiniCalendar: React.FC = ({ employee , toSubmitionForm }) => {
  const [user,setUser] = useState(employee)
  const [content, setContent] = useState(null)
  // query appointmes for day having employee
  const dateSelected = async (date,appointmentNumber) => {
    toSubmitionForm(employee,date,appointmentNumber)
  }
  // render calendar at start
  useEffect(()=>{
    setContent(<RCalendar shop_id={employee.shop_id} email={employee.email} onDateSelect={dateSelected} />)
  },[])

  return(
    <View>
      <Text style={styles.selectHeader}>{'Select Date'}</Text>
      {content}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor : '#495866',
    padding: 10,
    borderRadius: 8,
    marginTop : 20,
    marginBottom : 20,
  },
  selectHeader : {
    marginTop : 10,
    fontSize : 18,
    fontWeight : 'bold',
    color : 'white',
    alignSelf : 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color : 'white',
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
    color : 'black',
  },
  calendar: {
    marginTop: 25,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  dateCell: {
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
  emptyCell: {
    width: 40,
    height: 40,
    backgroundColor : '#0000002F',
    borderRadius: 20,
    margin : 2,
  },
  dayHeaderCell: {
    margin :2 ,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
});

export default MiniCalendar;
