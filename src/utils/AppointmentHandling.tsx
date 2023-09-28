const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL

export const getShopAppointments = async (shop_id,employee_email,when_0,when_1) => {
  try {
    const response = await fetch(`${BASE_URL}/api/shop/getShopAppointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id,
        employee_email,
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
