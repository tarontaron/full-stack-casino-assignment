import { Fragment } from 'react';

import GuestLayout from '../components/GuestLayout';
import LoginPage from '../pages/Login';

const GuestRouter = () => {
  return (
    <Fragment>
      <GuestLayout>
        <LoginPage />
      </GuestLayout>
    </Fragment>
  );
};

export default GuestRouter;
