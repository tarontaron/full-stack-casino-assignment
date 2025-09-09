import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import PrivateLayout from '../components/PrivateLayout';

import routesConfig from './routesConfig';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path={routesConfig.private.index} element={<Dashboard />} />
        <Route path={routesConfig.private.dashboard} element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
