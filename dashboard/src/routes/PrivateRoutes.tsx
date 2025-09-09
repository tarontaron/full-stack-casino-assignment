import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import PrivateLayout from '../components/PrivateLayout';
import routesConfig from './routesConfig';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Players = lazy(() => import('../pages/Players'));
const GamesByRevenue = lazy(() => import('../pages/GamesByRevenue'));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path={routesConfig.private.index} element={<Dashboard />} />
          <Route path={routesConfig.private.players} element={<Players />} />
          <Route path={routesConfig.private.gamesByRevenue} element={<GamesByRevenue />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
