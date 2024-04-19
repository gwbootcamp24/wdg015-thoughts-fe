import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { getPosts } from '../utils/thoughtsUtils';

const Home = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <p className='card-text'>{thought.body}</p>
              <hr />
              <img
                src={thought.image}
                width='100%'
                height={300}
                className='object-fit-cover rounded'
                alt={thought.body}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
