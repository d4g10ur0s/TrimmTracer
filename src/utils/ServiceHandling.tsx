const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL
// utils
// convert duration info to human readable format
export const nanosecondsToString = (nanoseconds) => {
  const { hours, minutes, seconds } = nanosecondsToHoursMinutesSeconds(nanoseconds)
  if(hours==0){return minutes + " m " + seconds + " s "}
  return hours + " h " + minutes + " m " + seconds + " s "
}
// convert duration info to human readable format
export const nanosecondsToHoursMinutesSeconds = (nanoseconds) => {
  const nsPerSecond = 1e9;
  const nsPerMinute = nsPerSecond * 60;
  const nsPerHour = nsPerMinute * 60;

  const hours = Math.floor(nanoseconds / nsPerHour);
  const remainingAfterHours = nanoseconds % nsPerHour;

  const minutes = Math.floor(remainingAfterHours / nsPerMinute);
  const remainingAfterMinutes = remainingAfterHours % nsPerMinute;

  const seconds = Math.floor(remainingAfterMinutes / nsPerSecond);

  return { hours, minutes, seconds };
};
// get shop's services
export const getServices = async (shop_id: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getServices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.services
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
// get service-employee relationship
export const getServiceEmployees = async (shop_id,service_name): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getServiceEmployees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        service_name,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.emails
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
// add a new shop service
export const addService = async (shop_id , employee_email ,name , dur , client_cost , employee_cost ,description ) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/addService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id ,
        employee_email ,
        name ,
        dur ,
        client_cost ,
        employee_cost ,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
//assign service
export const assignService = async (shop_id , assign_email,unassign_email ,name) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/assignEmployees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id ,
        assign_email,
        unassign_email,
        name ,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
// update service
// delete service
export const updateService = async (service ,nameChanged,old_name) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/updateService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service ,
        nameChanged,
        old_name,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
// delete service
export const deleteService = async (shop_id ,name) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/deleteService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id ,
        name,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
