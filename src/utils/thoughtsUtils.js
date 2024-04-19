import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BLOG_API}/thoughts`;

export const getPosts = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

export const createPost = async ({ image, body }) => {
  const { data } = await axios.post(
    baseURL,
    {
      image,
      body
    },
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  );
  return data;
};
