import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from './lib';
import { useAuthStore } from './store';

import { PrivateRouter, GuestRouter } from './routes';

const App = () => {
  const init = useAuthStore(state => state.init);
  const user = useAuthStore(state => state.user);

  const router = user ? <PrivateRouter /> : <GuestRouter />

  useEffect(() => {
    init();
  }, [init]);

  return (
    <QueryProvider>
      {router}
      <ToastContainer />
    </QueryProvider>
  );
};

export default App
