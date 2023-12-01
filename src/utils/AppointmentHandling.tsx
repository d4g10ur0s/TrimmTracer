const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL
// store appointment
export const storeAppointment = async (appointments) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/storeAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointments,
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
// get appointments for shop
export const getShopAppointments = async (shop_id,when_0,when_1) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getShopAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        when_0,
        when_1,
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
};
// get appointments for employee
export const getEmployeeAppointments = async (shop_id,email,when_0,when_1) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getEmployeeAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        email,
        when_0,
        when_1,
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
};
// get number of appointments for a day of shop
export const getShopNumberAppointments = async (shop_id,date) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getShopNumberAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.appointmentLength;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// get number of appointments for a day of employee
export const getEmployeeNumberAppointments = async (shop_id,employee_email,date) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getEmployeeNumberAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        employee_email,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.appointmentLength;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// get only times
export const getAppointmentTimesForDate = async (shop_id,employee_email,workinghours,date,duration) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getAppointmentTimesForDate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        employee_email,
        workinghours,
        date,
        duration,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    const data = await response.json();
    return data.message
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// check for appointments
export const checkForAppointments = async (shop_id,email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/checkForAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        email,
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
// check for appointments ( service version )
export const checkForAppointmentsService = async (shop_id,service_name) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/checkForAppointmentsService`, {
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
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
