import { Button, Flex, Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../store/auth';
import routesConfig from '../routes/routesConfig';

import SidebarNavigation from './SidebarNavigation';

const PrivateLayout = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  if (!user) return <Navigate to={routesConfig.guest.login} replace />;

  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: '#fff' }}>
        <Flex align="center" justify="flex-end">
          <Button type="primary" onClick={logout}>Logout</Button>
        </Flex>
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <SidebarNavigation />
        </Layout.Sider>
        <Layout.Content style={{ padding: '0 50px', marginTop: '64px', height: 'calc(100vh - 228px)' }}>
          {<Outlet />}
        </Layout.Content>
      </Layout>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Footer
      </Layout.Footer>
    </Layout>
  );
};

export default PrivateLayout;
