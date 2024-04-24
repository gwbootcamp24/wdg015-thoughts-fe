import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { updateThought } from '../utils/thoughtsUtils';

const EditThought = ({ thought, setCurrentEdit, setThoughts }) => {
  const [{ image, body }, setFormState] = useState(thought);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!image || !body) return alert('Please fill out all the fields');
      const updatedThought = await updateThought({ image, body }, thought._id);
      setThoughts(prevState => prevState.map(t => (t._id === thought._id ? updatedThought : t)));
      setCurrentEdit(null);
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
      <div className='col-lg'>
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
          Edit thought
        </button>
      </div>
    </form>
  );
};

export default EditThought;
