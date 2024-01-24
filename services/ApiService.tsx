const baseURL = 'http://172.16.102.179:8888';//Don Profesor Adrian aqui tiene que poner su direccion Ip.

const registerUser = async (name: string, email: string, password: string) => {
  try {
    const initRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    };

    const response = await fetch(`${baseURL}/users/register`, initRequest);

    if (response.ok) {
      const userData = await response.json();
        return { userData };
    } else if (response.status === 400) {
      return null;}
    else if (response.status === 201){
        const userData = await response.json();
        const setCookieHeader = response.headers.get('Set-Cookie');
        return { userData, setCookieHeader };
      
    } else {
      throw new Error(`Error inesperado : ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async (name: string, password: string) => {
  try {
    const initRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    };

    const response = await fetch(`${baseURL}/users/login`, initRequest);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Error en la autenticación: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { registerUser, loginUser };
