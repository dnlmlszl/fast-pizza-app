import { useNavigate, useRouteError } from 'react-router-dom';
import { LinkButton } from './LinkButton';

export const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton onClick={() => navigate(-1)}>&larr; Go back</LinkButton>
    </div>
  );
};
