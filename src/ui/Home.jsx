import { useSelector } from 'react-redux';
import { CreateUser } from '../features/user/CreateUser'
import { Button } from './Button';

export const Home = () => {
  const username = useSelector((state) => state.user.username)
  return (
    <div className='my-10 text-center px-4 sm:my-16 '>
      <h1 className="text-stone-700 text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-blue-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (<CreateUser />) : (<Button to='/menu' type='primary'>Continue ordering, {username}</Button>)}
    </div>
  );
};
