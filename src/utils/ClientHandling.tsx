const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL

export const getEmployees = async (shop_id: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getShopEmployees`, {
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
    return data.employees;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// get employee-service relationship
export const getEmployeeServices = async (shop_id,employee_email): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getEmployeeServices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        employee_email,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.names
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
//assign service
export const assignService = async (shop_id , assign_name,unassign_name ,email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/assignServices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id ,
        assign_name,
        unassign_name,
        email ,
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
// add client
export const addClient = async (shop_id,name,sirname,email,phone,note): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/addClient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        name,
        sirname,
        email,
        phone,
        note,
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

// delete employee
export const deleteEmployee = async (email,shop_id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/deleteEmployee`, {
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
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// delete employee
export const modifyEmployee = async (semail,name,sirname,email,phone,typeOfEmployee) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/updateEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email : semail,
        employee :{
          name : name,
          sirname : sirname ,
          email : email,
          phone : phone,
          typeofemployee : typeOfEmployee,
        },
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
