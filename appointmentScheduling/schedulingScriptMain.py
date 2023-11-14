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
    # Your scheduling algorithm logic here
    print(requestBody)
    print(appointments)
    # Case 1 : 0 appointments
    if(len(appointments)==0):


if __name__ == '__main__':
    main()
