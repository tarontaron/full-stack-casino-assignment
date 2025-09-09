import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import PrivateLayout from '../components/PrivateLayout';
import routesConfig from './routesConfig';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Players = lazy(() => import('../pages/Players'));
const GamesByRevenue = lazy(() => import('../pages/GamesByRevenue'));
const MostPopularGames = lazy(() => import('../pages/MostPopularGames'));
const GamesAverageBetSize = lazy(() => import('../pages/GamesAverageBetSize'));
const RTPComparison = lazy(() => import('../pages/RTPComparison'));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path={routesConfig.private.index} element={<Dashboard />} />
          <Route path={routesConfig.private.players} element={<Players />} />
          <Route path={routesConfig.private.gamesByRevenue} element={<GamesByRevenue />} />
          <Route path={routesConfig.private.mostPopularGames} element={<MostPopularGames />} />
          <Route path={routesConfig.private.gamesAverage} element={<GamesAverageBetSize />} />
          <Route path={routesConfig.private.rtpComparison} element={<RTPComparison />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
