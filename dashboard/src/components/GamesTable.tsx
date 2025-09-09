import { Table } from 'antd';
import useGamesByRevenue from '../services/queries/gamesByRevenue';


const GamesTable = () => {
  const { data, isLoading } = useGamesByRevenue();

  const columns = [
  {
    title: 'Game ID',
    dataIndex: 'game_id',
    key: 'game_id',
  },
  {
    title: 'Game Name',
    dataIndex: 'game_name',
    key: 'game_name',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
  },
];

  return(
      <Table
        bordered
        loading={isLoading}
        pagination={{ position: ['bottomRight'] }}
        title={() => "Games by Revenue"}
        columns={columns}
        dataSource={data}
      />
  )
}

export default GamesTable;
