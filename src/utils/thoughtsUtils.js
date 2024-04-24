import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BLOG_API}/thoughts`;

export const deletePost = async id => {
  const { data } = await axios.delete(`${baseURL}/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
  return data;
};

export const getPosts = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

export const createThought = async ({ image, body }) => {
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

export const updateThought = async ({ image, body }, id) => {
  const { data } = await axios.put(
    `${baseURL}/${id}`,
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
