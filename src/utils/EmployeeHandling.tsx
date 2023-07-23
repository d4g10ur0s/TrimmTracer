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
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
