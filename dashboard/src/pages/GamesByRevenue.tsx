import { Table } from 'antd';
import useGetGamesByRevenue from '../services/queries/useGetGamesByRevenue';

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
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
  },
];

const GamesByRevenuePage = () => {
  const { data, isLoading } = useGetGamesByRevenue();

  return (
    <div>
      <Table
        title={() => 'Games by revenue'}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  );
};

export default GamesByRevenuePage;
