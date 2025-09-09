import { Flex } from 'antd';
import BalanceManagement from '../components/BalanceManagement';
import GamesList from '../components/GamesList';

const ProfilePage = () => {
  return (
    <Flex vertical gap={32}>
      <BalanceManagement />
      <GamesList />
    </Flex>
  );
};

export default ProfilePage;
