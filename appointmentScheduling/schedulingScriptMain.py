import sys
import json

import pytz
from datetime import datetime, timedelta

def parse_duration(duration_str):
    # Split the string into components
    components = duration_str.split()
    # Extract minutes and seconds
    hours = int(components[0]) if len(components) == 6 else 0
    minutes = int(components[2]) if len(components) == 6 else int(components[0])
    seconds = int(components[4]) if len(components) == 6 else int(components[2])

    # Create a timedelta object
    duration = timedelta(hours=hours,minutes=minutes, seconds=seconds)

    return duration


def process_arguments():
    if len(sys.argv) < 2:
        print("Usage: python schedulingScriptMain.py <json_data>")
        sys.exit(1)

    # The JSON data is passed as a command-line argument
    json_data = sys.argv[1]

    try:
        data = json.loads(json_data)
        return data
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        sys.exit(1)

def main():
    athens_timezone = pytz.timezone('Europe/Athens')
    # Process command-line arguments
    data = process_arguments()
    # unpack data
    requestBody = data["requestBody"]
    appointments = data["shopAppointments"]
    #print(requestBody)
    #print(appointments)
    # Case 1 : 0 appointments
    # Your scheduling algorithm logic here
    intervals = []# array of intervals
    mul=parse_duration(requestBody['duration'])# timedelta object
    if(len(appointments)==0):
        workingHours = requestBody['workinghours']# working hours
        start_time = datetime.strptime(workingHours['start_time'], '%H:%M:%S')
        i=0
        b=datetime.strptime(workingHours['end_time'], '%H:%M:%S').time()
        while(start_time.time() < b):
            i+=1
            intervals.append(start_time)
            start_time+=mul
    else:
        # find someplace to fit...
        timeFormat = '%Y-%m-%dT%H:%M:%S.%fZ'
        # 1. get employee working hours
        workingHours = requestBody['workinghours']# working hours
        start_time = datetime.combine(
                        datetime.strptime(appointments[0]['start_time'], timeFormat).date(),
                        datetime.strptime(workingHours['start_time'], '%H:%M:%S').time()
                        ).astimezone(athens_timezone)
        # 1.1 if gap between start_time and first appointment is more than duration , get interval
        while((start_time+mul).astimezone(athens_timezone).time() < datetime.strptime(appointments[0]['start_time'], timeFormat).astimezone(athens_timezone).time()) and (start_time+mul).astimezone(athens_timezone).time()<datetime.strptime(workingHours['end_time'], '%H:%M:%S').astimezone(athens_timezone).time():
            intervals.append(start_time.time())
            start_time+=mul
        start_time = datetime.strptime(appointments[0]['end_time'], timeFormat).astimezone(athens_timezone).date()+timedelta(minutes=5)
        # 2. get appointment gaps
        for i in range(len(appointments)) :
            # 2.1 if next appointment exists
            if(i+1<len(appointments)):
                # 2.1.1 find the gap between the two appointments
                gap = datetime.strptime(appointments[i+1]['start_time'], timeFormat).astimezone(athens_timezone)-datetime.strptime(appointments[i]['end_time'], timeFormat).astimezone(athens_timezone)
                # 2.1.2 if gap is less than appointment time interval
                start_time = datetime.strptime(appointments[i]['end_time'], timeFormat).astimezone(athens_timezone)+timedelta(minutes=2,seconds=30)
                while((start_time+mul).astimezone(athens_timezone).time()<(start_time+gap).astimezone(athens_timezone).time()) and  (start_time+mul).astimezone(athens_timezone).time()<datetime.strptime(workingHours['end_time'], '%H:%M:%S').astimezone(athens_timezone).time():
                    intervals.append(start_time)
                    start_time+=mul# add the gap to the start time
            # 2.2 if next appointment does not exist go as before
            else :
                start_time = datetime.strptime(appointments[i]['end_time'], timeFormat).astimezone(athens_timezone)
                print(start_time.time())
                while((start_time+mul).astimezone(athens_timezone).time() < datetime.strptime(workingHours['end_time'], '%H:%M:%S').time()):
                    intervals.append(start_time.time())
                    start_time+=mul
                break
    # Format each time object as a string
    formatted_times = [t.strftime('%H:%M') for t in intervals]
    print(json.dumps({'timeIntervals': formatted_times}))

if __name__ == '__main__':
    main()
