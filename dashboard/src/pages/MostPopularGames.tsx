import { Table } from 'antd';
import useGetMostPopularGames from '../services/queries/useGetMostPopularGames.ts';

const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'game_id',
  },
  {
    key: 'game_name',
    title: 'Game',
    dataIndex: 'game_name',
  },
  {
    title: 'Bets count',
    dataIndex: 'total_bets',
    key: 'total_bets',
  },
];

const MostPopularGames = () => {
  const { data, isLoading } = useGetMostPopularGames();

  return (
    <div>
      <Table
        title={() => 'Most Popular Games'}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  );
};

export default MostPopularGames;
