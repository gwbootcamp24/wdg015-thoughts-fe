import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { createPost } from '../utils/thoughtsUtils';

const CreateThought = () => {
  const [{ image, body }, setFormState] = useState({
    image: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!image || !body) return alert('Please fill out all the fields');
      await createPost({ image, body });
      navigate(`/`);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form
      className='row flex-column align-items-center justify-content-center gap-4'
      onSubmit={handleSubmit}
    >
      <div className='col-lg-6'>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          className='form-control'
          placeholder='Image URL'
          value={image}
          onChange={handleChange}
        />
        <label htmlFor='body'>Thought</label>
        <textarea
          id='body'
          className='form-control'
          placeholder='Body'
          value={body}
          onChange={handleChange}
          rows={10}
        />
      </div>
      <div className='col-lg-6 text-center'>
        <button className='btn btn-lg btn-primary' type='submit'>
          Share thought
        </button>
      </div>
    </form>
  );
};

export default CreateThought;
