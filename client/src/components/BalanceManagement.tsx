import { Button, Flex, Space, Typography } from 'antd';

import useDepositBalanceMutation from '../services/queries/useDepositBalanceMutation.ts';
import useWithdrawBalanceMutation from '../services/queries/useWithdrawBalanceMutation.ts';

const BalanceManagement = () => {
  const { mutate: deposit } = useDepositBalanceMutation();
  const { mutate: withdraw }  = useWithdrawBalanceMutation();

  const onDeposit = () => {
    deposit({
      amount: 100,
    })
  };

  const onWithdraw = () => {
    withdraw({
      amount: 50,
    })
  };

  return (
    <Flex gap={16} vertical>
      <Space>
        <Button onClick={onWithdraw}>Withdraw</Button>
        <Typography>50 usd</Typography>
      </Space>
      <Space>
        <Button onClick={onDeposit}>Deposit</Button>
        <Typography>100 usd</Typography>
      </Space>
    </Flex>
  );
};

export default BalanceManagement;
