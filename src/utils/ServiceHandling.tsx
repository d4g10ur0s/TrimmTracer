const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL
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
// get shop's services
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
    console.error('Error logging in:', error);
    throw error;
  }
}
//assign service
export const assignService = async (shop_id , assign_email,unassign_email ,name) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/assignService`, {
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
// delete service
export const deleteService = async (shop_id ,service_id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/deleteService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id ,
        service_id,
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
