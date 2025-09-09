import { Table } from 'antd';
import usePlayersByRevenue from '../services/queries/useGetPlayersByRevenue';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
  },
];

const PlayersPage = () => {
  const { data, isLoading } = usePlayersByRevenue();

  return (
    <div>
      <Table
        title={() => 'Players by revenue'}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  );
};

export default PlayersPage;
