const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL

export const getClients = async (shop_id: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getShopClients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
      }),
    });

    if (!response.ok) {
      throw new Error('There is a client with these info .');
    }
    const data = await response.json();
    return data.clients;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// add client
export const addClient = async (shop_id,email,phone,name,note,sirname): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/addClient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        email,
        phone,
        name,
        note,
        sirname,
      }),
    });
    // response erros
    if (!response.ok) {
      throw new Error('There is a client with these info .');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
// delete employee
export const deleteShopClient = async (shop_id,clientEmail) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/deleteClient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        clientEmail,
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
