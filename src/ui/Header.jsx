import { Link } from 'react-router-dom';
import { SearchOrder } from '../features/order/SearchOrder';
import { UserName } from '../features/user/UserName';

export const Header = () => {
  return (
    <header className="flex items-center justify-around bg-blue-500 text-stone-700 uppercase px-4 py-3 border-b border-stone-200 sm:px-6">
      <Link to="/" className='tracking-widest'>Fast React Pizza Co.</Link>
      <SearchOrder />
      
      <UserName />
    </header>
  );
};
