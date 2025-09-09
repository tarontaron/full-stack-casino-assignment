import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../store/auth';
import routesConfig from '../routes/routesConfig';

const GuestLayout = () => {
  const user = useAuthStore(state => state.user);

  if (user) return <Navigate to={routesConfig.private.index} replace />;

  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: '#fff' }}>Header</Layout.Header>
      <Layout.Content style={{ padding: '0 50px', marginTop: '64px', height: 'calc(100vh - 228px)' }}>
        {<Outlet />}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Footer
      </Layout.Footer>
    </Layout>
  );
};

export default GuestLayout;
