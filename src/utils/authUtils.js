import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BLOG_API}/auth`;

export const getUser = async token => {
  const { data } = await axios.get(`${baseURL}/me`, {
    headers: { Authorization: token }
  });
  return data;
};

export const registerUser = async formData => {
  const { data } = await axios.post(`${baseURL}/signup`, formData);
  return data;
};

export const loginUser = async formData => {
  const { data } = await axios.post(`${baseURL}/signin`, formData);
  return data;
};
