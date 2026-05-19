import API from "../api/axios";



// REGISTER USER

export const registerUser = async (

  name: string,
  email: string,
  password: string

) => {

  const response = await API.post(

    "/auth/register",

    {
      name,
      email,
      password,
    }
  );

  return response.data;
};



// LOGIN USER

export const loginUser = async (

  email: string,
  password: string

) => {

  const response = await API.post(

    "/auth/login",

    {
      email,
      password,
    }
  );

  return response.data;
};