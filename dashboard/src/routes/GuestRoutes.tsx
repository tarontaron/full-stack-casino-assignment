import { Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/Login';
import GuestLayout from '../components/GuestLayout';

import routesConfig from './routesConfig';

const GuestRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path={routesConfig.guest.login} element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes;
