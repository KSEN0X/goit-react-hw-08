import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../../redux/auth/selectors';

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/login',
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  return isRefreshing || isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
