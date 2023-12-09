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
    # Define the time zone for Greece
    greece_timezone = pytz.timezone('Europe/Athens')
    # Process command-line arguments
    data = process_arguments()
    # unpack data
    requestBody = data["requestBody"]
    appointments = data["shopAppointments"]
    # Case 1 : 0 appointments
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
    else:# find someplace to fit...
    # Case 2 : has appointments
        timeFormat = '%Y-%m-%dT%H:%M:%S.%fZ'
        # 2.1 get employee working hours
        workingHours = requestBody['workinghours']# working hours
        start_time = datetime.combine(
                        datetime.strptime(appointments[0]['start_time'], timeFormat).date(),
                        datetime.strptime(workingHours['start_time'], '%H:%M:%S').time()
                        )
        # 2.2 if gap between start_time and first appointment is more than duration , get interval
        nextAppointmentSTime = datetime.fromisoformat(appointments[0]['start_time'].rstrip("Z") + "+00:00").astimezone(greece_timezone)
        while( (start_time+mul).time() < nextAppointmentSTime.time() ):
            intervals.append(start_time)
            start_time+=mul
        # 2.3 Go to appointment end time
        start_time = (datetime.fromisoformat(appointments[0]['end_time'].rstrip("Z") + "+00:00")+timedelta(minutes=5)).astimezone(greece_timezone)
        # 2.3 get appointment gaps
        for i in range(len(appointments)) :
            # 2.4.1 if next appointment exists
            if(i+1<len(appointments)):
                # 2.1.1 find the gap between the two appointments
                gap =   (datetime.fromisoformat(appointments[i+1]['start_time'].rstrip("Z") + "+00:00")
                        -datetime.fromisoformat(appointments[i]['end_time'].rstrip("Z") + "+00:00"))
                # 2.1.2 if gap is less than appointment time interval
                pstart_time=(datetime.fromisoformat(appointments[i]['end_time'].rstrip("Z") + "+00:00")+timedelta(minutes=2,seconds=30)).astimezone(greece_timezone)
                start_time=pstart_time
                endOfWorking = datetime.strptime(workingHours['end_time'], '%H:%M:%S')
                while((start_time+mul).time()<(pstart_time+gap).time()) and  (start_time+mul).time()<endOfWorking.time():
                    intervals.append(start_time)
                    start_time+=mul# add the gap to the start time
            # 2.4.1 if next appointment does not exist go as before
            else :
                start_time=datetime.fromisoformat(appointments[i]['end_time'].rstrip("Z") + "+00:00").astimezone(greece_timezone)
                while((start_time+mul).time() < datetime.strptime(workingHours['end_time'], '%H:%M:%S').time()):
                    intervals.append(start_time)
                    start_time+=mul
                break
    # Format each time object as a string
    formatted_times = [t.strftime('%H:%M') for t in intervals]
    print(json.dumps({'timeIntervals': formatted_times}))

if __name__ == '__main__':
    main()
