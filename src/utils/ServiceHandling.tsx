const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL

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
};

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
