import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post('/user/login', { email, password });
  if (res.status !== 200) {
    throw new Error('Unable to login');
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post('/user/signup', { name, email, password });
  if (res.status !== 201) {
    throw new Error('Unable to Signup');
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get('/user/auth-status');
  if (res.status !== 200) {
    throw new Error('Unable to authenticate');
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get('/user/logout');
  if (res.status !== 200) {
    throw new Error('Unable to logout');
  }
  const data = await res.data;
  return data;
};
