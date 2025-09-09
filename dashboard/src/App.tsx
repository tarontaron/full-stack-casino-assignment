import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from './lib';

import { useAuthStore } from './store/auth';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const init = useAuthStore(state => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <BrowserRouter>
      <QueryProvider>
        <AppRoutes />
        <ToastContainer />
      </QueryProvider>
    </BrowserRouter>
  );
};

export default App;
