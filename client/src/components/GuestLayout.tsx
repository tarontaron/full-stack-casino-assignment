import type { ReactNode } from 'react';
import { Layout } from 'antd';

type TGuestLayoutProps = {
  children: ReactNode;
};

const GuestLayout = ({ children }: TGuestLayoutProps) => {
  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: '#fff' }}>Header</Layout.Header>
      <Layout.Content style={{ padding: '0 50px', marginTop: '64px', height: 'calc(100vh - 228px)' }}>
        {children}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Footer
      </Layout.Footer>
    </Layout>
  );
};

export default GuestLayout;
