import { type ReactNode, useEffect } from 'react';
import { Button, Flex, Layout } from 'antd';

import { WS_API_URL } from '../constants/environment';
import { ESocketEvents } from '../types';
import { useAuthStore, useBalanceStore } from '../store';
import useWebSocket from '../hooks/useWebSocket';
import useGetBalanceQuery from '../services/queries/useGetBalanceQuery.ts';

import Balance from './Balance';

type TGuestLayoutProps = {
  children: ReactNode;
};

type TBalanceResponse = {
  balance: number;
};

const PrivateLayout = ({ children }: TGuestLayoutProps) => {
  const user = useAuthStore(state => state.user)!;
  const logout = useAuthStore(state => state.logout);
  const setBalance = useBalanceStore(state => state.setBalance);

  const { data: initialBalance } = useGetBalanceQuery();

  const { sendMessage, isConnected } = useWebSocket<TBalanceResponse>(`${WS_API_URL}/balance`, (message) => {
    if (message.event === ESocketEvents.BALANCE_UPDATE) {
      setBalance(message.data.balance);
    }
  });

  useEffect(() => {
    if (initialBalance) {
      setBalance(initialBalance);
    }
  }, [initialBalance, setBalance]);

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        event: ESocketEvents.SUBSCRIBE,
      });
    }
  }, [isConnected, sendMessage]);

  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: '#fff' }}>
        <Flex align="center" justify="space-between">
          Hi {user.first_name} !
          <Balance />
          <Button type="primary" onClick={logout}>Logout</Button>
        </Flex>
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px', marginTop: '64px', height: 'calc(100vh - 228px)' }}>
        {children}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Footer
      </Layout.Footer>
    </Layout>
  );
};

export default PrivateLayout;
