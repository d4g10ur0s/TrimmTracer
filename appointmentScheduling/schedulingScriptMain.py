import sys
import json

from datetime import datetime, timedelta

def parse_duration(duration_str):
    # Split the string into components
    components = duration_str.split()

    # Extract minutes and seconds
    minutes = int(components[0]) if len(components) >= 2 else 0
    seconds = int(components[2]) if len(components) == 4 else 0

    # Create a timedelta object
    duration = timedelta(minutes=minutes, seconds=seconds)

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
    # Process command-line arguments
    data = process_arguments()
    # unpack data
    requestBody = data["requestBody"]
    appointments = data["shopAppointments"]
    #print(requestBody)
    #print(appointments)
    # Case 1 : 0 appointments
    # Your scheduling algorithm logic here
    if(len(appointments)==0):
        mul=parse_duration(requestBody['duration'])# timedelta object
        intervals = []# array of intervals
        workingHours = requestBody['workinghours']# working hours
        start_time = datetime.strptime(workingHours['start_time'], '%H:%M:%S')
        while(start_time < datetime.strptime(workingHours['end_time'], '%H:%M:%S')):
            intervals.append(start_time.time())
            start_time+=mul
        # Format each time object as a string
        formatted_times = [t.strftime('%H:%M') for t in intervals]
        #print(str(formatted_times))
        print(json.dumps({'result': formatted_times}))

if __name__ == '__main__':
    main()
