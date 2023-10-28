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
// add employee
export const addEmployee = async (name : string , sirname : string , nickname : string, email: string, phone : string, typeofemployee : number ,password: string,shop_id): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/registerEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        sirname,
        nickname,
        email,
        phone,
        typeofemployee,
        password,
        shop_id,
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
export const modifyEmployee = async (semail,name,sirname,nickname,email,phone,typeOfEmployee) => {
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
          nickname : nickname,
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
