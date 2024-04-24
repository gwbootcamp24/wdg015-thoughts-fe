import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { deletePost, getPosts } from '../utils/thoughtsUtils';
import EditThought from './EditThought';

const Home = ({ user }) => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEdit, setCurrentEdit] = useState(null);

  const handleDelete = async id => {
    try {
      const { success } = await deletePost(id);
      setThoughts(prevState => prevState.filter(t => t._id !== id));
      toast.success(success);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getPosts();
        setThoughts(data);
      } catch (error) {
        toast.error(error.response?.data.error || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='row flex-column align-items-center'>
      {thoughts.map(thought => (
        <div className='col-lg-6 mb-4' key={thought._id}>
          <div className='card border-2'>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center mb-2'>
                  <img
                    src={`https://randomuser.me/api/portraits/lego/${Math.floor(
                      Math.random() * 8
                    )}.jpg `}
                    className='rounded-circle me-2'
                    width={60}
                    alt='user image'
                  />
                  <div>
                    <h6 className='mb-0'>{thought.author.firstName}</h6>
                    <small>{`@${thought.author.firstName}`}</small>
                  </div>
                </div>
                {user?._id === thought.author._id && (
                  <div className='d-flex gap-1'>
                    <button
                      type='button'
                      className='btn btn-warning'
                      onClick={() => setCurrentEdit(thought._id)}
                      hidden={currentEdit === thought._id}
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      className='btn btn-info'
                      onClick={() => setCurrentEdit(null)}
                      hidden={currentEdit !== thought._id}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handleDelete(thought._id)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
              {currentEdit === thought._id ? (
                <EditThought
                  thought={thought}
                  setCurrentEdit={setCurrentEdit}
                  setThoughts={setThoughts}
                />
              ) : (
                <>
                  <p className='card-text'>{thought.body}</p>
                  <hr />
                  <img
                    src={thought.image}
                    width='100%'
                    height={300}
                    className='object-fit-cover rounded'
                    alt={thought.body}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
