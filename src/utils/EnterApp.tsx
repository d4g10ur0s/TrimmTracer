const BASE_URL = 'http://192.168.1.226:3000'; // Replace this with your actual backend API URL

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    if(data.user==undefined){throw new Error('Wrong User Information');}
    return data.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
