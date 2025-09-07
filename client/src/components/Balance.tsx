import { Space, Typography } from 'antd';
import { useBalanceStore } from '../store';

const Balance = () => {
  const balance = useBalanceStore(state => state.balance);

  return (
    <Space>
      <Typography.Text>User Balance: {balance} USD</Typography.Text>
    </Space>
  );
};

export default Balance;
