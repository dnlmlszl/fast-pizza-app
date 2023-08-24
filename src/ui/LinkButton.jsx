import { Link, useNavigate } from 'react-router-dom';

export const LinkButton = ({ children, to }) => {
  const navigate = useNavigate();
  const className='text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300'
  
  if (to === '-1') return <button className={className} onClick={() => navigate(-1)}>{children}</button>
  return (
    <Link to={to} className={className}>{children}</Link>
  )
}
