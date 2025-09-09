import { Table } from 'antd';
import useGetRtpComparison from '../services/queries/useGetRtpComparison';

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
    title: 'Theoretical RTP',
    dataIndex: 'theoretical_rtp',
    key: 'theoretical_rtp',
  },
  {
    title: 'Actual RTP',
    dataIndex: 'actual_rtp',
    key: 'actual_rtp',
  },
];

const RTPComparison = () => {
  const { data, isLoading } = useGetRtpComparison();

  return (
    <div>
      <Table
        title={() => 'RTP Comparison'}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  );
};

export default RTPComparison;
