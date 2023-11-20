const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL

export const login = async (email: string, password: string , employee : boolean): Promise<any> => {
  try {// log in using middleware
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        employee,
      }),
    });
    // response has been received
    if (!response.ok) {// wrong credentials
      const data = await response.json();
      throw new Error(data.error);
    }else{// valid credentials
      const data = await response.json();
      return data.user;
    }
  } catch (error) {
    throw error;
  }
};
