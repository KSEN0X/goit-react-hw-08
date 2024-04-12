// npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/icons-material
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Layout from '../Layout/Layout';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage'));
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage')
);

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      {isRefreshing ? (
        <b>Refreshing user, please wait...</b>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      )}
      <Toaster />
    </Layout>
  );
}
