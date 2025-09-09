import { useAuthStore } from '../store/auth';

import GuestRoutes from './GuestRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return <GuestRoutes />;
  }

  return <PrivateRoutes />;
};

export default AppRoutes;
