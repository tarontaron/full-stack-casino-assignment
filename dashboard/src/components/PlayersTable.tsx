import { Table } from 'antd';
import usePlayersByRevenue from '../services/queries/playersByRevenue';


const PlayersTable = () => {

  const { data, isLoading, isError } = usePlayersByRevenue();

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

  return(
    <div>
      <h1> Players by revenue </h1>
      <Table
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
        dataSource={data}
      />
    </div>
  )
}

export default PlayersTable;
