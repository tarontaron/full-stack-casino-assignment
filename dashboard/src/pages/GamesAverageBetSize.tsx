import { Table } from 'antd';
import useGetAverageGameBetSize from '../services/queries/useGetAverageGameBetSize';

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
    title: 'Bet size',
    dataIndex: 'average_bet_size',
    key: 'average_bet_size',
  },
];

const GamesAverageBetSize = () => {
  const { data, isLoading } = useGetAverageGameBetSize();

  return (
    <div>
      <Table
        title={() => 'Games average Bet size'}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  );
};

export default GamesAverageBetSize;
